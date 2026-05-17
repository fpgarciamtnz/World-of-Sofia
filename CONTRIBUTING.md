# Contributing

## Non-Negotiable Rule

Skills must remain isolated. Do not spread a single skill across multiple folders and do not let one skill depend on private files in another skill directory.

## Creating A New Skill

1. Run `npm run new:skill -- "Skill Title" "Philosopher Name"`.
2. Fill in `skill.meta.json`, `README.md`, `SKILL.md`, and any files under `references/`.
3. Run `npm run validate:skills` and `npm run check:isolation`.
4. Run `npm run validate:skill-traces` if the skill uses `developerTrace` metadata.
5. Run `npm run test`.
6. Run `npm run install:skill -- <skill-slug>` to install the skill into Codex.
7. Confirm the skill folder exists under `$CODEX_HOME/skills` when `CODEX_HOME` is set, otherwise under `~/.codex/skills`.

## Installing Project Skills Into Codex

Use `npm run install:skills` to copy all validation-valid project skills from `skills/*` into the Codex skills directory. Use `npm run install:skill -- <skill-slug>` to copy one skill.

The install command writes into `$CODEX_HOME/skills` when `CODEX_HOME` is set, otherwise into `~/.codex/skills`. Existing target skills are backed up under `.backups/world-of-sofia/<slug>-<timestamp>` before overwrite. Open a new Codex session if an installed skill does not become available immediately.

The legacy `sync:skills` and `sync:skill` aliases remain available for existing contributors.

## Manifest Contract

Every `skill.meta.json` must define:

- `id`
- `slug`
- `title`
- `philosopher`
- `summary`
- `tags`
- `status`
- `sourceRepo`
- `installCommand`
- `references`
- `version`

Optional `developerTrace` metadata is allowed when the skill has an opt-in response trace contract and passes `npm run validate:skill-traces`.

## Distribution Boundary

If a skill cannot be copied out of `skills/<slug>/` and still make sense as its own unit, the change is not acceptable.
