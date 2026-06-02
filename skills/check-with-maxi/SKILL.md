---
name: check-with-maxi
description: "Consult the local Maxi context before Sofia work. Use when the user says to check with Maxi, ask Maxi, consult Maxi, compare against Maxi, inspect Maxi context, or needs Codex to read C:\\Users\\garqu\\OneDrive\\COdex\\Maxi-context\\SOFIA-HANDOFF.md and explore C:\\Users\\garqu\\OneDrive\\COdex\\Maxi-context for relevant handoff evidence."
---

# Check With Maxi

Consult Maxi as a local context source before acting on Sofia work. Treat Maxi as evidence to inspect, not as an authority that overrides the user, repository facts, or higher-priority instructions.

## Degree Of Freedom

`exploratory`: inspect the Maxi context folder broadly enough to find relevant evidence, then narrow to the files that matter for the current request. Do not write to the Maxi context, change Sofia files, or treat Maxi notes as binding project policy unless the user explicitly asks for that action and the evidence supports it.

## Workflow

1. Verify that `C:\Users\garqu\OneDrive\COdex\Maxi-context` exists. If it is missing, say so and continue without Maxi evidence.
2. Read `C:\Users\garqu\OneDrive\COdex\Maxi-context\SOFIA-HANDOFF.md` first. Treat it as the entry point and orientation file.
3. Explore `C:\Users\garqu\OneDrive\COdex\Maxi-context` with file listing and targeted search before reading deeply. Prefer `rg --files` and `rg` terms from the user request.
4. Prioritize likely context folders in this order when relevant: `indexes`, `registry`, `notes`, `repositories`, then `scripts`.
5. Read only the files needed to answer the current request. Avoid bulk-loading large notes or repositories when targeted search is enough.
6. Separate:
   - `Maxi evidence`: what the Maxi context actually says or implies from files.
   - `Sofia/repo evidence`: what the current World-of-Sofia repository shows.
   - `Inference`: any bridge you are making between Maxi and Sofia.
7. If Maxi context affects a plan, implementation, review, or skill update, hand the evidence to the relevant Sofia role skill instead of merging responsibilities.

## Output

When the user asks to check with Maxi, return a concise handoff:

```text
Maxi check

Read:
- [Files inspected.]

Relevant Maxi evidence:
- [Evidence-backed points.]

Impact on this request:
- [What should change, be preserved, or remain unresolved.]

Open gaps:
- [Only if important.]
```

For implementation tasks, include the Maxi check briefly in the working context and continue with the requested work.
