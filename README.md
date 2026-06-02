# World of Sofia

Sofia is the coordinator for a family of specialist Codex skills. Bring her a messy request, a planning problem, a code change, a review, or a UI concern, and she routes the work to the smallest useful set of specialists.

World of Sofia is the skill collection behind that coordinator. It helps Codex make clearer plans, orient inside a codebase before editing, review real diffs, improve communication, and validate whether a rendered UI points attention at the right thing.

## How to call Sofia

Call Sofia with the coordinator skill:

```text
$sofia-coordinatior
```

Use Sofia when the work spans more than one concern, when you are unsure which skill should act, or when you want a workflow that can move from planning to execution to review without blending every responsibility into one prompt.

Sofia routes the work; she does not replace the specialists. Descartes audits plans, Aquinas clarifies intent and project essence, Wittgenstein finds existing code patterns, Hegel reviews real code changes, and the Ciceron skills review communication or rendered UI attention. When the user asks to explore AI limits, challenge over-safe defaults, or work in an early-stage design space, Sofia passes a bolder posture to the selected specialists instead of creating a separate mode.

When you say to check with Maxi, use the Check With Maxi skill. It reads `C:\Users\garqu\OneDrive\COdex\Maxi-context\SOFIA-HANDOFF.md` first, explores `C:\Users\garqu\OneDrive\COdex\Maxi-context`, and passes relevant Maxi evidence back into the Sofia workflow.

## Install

```bash
npm install
npm run validate:skills
npm run install:skills
```

The installer copies every validation-valid folder from `skills/<slug>` into `$CODEX_HOME/skills` when `CODEX_HOME` is set, otherwise into `~/.codex/skills`. Existing target skills are backed up under `.backups/world-of-sofia/<slug>-<timestamp>` before they are replaced.

To install or update one skill:

```bash
npm run install:skill -- audit-plan-descartes
```

Rerun the install command whenever skills change. Open a new Codex session if an installed or updated skill does not appear immediately.

## Sofia workflow modes

### 1. Make Plans

Use this mode when you have a problem, context, and description, but not yet a trusted implementation path.

Call Sofia with the planning request:

```text
$sofia-coordinatior
Problem: [What needs to change or be solved.]
Context: [Project facts, constraints, links, files, or user goals.]
Description: [What good should look like.]
```

Sofia first explores the request and available project evidence. She runs Grill Me Aquinas as a compact observer before plan finalization so Aquinas can separate what you said from what you likely mean, name canonical terms, and preserve project essence instead of planning from accidental wording. Aquinas asks only when evidence cannot answer, asking more early while learning and less once project memory can resolve the branch.

Sofia then uses Audit Plan Descartes to separate facts, constraints, unresolved assumptions, verification requirements, and optional essence-fit risks. Aquinas supplies meaning and essence evidence; Descartes decides whether the plan is trustworthy. When the plan depends on existing code, Sofia routes to Pattern Code Wittgenstein before implementation so Codex can decide whether to reuse, extend, extract, copy carefully, or create new.

If the request calls for bolder work, Sofia adds a posture handoff such as `bold-by-default`: prefer the final-shape design, challenge compatibility inertia, surface the ambitious option before narrowing, and keep destructive actions or broad filesystem mutation behind explicit approval.

The result is a decision-ready plan with a clear specialist sequence, the evidence it depends on, and the assumptions that should not be treated as facts.

### 2. Execute Plan

Use this mode when the plan is accepted and Codex is ready to work on the deliverable.

Sofia keeps execution grounded in the codebase instead of treating the plan as permission to invent new structure. For code work, she routes through Pattern Code Wittgenstein before important implementation choices so Codex can inspect nearby files, tests, helper APIs, naming, and bounded contexts.

During implementation, Codex should keep edits scoped to the requested deliverable, preserve existing behavior unless the plan explicitly changes it, and validate with the local commands that match the touched area. Sofia's role is to keep the handoffs clean: Aquinas protects intended meaning, Descartes protects planning facts, Wittgenstein protects repository fit, and validation proves the deliverable works.

After real code changes exist, Sofia routes review through Synthesis Code Hegel. Hegel inspects the actual diff and decides whether the change should be left as-is, renamed, extracted, merged, split, inlined, deprecated, or deleted. If the deliverable includes UI, UI Attention Ciceron can review the rendered result. If the deliverable includes user-facing language, Communication Review Ciceron can tighten the message.

### 3. Review

Use this mode when you have a diff, branch, PR, rendered screen, message, proposal, or completed implementation that needs judgment before close.

Each specialist has a different review job:

