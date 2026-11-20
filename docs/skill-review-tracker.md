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

The table records the 2026-09-14 inventory. The 2026-11-06 migration in the log below rewrote these packages for Claude Code, and moved or removed some of the resources it lists. The 2026-11-17 restructure removed `sofia-coordinatior` and merged `pattern-code-wittgenstein` and `ui-attention-ciceron` into other skills.

## Findings to follow up

- `docs/research/` holds the three long research reports, moved out of the skill packages. `hegel-dialectical-reviewer.md` still contains prototype `TODO` comments for parser integration, retrieval, graph analysis, and coverage/ADR collection, which describe future work rather than runtime instructions. Review these reports only when updating the underlying doctrine.
- `docs/evaluations/magallanes-descartes-pairing-example.md` has not been run yet. Run it in a fresh session with both skills installed, and record the result here.

## Review log

| Date | Reviewer | Scope | Result |
|---|---|---|---|
| 2026-09-14 | Codex | All Markdown files under `skills/` | Inventory and structural review completed; follow-ups recorded above. |
| 2026-11-06 | Claude | All nine skill packages, tooling, and docs | Migrated to Claude Code as the runtime; see `docs/adr/0003-claude-code-runtime.md`. Added `auditar-pec` and removed `check-with-maxi`. |
| 2026-11-17 | Claude | All skill packages, tooling, and docs | Removed the router and all routing sections; merged Wittgenstein into Hegel and UI Attention into Communication Ciceron; added `boil-the-ocean-magallanes`, a destination-first skill that keeps its limits, paired with Descartes. Seven skills remain; see `docs/adr/0004-few-coordinated-skills.md`. |
| 2026-11-17 | Claude | `audit-plan-descartes` | Added a use: right after a drop is created on Drop, read it back and verify it against the rules of the skill that made it, since Drop's skills each set their own. The method is in `references/drop-verification.md`. |
| 2026-11-19 | Claude | `auditar-pec` | Runs only with `/auditar-pec`. It always loads Aquinas, then Descartes, and its report lists every concept it applied in a "Conceptos revisados" section; see `docs/adr/0005-auditar-pec-explicit-concepts.md`. Not yet run on a real PEC. |
| 2026-11-20 | Claude | `implicit-explicit-ortega` | Added: separates what material says from what it stands on without saying and what it conveys without meaning to, after Ortega's ideas and beliefs. Eight skills remain; see `docs/adr/0006-implicit-explicit-ortega.md`. Not yet tried on a realistic prompt. |

## Next review checklist

- [ ] Re-run the inventory after any skill update.
- [ ] Check new or changed relative links.
- [ ] Revisit listed `TODO` items when prototype work begins.
- [ ] Record the date, scope, and result in the review log.
