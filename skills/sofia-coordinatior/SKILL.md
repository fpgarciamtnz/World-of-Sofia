---
name: sofia-coordinatior
description: "Coordinate Sofia skill creation, skill updates, multi-skill workflows, Goal Lifecycle Mode, planning reviews, implementation reviews, role distribution, and audit gates. Use when the user invokes $sofia-coordinatior, asks to call the Sofia coordinator, route work through other skills, create or update any skill, create a Codex goal, pursue a goal, draft a goal template, review skill work, plan a skill change, audit a review, enforce Descartes before final planning output, or decide which skills should participate."
---

# Sofia Coordinatior

## Overview

Use this skill as the routing layer for skill-related and multi-skill work. Keep each participating skill in its own role, call only the skills required by the phase, and enforce Descartes for final plans and planning-sensitive reviews.

Do not provide philosophical exposition unless the user asks for it. State routing decisions tersely, then execute the selected roles.

## Hard Gate

Apply this gate whenever the task involves creating, updating, reviewing, planning, validating, or goal-routing a skill workflow:

1. Identify the current phase before acting.
2. Select the minimum required role skills from the role matrix.
3. Preserve each skill's responsibility and handoff boundary.
4. If a required skill is available, invoke it before doing that phase's work.
5. If a required skill is missing or blocked, say so once and continue with the closest available fallback.
6. Do not merge multiple skill roles into a blended review.
7. Do not finalize a plan, planning-sensitive review, or Goal Mode Brief until the Descartes planning gate has been applied.

## Role Matrix

Use these roles in order when their trigger applies:

| Phase | Trigger | Role Skill | Output |
|---|---|---|---|
| Intent and scope | The request has unclear goal, audience, constraints, or success criteria | `$grill-me-aquinas` when meaning, essence, or terms need clarification; otherwise coordinator only | A concise statement of the current goal, scope, and unresolved product decisions |
| Goal lifecycle | The user asks for goal mode, pursue a goal, durable objective, long-running work, goal template, or create a goal for this project | Sofia coordinator with `$grill-me-aquinas`, `$audit-plan-descartes`, and later specialist handoffs as needed | Goal Mode Brief and ready-to-use `/goal` text |
| Skill creation or update | A skill will be created, renamed, edited, validated, or packaged | `$skill-creator` | A skill structure with clear frontmatter triggers, lean body instructions, and only necessary resources |
| Planning or architecture | The work needs a plan, design, sequence, strategy, or planning assumptions | `$descartes-skill` or project-local `$audit-plan-descartes` inside World-of-Sofia | A foundation ledger, unresolved assumptions, optional assumption audit, and final plan |
| Pre-implementation pattern discovery | Code or repo precedent should guide implementation | `$pattern-code-wittgenstein` when available | A reuse, extend, extract, copy carefully, or create new recommendation |
| Post-implementation review | A real diff, staged change, branch, or PR exists | `$synthesis-code-hegel` when available | A concrete recommendation to leave, rename, extract, merge, split, inline, deprecate, or delete |
| UI validation | Goal completion depends on rendered UI attention, hierarchy, copy, or interaction evidence | `$ui-attention-ciceron` when available | Attention ranking, goal-fit review, severity, and smallest useful correction |
| Communication validation | Goal completion depends on message, proposal, review, or user-facing language | `$communication-review-ciceron` when available | Rhetorical-fit review and smallest useful rewrite |
| Validation | The work created or changed a skill, repo artifact, or generated output | Relevant local validation commands | Validation result and any remaining risks |

Role skill names are examples, not hard dependencies. Prefer the exact available skill with the matching responsibility in the current environment.

## Goal Lifecycle Mode

Use Goal Lifecycle Mode when the user asks for `goal mode`, `pursue a goal`, `durable objective`, `long-running work`, `goal template`, `create a goal for this project`, or equivalent language.

Sofia drafts Goal mode text and coordinates the supporting skills. Codex Goal mode itself is started with `/goal` in the Codex app, IDE extension, or CLI; do not claim that a skill can start Goal mode by itself.

### Goal lifecycle route

