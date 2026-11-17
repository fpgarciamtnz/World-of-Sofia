# World of Sofia

Source of the Sofia skill family for Claude Code. `skills/<slug>` is the source of truth; `~/.claude/skills/<slug>` is an installed copy, so edit here and reinstall rather than editing the copy.

- Check: `npm run check`
- Install: `npm run install:skills`, or `npm run install:skill -- <slug>`. The installer only adds and updates, so after removing a skill, also move its installed folder to `~/.claude/.backups/world-of-sofia/`.

When creating or changing a skill, follow `docs/skill-authoring-guidelines.md` and `CONTRIBUTING.md`. A skill must work when copied out of its folder, because that is how it is installed: it cannot depend on files outside `skills/<slug>`, nor on packages from this repository's `node_modules`.

Keep the family small, with each skill doing its own job. Do not add a router skill, handoff tables, or bridge sections: Claude Code already picks a skill from its description. A skill names another only for a pairing it relies on, such as Boil the Ocean Magallanes with Audit Plan Descartes; see `docs/adr/0004-few-coordinated-skills.md`.

`.agents/skills` and `skills-lock.json` are vendored from `mattpocock/skills`. Claude Code does not load them, and they are updated upstream rather than edited here.
