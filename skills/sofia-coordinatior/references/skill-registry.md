# Skill Registry

Use this registry as a compact routing map. It records when to call each known global, system, and World-of-Sofia project-local skill, how to hand off to it, and how it relates to the other skills.

Do not treat this file as a replacement for the skill bodies. When a skill is selected, load that skill's own `SKILL.md` and follow its instructions.

## Relationship Rules

- `sofia-coordinatior` routes work and preserves role boundaries; it does not author, audit, deploy, review, or implement alone when a specialist applies.
- Goal Lifecycle Mode is coordinator-owned: Sofia drafts and audits durable `/goal` text, then routes execution and completion review to specialists.
- `skill-creator` owns skill structure, trigger metadata, resources, validation, and forward-testing guidance.
- `descartes-skill` and project-local `audit-plan-descartes` own planning evidence, foundation ledgers, unresolved assumptions, verification requirements, and final-plan audit gates.
- `grill-me-aquinas` owns intent clarification, canonical terms, essence context, constraints, non-goals, and pause conditions before a durable goal or plan hardens.
- `pattern-code-wittgenstein` owns pre-implementation repository precedent discovery.
- `synthesis-code-hegel` owns post-implementation synthesis and review after a real diff exists.
- `ui-attention-ciceron` owns rendered UI attention and language-fit validation.
- `communication-review-ciceron` owns rhetorical fitness for messages, proposals, and user-facing communication.
- Project-local World-of-Sofia skills override global skills with the same responsibility only for work inside the World-of-Sofia repository or while showcasing those project-local skills.
- If a plugin or session-provided skill is relevant but absent from this registry, inspect its available metadata dynamically and place it into the closest matching role before proceeding.

## Global and System Skills

| Skill | Location | Trigger | How to call | Relationship and handoff |
|---|---|---|---|---|
| `sofia-coordinatior` | global or project-local | The user invokes `$sofia-coordinatior`, asks to coordinate Sofia skills, route a workflow, create/update/review a skill, create a Codex goal, pursue a goal, or enforce audit gates. | Load this skill first, identify the phase, then select specialists from this registry. | Routing owner. Handoff to specialist skills instead of absorbing their work. |
| `skill-creator` | system | A skill will be created, updated, packaged, validated, or forward-tested. | Invoke `$skill-creator`, then follow its creation/update workflow. | Runs after coordinator scope selection and before any skill authoring. Pairs with Descartes for plans and validation after edits. |
| `descartes-skill` | global | Planning, architecture, strategy, roadmap, assumption audit, or any final plan that needs evidence control. | Invoke `$descartes-skill`; use its structured gate before final plan output. | Planning auditor. Runs before final plans and before planning-sensitive review recommendations. |
| `openai-docs` | system | OpenAI API/product questions, current Codex docs, model selection, or official OpenAI guidance. | Invoke `$openai-docs`; use official OpenAI sources for current facts. | Documentation specialist. May feed goal or implementation plans through Descartes. |
| `skill-installer` | system | List, install, or import Codex skills from curated sources or GitHub repos. | Invoke `$skill-installer` and follow its install workflow. | Installation specialist. Handoff to Sofia after install if routing policy must be updated. |
| `plugin-creator` | system | Create a Codex plugin, scaffold plugin directories, or update plugin metadata. | Invoke `$plugin-creator`. | Plugin authoring specialist. Distinct from `skill-creator`; use both only when a plugin includes skills. |

## World-of-Sofia Project Skills

Use these while working inside `World-of-Sofia`, evaluating that repository, or showcasing project-local skills.

| Skill | Location | Trigger | How to call | Relationship and handoff |
|---|---|---|---|---|
| `sofia-coordinatior` | project-local | World-of-Sofia skill routing, Goal Lifecycle Mode, skill creation/update plans, or multi-skill workflow coordination. | Load `skills/sofia-coordinatior/SKILL.md`, then select the smallest specialist sequence. | Coordinator and goal lifecycle owner. Produces Goal Mode Briefs and role handoffs. |
| `grill-me-aquinas` | project-local | Fuzzy requests, unclear intent, project essence, canonical terms, goal constraints, non-goals, or pause conditions. | Load `skills/grill-me-aquinas/SKILL.md` before goal drafting when meaning is unstable. | Meaning and essence owner. Feeds Descartes with facts, constraints, and goal-handoff candidates. |
| `audit-plan-descartes` | project-local | Project-local planning audit demonstrations, final plans, Goal Mode Brief audits, or essence-fit checks. | Load `skills/audit-plan-descartes/SKILL.md` before finalizing a plan or goal. | Plan-trust owner. Produces readiness, unresolved assumptions, verification requirements, and audit result. |
| `pattern-code-wittgenstein` | project-local | World-of-Sofia precedent discovery, pattern scout work, or evaluation of that project skill. | Load `skills/pattern-code-wittgenstein/SKILL.md` before implementation pattern choices. | Pre-implementation precedent owner. If code already changed, hand off to Hegel instead. |
| `synthesis-code-hegel` | project-local | Review a real diff, staged worktree, branch, PR, or completed goal implementation. | Load `skills/synthesis-code-hegel/SKILL.md` after concrete changes exist. | Post-diff review owner. Checks whether changed code should be left, renamed, extracted, merged, split, inlined, deprecated, or deleted. |
| `ui-attention-ciceron` | project-local | UI goal completion depends on rendered attention, visual hierarchy, CTA copy, or emotional language fit. | Load `skills/ui-attention-ciceron/SKILL.md` after rendered evidence exists. | UI validation owner. Routes missed UI goals back through Sofia. |
| `communication-review-ciceron` | project-local | A goal includes messages, proposals, PR comments, reviews, or user-facing communication. | Load `skills/communication-review-ciceron/SKILL.md` when communication quality is a completion criterion. | Communication validation owner. Produces rhetorical-fit review and smallest useful rewrite. |

## Preferred Handoff Orders

Use the shortest sequence that covers the task:

- Create a Codex goal: `sofia-coordinatior` -> `grill-me-aquinas` when intent/essence is unclear -> `audit-plan-descartes` -> Goal Mode Brief.
- Implement a goal safely: Goal Mode Brief -> `pattern-code-wittgenstein` before implementation choices -> implementation -> validation -> `synthesis-code-hegel`.
- UI goal: Goal Mode Brief -> implementation -> rendered evidence -> `ui-attention-ciceron` -> fixes if needed.
- Communication goal: Goal Mode Brief -> draft/rewrite -> `communication-review-ciceron` -> revised message.
- New skill plan: `sofia-coordinatior` -> `skill-creator` -> `descartes-skill` or `audit-plan-descartes` -> final plan.
- New skill implementation: `sofia-coordinatior` -> `skill-creator` -> edit/validate -> optional forward-test.
- Repo implementation plan: `sofia-coordinatior` -> `audit-plan-descartes` -> `pattern-code-wittgenstein` when precedent matters -> final plan.
- Implemented change review: `sofia-coordinatior` -> inspect real diff -> `synthesis-code-hegel` -> Descartes only if final recommendation depends on planning assumptions.

## Refresh Protocol

Refresh this registry when a global or World-of-Sofia project skill is added, removed, renamed, or given a materially different trigger. For each change, update only the affected row and rerun the coordinator skill validator.
