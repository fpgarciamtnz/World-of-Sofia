# Skill Markdown Review Tracker

The log below records each review of the skill packages, newest last. Earlier history is in [World-of-Sofia-viejo](https://github.com/fpgarciamtnz/World-of-Sofia-viejo).

## Findings to follow up

- `docs/research/` holds the three long research reports, moved out of the skill packages. `hegel-dialectical-reviewer.md` still contains prototype `TODO` comments for parser integration, retrieval, graph analysis, and coverage/ADR collection, which describe future work rather than runtime instructions. Review these reports only when updating the underlying doctrine.
- `docs/evaluations/magallanes-descartes-pairing-example.md` has not been run yet. Run it in a fresh session with both skills installed, and record the result here.

## Review log

| Date | Reviewer | Scope | Result |
|---|---|---|---|
| 2026-11-06 | Claude | All nine skill packages, tooling, and docs | Migrated to Claude Code as the runtime; see `docs/adr/0003-claude-code-runtime.md`. Added `auditar-pec` and removed `check-with-maxi`. |
| 2026-11-17 | Claude | All skill packages, tooling, and docs | Removed the router and all routing sections; merged Wittgenstein into Hegel and UI Attention into Communication Ciceron; added `boil-the-ocean-magallanes`, a destination-first skill that keeps its limits, paired with Descartes. Seven skills remain; see `docs/adr/0004-few-coordinated-skills.md`. |
| 2026-11-17 | Claude | `audit-plan-descartes` | Added a use: right after a drop is created on Drop, read it back and verify it against the rules of the skill that made it, since Drop's skills each set their own. The method is in `references/drop-verification.md`. |
| 2026-11-19 | Claude | `auditar-pec` | Runs only with `/auditar-pec`. It always loads Aquinas, then Descartes, and its report lists every concept it applied in a "Conceptos revisados" section; see `docs/adr/0005-auditar-pec-explicit-concepts.md`. Not yet run on a real PEC. |
| 2026-11-20 | Claude | `implicit-explicit-ortega` | Added: separates what material says from what it stands on without saying and what it conveys without meaning to, after Ortega's ideas and beliefs. Eight skills remain; see `docs/adr/0006-implicit-explicit-ortega.md`. Not yet tried on a realistic prompt. |
| 2026-11-22 | Claude | `banco-animaciones-aristoteles` | Added: 703 animation prompts classed by Aristotle's categories, with a search script. Nine skills remain; see `docs/adr/0008-banco-animaciones-aristoteles.md`. |
| 2026-11-26 | Claude | `sofia` | Added back as the coordinator, called with `/sofia`: it picks, orders, and hands off between specialists, which keep no routing of their own. Ten skills remain; see `docs/adr/0009-sofia-coordinates.md`. Not yet tried on a realistic multi-skill prompt. |
| 2026-11-26 | Claude | `sofia` | Added phases: make it work, make it efficient, make it look right, in that order, each with its leads, the gaps to look for, and a condition that closes it, in `references/phases.md`. See `docs/adr/0010-sofia-phases.md`. Not yet tried on a realistic prompt. |

## Next review checklist

- [ ] Re-run the inventory after any skill update.
- [ ] Check new or changed relative links.
- [ ] Revisit listed `TODO` items when prototype work begins.
- [ ] Record the date, scope, and result in the review log.
