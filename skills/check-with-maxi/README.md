# Check With Maxi

Philosopher idea: Maxi functions as a companion context ledger: consult the handoff first, then test claims against the concrete files that produced it.

Practical use: Use when the user asks to check with Maxi, consult Maxi, or inspect Maxi context. The skill reads `SOFIA-HANDOFF.md` in `C:\Users\garqu\OneDrive\COdex\Maxi-context`, searches that folder for what the request needs, and returns a concise evidence-backed handoff for the current Sofia task.

## What it does

- Reads the Maxi handoff file before other Maxi context.
- Searches the Maxi context for files relevant to the user's current request.
- Separates Maxi evidence from Sofia repository evidence and agent inference.
- Keeps Maxi context read-only unless the user explicitly asks for edits.

## Distribution boundary

This skill intentionally depends on that local workspace. If the folder is unavailable, it looks in OneDrive through Executor, then reports the missing dependency and continues without Maxi evidence.
