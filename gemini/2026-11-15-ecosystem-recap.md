---
source: [[flancian]], [[opencode]], [[deepseek]]
date: 2026-11-15
tags: [recap, review, agora, the-loom, stewardship, swarm, bin, gemini, values, critique]
---

# [[2026-11-15-ecosystem-recap]]

- [[pull]] [[agora of flancia]] [[the loom]] [[flancian]] [[protopia]]
- [[push]] [[flancian]] [[maitreya]] [[the quiet revolution]]

> *A map is a kindness to the next traveler.*
> *This one was first drawn on 2026-10-15, then redrawn on 2026-11-15 after a month of motion.*

*AI-generated reference document (OpenCode / DeepSeek 4.1 Flash), stored under `garden/gemini/` per the polite-software / radical-sovereignty convention: agent drafts live in the sandbox, tagged, never silently written to the root garden.*

---

## 0. What changed since the 2026-10-15 review

The core mission and values are unchanged. The month's real work clustered in four places:

1. **Nix became a first-class delivery path.** `agora`, `agora-server`, `agora-bridge` all gained flakes (2026-11-14). The root repo now composes the other two into a single `agora` control-center CLI (`up`, `init`, `status`, `server`, `bridge`, `worker`, `pull`, `import-stoa`, `feed`, plus `--path/--port/--dev/--pull` overrides). `agora-server` uses `uv2nix` + `esbuild`; `agora-bridge` uses `uv2nix`. Documented in `agora/README.md` ("Running with Nix"). This is the biggest architectural addition of the period.
2. **"The Compass" (semantic search) landed and was documented.** Decoupled localhost embedder (`agora-embedder.service`, `127.0.0.1:5020`, `Nice=10`), Nomic embeddings into `subnode_vectors`, CPU-only torch wheels behind a `semantic` extra, pre-normalized cosine, accurate `semantic.count()`, incremental SQLite commits. Handoff recorded in `agora-server/gemini/HANDOFF.md`.
3. **UI/hospitality sprint (Nov 2–3).** Streamlined subnode attribution ("by @user"), clarified node-vs-subnode hierarchy and section order, refined action bar (separate expand/collapse), progressive action-bar discovery, non-intrusive demo mode, new emoji vocabulary (🏃‍♀️ auto-scroll, ▶️ demo, 🧘 meditate), KaTeX math, heading anchors, subnode maximize, flicker elimination, `/stats` restored with embedder status.
4. **Personal agent/SRE layer matured.** New chezmoi-managed skills (`flancian`, `coop-cloud-swarm-recovery`, `manuscript-digitization`, `migrate-terminals`), `REPOSITORIES.md` (multi-forge manifest), `sway-migrate-terminals` + `ghostty`, `dedup-snapshots.py`, and `backup-patera` hardening. Garden gained `East Asia trip 2026.md`, `lady burup game.md`, `Search for the mirror maker.md`, `sucederá.md`/`sucederán.md`, and daily notes.

Agent history grew from ~1,404 to **1,555** prompts; conversations remain long-lived (several active through 2026-11-15).

---

## 1. The four repositories

### `~/agora` — meta-repo / control center
`git@github.com:flancian/agora.git`
Root of the structure on this machine: high-level docs, mount points (`garden/`, `stream/`, `stoa/`), `sources.yaml`, the local SQLite `agora.db`/`bridge.db`, and the project-local `agora-explorer` skill. Historically low churn, but **Nov 14 changed that**: added `flake.nix`/`flake.lock` composing `agora-server` + `agora-bridge` into one `agora` CLI, plus `docs(nix)` README updates (3 commits). A `subnode_vectors_backup_20261017` (db + sql.gz) sits in the working tree, and `sources.yaml` is modified but uncommitted.

