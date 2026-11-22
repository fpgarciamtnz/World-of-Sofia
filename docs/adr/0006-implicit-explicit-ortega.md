# ADR 0006: Add Implicit Explicit Ortega

## Status

Accepted, 2026-11-20. Adds an eighth skill to the seven left by ADR 0004.

## Context

The user asked for a skill about telling the implicit from the explicit, named after Ortega y Gasset, as a separate skill rather than part of Auditar PEC. It had been planned in an earlier conversation that the session building ADR 0005 could not open, so it was missed until the user asked for it again.

None of the seven skills covered it. Audit Plan Descartes sorts claims that are already stated into facts and assumptions. Grill Me Aquinas reads the user's request for what they said, meant, and what happened. Neither looks for the beliefs a piece of work stands on without stating, or for what a text conveys beyond its writer's intent.

## Decision

- Add `implicit-explicit-ortega`. It reads material three ways (explicit; implicit by deficiency, what it relies on without saying; implicit by exuberance, what it conveys without meaning to), finds unstated beliefs by their traces, and decides for each whether to state it, cut it, leave it implicit, or ask.
- Its idea is Ortega's split between ideas, which we have and state, and beliefs (*creencias*), which we stand on without noticing (*Ideas y creencias*, 1940), together with his view that every saying is deficient and exuberant.
- It works alone and names no other skill, so it adds no pairing. Claude may load it from its description.
- Its degree of freedom is `exploratory`: it looks for beliefs everywhere, including Claude's own, but reports before editing and asks before writing a stated belief into a durable place.

## Consequences

- Eight skills remain.
- Making everything explicit is a failure the skill names: it states only what changes what the reader will do.
- Ortega overlaps with Aquinas on the gap between what a request says and what it means. Aquinas keeps that job for the user's own request before planning; Ortega covers other material and the reader's side.
