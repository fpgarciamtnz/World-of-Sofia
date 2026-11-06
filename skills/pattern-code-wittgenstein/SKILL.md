---
name: pattern-code-wittgenstein
description: "Inspect nearby repository patterns before implementing code or choosing an abstraction. Use when precedent should decide whether to reuse, extend, extract, copy, or create, especially before adding a helper, module, or shared abstraction that may already exist."
---

# Pattern Code Wittgenstein

Use this before writing code, when the real question is "what already exists here, and how close is it to the new work?" The goal is an evidence-backed reuse decision that leaves the codebase simpler and less contradictory.

This skill finds precedent. Once code has been written, staged, or prepared for PR review, use `synthesis-code-hegel` on the real diff. Wittgenstein asks what existing family the work should resemble; Hegel asks, now that the code changed, whether to synthesize, simplify, or leave it alone. If this search finds a likely duplicate or a wrong abstraction, say that Hegel should review the result before merge.

## Finding Candidates

Restate the task in the repository's own language and name its bounded context: endpoint, parser, workflow, test helper, UI component, migration, background job, or domain service. Then search with Grep and Glob for identifiers, filenames, and adjacent modules, and read the closest candidates in full, along with their call sites and tests. Use `git log` when it matters how a pattern came to exist or whether it is being retired.

## Judging Resemblance

Classify each match as structural, behavioral, semantic, naming, domain, or historical. Keep these in mind:

- Family resemblance generates candidates; it does not prove the code should be shared.
- Meaning comes from use, so call sites, tests, schemas, and observable effects outweigh shared words.
- A shared word does not guarantee a shared concept, and a match across bounded contexts is suspect even when the code looks alike.
- A pattern without tests is weaker than it looks.
- Duplication can be cheaper than the wrong abstraction.

Choose one recommendation: `reuse`, `extend`, `extract`, `copy carefully`, or `create new`. Prefer `reuse` only when context, behavior, and tests converge, and `extract` only after repeated concrete precedents reveal a stable interface. Read [references/decision-rules.md](references/decision-rules.md) when the choice is close.

## Output

Use the structure in [references/output-format.md](references/output-format.md), since Sofia and Hegel consume it as a handoff. If confidence is low, say what evidence would upgrade the decision. The skill is finished at the recommendation, with implementation guidance and the tests to mirror; continue into implementation only if the user asked for it.

## Developer Trace Mode

Activate this only when the user asks for `developer mode`, `trace mode`, `impact evidence`, `show traces`, or equivalent visibility into this skill's effect. Keep the normal output and append a `Skill Impact Trace`, using [references/developer-trace-contract.md](references/developer-trace-contract.md). It is response-level evidence for this invocation, not proof of runtime effectiveness.
