# Skill Markdown Review Tracker

**Review date:** 2026-09-14  
**Scope:** Markdown files under `skills/`  
**Review type:** General inventory and structural inspection

## Current review status

All nine skill packages were inventoried. Their `SKILL.md` files, package `README.md` files, and registered reference Markdown files were opened or structurally inspected for headings, size, cross references, and obvious unfinished markers.

| Skill package | Core skill | README | References / research | Status | Notes |
|---|---:|---:|---:|---|---|
| `audit-plan-descartes` | Reviewed | Reviewed | Reviewed | Complete | Workflow, essence-fit gate, and output contract are present. |
| `check-with-maxi` | Reviewed | Reviewed | Reviewed | Complete | External Windows path dependency is documented. |
| `communication-review-ciceron` | Reviewed | Reviewed | Reviewed | Complete | Core workflow, output format, rhetorical framework, and research report are present. |
| `earned-presence-kondo` | Reviewed | Reviewed | Reviewed | Complete | Decision test, safety rules, and foundation reference are present. |
| `grill-me-aquinas` | Reviewed | Reviewed | Reviewed | Complete | Large research report and essence map are included; deeper editorial review can be separate. |
| `pattern-code-wittgenstein` | Reviewed | Reviewed | Reviewed | Complete | Workflow, evidence schema, scoring, bounded contexts, tooling, and trace contract are linked. |
| `sofia-coordinatior` | Reviewed | Reviewed | Reviewed | Complete | Coordination gates, registry, and trace contract are present. |
| `synthesis-code-hegel` | Reviewed | Reviewed | Reviewed | Complete | Workflow and foundation reference are present. Foundation contains prototype `TODO` notes. |
| `ui-attention-ciceron` | Reviewed | Reviewed | N/A | Complete | UI trigger, evidence model, severity, handoff, and output contract are present. |

The table records the 2026-09-14 inventory. The 2026-11-06 migration in the log below rewrote these packages for Claude Code, and moved or removed some of the resources it lists.

## Findings to follow up

- `docs/research/` holds the three long research reports, moved out of the skill packages. `hegel-dialectical-reviewer.md` still contains prototype `TODO` comments for parser integration, retrieval, graph analysis, and coverage/ADR collection, which describe future work rather than runtime instructions. Review these reports only when updating the underlying doctrine.
- The package name `sofia-coordinatior` is consistently spelled this way in the repository. Consider a coordinated rename only if the spelling is intended to change; otherwise preserve it to avoid breaking references.

## Review log

| Date | Reviewer | Scope | Result |
|---|---|---|---|
| 2026-09-14 | Codex | All Markdown files under `skills/` | Inventory and structural review completed; follow-ups recorded above. |
| 2026-11-06 | Claude | All nine skill packages, tooling, and docs | Migrated to Claude Code as the runtime; see `docs/adr/0003-claude-code-runtime.md`. Added `auditar-pec` and removed `check-with-maxi`. |

## Next review checklist

- [ ] Re-run the inventory after any skill update.
- [ ] Check new or changed relative links.
- [ ] Revisit listed `TODO` items when prototype work begins.
- [ ] Record the date, scope, and result in the review log.
