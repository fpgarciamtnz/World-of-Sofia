# Developer Trace Contract

Use this contract only when `pattern-code-wittgenstein` is running in opt-in developer trace mode.

Append a `Skill Impact Trace` section after the normal skill output. It is useful only if it shows how this skill affected the current answer, so report sources and outcomes, and leave internal reasoning out of it.

## Required fields

- `trigger evidence`: the user phrase that activated trace mode.
- `instructions applied`: the `SKILL.md` instructions that shaped the response.
- `resources/tools used`: the references, repository searches, or tools used because of this skill.
- `observed evidence gathered`: concrete evidence found in files, tests, commands, or repository structure.
- `decision impact`: which recommendation, warning, test suggestion, or implementation direction changed because the skill was used.
- `skipped steps`: workflow steps or references intentionally skipped, and why.
- `confidence gaps`: what evidence is still missing, and whether confidence is low, medium, or high.

## Output shape

```markdown
## Skill Impact Trace

- trigger evidence:
- instructions applied:
- resources/tools used:
- observed evidence gathered:
- decision impact:
- skipped steps:
- confidence gaps:
```

## Constraints

- Keep the regular sections unchanged.
- Prefer file paths, command names, test names, and quoted identifiers over generic claims.
- Write `none found` or `not checked` when a field has no evidence.
