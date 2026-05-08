---
name: pattern-code-wittgenstein
description: "Inspect existing repository patterns before implementing new code. Use when Codex should find nearby precedents, avoid duplication or contradictions, check whether an abstraction already exists, or decide whether to reuse, extend, extract, copy carefully, or create a new pattern."
---

# Pattern Code Wittgenstein

Use this skill before writing code when the real question is "what already exists here, and how close is it to the new work?"

Keep the skill practical. The goal is not philosophical commentary. The goal is an evidence-backed reuse decision that makes the resulting codebase simpler, cleaner, and less contradictory.

This v2 prototype now has a real scout pipeline. It still uses conservative heuristics, but it no longer depends only on prose discipline.

## Workflow

1. Restate the task in repository-native language.
2. Identify the bounded context and the code "language-game":
   - endpoint
   - parser
   - workflow
   - test helper
   - UI component
   - migration
   - background job
   - domain service
3. Search for candidate precedents in code, tests, naming, and nearby collaborators.
4. Classify resemblance:
   - structural
   - behavioral
   - semantic
   - naming
   - domain
   - historical
5. Build an evidence ledger.
6. Choose one recommendation only:
   - `reuse`
   - `extend`
   - `extract`
   - `copy carefully`
   - `create new`
7. Return the result in the output format from [references/output-format.md](references/output-format.md).

## Prototype pipeline

Use the staged scout when you need stronger evidence than plain search:

1. Stage 1 lexical retrieval via [scripts/collect-repo-evidence.mjs](scripts/collect-repo-evidence.mjs)
2. Stage 2 structural verification via [scripts/run-pattern-scout.mjs](scripts/run-pattern-scout.mjs)
3. Stage 3 bounded-context filtering using [references/bounded-contexts.md](references/bounded-contexts.md)
4. Stage 4 recommendation scoring using [references/scoring-policy.md](references/scoring-policy.md)
5. Stage 5 audited report generation in the standard output format

Load [references/evidence-schema.md](references/evidence-schema.md) when you need the exact candidate, evidence, and decision records behind the report.

## Search Discipline

- Start with repo-native search: identifiers, filenames, tests, and adjacent modules.
- Search tests alongside production code. A pattern without tests is weaker than it looks.
- Prefer public evidence over intuition: interfaces, call sites, fixtures, schemas, assertions, and repeated collaborator shapes.
- Treat naming-only similarity as weak until behavior or domain evidence confirms it.
- Penalize cross-context matches that reuse the same word with different invariants.

Use [scripts/collect-repo-evidence.mjs](scripts/collect-repo-evidence.mjs) when you want a fast sweep over likely files and matching lines for one or more search terms.

Use [scripts/run-pattern-scout.mjs](scripts/run-pattern-scout.mjs) when you want the prototype to emit structured candidates, evidence, recommendation, risks, and confidence.

Use [scripts/seed-evidence-ledger.mjs](scripts/seed-evidence-ledger.mjs) only when you want a ready-to-fill markdown skeleton without the full prototype analysis.

Prototype limits:

- Structural evidence is strongest for TypeScript, JavaScript, and Vue script/template structure.
- Domain evidence may still be inferred from repository paths and context maps.
- Historical evidence exists in the schema, but is not populated yet.

## Decision Rules

Load [references/decision-rules.md](references/decision-rules.md) whenever the correct action is unclear.
Load [references/scoring-policy.md](references/scoring-policy.md) when you need to understand how the prototype weighs signals.

Default posture:

- Prefer `reuse` only when context, behavior, and tests converge.
- Prefer `extend` when the family is stable and the new work is a variant.
- Prefer `extract` only after repeated concrete precedents reveal a stable interface worth hiding behind a deeper module.
- Prefer `copy carefully` when the precedent is useful but the abstraction is not yet stable.
- Prefer `create new` when the old family would force a wrong abstraction or mix bounded contexts.

## Wittgensteinian Guardrails

Load [references/foundation.md](references/foundation.md) if you need to explain why resemblance is only a starting point.

Apply these guardrails:

- Family resemblance is for candidate generation, not proof.
- Meaning comes from use, not from token overlap.
- Public criteria matter more than private hunches.
- A shared word does not guarantee a shared concept.
- Duplication can be cheaper than the wrong abstraction.

Use [references/tooling-notes.md](references/tooling-notes.md) for the current analyzer choice and what the prototype still does not attempt.

## Required Output

Always return these sections:

1. Task summary
2. Candidate code families
3. Evidence of resemblance
4. False-similarity risks
5. Recommendation
6. Implementation guidance
7. Tests to mirror or add
8. Confidence and missing evidence

If confidence is low, say what evidence would upgrade the decision.
