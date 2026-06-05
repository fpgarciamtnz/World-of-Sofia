---
name: synthesis-code-hegel
description: "Review real code changes before merge to decide whether they should be synthesized, simplified, merged, split, or left alone. Use for PR review, staged diff review, edited worktrees, branch review, post-implementation cleanup, or requests like 'should we refactor this change before main?'"
---

# Synthesis Code Hegel

Use this skill only when code has already changed. Start from the actual diff, not from abstract design talk.

## Workflow

1. Inspect the concrete change first: PR diff, staged files, edited worktree, or branch delta.
2. Summarize what objectively changed before recommending any cleanup.
3. Compare the changed code against nearby responsibilities, collaborators, and existing patterns.
4. Classify the tension:
   - `harmless variation`
   - `useful duplication`
   - `harmful duplication`
   - `wrong abstraction`
   - `narrow abstraction`
   - `boundary drift`
5. Recommend the smallest safe action:
   - `leave as-is`
   - `rename`
   - `extract`
   - `merge`
   - `split`
   - `inline`
   - `deprecate`
   - `delete`
6. Preserve behavior first. Do not force synthesis when evidence is weak.

## Handoff Rules

- If no actual diff exists yet, stop and use `pattern-code-wittgenstein` first to find the nearest code family.
- If `pattern-code-wittgenstein` evidence already exists, treat it as input, but still review the edited code itself.
- If the change touches public APIs, persistence, security, concurrency, or high fan-in modules, raise the bar for deletion or architectural movement.
- If evidence is insufficient, recommend `leave as-is` or `investigate further`, not a speculative cleanup.

## Earned Presence Kondo Bridge

When a real diff makes deletion, deprecation, inlining, replacement, or rebuilding simpler plausible, route through `earned-presence-kondo` before making a subtractive recommendation.

Use this bridge when:

- harmful duplication may need one branch deleted or merged;
- a wrong abstraction may be better split, inlined, deprecated, or removed;
- a narrow abstraction may not earn its maintenance cost;
- boundary drift suggests an old boundary should be moved, deprecated, preserved, or replaced;
- a compatibility path, flag, adapter, wrapper, helper, config, generated path, or legacy branch appears stale.

Keep Hegel's safety model in force after the bridge: preserve behavior first, raise the bar for public APIs and high-risk modules, prefer `deprecate` before `delete` when callers may exist, and require tests or migration evidence before removal.

## Real Contradiction Test

Treat a contradiction as real only when the same responsibility is now governed by incompatible behavior, invariants, dependency direction, or domain meaning in the same relevant context.

Do not treat bounded-context differences, adapters, platform specializations, or test-only duplication as contradictions unless the change actually collapses those boundaries.

## Required Output

Always return these sections:

1. Change summary
2. Existing system affected
3. Tension or contradiction found
4. Evidence
5. Recommendation
6. Preserve
7. Change
8. Delete
9. Tests
10. Confidence

State `leave as-is` plainly when that is the best answer.

Load [references/hegel-review-foundation.md](references/hegel-review-foundation.md) only when deeper rationale or terminology is required.
