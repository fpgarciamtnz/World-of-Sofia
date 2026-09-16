# GPT-6 Astra Skill Guidelines

This repository's skills follow OpenAI's [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).

## Rules

- Keep frontmatter descriptions short and trigger-specific; descriptions are always loaded and compete for context.
- Use progressive disclosure: keep the root skill a small router and point to references or scripts for branch-specific detail.
- Prefer principles and decision boundaries over exhaustive itineraries that over-constrain a capable model.
- Point to documentation conditionally; do not require broad repository reading before every task.
- State completion when a workflow must continue through implementation, inspection, and targeted validation.
- Treat safety and destructive-action boundaries explicitly, while avoiding blanket permission gates for routine local work.

## Maintenance audit

When adding or revising a skill, check its description length and trigger precision, identify material that can move behind a contextual pointer, remove instructions that merely restate default model behavior, and verify that the skill's completion condition matches its intended workflow.