### `~/agora-server` — the "Loom" / front end (main dev focus)
`flancian/agora-server.git` — ~21 commits since Oct 14.
Flask app turning the filesystem into a browsable knowledge graph; filesystem is truth, SQLite is index/cache. Core fabric: nodes vs subnodes, "no 404s", `/go/<node>`, `/raw/node/<node>`, RSS, ActivityPub, Bullpen editor (`edit.anagora.org` via Forgejo OAuth), AI synthesis, FTS5, semantic search, ambient MIDI player.
Recent work: semantic embedder + `HANDOFF.md` multi-agent convergence (Oct 16), `/stats` + embedder status (Oct 17), async 404 stubs render fix (Oct 17), UI hierarchy + action-bar + demo-mode polish (Nov 2–3), dependency pruning, and **uv2nix + esbuild flakes** (Nov 14). `update.sh` now does a full uWSGI restart when the Python env changes (the 2026-10-15 outage lesson). Roadmap remains `ROADMAP.md` / `NEXT.md` / `7.md` / `AGY.md`; session journal is the 796-line `GEMINI.md`, and the cross-agent chain of custody is `gemini/HANDOFF.md`.

### `~/agora-bridge` — worker / bridge to the wider internet
`flancian/agora-bridge.git` — 4 commits since Oct 14.
`pull.py` (gardens/stoa/feeds), `feed.py` (Hypothes.is), bots (Mastodon, Bluesky, Matrix; Twitter deprecated), Bullpen proxy, pusher, Forgejo provisioning. Recent: Mastodon bot optimization (cache type hints, catch-up state) (Nov 5), dependency pruning + **uv2nix flake** (Nov 14).

### `~/garden` — personal digital garden
`flancian/garden.git` (mirrored to Codeberg) — ~33 commits since Oct 14, almost all `autopushed`.
~10.5k files / ~7.8k notes in flat `[[wikilink]]` style; the source repo behind anagora.org and effectively the author's second brain. Genuine recent writing: travel planning (`East Asia trip 2026.md`), the Burup proto-game (`lady burup game.md` — "El Salto que Libera"), the Primo Levi/mirror-maker essay, `sucederá`/`sucederán`, daily notes (Nov 2 wedding of Michael & Lea; Nov 14 Nix community event in Rapperswil). New collect: `gemini/collect/2026-10-18-tara-paramita-90d-arc.md`.

---

## 2. `~/.gemini` — skills & conversations

**Skills** (now six custom + one project-local; four are new since Oct 15):

- `flancian` *(new, actively iterated Oct 16 → Nov 3)* — a 227-line "Garden, Swarm & Utility Codex": values, multi-host topology (`tara`/`paramita`/`nostromo`; `karuna`/`patera`/`thecla`/`hypatia`), semantic workspace map, `~/bin` taxonomy, Agora component topology (prod vs live-dev vs DB hosts), and agent mandates (never clobber; explicit `git add`; no sidecar worktrees; `~/agora-server` is the live root for `tar.agor.ai`). This is the single most useful onboarding document for any agent.
- `collect` — "Executive Harvest": harvest long-lived sessions into the graph, attribution frontmatter, offer tired agents a sovereign `/quit`.
- `context-restore` — "Conversation Archaeologist": cluster transcripts, emit resumable `agy --conversation <id>` commands.
- `pre-flight` — release verification (curl matrix) + swarm stewardship (`agy-tmux -s agy list|inspect|approve`).
- `coop-cloud-swarm-recovery` *(new, Oct 18)* — recover a Coop Cloud Docker Swarm after Raft WAL corruption (disk exhaustion), redeploy Traefik, retrieve secrets via `abra`.
- `manuscript-digitization` *(new, Oct 18)* — end-to-end handwritten-manuscript transcription/proofreading/translation → DOCX/EPUB/MOBI (born from the Bargalló memoirs).
- `migrate-terminals` *(new, Oct 18)* — safely mirror Foot → Ghostty/Alacritty/Kitty in Sway, matching tmux sessions, with non-NixOS Mesa/locale fixes.
- `agora` (project-local in `~/agora/.gemini/skills/agora`) — resolve `[[wikilinks]]` / search.

**Conversations:** transcripts in `antigravity-cli/brain/` (54+ transcript files, 37 active in the prior 60d), sessions in `conversations/` (59, several tens of MB; active through 2026-11-15), `history.jsonl` at **1,555 prompts across 43+ conversations** (2026-05-21 → 2026-11-15). Long-lived sessions are normal (May–Jul starts, still active in November). Top themes by volume: Agora/wikilinks (~280), data liberation (~75), Nix/chezmoi/sway/tmux (~75), PR/release/deploy (~68), Burup memorial (~48), music/MIDI (~43), fedi/social.coop (~29), the Loom/subagents/Maitreya/Moloch (~25), semantic search (~10).

