# The Agora Master Synthesis: History, Artifacts, & Philosophy

*A comprehensive compilation of the Agora's collaborative development history, past session artifacts, and core design philosophies found in `~/.gemini`.*

---

## Part 1: Historical Chronicle (2025–2026)

Based on a detailed scan of the 118 historical sessions located in `~/.gemini/tmp/`, the following eight milestones represent the key technical accomplishments, issues resolved, and features introduced:

### 1. The Journals Page Bug (October 2025)
*   **The Problem:** The `/journals` index page, which groups users' daily logs, incorrectly transcluded every subnode from the generic `[[journals]]` parent node onto each daily card. This led to nested rendering loops, massive HTML payloads, and slow load times.
*   **Technical Details & Action:** The bug was traced to implicit context variable leakage within Jinja2 templates. When rendering journal entries, `journals.html` passed a `node` object corresponding to the parent `[[journals]]` index. This `node` object leaked down into the nested `subnode.html` scopes. The template fell back to rendering all subnodes for that object.
*   **The Resolution:** The Flask backend in `app/agora.py` was refactored to group subnodes strictly by date using `api.all_journals()`. `journals.html` was cleaned up to prevent parent `node` leakage, and a control variable `show_links` was added to `subnode.html` to toggle context links programmatically.

### 2. SQLite Database Refactoring & Caching Schema (November/December 2025)
*   **The Problem:** The Agora server suffered from long start times and database write bottlenecks because the entire graph cache was serialized as a single monolithic blob in `graph_cache`. Corrupted entries required deleting `agora.db` and rebuilding the cache from scratch, causing read-locks and down time.
*   **Technical Details & Action:** The database was normalized into relational tables: `subnodes`, `links`, `ai_generations`, `starred_nodes`, `starred_subnodes`, `followers`, `federated_subnodes`, and `query_cache`. The background worker (`worker.py`) was rewritten to write to temporary tables (`subnodes_new`, `links_new`) and atomically swap them using an SQLite transaction (`ALTER TABLE ... RENAME TO`) to eliminate write-locks on read traffic.
*   **The Resolution:** Normalized tables resolved the serialization bottleneck, and atomic swaps stabilized cold startup performance, ensuring zero-downtime cache rebuilds.

### 3. uWSGI Memory Leak and Harakiri Debugging (January/February 2026)
*   **The Problem:** The production instance at `anagora.org` experienced memory bloat (workers taking up to 15% of 32GB RAM) and random terminations by the 60-second uWSGI harakiri daemon.
*   **Technical Details & Action:** Tail logs of `/tmp/uwsgi.log` revealed that storing millions of concept strings in `app/graph.py` bloated the memory footprint, and external API requests to Wikipedia in `/exec/wp/` hung during cold runs of empty nodes. The uWSGI configuration was tuned with `max-requests = 2000` to recycle workers, concept strings were deduplicated, and a `TTLCache` was added to `is_journal` checks.
*   **The Resolution:** The memory footprint stabilized at ~1.2GB (down from 3GB+), and external Wikipedia API timeouts were safely isolated without impacting server stability.

### 4. Mastodon & Bluesky Bot Integration (January 2026)
*   **The Problem:** The `agora-bridge` synchronization bots went offline. The Mastodon bot failed to parse posts due to protocol discrepancies with the self-hosted GotoSocial instance, and the Bluesky bot had pagination issues when syncing follower feeds.
*   **Technical Details & Action:** The Bluesky bot was refactored to communicate directly with the AppView API to handle feeds. Safety margins and thresholds (`FOLLOW_SAFETY_RATIO = 0.9`, `FOLLOW_SAFETY_MARGIN = 5`) were implemented in the follower sync script to prevent cascading API errors from triggering accidental mass unfollow events.
*   **The Resolution:** Direct AppView integration and GotoSocial protocol compatibility were restored, and safety checks successfully protected the bots' follow lists.

