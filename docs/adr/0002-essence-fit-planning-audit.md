# ADR 0002: Essence-fit planning audit

## Status

Accepted.

## Decision

Keep `audit-plan-descartes` and `grill-me-aquinas` as separate skills, but define an explicit handoff between them.

`grill-me-aquinas` owns the meaning layer: what the user said, what they likely meant, what the project shows, which terms are canonical, and which signals are essence, law, habit, potency, or accident.

`audit-plan-descartes` owns the plan-trust layer: which claims are facts, which are constraints, which are assumptions, and which missing evidence could change the plan.

When Grill/Aquinas evidence is available, Descartes must add an essence-fit check to the planning audit. In basic terms: Descartes still asks "can we trust this plan?", and it also checks "does this plan still match what the project is really about?"

## Rationale

- A plan can be factually supported and still drift away from the project's governing identity, canonical language, or accepted rules.
- Grill/Aquinas already captures project essence, accidents, open potencies, and language mismatches.
- Descartes already controls planning evidence and assumption audits.
- A handoff preserves each skill's responsibility without creating a broad bridge skill too early.

## Consequences

- Descartes should treat essence claims as evidence-backed only when they come from user correction, project context, ADRs, an essence ledger, or repository facts.
- Descartes should not turn an inferred essence claim into a planning fact.
- Grill/Aquinas should include essence-fit handoff fields when planning skills need them.
- Root documentation should describe this as an essence-aware planning workflow, not as a merged skill.
- A new bridge skill should be considered only if repeated usage shows the direct handoff is too large or ambiguous.
