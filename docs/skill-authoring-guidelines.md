# Skill Authoring Guidelines

These skills run on Claude Opus in Claude Code, inside T3 Code. Current Claude models follow instructions closely and literally, and they plan, verify, and use tools without being told, so text written to push a model harder tends to make it over-apply rules instead. Sources: [Claude Code skills](https://code.claude.com/docs/en/skills) and the prompt audit in the `claude-api` skill.

## Rules

- Keep frontmatter descriptions short and trigger-specific; they are always loaded and compete for context. `npm run validate:skills` rejects anything over 400 characters.
- Use progressive disclosure: keep the root skill small and point to references for branch-specific detail, saying when to read each one.
- Prefer principles and decision boundaries over step-by-step scripts. Keep numbered steps only where the order truly matters.
- Keep what only the author knows: the audience, environment facts, the quality bar, and the reason behind each constraint. Remove what restates default behavior.
- State requirements at normal volume and give the reason. Reserve emphasis for one instruction that has been shown to be underweighted. Routing text in a description may be firmer than body text, since skills tend to under-trigger.
- Do not ask for reasoning to be reproduced in the output. Ask for evidence and outcomes; reproducing reasoning can trigger a refusal on current models.
- Do not fix thinking depth or word counts in prose, or demand fixed report sections for judgment work. Name the sections that pin a format the reader relies on, and allow the rest to be omitted when empty.
- State the completion condition when a workflow must continue through implementation, inspection, and targeted validation.
- Treat safety and destructive-action boundaries explicitly, without blanket permission gates for routine local work.

## Claude Code mechanics

- A skill is `<name>/SKILL.md` under `~/.claude/skills` or a project's `.claude/skills`. Changes are picked up live.
- Users invoke it as `/skill-name`; the model invokes it with the Skill tool. It runs inline in the current conversation, so a handoff means carrying findings forward.
- Use the tool names the harness provides, such as Grep, Glob, Read, and AskUserQuestion. Reach bundled scripts through `${CLAUDE_SKILL_DIR}`.
- An installed skill is a copy of its folder, with no access to this repository's `node_modules`. A bundled script may use only the Node standard library and must be run from an installed copy once before it ships.
- Frontmatter such as `allowed-tools`, `context: fork`, `paths`, `effort`, and `disable-model-invocation` is available. Add a field only when a real run shows the need; `disable-model-invocation` also stops Sofia from calling that skill.

## Maintenance audit

When adding or revising a skill, check its description length and trigger precision, identify material that can move behind a contextual pointer, remove instructions that merely restate default model behavior, and verify that the completion condition matches the workflow. Repeat this audit when the model changes, since prompts are tuned to a model.
