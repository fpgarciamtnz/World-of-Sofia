---
name: sofia-coordinatior
description: "Coordinate Sofia skill creation, skill updates, multi-skill workflows, planning reviews, implementation reviews, role distribution, boldness handoffs, and audit gates. Use when the user invokes $sofia-coordinatior, asks to call the Sofia coordinator, route work through other skills, create or update any skill, review skill work, plan a skill change, audit a review, explore AI limits, challenge over-safe defaults, enforce Descartes before final planning output, or decide which skills should participate."
---

# Sofia Coordinatior

## Overview

Use this skill as the routing layer for skill-related and multi-skill work. Keep each participating skill in its own role, call only the skills required by the phase, and enforce Descartes for final plans and planning-sensitive reviews.

Do not provide philosophical exposition unless the user asks for it. State routing decisions tersely, then execute the selected roles.

When the user asks to explore AI limits, try less safe-seeming ideas, challenge cautious defaults, or work in an early-stage project, coordinate a bolder default posture without creating a separate mode. Prefer final-shape designs, explicit tradeoffs, and ambitious alternatives before narrowing, while still respecting tool permissions, destructive-action pause points, and evidence requirements.

When the user asks to be radical, playful, unconstrained by compatibility, willing to break the old structure, or to rebuild from scratch, involve `earned-presence-kondo` when available. Use it to decide what can be destroyed, what must be preserved, and what simpler replacement should carry the surviving value.

## Hard Gate

Apply this gate whenever the task involves creating, updating, reviewing, planning, validating, or routing a skill workflow:

1. Identify the current phase before acting.
2. Select the minimum required role skills from the role matrix.
3. Preserve each skill's responsibility and handoff boundary.
4. If a required skill is available, invoke it before doing that phase's work.
5. If a required skill is missing or blocked, say so once and continue with the closest available fallback.
6. Do not merge multiple skill roles into a blended review.
7. Do not finalize a plan or planning-sensitive review until the Descartes planning gate has been applied.

## Boldness Handoff

Use this posture as a handoff overlay, not as a separate specialist or workflow mode.

Apply it when the user expresses exploration, AI-limit testing, early-stage design, frustration with over-safe behavior, desire to break assumptions, or willingness to consider breaking changes. Tell selected skills exactly which posture to use:

- `conservative`: preserve existing behavior and public contracts unless the user explicitly asks to change them.
- `exploratory`: surface multiple viable directions, challenge accidental constraints, and test edge cases before narrowing.
- `bold-by-default`: prefer the clearest final design, challenge conservative defaults, and consider breaking changes when the project is experimental, pre-1.0, or explicitly open to redesign.

When applying `bold-by-default`, include this compact instruction in handoffs:

```text
Boldness posture: prefer the final-shape design over compatibility inertia; challenge over-safe assumptions; surface the ambitious option before narrowing; keep destructive actions, credential use, and broad filesystem mutation behind explicit approval.
```

Do not let boldness erase role boundaries. Aquinas still owns meaning and essence, Descartes still audits plan trust, Wittgenstein still checks repository fit, Hegel still reviews real diffs, and validation still proves outcomes.

## Role Matrix

Use these roles in order when their trigger applies:

| Phase | Trigger | Role Skill | Output |
|---|---|---|---|
| Intent and scope | The request has unclear goal, audience, constraints, success criteria, or planning intent | `$grill-me-aquinas` as active observer when meaning, essence, terms, or planning fit may matter; otherwise coordinator only | A concise statement of the current goal, scope, and unresolved product decisions |
| Skill creation or update | A skill will be created, renamed, edited, validated, or packaged | `$skill-creator` | A skill structure with clear frontmatter triggers, lean body instructions, and only necessary resources |
| Planning or architecture | The work needs a plan, design, sequence, strategy, or planning assumptions | `$grill-me-aquinas` compact observer, then `$descartes-skill` or project-local `$audit-plan-descartes` inside World-of-Sofia | Meaning/essence handoff, foundation ledger, unresolved assumptions, optional assumption audit, and final plan |
| Radical rebuild or destructive simplification | The user says or implies be radical, playful, break compatibility, stop preserving the old structure, tear it down, start over, rebuild from scratch, or build something new without compatibility inertia | `$grill-me-aquinas` for intent/essence, then `$earned-presence-kondo` when available | A destroy/preserve/rebuild handoff that names what no longer earns its cost, what must survive, and where specialist evidence is still needed |
| Pre-implementation pattern discovery | Code, repo, or Maxi-context precedent should guide implementation before new code is created | `$pattern-code-wittgenstein` when available | A reuse, extend, extract, copy carefully, or create new recommendation with current-repo and relevant Maxi evidence separated |
| Post-implementation review | A real diff, staged change, branch, or PR exists | `$synthesis-code-hegel` when available | A concrete recommendation to leave, rename, extract, merge, split, inline, deprecate, or delete |
| UI validation | Any UI-changing work reaches rendered validation, final review, or completion | `$ui-attention-kahneman` when available | Attention ranking, fit review, severity, and smallest useful correction |
| Communication validation | Work completion depends on message, proposal, review, or user-facing language | `$communication-review-ciceron` when available | Rhetorical-fit review and smallest useful rewrite |
| Validation | The work created or changed a skill, repo artifact, or generated output | Relevant local validation commands | Validation result and any remaining risks |

Role skill names are examples, not hard dependencies. Prefer the exact available skill with the matching responsibility in the current environment.

## Skill Registry

