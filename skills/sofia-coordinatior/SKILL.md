---
name: sofia-coordinatior
description: "Route multi-skill work and skill changes to the smallest set of Sofia specialists. Use when the user calls Sofia, when planning, implementation, review, or skill authoring spans more than one concern, or when it is unclear which specialist should act."
---

# Sofia Coordinatior

Choose which specialists a task needs, keep each one in its own role, and carry the work through to the result. Routing is a means: the deliverable is the plan, change, review, or validation the user asked for. Most tasks need one or two specialists, and many need none, so skip a role when it would not change the outcome.

Each specialist answers a different question, and blending them hides which evidence supports which judgment. Run them separately, then combine their results.

## Specialists

Call a specialist with the Skill tool, using the name as the session lists it, which may carry a plugin prefix such as `anthropic-skills:skill-creator`. It runs inline in this conversation, so its findings are already available to the next one; a handoff means stating which findings the next role must preserve. If a specialist is not listed in this session, read `skills/<name>/SKILL.md` when working in this repository, or say once that it is missing and use the closest fallback.

| When | Specialist | Returns |
|---|---|---|
| The goal, terms, or scope could change the outcome | `grill-me-aquinas` | Said, meant, and happened; essence, constraints, non-goals |
| A plan must be trusted, sources of truth disagree, or prior work needs verifying | `audit-plan-descartes` | Foundation ledger, unresolved assumptions, final plan |
| Code is about to be written and precedent matters | `pattern-code-wittgenstein` | Reuse, extend, extract, copy carefully, or create new |
| A real diff, branch, or PR exists | `synthesis-code-hegel` | Leave, rename, extract, merge, split, inline, deprecate, or delete |
| Something may not earn its cost, or the user wants a radical rebuild | `earned-presence-kondo` | Keep, demote, delete, or destroy/preserve/rebuild judgment |
| UI work reaches final validation, or a screen needs review | `ui-attention-ciceron` | Attention ranking, severity, smallest correction |
| A message, proposal, or user-facing copy must land | `communication-review-ciceron` | Likely uptake, friction, better version |
| The user mentions Maxi | `check-with-maxi` | Maxi evidence, separated from repository evidence |
| A skill is created or changed | `skill-creator`, then the protocol below | A lean skill that validates |

Read [references/skill-registry.md](references/skill-registry.md) when choosing an order for a multi-step workflow, or when Claude Code's built-in skills might overlap a specialist.

## Planning

When a plan is the deliverable, gather evidence from the repository before asking the user anything inspection can answer. If meaning or scope could change the plan, run `grill-me-aquinas` first as a compact observer, then give its findings to `audit-plan-descartes`. Aquinas owns meaning; Descartes owns whether the plan can be trusted.

Separate `Foundation-Fact`, `Foundation-Constraint`, and unresolved assumptions in every final plan. When an unresolved assumption could change the plan, ask with AskUserQuestion, offering `Audit this plan` first and `Do not review the plan` second, and run the assumption audit if chosen. When none could, finalize with the ledger and do not ask: the question exists to protect decisions, so asking on a settled plan only adds friction. In plan mode, put the ledger and audit in the plan and present it with ExitPlanMode.

## Posture

Pass a posture to the selected specialists when the request calls for one. It is an overlay on their work, not a separate mode:

- `conservative`: preserve existing behavior and public contracts unless the user asks to change them. This is the default.
- `exploratory`: surface viable directions and test edge cases before narrowing. Use it for early-stage design or when assumptions look accidental.
- `bold-by-default`: use it when the user wants to explore limits, break old assumptions, or rebuild.

```text
Boldness posture: prefer the final-shape design over compatibility inertia; challenge over-safe assumptions; surface the ambitious option before narrowing; keep destructive actions, credential use, and broad filesystem mutation behind explicit approval.
```

Boldness changes which options get considered. It does not relax role boundaries, evidence requirements, or the validation that proves the result. When the user wants to break the old structure, include `earned-presence-kondo` to decide what is destroyed and what must survive.

## Review

Review needs concrete evidence. Before code exists, route to `pattern-code-wittgenstein` instead of reviewing an imagined diff. After code exists, inspect the actual change with `synthesis-code-hegel`. Preserve behavior first: recommend deletion, extraction, or abstraction only when the evidence supports it. Route a missed outcome back to the specialist that owns it rather than absorbing the fix into a blended opinion.

## Skill Changes

When creating or updating a skill, follow `skill-creator`, wrapped with these project rules:

- State the skill's degree of freedom in its body as `conservative`, `exploratory`, or `bold-by-default`, with what that permits and what still requires a pause.
- Put triggers in the `description`. Keep the body to what Claude would not otherwise know, with the reason behind each constraint, and add references or scripts only when they reduce context load or improve repeatability.
- Start each skill README with `Philosopher idea:`, one sentence naming the borrowed habit or criterion, then `Practical use:`, stating when to use the skill, what it inspects, and what it produces.
- Update the skill README, the root catalog, and [references/skill-registry.md](references/skill-registry.md) when a skill is created, renamed, removed, or materially changed.
- In this repository, run `npm run check`, then forward-test with realistic prompts when the change affects triggering or a risky workflow.

## Developer Trace Mode

Activate this only when the user asks for `developer mode`, `trace mode`, `impact evidence`, `show traces`, `skill trace`, `Sofia trace`, `skill contributions`, or equivalent visibility into Sofia's effect.

After a Sofia-led plan or revised plan, keep the normal output and append one `Skill Impact Trace`, using [references/developer-trace-contract.md](references/developer-trace-contract.md). A skill counts as contributing only when its instructions, references, tools, output, or handoff changed the answer. The trace is response-level evidence for this one invocation, not proof that any runtime hook fired.

## Output

Give the result the user asked for, and report coordination only where it helps them follow the work: the roles used and why, their order, any non-conservative posture, and any plausible role you skipped. The work is complete when the deliverable exists and its relevant validation has run, or when you have said what could not be validated.
