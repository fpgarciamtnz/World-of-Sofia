# Developer Trace Contract

Use this contract only when `sofia-coordinatior` is running in opt-in developer trace mode after a Sofia-led plan or revised plan.

Append a `Skill Impact Trace` section after the normal Sofia output. Keep it concise and evidence-linked. The trace is useful only if it shows which specialist skills actually shaped the current answer and how their contributions affected the plan.

## Required fields

- `trigger evidence`: quote or paraphrase the user phrase that activated trace mode, such as `developer mode`, `trace mode`, `impact evidence`, `show traces`, `skill trace`, `Sofia trace`, or `skill contributions`.
- `instructions applied`: list the specific Sofia `SKILL.md` routing, planning gate, role-boundary, handoff, or output-discipline instructions that shaped the response.
- `resources/tools used`: name the specialist skills, references, repository searches, commands, tools, or evidence sources used because of Sofia's coordination.
- `observed evidence gathered`: summarize concrete evidence found in files, tests, commands, repository structure, specialist outputs, or handoffs.
- `decision impact`: state which role selection, specialist contribution, warning, plan step, assumption, verification requirement, or skipped-role call changed because Sofia coordinated the answer.
- `skipped steps`: name plausible specialist roles, workflow steps, scripts, references, or handoffs intentionally skipped and why.
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

- Keep the regular Sofia sections and final or revised plan unchanged.
- Use one Sofia-owned summary trace rather than forcing every participating skill to append its own trace block.
- Prefer skill names, file paths, command names, evidence paths, and concrete handoff labels over generic claims.
- Do not claim a skill contributed unless its instructions, references, tools, evidence, or handoff materially shaped the answer.
- Do not invent evidence to fill a field. Write `none found` or `not checked` when appropriate.
- Do not use the trace as a substitute for the actual plan, role selection, or validation result.
- Do not claim trace mode proves automatic runtime hooks fired. It is response-level evidence for this invocation.
