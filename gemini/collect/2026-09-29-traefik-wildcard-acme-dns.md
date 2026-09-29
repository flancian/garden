---
source: [[flancian]], [[gemini]], [[antigravity]]
date: 2026-09-29
tags: [collect, agora, traefik, acme-dns, wildcard, hypatia, coop-cloud, polite-software]
---

# [[collect/traefik-wildcard-acme-dns]]

- [[pull]] [[agora of flancia]] [[collect]] [[traefik]] [[acme-dns]] [[hypatia]] [[coop cloud]] [[polite-software]]
- [[push]] [[flancian]] [[protopia]] [[the quiet revolution]]

> *"Is there a way to make Traefik serve something better than the very bare 404 message we get when a container is down/restarting? ... And could we then support wildcard domains for agor.ai?"*  
> — [[Flancian]], September 28, 2026

---

## I. The Spark: Polite Software & The Vanishing 404

In the philosophy of the Agora of Flancia, every broken link or empty node is not a dead end, but an invitation: **No 404s**. Yet, when edge containers cycle or a visitor types an unallocated subdomain on `*.agor.ai`, Traefik's default reflex was a blunt, sterile string: `404 page not found`.

What began as an operational tuning session—untangling flapping disk checks across five nodes in [[Uptime Kuma]]—flowered into a systemic upgrade:
1. Transforming Traefik into [[polite-software]] that serves a living Agora fallback (`[[flan.agor.ai]]`) whenever a route is absent.
2. Unlocking automated, zero-touch wildcard TLS certificates for `*.agor.ai` and `agor.ai` using [[acme-dns]] delegation.
3. Preserving strict compatibility with [[Coop Cloud]] and [[Abra]] without clobbering persistent volumes, breaking existing apps, or violating upstream boundaries.

---

## II. The Full Arc & Yield

Across the working session, five core pillars were designed, implemented, and verified live:

### 1. Monitoring Fleet Stabilization (`kuma.agor.ai`)
* **Root Causes**:
  - Unescaped `%` symbols in cron one-liners (`gsub(/%/...)` and `${DISK}%`) caused cron's shell to treat `%` as a newline, aborting checks with syntax errors.
  - A tight race condition: 300s cron frequency with `interval=300s`, `maxretries=0`, and a 1000ms buffer caused monitors to flag down if a push arrived 4 seconds late.
* **Yield**:
  - Authored a robust, portable shell script: `/home/flancian/garden/bin/kuma-push.sh`.
  - Deployed to `~/bin/kuma-push.sh` across all five nodes: `tara`, `hypatia`, `thecla`, `patera`, and `paramita`.
  - Tuned `kuma.db`: `interval=420s`, `maxretries=1`, `retry_interval=120s`. Cleaned historical transition event messages.
  - Tagged all 11 monitors cleanly into singular `website` and `host`. All monitors are steady and green.

### 2. DNS-01 Delegation via `acme-dns` (Option C)
* **The Challenge**: Namecheap's DNS API requires whitelisting IP addresses and does not allow scoping keys. Exposing registrar credentials to Traefik was high-risk.
* **The Solution**: DNS-01 delegation via `acme-dns`:
  - Registered `agor.ai` on `auth.acme-dns.io` (subdomain `452ebc60-e00d-4993-a9e7-9c8b1ea4dcc6`).
  - Stored credentials on Hypatia at `/etc/letsencrypt/acme-dns.json` (`chmod 600`).
  - User created CNAME `_acme-challenge.agor.ai` pointing to `452ebc60-e00d-4993-a9e7-9c8b1ea4dcc6.auth.acme-dns.io.`.
  - Cleared stale Namecheap TXT records so recursive resolvers cleanly follow the CNAME.

### 3. Traefik Multi-Resolver Architecture
* **The Conflict**: Traefik cannot mix `httpChallenge` and `dnsChallenge` within a single certificate resolver. Attempting to do so breaks HTTP-01 renewals.
* **The Architecture**:
  - Preserved `production` resolver with `httpChallenge` on `entryPoint: web` for standard Coop Cloud apps (`anagora.org`, `flancia.org`, `kuma.agor.ai`, `pad.agor.ai`).
  - Added dedicated `dns-wildcard` resolver using `acme-dns` with upstream public resolvers (`1.1.1.1:53`, `9.9.9.9:53`).
  - Created `compose.acme-dns.yml` in `~/.abra/recipes/traefik` to inject `ACME_DNS_API_BASE` and `ACME_DNS_STORAGE_PATH`.
  - Bumped `TRAEFIK_YML_VERSION=v22` in `abra.sh` to safely recreate Swarm config.
  - Successfully issued certificate: `CN = agor.ai`, SANs `*.agor.ai, agor.ai` (valid through Dec 27, 2026), stored in `traefik_agor_ai_letsencrypt`.

### 4. The Agora Fallback Catch-All Router
* **Implementation**:
  - Enabled `FILE_PROVIDER_DIRECTORY_ENABLED=1` in `traefik.agor.ai.env`.
  - Added `00-security.yml` and `10-agora-fallback.yml` to Docker volume `traefik_agor_ai_file-providers`.
  - Fallback router rule: `PathPrefix('/')`, `priority: 1`, `entryPoints: [web-secure]`, `certResolver: dns-wildcard`.
  - Backend service: `http://flan_agor_ai_app:5017`.
  - **Result**: Any unassigned subdomain (e.g. `https://testwildcard123.agor.ai`, `https://catchall.agor.ai`) automatically negotiates valid TLS and gracefully lands on the Agora.

### 5. Abra State & Recipe Versioning
* Traefik recipe changes committed to branch `local/acme-dns` in `~/.abra/recipes/traefik`.
* `abra app check traefik.agor.ai` passes cleanly with zero warnings.
* Server configuration repository `~/.abra/servers/hypatia.agor.ai` fully updated with `.gitignore`, `file-providers/`, documentation, and committed.

---

## III. The Weave: Connections in the Graph

- [[flan.agor.ai]]: The living canary and fallback target.
- [[hypatia]]: The primary Swarm host where Coop Cloud services thrive.
- [[polite-software]]: The ethic of hospitality in code—replacing rejection with welcoming context.
- [[acme-dns]]: Decentralized privilege minimization for DNS certificate challenges.
- [[uptime kuma]]: The pulse of the infrastructure.
