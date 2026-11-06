# Skill Registry

The session's skill listing is the source of truth for what is available. This file covers what the listing does not: how the skills relate and in which order to run them.

## Overlap with Claude Code's skills

| Skill | Use it for | Sofia specialist it stays separate from |
|---|---|---|
| `skill-creator` | Structure, frontmatter, evals, and description tuning of any skill | Sofia adds this project's rules on top; do not edit the bundled skill |
| `code-review` | Correctness bugs in a diff | `synthesis-code-hegel` decides whether the change has the right shape |
| `simplify` | Applying routine reuse and efficiency cleanups to changed code | `earned-presence-kondo` decides whether something should exist at all |
| `security-review` | Security review of pending changes | None; add it when the diff touches auth, secrets, or untrusted input |

A skill absent from this file can still be used. Read its description and place it in the closest role.

## Boundaries

- `check-with-maxi` supplies evidence to the other roles and never overrides them.
- `grill-me-aquinas` owns meaning and essence evidence; `audit-plan-descartes` owns whether a plan can be trusted.
- `pattern-code-wittgenstein` runs before code exists; `synthesis-code-hegel` runs after.
- `earned-presence-kondo` is independent, and also serves as a bridge from `ui-attention-ciceron` and `synthesis-code-hegel` when the likely fix is to remove something.
- `ui-attention-ciceron` judges a rendered screen; `communication-review-ciceron` judges a message.

## Handoff Orders

Use the shortest sequence that covers the task.

- Check with Maxi: `check-with-maxi`, then a specialist only if the evidence affects planning, implementation, or review.
- Skill change: `sofia-coordinatior`, `skill-creator`, edit, `npm run check`, optional forward test. For a plan, add `audit-plan-descartes` before the edit.
- Bold skill change: the same, with the posture handoff and a degree-of-freedom requirement, plus a probe that challenges an over-safe assumption.
- Repository plan: `grill-me-aquinas`, `audit-plan-descartes`, `pattern-code-wittgenstein` when precedent matters, then the final plan.
- UI implementation: plan, implement, rendered evidence, `ui-attention-ciceron`, `earned-presence-kondo` if competing elements may need demotion or removal, then fixes.
- Communication: draft or rewrite, `communication-review-ciceron`, revised message.
- Subtractive review: `earned-presence-kondo`, then a specialist only if rendered UI evidence, real diff evidence, or pattern discovery is needed.
- Radical rebuild: `grill-me-aquinas` for what must survive, `earned-presence-kondo` for destroy/preserve/rebuild, then `pattern-code-wittgenstein` or implementation.
- Implemented change: `synthesis-code-hegel` on the real diff, `earned-presence-kondo` if removal is plausible, and `audit-plan-descartes` only if the recommendation depends on planning assumptions.
