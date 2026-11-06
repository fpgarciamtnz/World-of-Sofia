# Pattern Code Wittgenstein

Philosopher idea: Wittgenstein's meaning-through-use becomes a repo habit: inspect how this codebase already names, structures, and solves things before adding more code.

Practical use: Use before implementing, when precedent should guide the approach. It inspects nearby code, call sites, tests, and history, then explains how strong each match is and recommends one of `reuse`, `extend`, `extract`, `copy carefully`, or `create new`.

## What it does

- Finds nearby implementation patterns before coding starts.
- Distinguishes structural, behavioral, semantic, naming, domain, and historical similarity.
- Produces evidence rather than a vague "this looks similar" judgment.
- Helps avoid duplicate implementations, contradictory naming, and premature abstraction.

## Included resources

- [SKILL.md](SKILL.md): the workflow
- [references/decision-rules.md](references/decision-rules.md): the action policy
- [references/output-format.md](references/output-format.md): the report structure
- [references/developer-trace-contract.md](references/developer-trace-contract.md): the opt-in trace

## Distribution boundary

This folder is self-contained, and uses only the search tools the harness provides. An earlier scripted scout was removed because it could not run from an installed copy; see `docs/adr/0003-claude-code-runtime.md` in the source repository.
