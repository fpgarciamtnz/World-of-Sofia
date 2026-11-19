# ADR 0005: Auditar PEC runs on request and names its concepts

## Status

Accepted, 2026-11-19. Extends the pairings listed in ADR 0004.

## Context

ADR 0004 let Auditar PEC name Audit Plan Descartes, for its evidence ledger. In practice the user could not tell whether an audit had run, or which of Descartes' and Aquinas' concepts it had applied: Claude could start the skill on its own, and it left loading Descartes to description matching.

## Decision

- Auditar PEC sets `disable-model-invocation: true`, so it runs only when the user types `/auditar-pec`.
- It always loads `grill-me-aquinas` once the rubric and brief are in hand, to settle what the submission asks, and then `audit-plan-descartes` with Aquinas' handoff, as ADR 0002 defines it. It states each load in one line, and runs Descartes' assumption audit without asking first.
- `SKILL.md` lists the concepts it applies in one table: said, meant, and happened; canonical terms; essence and accident; law, habit, and prudential exception; potency and act; fact, requirement, assumption, and gap; limits and cuts; the assumption audit; and essence fit. Every report has a "Conceptos revisados" section that gives each concept what it found or why it did not apply.
- If either skill is not installed, the audit applies its concepts from the table and says so in the report, so the folder still works alone.

## Rationale

- The user needs confirmation that the concepts were reviewed, and explicit mention of each one. A skill that starts on its own, and siblings that may or may not load, give neither.
- A concept that is missing from the report reads as reviewed. Listing every concept, including the ones that did not apply, makes an omission visible.

## Consequences

- Asking Claude in plain words to audit a PEC no longer loads the skill; the user types `/auditar-pec`.
- Auditar PEC now names two siblings, both for pairings it relies on. This is still not routing: no other skill sends work to it, and it carries its own method to the report.
- Communication Review Ciceron stays as it is. The user plans to revisit it as a general writing review.
