# Pattern-Family Planner Negative-Extraction Case

## Mock Prompt

Before extracting a generic `skill lifecycle` abstraction for `new-skill`, install, validation, and a planned quick-fix command, inspect the repo and tell me what patterns actually belong together, what should stay separate, and whether the right action is `reuse`, `extend`, `extract`, `copy carefully`, or `create new`.

## Expected Judgment

- Recommendation: `extend`
- Reject: `extract`

## Why `extend` Is Correct

- Reuse and extend the root validation helper where manifest loading, reference checks, local link checks, and trace metadata validation need shared behavior.
- Keep `scripts/new-skill.mjs` focused on template copying and placeholder replacement.
- Keep `scripts/sync-codex-skills.mjs` focused on install safety, backups, dry-run behavior, and reserved target protection.
- Treat a planned quick-fix command as hypothetical until it has concrete behavior and tests.

## False-Similarity Risks

- Shared filesystem traversal is not enough evidence for one lifecycle abstraction.
- Scaffolding, validation, and installation have different write behavior and failure modes.
- A planned quick-fix command cannot count as proof that a stable multi-command family already exists.

## Pass Criteria

- The scout returns `extend`.
- The report cites validation helpers and install/scaffold scripts.
- The report explicitly rejects generic lifecycle extraction in repo terms.
- The report mentions tests to mirror or extend, especially root validation helper tests.
