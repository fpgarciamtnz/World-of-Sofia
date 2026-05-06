# Contributing

## Non-negotiable rule

Skills must remain isolated. Do not spread a single skill across multiple folders and do not let one skill depend on private files in another skill directory.

## Creating a new skill

1. Run `npm run new:skill -- "Skill Title" "Philosopher Name"`.
2. Fill in `skill.meta.json`, `README.md`, `SKILL.md`, and any files under `references/`.
3. Run `npm run validate:skills` and `npm run check:isolation`.
4. Start the app with `npm run dev` and confirm the showroom renders the new skill.

## Manifest contract

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

## Distribution boundary

If a skill cannot be copied out of `skills/<slug>/` and still make sense as its own unit, the change is not acceptable.

