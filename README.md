# World of Sofia

Sofia is the coordinator for a family of specialist skills for Claude Code. Bring her a messy request, a planning problem, a code change, a review, or a UI concern, and she routes the work to the smallest useful set of specialists.

The skills help Claude make clearer plans, orient inside a codebase before editing, review real diffs, simplify artifacts before adding more structure, improve communication, and check whether a rendered UI points attention at the right thing. They are written for Claude Opus in T3 Code; see [the authoring guidelines](docs/skill-authoring-guidelines.md) and [ADR 0003](docs/adr/0003-claude-code-runtime.md).

## Install

```bash
npx skills add fpgarciamtnz/World-of-Sofia --skill '*' -a claude-code -g
```

This uses the [skills CLI](https://github.com/vercel-labs/skills) to install every skill into `~/.claude/skills`, so Sofia can reach all of her specialists. Leave out the flags to choose the skills, agents, and scope yourself, and run `npx skills update -g` to pick up new versions.

To install from a clone instead, for example while editing the skills:

```bash
npm install
npm run check
npm run install:skills
```

The installer copies each valid `skills/<slug>` folder into `~/.claude/skills`, or `$CLAUDE_CONFIG_DIR/skills` when that is set. Existing copies are moved to `~/.claude/.backups/world-of-sofia/<slug>-<timestamp>` first. Claude Code picks up the changes live, so a new session is usually not needed.

To install or update one skill:

```bash
npm run install:skill -- audit-plan-descartes
```

Rerun the install command whenever skills change, since the installed skills are copies.

## How to call Sofia

```text
/sofia-coordinatior
```

Use Sofia when the work spans more than one concern, when you are unsure which skill should act, or when you want a workflow that moves from planning through execution to review. Any specialist can also be called directly, such as `/synthesis-code-hegel`, and Claude loads a skill on its own when its description matches the request.

When you ask to explore limits, challenge over-safe defaults, or work in an early-stage design space, Sofia passes a bolder posture to the specialists instead of creating a separate mode.

## Workflows

**Make plans.** Give Sofia the problem, context, and what good looks like.

```text
/sofia-coordinatior
Problem: [What needs to change or be solved.]
Context: [Project facts, constraints, links, files, or user goals.]
Description: [What good should look like.]
```

She gathers evidence first, runs Aquinas when meaning could change the plan, and audits the plan with Descartes. If the plan depends on existing code, Wittgenstein checks precedent before implementation. The result separates facts, constraints, and assumptions, and you are asked about an assumption audit only when an open assumption could change the plan. Ask for `trace mode`, `Sofia trace`, or `skill contributions` to see which specialists shaped the answer.

**Execute a plan.** Wittgenstein keeps implementation choices tied to what the code already does, and validation proves the deliverable works. After code changes, Hegel reviews the real diff. UI work adds UI Attention Ciceron against the rendered result, and user-facing language can go through Communication Review Ciceron.

**Review.** Bring a diff, branch, PR, rendered screen, message, or proposal, and use the specialist below whose question matches yours.

## Skills

| Skill | Call when | Produces |
| --- | --- | --- |
| [Sofia Coordinatior](skills/sofia-coordinatior) | Work spans several skills, or it is unclear which should act. | Routing, posture handoffs, and the requested plan or review. |
| [Grill Me Aquinas](skills/grill-me-aquinas) | The goal, terms, or scope are unclear, or you want a grill-me session. | A said, meant, and happened record, focused questions, essence candidates, and handoffs. |
| [Audit Plan Descartes](skills/audit-plan-descartes) | A plan needs an evidence check, sources disagree, or prior work needs verifying. | A foundation ledger, open assumptions, and a final plan or verdict. |
| [Auditar PEC](skills/auditar-pec) | A PEC, theoretical framework, or bibliography must be checked against its brief before delivery. | Requirement status, reference and citation checks, an evidence ledger, and whether sources support the claims. |
| [Pattern Code Wittgenstein](skills/pattern-code-wittgenstein) | Existing code should guide what you are about to write. | A recommendation to `reuse`, `extend`, `extract`, `copy carefully`, or `create new`. |
| [Synthesis Code Hegel](skills/synthesis-code-hegel) | Code has changed and needs judgment before merge. | A recommendation to leave, rename, extract, merge, split, inline, deprecate, or delete. |
| [Earned Presence Kondo](skills/earned-presence-kondo) | Something may not earn its cost, or you want a radical rebuild. | A keep-or-remove judgment, or destroy, preserve, and rebuild, with evidence and re-checks. |
| [UI Attention Ciceron](skills/ui-attention-ciceron) | UI work reaches final validation, or a screen needs review. | An attention ranking, language and goal fit, severity, and the smallest correction. |
| [Communication Review Ciceron](skills/communication-review-ciceron) | A message, proposal, or product copy must land with its audience. | Likely uptake, friction points, and a better version. |

Each specialist answers a different question, which is why they stay separate. `code-review` from Claude Code looks for bugs in a diff, while Hegel asks whether the change has the right shape; UI Attention Ciceron makes no eye-tracking claim, and ranks likely attention from observable evidence.

## Commands

```bash
npm run check            # lint, validate skills and traces, run tests
npm run install:skills   # install every skill into Claude Code
npm run new:skill -- "Stoic Triage" "Epictetus"
```

## Repository layout

- `skills/<slug>`: one self-contained skill per folder.
- `scripts`: skill creation, validation, and installation.
- `templates/skill`: source template for new skills.
- `docs`: authoring guidelines, decisions, evaluations, and the research behind the skills.
- `.agents/skills`: skills vendored from `mattpocock/skills`, tracked by `skills-lock.json`. Claude Code does not load them.

The hard rule is isolation: each skill carries its own manifest, instructions, README, and references, so it works when copied out of its folder.

## Philosophy behind the names

The names are memory handles for practical engineering habits:

| Name | Practical habit |
| --- | --- |
| Sofia | Coordinate the specialists so each keeps its own job and hands off cleanly. |
| Descartes | Separate known facts, constraints, assumptions, and missing evidence before trusting a plan. |
| Aquinas | Separate what defines the goal from what merely happened, then build practical truth from evidence. |
| Wittgenstein | Understand meaning through actual use in the repo before inventing new code patterns. |
| Hegel | Review changed code by preserving what works, transforming what no longer fits, and removing what is obsolete. |
| Kondo | Ask whether each surviving thing earns the cost of existing before adding more structure. |
| Cicero | Judge communication and interfaces by how they direct attention and affect the audience. The UI review borrows its two-pass method from Kahneman. |
