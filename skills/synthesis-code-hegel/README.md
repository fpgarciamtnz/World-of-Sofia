# Synthesis Code Hegel

Philosopher idea: Hegel's development through internal tension becomes a code habit: before a change, set the new need against the patterns that already exist, and after it, preserve what still works while changing what no longer fits.

Practical use: Use before writing code, when precedent should decide whether to reuse, extend, extract, copy carefully, or create new, and after code changes, when a real diff needs judgment before merge. It inspects nearby code, call sites, tests, history, and the diff, then recommends one action with its evidence and the tests to mirror.

## What it does

- Before code: finds the nearest code family and judges resemblance by use, so call sites, tests, and effects outweigh shared names. This is Wittgenstein's meaning-through-use, carried over from the former Pattern Code Wittgenstein skill.
- After code: starts from the actual diff, looks for real tensions such as harmful duplication, boundary drift, or a wrong abstraction, and recommends the smallest behavior-preserving cleanup.
- Weighs whether a candidate for deletion still earns its cost, checks references first, and prefers deprecation where callers may exist.
- Says `leave as-is` when the evidence does not support a change.

## Distribution boundary

This folder is self-contained. The research behind the review model lives in `docs/research/hegel-dialectical-reviewer.md` in the source repository; the skill does not need it at runtime.
