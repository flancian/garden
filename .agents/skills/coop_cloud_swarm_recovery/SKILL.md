---
name: coop-cloud-swarm-recovery
description: Recover a Coop Cloud setup after a Docker Swarm manager failure (e.g. irreparable Raft WAL error from disk exhaustion)
---
# Coop Cloud Docker Swarm Recovery Guide

This skill guides the agent in diagnosing and recovering from a Docker Swarm manager failure in a Coop Cloud context (often caused by disk space exhaustion leading to Raft WAL corruption).

## Diagnostics
1. Check the server-side Docker info to verify the Swarm manager state:
   ```bash
   ssh <host> docker info
   ```
   Look for: `Error: manager stopped: can't initialize raft node: irreparable WAL error`
2. Check network route and interface info to verify public IP:
   ```bash
   ssh <host> "ip route get 1.1.1.1 && ip addr show"
   ```

## Recovery Workflow

### Step 1: Backup and Reset Swarm on Host
Run these commands on the affected swarm manager node:
1. Backup: `sudo cp -r /var/lib/docker/swarm /var/lib/docker/swarm.bak`
2. Force leave: `sudo docker swarm leave --force`
3. Stop any orphaned containers that were running under the old Swarm overlay networks (to release the local network configuration lock):
   ```bash
   # Exclude any plain docker containers you want to keep (e.g., minecraft)
   docker rm -f $(docker ps --format '{{.Names}}' | grep -v <exclude_name>)
   ```
4. Delete the old swarm state directory: `sudo rm -rf /var/lib/docker/swarm`
5. Restart the Docker daemon to clear the local network cache: `sudo systemctl restart docker`
6. Re-initialize the Swarm: `sudo docker swarm init --advertise-addr <host_public_ip>`
7. Re-create the overlay proxy network: `sudo docker network create --driver overlay proxy`

### Step 2: Redeploy Traefik & Retrieve Secrets
1. First, deploy Traefik (non-interactively in offline/chaos mode if needed):
   ```bash
   abra -n app deploy -C -f traefik.<domain>
   ```
2. For existing apps, list the configured secrets and retrieve/generate them:
   - Check secrets list: `abra -o app secret list <app_domain>`
   - Generate missing secrets: `abra app secret generate <app_domain> --all`
   - Insert manually known secrets: `abra app secret insert <app_domain> <secret> <version> <value>`

### Step 3: Align Database Passwords (ALTER ROLE)
If an app uses an existing persistent database volume (like Postgres or MariaDB), starting it with a new secret password will fail because the existing DB volume still expects the old password.
To fix this:
1. Identify the running database container name/ID:
   ```bash
   docker ps --filter name=<db_service_name>
   ```
2. Run SQL query inside the database container to update the user password to match the new secret:
   - **Postgres:**
     ```bash
     docker exec -i <db_container_id> psql -U <db_user> -d <db_name> -c "ALTER USER <db_user> WITH PASSWORD '<new_secret_value>';"
     ```
   - **MariaDB / MySQL:**
     ```bash
     docker exec -i <db_container_id> mysql -u root -p<root_pass> -e "ALTER USER '<db_user>'@'%' IDENTIFIED BY '<new_secret_value>';"
     ```
3. Restart the application service, and it will now connect successfully!