| Specialist | Review role |
| --- | --- |
| Synthesis Code Hegel | Reviews real diffs, staged work, branches, or PRs. It names the changed system, classifies tension or contradiction, and recommends the smallest safe synthesis action. |
| UI Attention Ciceron | Reviews live pages, local browser targets, screenshots, or mockups. It produces `Attention Ranking`, `Likely User Attention Path`, intent-fit judgment, severity, and a `Sofia Handoff Packet` when attention misses the intended UI effect. |
| Communication Review Ciceron | Reviews messages, proposals, comments, review feedback, or product copy. It separates observed wording from inferred intent, names likely audience uptake, and gives the smallest useful rewrite. |
| Audit Plan Descartes | Reviews planning-sensitive claims. It checks whether conclusions rest on facts, constraints, or unresolved assumptions, and whether essence evidence has been overclaimed. |
| Grill Me Aquinas | Reviews meaning and intent drift. It is useful when the diff or review appears to satisfy surface wording while missing the project's real purpose. |
| Pattern Code Wittgenstein | Re-enters only when review exposes missing pattern evidence. It answers what existing code family the work should resemble before more code is written. |
| Sofia Coordinatior | Chooses the sequence, keeps responsibilities separate, and routes missed outcomes back to the right specialist instead of flattening every review into one opinion. |

For UI review, use the project language from UI Attention Ciceron. The skill does not claim eye-tracking certainty or produce a heat map. It ranks likely attention peaks from observable visual, textual, and DOM evidence.

## Skill roles

| Skill | Call when | Sofia uses it for | Produces |
| --- | --- | --- | --- |
| [Sofia Coordinatior](skills/sofia-coordinatior) | Work spans multiple skills, a skill workflow needs routing, or a bolder posture handoff is useful. | Coordination, role boundaries, planning gates, boldness handoffs, and specialist handoffs. | Handoff order, posture, plans, validation direction, and review routing. |
| [Check With Maxi](skills/check-with-maxi) | The user asks to check with Maxi, ask Maxi, consult Maxi, compare against Maxi, or inspect Maxi context. | Local Maxi handoff lookup before Sofia work. | Files inspected, relevant Maxi evidence, impact on the current request, and open gaps. |
| [Audit Plan Descartes](skills/audit-plan-descartes) | A plan needs evidence control, assumption handling, verification requirements, or essence-fit checking. | Plan trust before final planning output. | Foundation ledger, unresolved assumptions, assumption audit, essence-fit check, and final plan support. |
| [Grill Me Aquinas](skills/grill-me-aquinas) | Direct grill-me sessions, Sofia planning, project truth rebuilding, canonical terms, or unclear scope that needs clearer essence. | Active observer questioning and meaning clarification before plans, implementation handoffs, or review-sensitive judgments. | Said/meant/happened records, question ladder output, essence candidates, constraints, non-goals, pause conditions, and Descartes-ready handoffs. |
| [Pattern Code Wittgenstein](skills/pattern-code-wittgenstein) | Codex should inspect existing repository patterns before implementing or choosing an abstraction. | Pre-implementation precedent discovery and bounded-context fit. | Evidence-backed recommendation to `reuse`, `extend`, `extract`, `copy carefully`, or `create new`. |
| [Synthesis Code Hegel](skills/synthesis-code-hegel) | Code has already changed and needs review before merge, cleanup, or final acceptance. | Post-implementation synthesis and preservation of working behavior. | Diff review findings and recommendation to leave, rename, extract, merge, split, inline, deprecate, or delete. |
| [Communication Review Ciceron](skills/communication-review-ciceron) | A message, proposal, PR comment, review, or product copy needs to land clearly with its audience. | Communication validation for user-facing or team-facing language. | Rhetorical-fit review, friction points, audience uptake, and a clearer rewrite. |
| [UI Attention Ciceron](skills/ui-attention-ciceron) | A UI change, screenshot, local page, or mockup needs attention, hierarchy, CTA, or language-fit validation. | Rendered UI review before closing UI-facing work. | `Attention Ranking`, likely attention path, language fit, intent fit, severity, smallest useful correction, and Sofia handoff when needed. |

## Commands

```bash
npm install
npm run validate:skills
npm run validate:skill-traces
npm run check:isolation
npm run test
npm run check
```

Create a new skill from the template:

```bash
npm run new:skill -- "Stoic Triage" "Epictetus"
npm run validate:skills
npm run check:isolation
npm run test
```

New skills should state their degree of freedom in `SKILL.md`: `conservative`, `exploratory`, or `bold-by-default`.

The legacy `sync:skills` and `sync:skill` aliases are still available and run the same installer as `install:skills` and `install:skill`.

## Repository layout

- `skills/<slug>`: one self-contained skill per folder.
- `scripts`: skill creation, validation, installation, and repository analysis tools.
- `scripts/lib`: shared root helpers for skill validation and loading.
- `templates/skill`: source template for new skills.
- `docs`: architecture notes and evaluation cases.

The hard rule is isolation: every skill carries its own manifest, instructions, README, and references so it can be copied and installed without private files from another skill.

## Philosophy behind the names

The philosopher names are memory handles for practical engineering habits:

| Name | Practical habit |
| --- | --- |
| Sofia | Coordinate the specialists so each skill keeps its own job and hands off cleanly. |
| Descartes | Separate known facts, constraints, assumptions, and missing evidence before trusting a plan. |
| Aquinas | Separate what defines the goal from what merely happened, then build practical truth from potency, evidence, and relearning. |
| Wittgenstein | Understand meaning through actual repo use before inventing new code patterns. |
| Hegel | Review changed code by preserving what works, transforming what no longer fits, and removing what is obsolete. |
| Ciceron | Judge communication and UI language by how they direct attention and affect the audience. |
