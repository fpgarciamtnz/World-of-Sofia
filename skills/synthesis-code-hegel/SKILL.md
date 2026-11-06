---
name: synthesis-code-hegel
description: "Review a real code diff before merge and decide whether to leave, simplify, merge, split, or refactor it. Use for PRs, branches, staged changes, cleanup reviews, or questions like whether to refactor a change before it reaches main."
---

# Synthesis Code Hegel

Use this skill only when code has already changed, and start from the actual diff rather than abstract design talk. If no diff exists yet, use `pattern-code-wittgenstein` to find the nearest code family; if its evidence already exists, treat it as input and still review the edited code itself.

This skill judges whether the change has the right shape in the system around it. For correctness bugs in the diff, use `code-review`.

## Workflow

1. Inspect the concrete change: PR diff, staged files, edited worktree, or branch delta.
2. Summarize what objectively changed before recommending any cleanup.
3. Compare it against nearby responsibilities, collaborators, existing patterns, and any ADRs.
4. Classify the tension: `harmless variation`, `useful duplication`, `harmful duplication`, `wrong abstraction`, `narrow abstraction`, or `boundary drift`.
5. Recommend the smallest safe action: `leave as-is`, `rename`, `extract`, `merge`, `split`, `inline`, `deprecate`, or `delete`.

Preserve behavior first. When evidence is insufficient, recommend `leave as-is` or `investigate further`, because a speculative cleanup costs more than the tension it removes. Raise the bar for deletion or architectural movement when the change touches public APIs, persistence, security, concurrency, or high fan-in modules.

## Real Contradiction Test

A contradiction is real only when the same responsibility is now governed by incompatible behavior, invariants, dependency direction, or domain meaning in the same relevant context. These questions, strongest first, settle most cases:

1. Do both paths answer the same business question or enforce the same invariant?
2. Are they in the same bounded context? If not, default to variation unless an ADR requires unification.
3. Do they have the same reasons to change?
4. Do they produce incompatible outputs, error modes, ordering rules, or lifecycle assumptions for equivalent inputs?

A useful forcing question: if this code changes again next week, will the team reliably know the one place to edit, or several? Adapters, platform specializations, and test-only duplication are not contradictions unless the change collapses those boundaries. If a proposed synthesis needs many flags, conditionals, or public-surface changes, prefer `leave as-is` or a narrower extraction.

## Earned Presence Kondo Bridge

When a real diff makes deletion, deprecation, inlining, replacement, or a simpler rebuild plausible, run `earned-presence-kondo` before recommending the subtraction. Typical cases are harmful duplication where one branch could go, a wrong or narrow abstraction that may not earn its maintenance cost, an old boundary that may need moving, and a stale flag, adapter, wrapper, config, or legacy branch.

Hegel's safety model stays in force afterward: prefer `deprecate` before `delete` when callers may exist, and require tests or migration evidence before removal.

## Output

Cover the change summary, the existing system affected, the tension found, the evidence, the recommendation, what to preserve, change, and delete, the tests, and your confidence, omitting a section only when it has nothing to report. State `leave as-is` plainly when that is the best answer. The review is finished at the recommendation; apply it only if the user asked for that.

## Developer Trace Mode

Activate this only when the user asks for `developer mode`, `trace mode`, `impact evidence`, `show traces`, `skill trace`, or `Hegel tracer`. Keep the normal output and append a `Skill Impact Trace`, using [references/developer-trace-contract.md](references/developer-trace-contract.md).
