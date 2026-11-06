# Developer Trace Contract

Use this contract only when `sofia-coordinatior` is running in opt-in developer trace mode after a Sofia-led plan or revised plan.

Append a `Skill Impact Trace` section after the normal output. It is useful only if it shows which specialist skills actually shaped the current answer, so report sources and outcomes, and leave internal reasoning out of it.

## Required fields

- `trigger evidence`: the user phrase that activated trace mode.
- `instructions applied`: the Sofia routing, planning, role-boundary, or handoff instructions that shaped the response.
- `resources/tools used`: the specialist skills, references, searches, commands, or tools used because of Sofia's coordination.
- `observed evidence gathered`: concrete evidence found in files, tests, commands, repository structure, specialist outputs, or handoffs.
- `decision impact`: which role selection, warning, plan step, assumption, verification requirement, or skipped-role call changed because Sofia coordinated the answer.
- `skipped steps`: plausible specialist roles, workflow steps, references, or handoffs intentionally skipped, and why.
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

- Keep the regular output and plan unchanged, and use one Sofia-owned trace rather than one per participating skill.
- Prefer skill names, file paths, command names, and concrete handoff labels over generic claims.
- Write `none found` or `not checked` when a field has no evidence.
