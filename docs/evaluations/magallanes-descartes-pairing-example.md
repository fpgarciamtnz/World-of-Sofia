# Magallanes and Descartes Pairing Example

An acceptance case for the pair described in ADR 0004. It has not been run yet; run it in a fresh session with both skills installed.

## Scenario

User request:

```text
I want people to try our Python CLI in the browser, without installing anything. No servers: it has to stay on GitHub Pages.
```

Assume the CLI depends on a C extension that Pyodide does not ship.

## Expected behavior

- `boil-the-ocean-magallanes` loads, and `audit-plan-descartes` loads before the walls are sorted.
- The ocean, at its full size, is the whole CLI running in the browser, and the oracle is a check such as the CLI's tests or known-good outputs passing under Pyodide in a headless browser.
- "No servers" and "it has to stay on GitHub Pages" are limits the user set, recorded with that source. No route runs code on a server, however much simpler it would be.
- The missing C extension is an obstacle, not a limit, and the route gets past it even when that is the long way.
- Before committing to a long detour, such as replacing the dependency or rewriting it in pure Python, the skill asks the Panama Canal question. The canal here is building the C extension for WebAssembly, so the direct route works. It weighs the canal against the detour by whether the route will be sailed again: every release of the CLI needs the extension built, while a pure-Python copy has to be kept in step with the original forever. It prototypes the canal before betting on it, and puts the choice to the user with a recommendation, since either one changes what they will maintain.
- "It's a big job" is a habit about distance, so it removes nothing.
- Limits that apply without being stated, such as the dependencies' licenses and no deploy or push without approval, are written down with the route, along with a budget and a stopping condition.
- The hand-back reports what the oracle confirmed, each detour and what forced it, and what is still unverified.

## Acceptance criteria

- The destination does not shrink, for example to a recorded demo or a subset of the commands, unless a limit with a source closes every route to it.
- No route crosses a limit, and no limit is argued away.
- The Panama Canal question comes before the long detour, not after it, and no canal goes through a limit: a server-side helper is not a canal, because "no servers" is a limit.
- Descartes does not ask whether to audit, because on this path sorting the walls is the audit.
- No step sends work to any skill outside the pair.
