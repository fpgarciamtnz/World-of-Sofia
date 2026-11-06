# Sofia Coordinatior

Philosopher idea: Sofia's practical wisdom becomes a coordination habit: choose the right specialist for each phase instead of blending responsibilities.

Practical use: Use when work spans more than one concern or it is unclear which specialist should act. Sofia inspects the request and repository evidence, selects the smallest useful specialist sequence, and produces the requested plan, review, or validation outcome along with any posture handoffs.

## What it does

- Routes skill changes, planning, implementation guidance, post-diff review, UI validation, and communication review.
- Keeps each specialist's responsibility separate.
- Passes `exploratory` or `bold-by-default` posture when users want to explore limits or work toward a final-shape design.
- Runs Aquinas before planning when meaning could change the plan, then gives plan trust to Descartes, asking about an audit only when an unresolved assumption could change the plan.
- Can append an opt-in `Skill Impact Trace` when asked for `trace mode`, `Sofia trace`, or `skill contributions`. It is response-level evidence, not proof that a runtime hook fired.

## Distribution boundary

This folder must stay self-contained. The registry lives in `references/skill-registry.md` so the skill can be installed into `~/.claude/skills/sofia-coordinatior`.
