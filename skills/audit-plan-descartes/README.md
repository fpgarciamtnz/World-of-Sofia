# Audit Plan Descartes

Philosopher idea: Descartes' methodic doubt becomes a planning habit: separate what is known, required, assumed, and missing before accepting a plan, including the limits it keeps and the cuts it makes.

Practical use: Use when a plan needs an evidence check, when sources of truth disagree, when prior work must be verified, right after a drop is created on Drop, or when a voyage's limits and arrival need auditing. It inspects files, command output, a drop as Drop stored it, and any essence context, then produces a foundation ledger, the evidence needed to upgrade each assumption, the limits with their sources, the evidence behind any cut in scope, and a final plan or verification verdict.

## What it does

- Builds a foundation ledger before planning.
- Keeps unsupported assumptions in a separate section.
- Records every limit with its source and keeps it, and treats every cut that makes a plan smaller than the request as a claim to check before it stands.
- Reads a newly created drop back from Drop and checks it against the rules of the skill that made it.
- Checks whether a plan still matches project essence when reliable essence context exists.
- Offers an assumption audit when an unresolved assumption could change the plan.

## Verifying a drop

Reviewers open what Drop stored, not the draft a drop was made from, so right after a drop is created, Descartes reads it back. Drop's skills do not share one standard: a report, a handoff, a prototype, and a skill in a hub each set their own rules. So Descartes reads the instructions of the skill that made the drop and checks the drop against them, along with what the user asked for and what its folder asks, and treats each claim in it as an assumption until it has a source. Each fix goes into the drop's next version, so the link already shared keeps working. This needs Drop's MCP tools; without them, Descartes reports the drop as unverified.

## Works with Boil the Ocean Magallanes

Magallanes takes a huge request at its full size and reaches the destination by whatever route stays inside the limits, and Descartes keeps the voyage honest: each limit is a constraint with its source, a "can't" without one is an assumption to check before it changes the destination, and arrival counts only when the oracle confirms it. On that path, sorting the walls is the assumption audit, so Descartes runs it without asking.

## Relationship to Grill Me Aquinas

Grill Me Aquinas provides the meaning layer: canonical terms, project essence, project laws, accidents, open potencies, and language mismatches. Audit Plan Descartes uses that evidence to ask whether a plan is both trustworthy and connected to what the project is really trying to be.

## Distribution boundary

This folder is intentionally self-contained. If you copy `audit-plan-descartes` into another repository, it still contains the manifest, the skill definition, and its supporting references.
