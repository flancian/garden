# Agora Collaboration Chronicle: 2025–2026

## Introduction
This chronicle compiles a detailed historical narrative of the pair programming collaboration between User (@flancian) and the AI assistants (Gemini/AGY) in building, maintaining, and evolving the Agora. The scope of this history spans 118 sessions across late 2025 and early 2026. 

The Agora is designed as a Free Knowledge Commons—a distributed knowledge graph where nodes represent concepts (`[[Concept]]`) and subnodes represent individual contributions (e.g., `@flancian/concept.md`). Under the core principle of "for the benefit of all beings," this system operates as a decentralized social network and digital garden, prioritizing user sovereignty and robust, lightweight filesystem-based data storage over monolithic silos.

---

## Chronological Breakdown of Key Milestones

### 1. The Journals Page Bug (October 2025)
*   **The Problem:** The `/journals` page, which indexes the daily logs of Agora participants, exhibited a severe rendering bug. Every date in the journal index erroneously displayed not only the subnodes belonging to that specific date but also transcluded all subnodes from the general `[[journals]]` conceptual node. This resulted in redundant loops, massive HTML payloads, and slow page loads.
*   **Technical Details & Action:** The investigation centered on the Flask routing logic in `app/agora.py` and the Jinja2 template hierarchy. The root cause was identified as implicit context variable leakage within Jinja2 templates. When rendering the journal entries, the main template `journals.html` was passed a `node` object corresponding to the parent `[[journals]]` index. This `node` variable implicitly leaked down the scope to the nested `subnode.html` inclusion. Inside `subnode.html`, conditional blocks checked for the presence of a `node` object; because the variable was leaked, the template executed fallback rendering paths, pulling in and displaying all of the parent node's subnodes on every individual date card.
*   **The Resolution:** The Flask backend in `app/agora.py` was refactored to group subnodes strictly by date using `api.all_journals()`, ensuring clean iteration boundaries. `journals.html` was updated to clear the parent `node` object from the child rendering scope, and a new control variable `show_links` was added to `subnode.html` to programmatically toggle context links and prevent unintended transclusions.

### 2. SQLite Database Refactoring & Caching Schema (November/December 2025)
*   **The Problem:** The Agora was plagued by long startup times and write bottlenecks due to its monolithic cache architecture. The database read/write mechanism relied on serializing the entire graph cache into a single blob in the `graph_cache` table. Under this scheme, corrupted cache entries could only be resolved by completely deleting the `agora.db` file and running a blocking rebuild of the entire social graph, causing read-lock crashes and server downtime.
*   **Technical Details & Action:** The system was migrated from a single-blob design to a relational database schema. New tables were introduced to normalize graph entities: `subnodes` (with `git_mtime` metadata), `links` (wikilinks mapped via `source_node`), `ai_generations`, `starred_nodes`, `starred_subnodes`, `followers`, `federated_subnodes`, and `query_cache`. To perform background cache building without locking the web server out of the database, the indexing worker (`worker.py`) was rewritten. It was designed to write new data into temporary tables (`subnodes_new`, `links_new`) and atomically swap them in a single SQLite transaction block (`ALTER TABLE ... RENAME TO`). Additionally, the cache flush buttons were refactored to reset `git_repo_state` to prevent git scanning loops from freezing.
*   **The Resolution:** Normalizing the database resolved the monolithic serialization bottleneck. The background worker's atomic table-swapping transaction prevented write locks from conflicting with continuous read traffic, stabilizing cold start times and allowing the application to serve pages instantly.

### 3. uWSGI Memory Leak and Harakiri Debugging (January/February 2026)
*   **The Problem:** The production instance at `anagora.org` suffered from memory bloat and random worker terminations. The uWSGI worker processes grew steadily, consuming from 9% up to 15% of memory on the 32GB server, which triggered OOM pressure. Furthermore, workers frequently hung, prompting the 60-second uWSGI harakiri daemon to force-kill processes.
*   **Technical Details & Action:** Analysis of the `/tmp/uwsgi.log` tail revealed that the memory footprint expanded due to millions of concept strings held in the in-memory graph (`app/graph.py`). In addition, the worker hangs were traced to the Wikipedia execution endpoint `/exec/wp/`, which locked up when querying the external Wikipedia API during cold runs of empty nodes. The uWSGI configuration was tuned to recycle workers periodically using `max-requests = 2000` to mitigate memory fragmentation. For memory optimization, string concepts were deduplicated in `app/graph.py`, and a `TTLCache` was implemented for frequent `is_journal` calls.
*   **The Resolution:** By applying string deduplication, adding `TTLCache` bounds, and introducing request-based worker recycling in uWSGI, the memory baseline stabilized at a manageable ~1.2GB (down from over 3GB). The external Wikipedia execution hangs were safely isolated by the harakiri daemon without compromising overall server uptime.

### 4. Mastodon & Bluesky Bot Integration (January 2026)
*   **The Problem:** The `agora-bridge` bots, which synchronize digital gardens with the Fediverse and Bluesky, stopped operating reliably. The Mastodon bot was failing to see and respond to posts, and the Bluesky bot encountered pagination issues when fetching user feeds. There was also a risk of runaway loops unfollowing or following accounts en masse due to transient API failures.
*   **Technical Details & Action:** The Mastodon bot issues were diagnosed as compatibility failures between newer Mastodon API client updates and the self-hosted GotoSocial instance. The Bluesky bot was refactored to communicate directly with the AppView API to handle actors and feeds. To safeguard against cascading API errors, safety boundaries and follow/unfollow thresholds were implemented in the follower synchronization code.
*   **The Resolution:** The bridge was upgraded to maintain full compatibility with GotoSocial's protocol specifications, and the Bluesky API call architecture was corrected. The follow safety thresholds successfully protected accounts from accidental mass unfollowing events, ensuring stable cross-platform syndication of digital garden updates.

