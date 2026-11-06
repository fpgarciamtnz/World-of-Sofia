# Contributing

## Non-Negotiable Rule

Skills must remain isolated. Do not spread a single skill across multiple folders, and do not let one skill depend on private files in another skill's directory or on this repository's `node_modules`. An installed skill is only a copy of its own folder.

## Creating A New Skill

1. Run `npm run new:skill -- "Skill Title" "Philosopher Name"`.
2. Fill in `skill.meta.json`, `README.md`, `SKILL.md`, and any files under `references/`, following [the authoring guidelines](docs/skill-authoring-guidelines.md).
3. Start the README with `Philosopher idea:` and `Practical use:` before any longer sections.
4. Run `npm run check`.
5. Run `npm run install:skill -- <skill-slug>`, and confirm the skill appears under `~/.claude/skills`.
6. Try it on a realistic prompt.

## README Contract

Every skill README must explain the philosopher-derived habit before the practical summary.

- `Philosopher idea:` must be one concise sentence that names the borrowed idea or method. Do not use biography, decorative name-dropping, or vague "inspired by" phrasing unless the actual idea is stated.
- `Practical use:` must say when to use the skill, what evidence or artifacts it inspects, and what output it produces.
- Keep README copy scannable. Use short sections, plain verbs, and bullets only when they improve navigation.
- The root repository README is the GitHub landing page and should stay practical-first for engineers. It may use tables, diagrams, and workflow-oriented copy instead of the per-skill two-part shape.
- The root skill catalog must still describe each listed skill in comparable practical terms so readers can quickly decide what to install or invoke.

## Installing Skills

`npm run install:skills` copies all valid skills from `skills/*` into `~/.claude/skills`, or `$CLAUDE_CONFIG_DIR/skills` when set. `npm run install:skill -- <skill-slug>` copies one. Existing copies are backed up to `~/.claude/.backups/world-of-sofia/<slug>-<timestamp>` first. Pass `--dry-run` after `--` to preview.

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

## What Validation Enforces

`npm run validate:skills` rejects a skill when:

- its manifest is invalid, or a registered or linked file is missing or out of bounds;
- a file under `references/` is not registered in the manifest;
- the `SKILL.md` name does not match its folder, the description is missing, not on one line, or over 400 characters, or the file is over 500 lines;
- the README does not open with `Philosopher idea:` after an optional title, or does not state `Practical use:`;
- a bundled document uses vocabulary from the previous runtime, or mentions a sibling skill that does not exist.

## Distribution Boundary

If a skill cannot be copied out of `skills/<slug>/` and still make sense as its own unit, the change is not acceptable.
