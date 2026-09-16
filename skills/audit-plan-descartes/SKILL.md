---
name: audit-plan-descartes
description: "Audit a plan by separating facts, constraints, assumptions, risks, and verification evidence. Use when planning needs an evidence or assumption check."
---

# Audit Plan Descartes

Use this skill when planning work that would benefit from explicit evidence handling.


Use this skill when multiple sources of truth or verification of previus code, work needs to be done.

The skill focus is on asume what are the evidences adn proof that material we are working on is relevant, matter or is completed. Final goal avoid hallutinations and have solid foundation before iniciating the work.

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
- `objective_candidates`
- `completion_criteria_candidates`
- `constraints`
- `non_goals`
- `pause_conditions`

Classify unsupported essence claims as unresolved assumptions, not facts. If the plan is factually sound but violates project essence, surface that as an essence-fit risk and adjust the plan or mark the conflict explicitly.

## Output

- Foundation ledger
- Data needed to upgrade unresolved assumptions
- Essence fit, when essence context is available
- Optional assumption audit
- Final plan