### 5. MIDI/Opus Player Development (January 2026)
*   **The Problem:** The Agora's ambient background music player suffered from concurrent playback issues. When navigating between nodes, multiple MIDI tracks would play simultaneously, causing overlapping audio streams and crashing browser threads. The player also lacked visual feedback to indicate which notes and chords were actively being played.
*   **Technical Details & Action:** The audio player logic in `app/js-src/music.ts` was refactored. A state-tracking token (`currentPlayId`) was introduced. Whenever a new MIDI track begins playing, the visualizer increments the token, and any existing player with an outdated token is immediately stopped. To implement note visualization, callbacks were hooked into the `midi-player-js` engine (`event.name === 'Note on'`). The engine captured raw MIDI note numbers (e.g., `event.noteNumber`) and mapped them to standard pitch names (e.g., `A4`, `G4`). A chord-aware overlay was styled with CSS to visually light up corresponding key blocks in real-time.
*   **The Resolution:** The visual overlay and play token logic resolved the audio overlap bug. Users could seamlessly browse the Agora with high-fidelity, single-stream ambient music paired with a responsive visualizer.

### 6. social.coop Alpha Deployment (January 2026)
*   **The Problem:** Attempts to deploy a dedicated testing environment (`alpha.social.coop`) using Ansible playbooks failed. The deployment script consistently crashed during volume mapping tasks because it was unable to resolve ownership properties.
*   **Technical Details & Action:** The Ansible tasks were attempting to perform directory ownership updates (`chown`) on target hosts using the string name of the `mastodon` user. However, the host operating system did not have a local `mastodon` user in its `/etc/passwd` registry.
*   **The Resolution:** The playbooks were refactored to map all volumes and permissions directly to the numeric UID/GID (`991:991`) of the Mastodon container process. This eliminated host-level name lookups, allowing the container runtime to bind mount directory permissions cleanly and execute the deployment successfully.

### 7. @nail's Pushes Bug & Subprocess Leakage (March 2026)
*   **The Problem:** Agora member @nail reported that certain pushed subnodes (e.g., transcluded list items on the `[[bookmarked]]` index from `journal/2026-03-08.md`) rendered only as a blank "Bookmarked:" header without child content. Concurrently, the Agora server was experiencing resource exhaustion due to orphaned python processes spawned by the execution module (`/exec/`) that remained active after timeout limits.
*   **Technical Details & Action:**
    *   *Pushes Bug:* The markdown parser was inspected. When extracting pushed elements, the parser failed to handle list items (`<li>`) containing child HTML paragraph tags (`<p>`). The logic stopped at the nested paragraph leaf, losing the relationship to the parent list item. The parser was refactored to traverse up to the parent list elements, preserving list nesting and enabling full content extraction.
    *   *Subprocess Leakage:* Spawning executables for dynamic subnodes was leaving background child processes running even after a timeout killed the parent python wrapper. The execution engine was refactored to call `os.setsid` in the `preexec_fn` parameter of `subprocess.Popen` to create a separate process session. On timeout, the system executed `os.killpg` to kill the entire process group cleanly.
*   **The Resolution:** Transclusion boundaries were fixed, restoring nested list pushes for @nail, and process session isolation prevented orphan process leaks from consuming server CPU resources.

### 8. SSH NAT Traversal (May 2026)
*   **The Problem:** The user required a secure, Nix-compatible method to establish SSH connections to a computer hidden behind a restrictive NAT network without control over the intermediary router.
*   **Technical Details & Action:** A deep review of remote access tools and security properties was conducted:
    *   *Ephemeral Tunnels:* Tools like `tmate` and `pinggy.io` (e.g., `ssh -p 443 -R0:localhost:22 qr@pinggy.io`) provide quick, zero-install, 60-minute tunnels but suffer from changing subdomains.
    *   *Persistent Shares:* `zrok` (built on OpenZiti) allows users to reserve public shares (`zrok reserve public localhost:22 --unique-name my-cool-laptop`) and host persistent SSH gateways that survive client restarts.
    *   *Security properties:* Because SSH relies on end-to-end encryption (E2E), relay servers (such as those run by Pinggy or Zrok) cannot decrypt keystrokes or traffic. Handshakes happen directly between endpoints, and any tampering would trigger standard SSH host key verification warnings.
*   **The Resolution:** A tiered guide was created recommending `tmate` for quick sessions, `zrok` for free persistent tunnels with stable URLs, and `Tailscale` for permanent multi-node overlay networks.

---

## Evolution of Philosophy and Operational Rules

As the Agora serves not only as a software package but as a living social environment, a set of operational guidelines and Git policies were codified to preserve the workspace and protect user contributions:

1.  **The Agora Protocol:** 
    *   Nodes represent concepts, and subnodes represent individual utterances or digital garden files.
    *   Decentralization is the default: the local filesystem remains the absolute source of truth.
    *   "No 404s": Every query maps to a node, presenting an invitation for future contributions rather than an error page.
2.  **Non-Destructive Git Policies:**
    *   When local and remote branches diverge, the agent must ALWAYS prefer `git pull --rebase` or other non-destructive synchronization techniques.
    *   Destructive commands, such as `git reset --hard`, are strictly treated as a last resort and must be accompanied by an explicit data-loss warning to the user.
3.  **Script Organization:**
    *   All helper scripts created during log analysis, database debugging, or system profiling must be saved to the repository's dedicated script directories (e.g., `scripts/` or `bin/`) to ensure long-term utility and reproducibility.
4.  **Twitter (X) Bot Deprecation:**
    *   Following changes and cost increases in the Twitter API, the Twitter bot was marked as permanently non-operative, and further development efforts were deprecated.
