# Pattern Code Wittgenstein

Philosopher idea: Wittgenstein's meaning-through-use becomes a repo habit: inspect how this codebase already names, structures, and solves things before adding more code.

Practical use: Pattern Code Wittgenstein checks existing repository precedent before implementation, explains how strong the match is, and recommends one of five actions: `reuse`, `extend`, `extract`, `copy carefully`, or `create new`.

## What it does

- Finds nearby implementation patterns before coding starts.
- Distinguishes structural, behavioral, semantic, naming, domain, and historical similarity.
- Produces an evidence ledger instead of a vague "this looks similar" judgment.
- Helps avoid duplicate implementations, contradictory naming, and premature abstraction.
- Ships a prototype scout pipeline that combines lexical retrieval with `ast-grep` verification.

## Prototype status

This v2 prototype is stronger than the original markdown-only skill, but it is still intentionally conservative.

- Structural evidence is strongest for TypeScript, JavaScript, and Vue script/template patterns.
- Domain and bounded-context signals are explicit, but some of them are still inferred from repository structure.
- Historical evidence remains a schema slot, not an implemented signal source yet.

## Included resources

- [SKILL.md](SKILL.md): operational workflow for applying the skill
- [references/foundation.md](references/foundation.md): the short conceptual foundation
- [references/decision-rules.md](references/decision-rules.md): the action policy
- [references/output-format.md](references/output-format.md): the final response template
- [references/evidence-schema.md](references/evidence-schema.md): internal candidate, evidence, and decision records
- [references/scoring-policy.md](references/scoring-policy.md): prototype weighting and recommendation policy
- [references/bounded-contexts.md](references/bounded-contexts.md): current repository-local context map
- [references/tooling-notes.md](references/tooling-notes.md): why `ast-grep` is the first analyzer
- [scripts/collect-repo-evidence.mjs](scripts/collect-repo-evidence.mjs): stage-1 lexical evidence sweep
- [scripts/run-pattern-scout.mjs](scripts/run-pattern-scout.mjs): end-to-end prototype scout CLI
- [scripts/run-evaluation-case.mjs](scripts/run-evaluation-case.mjs): execute one benchmark case against the prototype
- [scripts/seed-evidence-ledger.mjs](scripts/seed-evidence-ledger.mjs): markdown starter for the final write-up

## Distribution boundary

This folder is intentionally self-contained. If you copy `pattern-code-wittgenstein` into another repository, it still carries its manifest, workflow, references, and helper scripts without needing files from another skill.