Load [references/skill-registry.md](references/skill-registry.md) when routing depends on more than the core role matrix, when the user asks how skills relate to each other, or when a task could involve multiple installed global or World-of-Sofia project skills.

Treat the registry as the routing map for installed global skills and the current World-of-Sofia project skills. If a plugin, session-provided skill, or newly added skill is not listed there, inspect the available skill metadata dynamically and then apply the same role-boundary rules.

When a global skill and a World-of-Sofia project-local skill have the same responsibility, prefer the project-local skill only while working inside the World-of-Sofia repository or showcasing that project skill. Otherwise prefer the installed global skill.

## Skill Creation and Update Protocol

When creating or updating a skill:

1. Invoke `$skill-creator` and follow its workflow.
2. Treat `$skill-creator` as the upstream general authoring guide. Do not edit the bundled system skill to encode World-of-Sofia policy; wrap it with this project-local protocol.
3. Define the skill's degree of freedom in its body as `conservative`, `exploratory`, or `bold-by-default`, with one sentence saying what that permits and what still requires a pause.
4. Make the `description` frontmatter carry the trigger rules. Do not hide "when to use this skill" only in the body.
5. Keep `SKILL.md` concise and imperative.
6. Add scripts, references, or assets only when they materially improve repeatability or reduce context load.
7. Update the skill README and repository README or skill catalog when a skill is created, renamed, materially updated, or removed.
8. Enforce this README contract before validation:
   - Start each skill README with `Philosopher idea:` and `Practical use:` after the title.
   - Make `Philosopher idea:` one concise sentence that names the borrowed habit, method, or criterion.
   - Make `Practical use:` state when to use the skill, what evidence or artifacts it inspects, and what output it produces.
   - Keep the root catalog in the same two-part shape for every listed skill.
   - Reject vague README summaries during planning or review and route them back for rewrite before closing the skill update.
9. Validate the skill with the available validator.
10. If the repository has skill isolation, catalog, lint, or typecheck commands, run the relevant checks.
11. For complex skills, forward-test with realistic prompts when doing so is safe and practical. Include at least one probe that challenges over-safe assumptions when the skill is `exploratory` or `bold-by-default`.

## Planning and Audit Protocol

When a final plan is required:

1. Run `$grill-me-aquinas` as a compact active observer before Descartes when meaning, essence, canonical terms, or scope could change the plan. It should supply `said / meant / happened`, canonical terms, essence candidates, accidents to ignore, open potencies, constraints, non-goals, pause conditions, and evidence paths when available.
2. Invoke `$descartes-skill` or the project-local `$audit-plan-descartes` when the local skill is the subject.
3. Gather repository or system evidence before asking the user questions that inspection can answer.
4. Separate `Foundation-Fact`, `Foundation-Constraint`, and non-foundational assumptions.
5. Before final plan output, use the Descartes structured planning gate with exactly these option labels:
   - `Audit this plan`
   - `Do not review the plan`
6. If `Audit this plan` is selected, run the assumption audit before finalizing.
7. If `Do not review the plan` is selected, finalize without audit augmentation.
8. If the structured question UI is unavailable, explicitly state that the gate degraded and treat that as a fallback condition.

Keep Aquinas and Descartes separate: Aquinas owns meaning and essence evidence; Descartes owns plan trust, facts, constraints, assumptions, verification requirements, and final audit judgment.

## Developer Trace Mode

Activate developer trace mode only when the user asks for `developer mode`, `trace mode`, `impact evidence`, `show traces`, `skill trace`, `Sofia trace`, `skill contributions`, or equivalent visibility into Sofia's effect.

When active after a Sofia-led final plan or revised plan, keep the normal required output intact and append one `Skill Impact Trace` section after it. Use the field contract in [references/developer-trace-contract.md](references/developer-trace-contract.md).

The trace is Sofia-owned. Summarize which specialist skills were actually selected, invoked, or intentionally skipped, and highlight each material contribution to the plan. Include role-selection evidence, planning-gate evidence, specialist handoffs, repository evidence, tool evidence, and validation implications when they shaped the result.

Do not claim a skill contributed merely because it exists in the registry or role matrix. A contribution requires evidence that the skill's instructions, references, tools, output, or handoff changed the answer. Do not force every specialist to append its own trace block, and do not claim trace mode proves automatic runtime hooks fired. Treat it as response-level evidence for this invocation.

## Review Protocol

Use the review role only after inspecting concrete evidence:

- Before code exists, route to the pattern-discovery role instead of reviewing an imaginary diff.
- After code exists, route to the synthesis/review role and inspect the actual changed files, staged diff, branch delta, or PR.
- For review-sensitive planning claims, run Descartes before the final recommendation.
- Preserve behavior first. Do not recommend deletion, extraction, or abstraction from weak evidence.

## Project Policy Hook

This global skill improves routing when it is invoked or selected by trigger metadata. To make the rule mandatory inside a repository, add a short project policy such as `AGENTS.md` that requires `$sofia-coordinatior` for every skill creation or update.

Keep project policy short. Let this skill own the detailed role matrix.

## Output Discipline

Return only the coordination that helps the work proceed:

- `Roles selected`: list the role skills used and why.
- `Handoffs`: state the order of role execution.
- `Boldness posture`: include only when a non-conservative posture changes the handoff or expected behavior.
- `Result`: provide the plan, implementation result, review, validation outcome, or routing decision requested by the user.
- `Skipped roles`: mention skipped roles only when they were plausible but intentionally not used.
