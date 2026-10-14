# Paramita

- A ThinkPad laptop running Ubuntu, an active Agoran node and companion.
- Host of many pair programming sessions with [[Gemini]] and [[Antigravity]].
- **Disaster Recovery & Restores**:
  - In late 2024, tested [[backup restores]] for [[social coop]].
  - Because the `mastodon-live` database was large, mounted external Btrfs drive [[teras]] (with `compress=lzo`) and pointed PostgreSQL:
    - `data_directory = '/media/flancian/teras/postgres'`
  - Pulled encrypted backups from DigitalOcean Spaces (`spaces:social-coop-media/backups/rhizome/`) and decrypted using keys in [[pass]].
  - Runbook and automation codified in [[social coop ansible]]:
    - `docs/restore-postgres-database.md`
    - `scripts/restore-from-s3.sh`
- [[pull]] [[restores]] [[backups]] [[teras]] [[tara]]