### 5. MIDI/Opus Player Development (January 2026)
*   **The Problem:** The ambient music player allowed multiple MIDI tracks to play concurrently when navigating between nodes, overlapping audio streams and crashing browser tabs. It also lacked visual feedback for the notes being played.
*   **Technical Details & Action:** Refactored `app/js-src/music.ts` to track state with a `currentPlayId` token. Starting a new track increments the token and stops any active players with outdated tokens. Callbacks were added to `midi-player-js` (`Note on` events) to map note numbers to pitch names (e.g. `A4`, `G4`) and light up corresponding key blocks in real-time.
*   **The Resolution:** Visual overlays and play token validation resolved the overlapping audio bug, creating a seamless background music experience.

### 6. social.coop Alpha Deployment (January 2026)
*   **The Problem:** Ansible playbooks for deploying the `alpha.social.coop` testing environment failed during volume mapping because the destination host operating system lacked a local `mastodon` user.
*   **Technical Details & Action:** The playbooks were attempting to `chown` directories using the string username.
*   **The Resolution:** The playbooks were updated to map directory ownership directly to the numeric UID/GID (`991:991`) of the Mastodon container process, bypassing host OS user registration and allowing volumes to bind mount cleanly.

### 7. @nail's Pushes Bug & Subprocess Leakage (March 2026)
*   **The Problem:** Transcluded list items on the `[[bookmarked]]` index from user @nail rendered as blank headers. Concurrently, orphaned python subprocesses spawned by the execution module `/exec/` stayed alive past timeouts, exhausting server resources.
*   **Technical Details & Action:**
    *   *Pushes Bug:* The markdown parser could not handle list items (`<li>`) containing nested `<p>` paragraph elements, dropping the parent-child relationship. The parser was refactored to climb back up to parent `<li>` items.
    *   *Subprocess Leak:* Spawning executables left children running. Refactored the execution engine to call `os.setsid` in the `preexec_fn` parameter of `subprocess.Popen` to create a separate process session, and used `os.killpg` on timeout to clean up the entire process group.
*   **The Resolution:** Transclusion boundaries were corrected (restoring nested list pushes for @nail) and process group cleanup resolved CPU leaks.

### 8. SSH NAT Traversal (May 2026)
*   **The Problem:** Secure, Nix-compatible remote access was needed for a machine behind a restrictive NAT network where the router settings could not be edited.
*   **Technical Details & Action:** Evaluated ephemeral tunnel options (`tmate`, `pinggy.io`) and persistent shares (`zrok` built on OpenZiti). Checked security properties to confirm that since SSH is encrypted end-to-end (E2E), relay servers cannot view keystrokes or traffic.
*   **The Resolution:** Documented a tiered recommendation guide: `tmate` for quick sharing, `zrok` for stable persistent SSH gateways, and `Tailscale` for multi-node overlay networks.

---

## Part 2: Synthesis of Previous Session Artifacts

Historical artifacts found under `/home/flancian/.gemini/antigravity-cli/brain/` detail two previous developer sessions:

### Session `01bcdd26-964f-4f15-8152-a81da0c85349`

#### 1. AGY Synthesis (`AGY.md`)
This document defined the structural split between the read-mostly server and write-heavy bridge:
*   **Agora Server (`agora-server`):** Flask application handling on-demand hot indexing and user request pipelines. Priority is memory footprint safety and zero-downtime rolling restarts.
*   **Agora Bridge (`agora-bridge`):** Background worker processing cold indexing, repository pulling, federation tasks, and social bots.
*   **Key Future Roadmaps:**
    1.  *SQLite as Primary Source:* Migrate server queries away from filesystem walks.
    2.  *FTS5 Migration:* Implement SQLite full-text search with trigram fuzzy matching.
    3.  *Semantic Search (The Compass):* Integrate `sqlite-vec` to store embeddings generated by the Bridge.
    4.  *Fork to Garden:* Introduce a subnode "Fork" button that clones a public node's contents into a user's local garden.
    5.  *Bullpen Editor:* Securely deploy `bullpen.py` and `edit.anagora.org` routing.

