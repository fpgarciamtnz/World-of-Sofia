# ADR 0009: Sofia coordinates the family

## Status

Accepted, 2026-11-26. Reverses the decision in ADR 0004 to have no coordinator. The rest of ADR 0004 holds.

## Context

ADR 0004 removed `sofia-coordinatior` on 2026-11-17, so nothing answered when the user called Sofia. On 2026-11-26 the user asked why they could not call Sofia, said Sofia must be a skill that coordinates the rest, and asked for it to be available on this machine.

ADR 0004's objection was to a layer that only routed: a hop before any judgment, a posture handed out on top of each skill, and bridge and handoff sections spread across the specialists. Claude Code still picks a single skill from its description, so a coordinator earns its place only on work that needs several skills, where the order, the handoffs, and conflicts between verdicts need judgment.

## Decision

- Add `sofia`, called as `/sofia` or by name. It picks the smallest set of specialists a task needs, orders them where one's output is another's input, states what each must hand the next, keeps every verdict attributed, and hands back the deliverable. When one specialist fits, it loads that one and adds nothing on top. Called without a task, it lists the family.
- Coordination lives only in Sofia. The specialists keep working alone, with no routing, handoff tables, or bridge sections, and name another skill only for a pairing they rely on, as ADR 0004 set.
- Sofia hands out no posture: each specialist keeps its own degree of freedom, so the boldness ADR 0004 moved into Magallanes stays there.
- Sofia cannot load `auditar-pec`, which starts only with `/auditar-pec`, so it tells the user to type it.
- The name is `sofia`. `sofia-coordinatior` and `sofia-coordinator` stay retired names in the validator.

## Consequences

- Ten skills remain.
- When a specialist is added, renamed, or removed, update the family table in `skills/sofia/SKILL.md` along with the root README.
- Sofia's description is always loaded, like every other one. It triggers on calls to Sofia and on work that spans several concerns, not on every task.
