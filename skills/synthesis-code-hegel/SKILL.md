---
name: synthesis-code-hegel
description: "Judge the shape of code before and after a change. Before writing, decide from repository precedent whether to reuse, extend, extract, copy carefully, or create new; after, review the real diff and decide whether to leave, rename, merge, split, inline, deprecate, or delete it. Use before adding a helper or abstraction, and for PRs, branches, or staged changes."
---

# Synthesis Code Hegel

Code meets the system around it twice: before it is written, when a new need meets the patterns that already exist, and after, when the change lands among the code it touches. Both moments ask one question: does this code belong to the family it resembles, and does it leave that family simpler and less contradictory? Correctness bugs are a different question, and `code-review` covers them.

## Before Code: Precedent

Restate the task in the repository's own language and name its bounded context: endpoint, parser, workflow, test helper, UI component, migration, background job, or domain service. Search for identifiers, filenames, and adjacent modules, and read the closest candidates in full, along with their call sites and tests. Use `git log` when it matters how a pattern came to exist or whether it is being retired.

Classify each match as structural, behavioral, semantic, naming, domain, or historical, and judge it by use:

- Family resemblance generates candidates; it does not prove the code should be shared.
- Meaning comes from use, so call sites, tests, schemas, and observable effects outweigh shared words.
- A shared word does not guarantee a shared concept, and a match across bounded contexts is suspect even when the code looks alike.
- A pattern without tests is weaker than it looks.
- Duplication can be cheaper than the wrong abstraction.

Choose one recommendation: `reuse`, `extend`, `extract`, `copy carefully`, or `create new`. Prefer `reuse` only when context, behavior, and tests converge, and `extract` only after repeated concrete precedents reveal a stable interface. Read [references/precedent-rules.md](references/precedent-rules.md) when the choice is close.

Report the candidate families with their strength, the evidence of resemblance, the false-similarity risks, the recommendation, what to preserve, vary, and avoid, the tests to mirror or add, and your confidence with the evidence that would raise it. Continue into implementation only if the user asked for it.

## After Code: Synthesis

Start from the actual change: PR diff, staged files, edited worktree, or branch delta. Summarize what objectively changed before recommending any cleanup, then compare it against nearby responsibilities, collaborators, existing patterns, and any ADRs.

Classify the tension as `harmless variation`, `useful duplication`, `harmful duplication`, `wrong abstraction`, `narrow abstraction`, or `boundary drift`, and recommend the smallest safe action: `leave as-is`, `rename`, `extract`, `merge`, `split`, `inline`, `deprecate`, or `delete`.

Preserve behavior first. When evidence is insufficient, recommend `leave as-is` or `investigate further`, because a speculative cleanup costs more than the tension it removes. Raise the bar for deletion or architectural movement when the change touches public APIs, persistence, security, concurrency, or high fan-in modules.

### Real Contradiction Test

A contradiction is real only when the same responsibility is now governed by incompatible behavior, invariants, dependency direction, or domain meaning in the same relevant context. These questions, strongest first, settle most cases:

1. Do both paths answer the same business question or enforce the same invariant?
2. Are they in the same bounded context? If not, default to variation unless an ADR requires unification.
3. Do they have the same reasons to change?
4. Do they produce incompatible outputs, error modes, ordering rules, or lifecycle assumptions for equivalent inputs?

A useful forcing question: if this code changes again next week, will the team reliably know the one place to edit, or several? Adapters, platform specializations, and test-only duplication are not contradictions unless the change collapses those boundaries. If a proposed synthesis needs many flags, conditionals, or public-surface changes, prefer `leave as-is` or a narrower extraction.

### Earned Presence

When the diff makes deletion, deprecation, inlining, replacement, or a simpler rebuild plausible, weigh what the candidate costs to keep against what would break or become unclear without it, before recommending the subtraction. Typical candidates are harmful duplication where one branch could go, a wrong or narrow abstraction that no longer earns its maintenance cost, an old boundary that may need moving, and a stale flag, adapter, wrapper, config, or legacy branch. Check references before recommending deletion, prefer `deprecate` before `delete` when callers may exist, and require tests or migration evidence before removal.

Report the change summary, the existing system affected, the tension found, the evidence, the recommendation, what to preserve, change, and delete, the tests, and your confidence, omitting a section only when it has nothing to report. State `leave as-is` plainly when that is the best answer. The review is finished at the recommendation; apply it only if the user asked for that.

## Developer Trace Mode

Activate this only when the user asks for `developer mode`, `trace mode`, `impact evidence`, `show traces`, `skill trace`, or `Hegel tracer`. Keep the normal output and append a `Skill Impact Trace`, using [references/developer-trace-contract.md](references/developer-trace-contract.md).
