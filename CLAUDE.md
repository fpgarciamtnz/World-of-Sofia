# World of Sofia

Source of the Sofia skill family for Claude Code. `skills/<slug>` is the only copy on this machine: `~/.claude/skills/<slug>` is a link to it (a directory junction), so an edit here is live at once. See `docs/adr/0007-linked-not-copied.md`.

1. Create a skill with `npm run new:skill -- "Skill Title" "Philosopher"`. It is linked, so it is live at once.
2. Edit only in this repository, never in another copy.
3. Run `npm run check`, then commit and push to `origin main`.
4. Every Claude Code session pulls and relinks at start: a SessionStart hook in `~/.claude/settings.json` runs `scripts/link-skills.mjs --pull`, which fast-forwards from GitHub, links new skills, and removes links to deleted ones. Pushing is the only manual step.

`npm run link:skills` (alias `install:skills`) links by hand. When the hook reports a skipped pull, or work waiting to be committed and pushed, tell the user instead of working around it.

When creating or changing a skill, follow `docs/skill-authoring-guidelines.md` and `CONTRIBUTING.md`. A skill must still work when copied out of its folder, because `npx skills add` installs it that way for everyone else: it cannot depend on files outside `skills/<slug>`, nor on packages from this repository's `node_modules`.

Keep the family small, with each skill doing its own job. Do not add a router skill, handoff tables, or bridge sections: Claude Code already picks a skill from its description. A skill names another only for a pairing it relies on, such as Boil the Ocean Magallanes with Audit Plan Descartes; see `docs/adr/0004-few-coordinated-skills.md`.
