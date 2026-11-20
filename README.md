# World of Sofia

World of Sofia is a small family of skills for Claude Code. Each skill does its own job from start to finish: take a huge request on at its full size and reach the destination you describe by whatever route stays inside the limits, audit a plan, clarify what a request means, judge code before and after a change, decide what earns its place, review how a message or a screen lands, or audit an academic submission.

There is no router. Claude Code already loads a skill whose description matches the request, so a skill that only sends work elsewhere adds a step without adding judgment. Skills that work together say so in their own instructions, and the main pair is Boil the Ocean Magallanes with Audit Plan Descartes. The skills are written for Claude Opus in T3 Code; see [the authoring guidelines](docs/skill-authoring-guidelines.md) and [ADR 0004](docs/adr/0004-few-coordinated-skills.md).

## Install

```bash
npx skills add fpgarciamtnz/World-of-Sofia
```

The [skills CLI](https://github.com/vercel-labs/skills) asks which skills, agents, and scope to install. Each skill works alone, but install Boil the Ocean Magallanes together with Audit Plan Descartes, since they audit each other's claims. Run `npx skills update` to pick up new versions.

To install from a clone instead, for example while editing the skills:

```bash
npm install
npm run check
npm run install:skills
```

The installer copies each valid `skills/<slug>` folder into `~/.claude/skills`, or `$CLAUDE_CONFIG_DIR/skills` when that is set. Existing copies are moved to `~/.claude/.backups/world-of-sofia/<slug>-<timestamp>` first. It only adds and updates: a skill removed from this repository stays installed until you delete its folder. Claude Code picks up the changes live, so a new session is usually not needed.

To install or update one skill:

```bash
npm run install:skill -- audit-plan-descartes
```

Rerun the install command whenever skills change, since the installed skills are copies.

## How the skills work together

Call a skill by name, such as `/audit-plan-descartes`, or describe the work and let Claude load the skill that matches. Auditar PEC is the exception: it runs only when you type `/auditar-pec`.

**Something huge, or a far destination.** Boil the Ocean Magallanes is Sofia's boil-the-ocean: it keeps the whole of that skill, takes the request at its full size, and treats it as the destination. The destination and the limits stay fixed, and only the route changes. Whatever blocks the way is a limit, which stays; an obstacle, which it goes around, as far around as it takes; or a habit, such as "too much work", which never counts as a limit. Before a long detour it asks the Panama Canal question: do we need to go this far, or can we build a channel through the obstacle? Audit Plan Descartes keeps the voyage honest: every limit has a source, a "can't" is checked before it changes the destination, and arrival counts only when the oracle confirms it.

**A plan.** Descartes separates facts, constraints, and assumptions, records every limit a plan keeps with its source, and checks every cut it makes. When the goal or its terms are unclear, Grill Me Aquinas first separates what was said, what was meant, and what the repository shows, and gives Descartes the essence the plan must preserve.

**A drop.** Right after a drop is created on Drop, Descartes reads it back and checks it against the rules of the skill that made it, since Drop's skills each set their own. Each fix goes into the drop's next version, so its link keeps working.

**What goes unsaid.** Implicit Explicit Ortega separates what a request, plan, prompt, or document says from what it stands on without saying and what it conveys without meaning to, then decides what to state, what to cut, and what to leave implicit.

**Code.** Synthesis Code Hegel works on both sides of a change: before, it decides from precedent whether to reuse, extend, extract, copy, or create; after, it judges the real diff. Earned Presence Kondo asks whether something deserves to exist at all, and decides what a rebuild may destroy and what must survive.

**Audience.** Communication Review Ciceron reviews how a message or a rendered screen lands. Auditar PEC audits an academic submission against its brief and rubric. It always loads Grill Me Aquinas to settle what the brief asks, then Audit Plan Descartes to separate facts from assumptions, and its report lists every concept it checked.

## Skills

| Skill | Call when | Produces |
| --- | --- | --- |
| [Boil the Ocean Magallanes](skills/boil-the-ocean-magallanes) | A request is huge, such as a rewrite, a port, or a rebuild, or you know where you want to end up and the way looks long or blocked. | The request at full size as the destination, the limits with their sources, an oracle, a route around every obstacle, checked units, and a hand-back. |
| [Audit Plan Descartes](skills/audit-plan-descartes) | A plan needs an evidence check, sources disagree, prior work or a drop just created needs verifying, or a voyage's limits and arrival need auditing. | A foundation ledger, the limits with their sources, open assumptions, and a final plan or verdict. |
| [Grill Me Aquinas](skills/grill-me-aquinas) | The goal, terms, or scope are unclear, or you want a grill-me session. | A said, meant, and happened record, focused questions, essence candidates, and what a plan must preserve. |
| [Implicit Explicit Ortega](skills/implicit-explicit-ortega) | Work will be read without your context, a misunderstanding came from something nobody said, or you want the implicit made explicit. | What the material says, what it stands on without saying, what it conveys without meaning to, and the sentences to add or cut. |
| [Synthesis Code Hegel](skills/synthesis-code-hegel) | Code is about to be written and precedent matters, or code has changed and needs judgment before merge. | `reuse`, `extend`, `extract`, `copy carefully`, or `create new`; or leave, rename, extract, merge, split, inline, deprecate, or delete. |
| [Earned Presence Kondo](skills/earned-presence-kondo) | Something may not earn its cost, or you want a radical rebuild. | A keep-or-remove judgment, or destroy, preserve, and rebuild, with evidence and re-checks. |
| [Communication Review Ciceron](skills/communication-review-ciceron) | A message, proposal, or copy must land with its audience, or UI work reaches final validation or a screen needs review. | Likely uptake, friction, and a better version; or an attention ranking, severity, and the smallest correction. |
| [Auditar PEC](skills/auditar-pec) | You type `/auditar-pec` to check a PEC, theoretical framework, or bibliography against its brief and rubric before delivery; Claude never starts it alone. It stops and asks if the rubric is missing. | The Aquinas and Descartes concepts it checked, requirement and rubric status, reference and citation checks, an evidence ledger, and whether sources support the claims. |

Each skill answers a different question. `code-review` from Claude Code looks for bugs in a diff, while Hegel asks whether the change has the right shape, and Ciceron makes no eye-tracking claim, ranking likely attention from observable evidence.

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
| Sofia | The family's name: practical wisdom kept as a few habits, each doing its own job. |
| Magallanes | Take the request on at its full size, keep the destination and the limits, and change the route: with the eastern route closed to him by treaty, Magellan sailed west to reach the Spice Islands. Before sailing the long way, ask whether a canal could cut through, as Panama later did. |
| Descartes | Separate known facts, constraints, assumptions, and missing evidence before trusting a plan, including the limits it keeps and the cuts it makes. |
| Aquinas | Separate what defines the goal from what merely happened, then build practical truth from evidence. |
| Ortega | Tell the ideas we hold and state from the beliefs we stand on without noticing, and remember that every saying says less than it means and more than it intends. |
| Hegel | Set new code against what already exists, then preserve what works, transform what no longer fits, and remove what is obsolete. It judges resemblance by use, as Wittgenstein taught: call sites and tests outweigh shared names. |
| Kondo | Ask whether each surviving thing earns the cost of existing before adding more structure. |
| Cicero | Judge communication and interfaces by how they direct attention and affect the audience. The UI review borrows its two-pass method from Kahneman. |