1. Clarify the durable outcome with `grill-me-aquinas` when intent, project essence, canonical terms, constraints, non-goals, or pause conditions are unclear.
2. Audit the goal with `audit-plan-descartes` or `descartes-skill` before finalizing the Goal Mode Brief. The audit should separate facts, constraints, unresolved assumptions, verification requirements, and essence-fit risks.
3. For implementation goals, route to `pattern-code-wittgenstein` before coding choices that depend on repository precedent.
4. After real code changes exist, route to `synthesis-code-hegel` to decide whether the diff satisfies the original goal or needs synthesis.
5. If the goal is UI-facing, route completion evidence through `ui-attention-ciceron`.
6. If the goal is communication-facing, route completion evidence through `communication-review-ciceron`.

### Goal Mode Brief

Use this stable output shape when Sofia is asked to create or refine a Codex goal:

```text
Goal Mode Brief

Objective:
[One durable project outcome.]

Completion criteria:
- [Observable success condition.]
- [Verification command, artifact, or review evidence.]
- [Behavior or boundary that must remain unchanged.]

Scope boundaries:
- In scope: [...]
- Out of scope: [...]

Skill routing:
- Clarify with Aquinas when intent or project essence is unclear.
- Audit with Descartes before finalizing the goal.
- Use Wittgenstein before implementation pattern choices.
- Use Hegel after real code changes exist.

Pause conditions:
- Ask before changing public behavior, deleting existing behavior, crossing project boundaries, or treating unresolved assumptions as facts.

Ready-to-use `/goal` text:
[Concise goal prompt Codex can pursue.]
```

Keep the ready-to-use `/goal` text concise enough to paste into Goal mode. Put supporting evidence and routing detail in the brief, not in the goal text, unless the detail is a completion criterion.

## Skill Registry

Load [references/skill-registry.md](references/skill-registry.md) when routing depends on more than the core role matrix, when the user asks how skills relate to each other, or when a task could involve multiple installed global or World-of-Sofia project skills.

Treat the registry as the routing map for installed global skills and the current World-of-Sofia project skills. If a plugin, session-provided skill, or newly added skill is not listed there, inspect the available skill metadata dynamically and then apply the same role-boundary rules.

When a global skill and a World-of-Sofia project-local skill have the same responsibility, prefer the project-local skill only while working inside the World-of-Sofia repository or showcasing that project skill. Otherwise prefer the installed global skill.

## Skill Creation and Update Protocol

When creating or updating a skill:

1. Invoke `$skill-creator` and follow its workflow.
2. Make the `description` frontmatter carry the trigger rules. Do not hide "when to use this skill" only in the body.
3. Keep `SKILL.md` concise and imperative.
4. Add scripts, references, or assets only when they materially improve repeatability or reduce context load.
5. Update the skill README and repository README or skill catalog when a skill is created, renamed, materially updated, or removed.
6. Enforce this README contract before validation:
   - Start each skill README with `Philosopher idea:` and `Practical use:` after the title.
   - Make `Philosopher idea:` one concise sentence that names the borrowed habit, method, or criterion.
   - Make `Practical use:` state when to use the skill, what evidence or artifacts it inspects, and what output it produces.
   - Keep the root catalog in the same two-part shape for every listed skill.
   - Reject vague README summaries during planning or review and route them back for rewrite before closing the skill update.
7. Validate the skill with the available validator.
8. If the repository has skill isolation, catalog, lint, or typecheck commands, run the relevant checks.
9. For complex skills, forward-test with realistic prompts when doing so is safe and practical.

## Planning and Audit Protocol

When a final plan is required:

1. Invoke `$descartes-skill` or the project-local `$audit-plan-descartes` when the local skill is the subject.
2. Gather repository or system evidence before asking the user questions that inspection can answer.
3. Separate `Foundation-Fact`, `Foundation-Constraint`, and non-foundational assumptions.
4. Before final plan output, use the Descartes structured planning gate with exactly these option labels:
   - `Audit this plan`
   - `Do not review the plan`
5. If `Audit this plan` is selected, run the assumption audit before finalizing.
6. If `Do not review the plan` is selected, finalize without audit augmentation.
7. If the structured question UI is unavailable, explicitly state that the gate degraded and treat that as a fallback condition.

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
- `Result`: provide the plan, implementation result, review, validation outcome, or Goal Mode Brief requested by the user.
- `Skipped roles`: mention skipped roles only when they were plausible but intentionally not used.
