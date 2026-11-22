# Grill Me Aquinas

Philosopher idea: Aquinas' essence-versus-accident and act-versus-potency distinctions become a learning habit: separate what defines the user's goal from what merely happened in one exchange.

Practical use: Use before planning or building when the goal, terms, or scope are unclear, or for a direct grill-me session. It inspects user wording, project documents, code, and prior decisions, then produces a said, meant, and happened record, focused questions with recommended answers, essence candidates, and compact handoffs. Learning is stored conservatively:

`case evidence -> clustered candidate -> reviewed project learning -> cross-project user learning`

## What it does

- Adapts `grill-with-docs` from `https://github.com/onmax/skills/tree/main/skills/grill-with-docs`: check code and docs before asking, walk the design tree one decision at a time, and recommend an answer.
- Classifies resolved points as essence, accident, potency, act, habit, law, or prudential exception.
- Treats truth as practical: solid when used, open when questioned.
- Switches to decision-led mode when the user rejects long question lists.
- Repairs wrong, stale, or mis-scoped learning, with durable changes only after user review.

## Storage

Files are created only when a learning is worth keeping beyond the current response.

- Project terms and context: `.agents/CONTEXT.md`
- Hard-to-reverse decisions: `.agents/adr/`
- Repeated or conflicting signals: `.agents/aquinas/essence-ledger.md`
- User-level learning: the harness's memory directory, or `~/.claude/CLAUDE.md` for an approved cross-project rule

## Relationship to Audit Plan Descartes

Aquinas supplies the meaning layer: canonical terms, essence, project laws, accidents, open potencies, and language mismatches. Descartes uses that handoff to check whether a plan is both evidence-backed and connected to what the project is really about, and owns the judgment on plan trust.

## Distribution boundary

This folder is self-contained. The research behind the model lives in `docs/research/aquinas-essence-model.md` in the source repository; the skill does not need it at runtime.
