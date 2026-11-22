# ADR 0004: A few coordinated skills, no router

## Status

Accepted, 2026-11-17. Ends the routing role `sofia-coordinatior` held from 2026-05-31. ADR 0002 still holds.

## Context

The family grew from one Descartes skill on 2026-05-06 to nine skills and a coordinator. The coordinator chose which specialists a task needed and handed out a posture, and the specialists grew bridge, handoff, and routing sections that sent work to each other. Claude Code already loads a skill whose description matches the request, so this layer repeated what the harness does, added a hop before any judgment, and spread each skill's method across several skills.

## Decision

- Remove `sofia-coordinatior`. Claude Code's description matching does the routing.
- Merge `pattern-code-wittgenstein` into `synthesis-code-hegel`, which now covers code before a change (precedent) and after it (the real diff).
- Merge `ui-attention-ciceron` into `communication-review-ciceron`, which now reviews messages and rendered screens. The UI method lives in its `references/rendered-ui.md`.
- Keep `audit-plan-descartes`, `grill-me-aquinas`, `earned-presence-kondo`, and `auditar-pec`, with their routing removed.
- Add `boil-the-ocean-magallanes`, which keeps every sentence of `boil-the-ocean` from onmax/skills (MIT) and adds a destination the user describes: it keeps the destination and the limits fixed and changes only the route, going as far around as it takes. It writes the limits down before starting, sorts what blocks the way into limits, obstacles, and habits, and before a long detour asks the Panama Canal question: will this route be sailed again, and should a channel be built through the obstacle instead? It asks the user when the canal would be theirs to own. Pair it with Descartes, which audits its limits, the obstacles it goes around, and its hand-back. Its `bold-by-default` degree of freedom applies to the route and never to the limits, and carries the boldness posture the coordinator used to hand out.
- A skill names another only for a pairing it relies on: Magallanes with Descartes, Aquinas giving Descartes essence context (ADR 0002), and Auditar PEC applying Descartes' ledger to academic work.

## Rationale

- Routing the harness already does costs context and indirection without adding judgment.
- A skill that carries its own method can be installed and used alone, which the isolation rule already required of its files.
- The remaining pairs are ones where one skill audits or feeds the other's output, so removing them would lose judgment, not just a hop.
- The user asked for a skill that goes around the world if necessary to reach the destination they describe, while keeping the premise that there should be limits. So the boldness is in the route, and the limits are premises: kept, written down with their sources, and set even when the user states none.
- Descartes' ledger fits the voyage directly: a limit is a `Foundation-Constraint` with its source, a "can't" without one is an unresolved assumption to check before it changes the destination, and the oracle's results are `Foundation-Fact`s.
- Upstream rewrote `boil-the-ocean` on 2026-11-16 around subagent workers and a dependency on its `check-your-work` skill. Magallanes keeps the earlier text, which works on its own.
- What Magallanes adds is small: the destination, limits as premises, obstacles, the Panama Canal question, the Descartes audit, and a named stop when a limit closes every route. The rest is the original, so the skill can replace it.

## Consequences

- Seven skills remain: Boil the Ocean Magallanes, Audit Plan Descartes, Grill Me Aquinas, Synthesis Code Hegel, Earned Presence Kondo, Communication Review Ciceron, and Auditar PEC.
- The rules for changing a skill, which lived in the coordinator, now live in `CLAUDE.md`, `CONTRIBUTING.md`, and `docs/skill-authoring-guidelines.md`.
- Developer trace mode remains only in Hegel.
- The installer only adds and updates, so the installed copies of removed skills must be deleted by hand on every machine, including installs made with `npx skills`.
- The validator treats `coordinatior` and `wittgenstein` as retired name endings, so a stale mention of a removed skill fails `npm run check`.
- Magallanes replaces `boil-the-ocean` in Claude Code, and the local copy of the original was removed, so boil-the-ocean now lives inside Sofia. Keep every sentence of the original in Magallanes: dropping one needs a reason recorded here, and the two sentences changed on purpose are the rules on when to ask the user.
- Magallanes no longer follows upstream. Changes from onmax/skills come in by hand, when they earn it.