#### 2. Editor URL Override Settings (`walkthrough.md`)
Surfaced settings to allow users to override the default editor URL:
*   **Config & Defaults:** Added `editorUrl: 'https://edit.anagora.org'` to default clients.
*   **UI Form:** Injected an "Editor URL" text field into the settings overlay under *Identity*.
*   **Link Rewriting:** Implemented `rewriteEditLinks()` in `main.ts` to scan page content dynamically and rewrite hardcoded links to route to the custom editor URL.

#### 3. Minigames Upgrade Plan (`implementation_plan.md`)
Proposed additions to the empty-state minigames to keep the "no 404s" philosophy interactive and engaging:
*   *Conway's Game of Life:* Introduce pause-on-draw state to prevent gliders from instantly dying out while the user is still drawing.
*   *Hexgame:* Re-architect the game around centered hexagonal number math (1, 7, 19, 37, 61, 91, 127), drawing shaded sphere magnets instead of wireframe lines.

---

### Session `e5367107-5880-4c79-93d6-3e201278e890`

#### 1. Minigames Implementation Plan & Tasks (`implementation_plan.md`, `task.md`)
*   Detailed the tasks for modifying `conway.ts`, updating `main.ts` templates, and completely rewriting `hexgame.ts` to axial grid structures. All tasks were successfully completed and compiled.

#### 2. Minigames Walkthrough (`walkthrough.md`)
*   **Conway's Game of Life:**
    *   *Pause-on-Draw:* Simulation pauses instantly when the user clicks/drags.
    *   *Play/Pause Button:* Added a button to control flow (`⏸ Pause` / `▶ Play`).
    *   *Click-and-Drag:* Enabled continuous drawing across the canvas.
*   **The Agora Hexgame:**
    *   *Grid Math:* Built on pointy-topped hexagonal grids using axial coordinates `(q, r)`.
    *   *Spiral Magnet Snapping:* Spheres snap to centered hexagonal spiral shapes.
    *   *The Remainder Challenge:* Spawns a random count (8-128) leaving extra balls on the outer ring.
    *   *Rotations:* Smoothly interpolates discrete 60-degree rotations using Arrow keys.
    *   *The Cutting Zone:* Highlighted a red cutting line at the top (`r = -k`). Placing remainder balls in this zone and hitting spacebar cuts them from the grid. Win condition is met when only a perfect hexagon remains.

---

## Part 3: Configuration, System Policies, and Settings

The `~/.gemini/` environment contains system configurations that customize the agent's behavior:

1.  **Read-Only Command Whitelist (`policies/read_only_commands.toml`)**
    *   Explicitly allows safe command executions (e.g., `ls`, `cat`, `find`, `pwd`, `grep`, `echo`, `head`, `tail`, `tree`, `wc`, `diff`, `env`, etc.) without prompting the user.
2.  **Agora Debug Command Whitelist (`policies/agora_debug_scripts.toml`)**
    *   Explicitly permits `uv run python scripts/debug` and `uv run python -m pytest` execution without interactive confirmations.
3.  **Core Philosophical Guidelines (`GEMINI.md` / `settings.json`)**
    *   *For the Benefit of All Beings:* Work is dedicated to connection, liberation, and the Free Knowledge Commons.
    *   *Polite Software:* The interface must be unobtrusive and respect radical sovereignty (user ownership of data).
    *   *Git Branch Resolution:* Rebase (`git pull --rebase`) is strictly prioritized. Hard resets are treated as a last resort accompanied by a clear warning.
    *   *Helper Scripts:* Always save analysis/debugging helper scripts inside the repository's `scripts/` or `bin/` directory.
    *   *Twitter bot (X):* Confirmed as non-operative due to API pricing/access limitations; no updates are to be written.

---

*Synthesis completed in the active session (`e3dcc393-da06-4ee0-acb4-4fff333fac87`).*
