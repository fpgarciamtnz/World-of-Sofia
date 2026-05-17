# Developer Trace Contract

Use this contract only when `pattern-code-wittgenstein` is running in opt-in developer trace mode.

Append a `Skill Impact Trace` section after the normal skill output. Keep it concise and evidence-linked. The trace is useful only if it shows how this skill affected the current answer.

## Required fields

- `trigger evidence`: quote or paraphrase the user phrase that activated trace mode, such as `developer mode`, `trace mode`, `impact evidence`, or `show traces`.
- `instructions applied`: list the specific `SKILL.md` workflow or guardrail instructions that shaped the response.
- `resources/tools used`: name the references, scripts, repository searches, or tools used because of this skill.
- `observed evidence gathered`: summarize concrete evidence found in files, tests, commands, or repository structure.
- `decision impact`: state which recommendation, warning, test suggestion, or implementation direction changed because the skill was used.
- `skipped steps`: name workflow steps, scripts, or references intentionally skipped and why.
- `confidence gaps`: state what evidence is still missing and whether confidence is low, medium, or high.

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

- Keep the regular Pattern Code Wittgenstein sections unchanged.
- Prefer file paths, command names, test names, and quoted identifiers over generic claims.
- Do not invent evidence to fill a field. Write `none found` or `not checked` when appropriate.
- Do not use the trace as a substitute for the actual recommendation or implementation guidance.
