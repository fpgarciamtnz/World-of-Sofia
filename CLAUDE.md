# World of Sofia

Source of the Sofia skill family for Claude Code. `skills/<slug>` is the source of truth; `~/.claude/skills/<slug>` is an installed copy, so edit here and reinstall rather than editing the copy.

- Check: `npm run check`
- Install: `npm run install:skills`, or `npm run install:skill -- <slug>`

When creating or changing a skill, use `sofia-coordinatior`, and follow `docs/skill-authoring-guidelines.md` and `CONTRIBUTING.md`. A skill must work when copied out of its folder, because that is how it is installed: it cannot depend on files outside `skills/<slug>`, nor on packages from this repository's `node_modules`.

`.agents/skills` and `skills-lock.json` are vendored from `mattpocock/skills`. Claude Code does not load them, and they are updated upstream rather than edited here.
