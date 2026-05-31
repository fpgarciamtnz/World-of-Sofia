---
name: audit-plan-descartes
description: "Separate verified facts, constraints, unresolved assumptions, optional essence-fit risks, and goal-readiness evidence before final planning. Use when a plan or Sofia Goal Mode Brief needs evidence handling, assumption audit, verification requirements, or a check that it still matches project essence supplied by Grill Me Aquinas or similar context."
---

# Audit Plan Descartes

Use this skill when planning work that would benefit from explicit evidence handling.

Keep the skill focused on plan trust. Do not infer project essence yourself when another skill has not supplied it. When Grill Me Aquinas, project context, ADRs, or an essence ledger provide essence evidence, include an essence-fit check as part of the planning audit.

## Workflow

1. Gather direct evidence before asking planning questions.
2. Separate facts from constraints.
3. Mark unresolved assumptions explicitly.
4. If essence context is available, check whether the plan preserves project essence, respects project laws, avoids treating accidents as constraints, and does not depend on unresolved potency as if it were fact.
5. Offer an assumption audit before finalizing the plan.

## Essence Fit

Use this check only when there is evidence to support it. Valid sources include explicit user correction, `.agents/CONTEXT.md`, `.agents/adr/`, `.agents/aquinas/essence-ledger.md`, repository facts, or a Grill Me Aquinas handoff.

Accept optional handoff fields such as:

- `canonical_terms`
- `essence_candidates`
- `project_laws`
- `accidents_to_ignore`
- `open_potencies`
- `language_mismatches`
- `evidence_paths`
- `goal_objective_candidates`
- `completion_criteria_candidates`
- `constraints`
- `non_goals`
- `pause_conditions`

Classify unsupported essence claims as unresolved assumptions, not facts. If the plan is factually sound but violates project essence, surface that as an essence-fit risk and adjust the plan or mark the conflict explicitly.

## Goal Readiness

When Sofia asks for a Goal Mode Brief audit, return these fields:

- `goal_readiness`: `ready`, `needs narrowing`, or `blocked`, with a short reason.
- `unresolved_assumptions`: assumptions that would change the goal text, scope, or completion criteria.
- `verification_requirements`: commands, artifacts, review evidence, or observable outcomes needed to prove completion.
- `audit_result`: whether the Goal Mode Brief can be finalized, should be revised, or must ask the user a blocking question.

## Output

- Foundation ledger
- Data needed to upgrade unresolved assumptions
- Essence fit, when essence context is available
- Goal readiness, when auditing a Goal Mode Brief
- Optional assumption audit
- Final plan
