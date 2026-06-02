# Check With Maxi

Philosopher idea: Maxi functions as a companion context ledger: consult the handoff first, then test claims against the concrete files that produced it.

Practical use: Use when the user asks to check with Maxi, consult Maxi, ask Maxi, or inspect Maxi context. The skill reads `C:\Users\garqu\OneDrive\COdex\Maxi-context\SOFIA-HANDOFF.md`, explores `C:\Users\garqu\OneDrive\COdex\Maxi-context`, and returns a concise evidence-backed handoff for the current Sofia task.

## What it does

- Reads the Maxi handoff file before other Maxi context.
- Searches the Maxi context folder for files relevant to the user's current request.
- Separates Maxi evidence from Sofia repository evidence and agent inference.
- Keeps Maxi context read-only unless the user explicitly asks for edits.

## Distribution boundary

This skill intentionally depends on a local sibling workspace at `C:\Users\garqu\OneDrive\COdex\Maxi-context`. If that folder is unavailable, report the missing dependency and continue without Maxi evidence.
