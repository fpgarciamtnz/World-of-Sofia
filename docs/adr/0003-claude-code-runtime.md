# ADR 0003: Claude Code is the skill runtime

## Status

Accepted.

## Decision

Target Claude Opus in Claude Code, inside T3 Code, as the only runtime for the skills in `skills/`. Install into `~/.claude/skills`, and drop Codex-specific metadata, paths, and invocation syntax rather than keeping both.

Rewrite the skills for how current Claude models respond to instructions, following `docs/skill-authoring-guidelines.md`.

Remove the `pattern-code-wittgenstein` scout pipeline (`scripts/`, its test, its scoring and schema references, and its evaluation cases). The skill now searches with the harness's own tools and keeps its decision rules.

Move the three long research reports out of the skill folders into `docs/research/`. They explain the doctrine, but no workflow needs them at runtime.

## Rationale

- The scout could not run where the skills are used. Installed skills have no `node_modules`, so its `@ast-grep/napi` import failed, and on the current Windows machine an Application Control policy also blocks that native binary inside the repository.
- It was also specific to this repository: its bounded contexts, support paths, and family labels name World-of-Sofia files, so its scores meant little elsewhere. Reading call sites and tests directly gives stronger evidence than a heuristic score, and `git log` supplies the historical evidence the scout never implemented.
- The planned per-repository learning files (`.agents/aquinas/case-inbox.md`, a memory file under the old runtime's home) did not exist on this machine, so `grill-me-aquinas` now keeps one lazy ledger and uses Claude Code's own memory for user-level learning.

## Consequences

- `npm run check` no longer needs a native dependency and passes on this machine again.
- The scout remains available in git history (`fd6cc04`) if a structural analyzer is ever worth reviving; a revival must work from an installed copy.
- `check-with-maxi` is removed, because the Maxi context belonged to a retired project.
- `~/.codex/skills` keeps its existing copies, which no longer receive updates from this repository.
- The validator now rejects the failures this migration found by hand: dead sibling-skill names, Codex vocabulary, and oversized descriptions.
