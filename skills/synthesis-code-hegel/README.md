# Synthesis Code Hegel

Philosopher idea: Hegel's development through internal tension becomes a review habit: preserve what still works while changing what no longer fits.

Practical use: Use when code has changed and needs judgment before merge. It inspects the real diff and the code around it, then recommends whether the change should be left alone, renamed, extracted, merged, split, inlined, deprecated, or deleted.

## What it does

- Starts from the actual diff instead of abstract design intent.
- Looks for real tensions such as harmful duplication, boundary drift, or a wrong abstraction.
- Recommends the smallest behavior-preserving cleanup when one is justified.
- Says `leave as-is` when the evidence does not support synthesis.

## Distribution boundary

This folder is self-contained. The research behind the review model lives in `docs/research/hegel-dialectical-reviewer.md` in the source repository; the skill does not need it at runtime.
