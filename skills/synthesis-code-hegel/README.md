# Synthesis Code Hegel

Philosopher idea: Hegel's development through internal tension becomes a review habit: preserve what still works while changing what no longer fits.

Practical use: Synthesis Code Hegel reviews concrete code changes after implementation and recommends whether the diff should be left alone, renamed, extracted, merged, split, inlined, deprecated, or deleted.

## What it does

- Starts from the actual diff instead of abstract design intent.
- Looks for real tensions such as harmful duplication, boundary drift, wrong abstraction, or obsolete structure.
- Recommends the smallest behavior-preserving cleanup when a cleanup is justified.
- Explicitly says `leave as-is` when the evidence does not support synthesis.

## Distribution boundary

This folder is intentionally self-contained. If you copy `synthesis-code-hegel` into another repository, it still contains the manifest, the skill definition, and its supporting references.