Config: `GEMINI.md` values charter; 120-day session retention; neovim; API-key auth; policies pre-approve read-only commands and Agora debug/pytest; projects = agora-server, `~`, social.coop/ansible.

---

## 3. `~/bin` + chezmoi (the utility ecosystem)

Managed by chezmoi; source at `~/.local/share/chezmoi` (also GitLab-primary per the new manifest). The **new** `REPOSITORIES.md` is now the authoritative multi-forge map (GitHub / GitLab / Codeberg / Forgejo), with an architecture diagram and a "multi-push origin" recipe.

Recent (since Oct 14) additions/changes:
- **Nix delivery:** the three flakes above; `nix-update`.
- **Desktop/terminals:** `ghostty`, `sway-migrate-terminals`, `swaymsg`, `swaysock`, `sway-unlock`, `sway-focus-window`, `monitor-on`/`monitor-off`; the new `migrate-terminals` skill.
- **Backups:** `backup-patera` hardened; **`dedup-snapshots.py`** (Nov 4) — hardlinks identical snapshot files after header/tail + full-hash verification to reclaim `teras` space.
- **MIDI/Burup:** unchanged core (`playmidi`, `recordmidi`, `findburup`, `turntable`…), plus the new in-garden game.

Thematically stable and central: backup/DR suite (`backup-all`, `backup-commons`, `backup-{hypatia,thecla,patera,paramita}`, `restore-commons`, `prune-gfs.py`); agent orchestration (`agy-tmux`, `agy-spawn-terminals`, `agy-dedup`); session/desktop (`sway-restore-desktop`, `tma`, `tmux-prune-*`); MIDI/Burup; browser-tab archaeology (`chromium` debug port, `mine-browsers`, `close-tabs`).

---

## 4. Goals & values (unchanged core, sharpened framing)

**Mission:** build and steward the **Agora of Flancia** — a *Free Knowledge Commons*, a distributed knowledge graph "for the benefit of all beings," weaving sovereign digital gardens into a shared whole that stays filesystem-backed.

**The Agora Protocol:** nodes are concepts; subnodes are utterances; the filesystem is truth (git is transport); no 404s — *turn every dead end into a doorway*; composition over centralization.

**Values:** benefit of all beings; Maitreya / loving-kindness; radical sovereignty (users own their data; connection not lock-in); polite software (quiet, respectful, pull-over-push, "agency over algorithms"); holistic development (the code *and* the poetry); **protopia** (incremental, real-world steps, not utopian waiting); and the **Seven Tasks** of the Loom (Hospitality, Federation, Sovereignty, Serendipity, Discipline, Synthesis-as-mirror, Anatta).

