# Synthesis Code Hegel

Synthesis Code Hegel is a post-implementation review skill for checking whether real code changes should be synthesized, simplified, merged, split, or left alone. It is designed for edited worktrees, staged diffs, branches, pull requests, and review passes where concrete code already exists.

## What it does

- Starts from the actual diff instead of abstract design intent.
- Looks for real tensions such as harmful duplication, boundary drift, wrong abstraction, or obsolete structure.
- Recommends the smallest behavior-preserving cleanup when a cleanup is justified.
- Explicitly says `leave as-is` when the evidence does not support synthesis.

## Distribution boundary

This folder is intentionally self-contained. If you copy `synthesis-code-hegel` into another repository, it still contains the manifest, the skill definition, and its supporting references.
