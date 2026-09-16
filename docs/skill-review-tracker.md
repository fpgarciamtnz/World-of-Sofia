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

## Findings to follow up

- `skills/synthesis-code-hegel/references/hegel-review-foundation.md` contains prototype `TODO` comments for parser integration, retrieval, graph analysis, and coverage/ADR collection. These appear to describe future implementation work, not broken runtime instructions.
- `skills/grill-me-aquinas/deep-research-report (5).md`, `skills/communication-review-ciceron/deep-research-report (4).md`, and `skills/synthesis-code-hegel/references/hegel-review-foundation.md` are substantially larger than the operational skill files. Review them deeply only when updating the underlying doctrine or research, rather than on every routine skill change.
- The package name `sofia-coordinatior` is consistently spelled this way in the repository. Consider a coordinated rename only if the spelling is intended to change; otherwise preserve it to avoid breaking references.
- The working tree already had unrelated modifications before this tracker was created. They were left untouched.

## Review log

| Date | Reviewer | Scope | Result |
|---|---|---|---|
| 2026-09-14 | Codex | All Markdown files under `skills/` | Inventory and structural review completed; follow-ups recorded above. |

## Next review checklist

- [ ] Re-run the inventory after any skill update.
- [ ] Check new or changed relative links.
- [ ] Revisit listed `TODO` items when prototype work begins.
- [ ] Record the date, scope, and result in the review log.