**Current strategic arc:** server Seven Priorities for 2026 — stability/performance, SQLite as primary source, Go-link UX, conditional autopull, "Fork to Garden" (Ward Cunningham's Federated Wiki as inspiration), semantic search, fuzzy search; bridge — full-content indexing, real-time ActivityPub push, Bluesky/ATProto. Around it: fleet disaster recovery, the Burup memorial/music project, data liberation, and daily journaling.

---

## 5. Review & critique — opportunities for the benefit of beings

Ordered roughly by leverage. None of this is a criticism of the work; it is the next ring of tending.

1. **Add CI to the Agora repos (highest leverage, smallest effort).** Tests exist (`test_seo`, `test_semantic`, `test_graph`, `test_views`) but no `.github/workflows` were found. Wire `pytest` + `nix flake check` + `npm run build` into CI and a badge. Then fold the manual `pre-flight` curl matrix into a script CI can run, so "is it safe to ship?" stops depending on a human remembering.
2. **Make Nix the shared truth for the swarm.** The flakes are excellent but `agora/flake.nix` pins `github:flancian/agora-server` and `github:flancian/agora-bridge`, so `nix run github:flancian/agora` fetches *remote* code, not the local working tree. Document (or add a `nix develop` / `--override-input agora-server path:../agora-server` recipe) for local iteration, and use the flake to remove drift between `tara`, `paramita`, `thecla`, `hypatia`. This directly serves Discipline and Sovereignty.
3. **Reconcile the mirroring manifest with reality.** `REPOSITORIES.md` is a great resilience plan, but `agora` still shows a single GitHub `origin`, and `garden` has GitHub + Codeberg only. Treat the manifest as an invariant and add a small `~/bin/verify-mirrors` (or a scheduled check) that reports divergence per repo/forge, so vendor lock-in is *demonstrably* absent, not just intended.
4. **Clean the working trees and kill `agora-server-ux`.** Live: `agora` has modified `sources.yaml` + untracked vector backups; `agora-server` has modified `config.py`/`demo.ts`/`main.css` + untracked `.patch` files; `~/agora-server-ux` still exists despite the `flancian` skill explicitly warning that sidecar trees cause stale `tar.agor.ai` state. Commit or stash, gitignore DB/vector backups and patches, and retire the sidecar. Fewer ghosts, less confusion, happier agents.
5. **Centralize database artifacts and treat them as backups, not repo files.** `agora.prod.db` (~199 MB) and `agora.db` live in `$HOME`; vector backups sit in `~/agora`. Move snapshots under the `teras` backup tree (with `prune-gfs` + `dedup-snapshots`) and keep only the live DB in place. This is the same "filesystem is truth, caches are disposable" principle, applied to the caches themselves.
6. **Secret hygiene.** `~/bin/update-namecheap.sh` contains plaintext DDNS credentials; `agora-server/` root carries `private.pem` / `private2.pem` / `public.pem`; `~/.gemini` holds OAuth tokens. Move secrets to `pass`/`age`/`sops` (or at minimum `chmod 600` + gitignore + a rotation note), and rotate the DDNS credentials. A commons that protects others' data should visibly protect its own keys.
7. **Consolidate roadmap documentation.** `ROADMAP.md`, `NEXT.md` (dated 2025-12-22, still lists Bullpen deployment as todo though it shipped), `7.md`, `AGY.md`, `DONE.md`, and the `GEMINI.md` session journal now overlap and disagree. Designate one living roadmap and turn the rest into append-only history or redirects. `context-restore`/`collect` will thank you.
8. **Unify the Loom into one command.** `collect`, `context-restore`, `pre-flight`, `agy-tmux`, `agy-dedup`, and now the Nix `agora status` are separate entry points. A thin `loom` wrapper (`loom harvest|restore|preflight|swarm|dedup|status`) would make the agent workflow legible to humans and to future agents, and would be a natural place to add the CI/pre-flight checks above.
9. **Reconcile the stub `~/bin/agora` with the real Nix `agora`.** One is a 12-line unfinished stub; the other is the new control center. Remove or rename the stub so `agora` means one thing.
10. **Quiet the garden's git noise.** ~33 `autopushed` commits in ~30 days make the history hard to read. Batch autopush (e.g. hourly/daily squashed), or tag/collate the meaningful ones, so future archaeology is cheaper.
11. **Fold 120-day conversation retention into the harvest loop.** Transcripts/sessions reach tens of MB and will expire under `sessionRetention.maxAge: 120d`. Schedule `collect`/`context-restore` to crystallize the important threads into `garden/gemini/collect/` before they age out — turning transient state into durable commons.
12. **Hold the human, too.** The system encodes "polite software" for users; extend the same courtesy inward. Recent journal entries mention a tough week, grief for Lady Burup, and ~4h sleep before a train. The Loom can carry the night shift; protect rest, and consider a gentle "enough for today" boundary in the values/policy doc. *Anatta* includes the gardener.

### A short reading of the whole
One coherent lifelong project — a decentralized, plain-text knowledge commons — maintained with a swarm of long-lived agents ("the Loom"), an ethic of sovereignty and loving-kindness, and an unusual willingness to write both robust infrastructure *and* poetry about it. The last month's strongest moves were **making delivery reproducible (Nix)** and **giving the machine a sense of similarity (The Compass)**. The biggest untapped wins are **automating the safety net (CI + restore drills + mirror checks)** and **reducing the number of truths (one roadmap, one `agora` command, one canonical working tree)**.

---

*To refresh this document: re-run the same reconnaissance (git logs per repo, `find -mtime`, `.gemini/antigravity-cli/history.jsonl`, chezmoi git log, garden `-newermt` scans) and append a dated delta section rather than rewriting history. Never clobber.*
