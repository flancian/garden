# Pre-Flight

- An [[Antigravity]] [[skill]] and release protocol for the [[Agora]].
- Located at `~/.gemini/config/skills/pre-flight/SKILL.md`.

## Concept
- **Dual-Track Release Stewardship**:
  1. Automated pre-flight release verification (executing curl matrices against local/staging instances for status codes, sitemap validity, canonical links, empty-node 404 stubs, robots meta tags, and error fallbacks).
  2. Asynchronous swarm piloting via [[agy-tmux]] (inspecting, confirming safe commands, and unblocking sibling agent sessions across tmux windows).

## See Also
- [[skills]]
- [[collect]]
- [[context-restore]]
- [[release process]]
- [[agora server]]
