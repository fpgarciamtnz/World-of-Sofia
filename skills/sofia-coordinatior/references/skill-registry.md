# Skill Registry

Use this registry as a compact routing map. It records when to call each known global, system, and World-of-Sofia project-local skill, how to hand off to it, and how it relates to the other skills.

Do not treat this file as a replacement for the skill bodies. When a skill is selected, load that skill's own `SKILL.md` and follow its instructions.

## Relationship Rules

- `sofia-coordinatior` routes work and preserves role boundaries; it does not author, audit, deploy, review, or implement alone when a specialist applies.
- `sofia-coordinatior` owns posture handoffs. When users ask to explore AI limits, challenge over-safe defaults, or work in an early-stage design space, Sofia passes `exploratory` or `bold-by-default` instructions to selected specialists without creating a separate mode.
- `skill-creator` owns skill structure, trigger metadata, resources, validation, and forward-testing guidance.
- `descartes-skill` and project-local `audit-plan-descartes` own planning evidence, foundation ledgers, unresolved assumptions, verification requirements, and final-plan audit gates.
- `grill-me-aquinas` owns active observer questioning, intent clarification, canonical terms, essence context, constraints, non-goals, and pause conditions before a plan hardens.
- `check-with-maxi` owns local Maxi handoff lookup. It reads Maxi context as evidence and hands relevant findings back to Sofia or the selected specialist without treating Maxi notes as automatic authority.
- `pattern-code-wittgenstein` owns pre-implementation repository precedent discovery.
- `synthesis-code-hegel` owns post-implementation synthesis and review after a real diff exists.
- `earned-presence-kondo` owns subtractive and radical rebuild review. It asks whether UI, code, docs, workflows, features, options, copy, or rules earn the cost of existing before Sofia adds more structure, and it decides what to destroy, preserve, and rebuild when the user wants to break the old shape.
- `ui-attention-ciceron` owns automatic rendered UI attention and language-fit validation for UI-changing work.
- `communication-review-ciceron` owns rhetorical fitness for messages, proposals, and user-facing communication.
- Project-local World-of-Sofia skills override global skills with the same responsibility only for work inside the World-of-Sofia repository or while showcasing those project-local skills.
- If a plugin or session-provided skill is relevant but absent from this registry, inspect its available metadata dynamically and place it into the closest matching role before proceeding.

## Global and System Skills

| Skill | Location | Trigger | How to call | Relationship and handoff |
|---|---|---|---|---|
| `sofia-coordinatior` | global or project-local | The user invokes `$sofia-coordinatior`, asks to coordinate Sofia skills, route a workflow, create/update/review a skill, explore AI limits, challenge over-safe defaults, or enforce audit gates. | Load this skill first, identify the phase and posture, then select specialists from this registry. | Routing owner. Handoff to specialist skills instead of absorbing their work. |
| `skill-creator` | system | A skill will be created, updated, packaged, validated, or forward-tested. | Invoke `$skill-creator`, then follow its creation/update workflow. | Runs after coordinator scope selection and before any skill authoring. Pairs with Descartes for plans and validation after edits. |
| `descartes-skill` | global | Planning, architecture, strategy, roadmap, assumption audit, or any final plan that needs evidence control. | Invoke `$descartes-skill`; use its structured gate before final plan output. | Planning auditor. Runs before final plans and before planning-sensitive review recommendations. |
| `openai-docs` | system | OpenAI API/product questions, current Codex docs, model selection, or official OpenAI guidance. | Invoke `$openai-docs`; use official OpenAI sources for current facts. | Documentation specialist. May feed planning or implementation work through Descartes. |
| `skill-installer` | system | List, install, or import Codex skills from curated sources or GitHub repos. | Invoke `$skill-installer` and follow its install workflow. | Installation specialist. Handoff to Sofia after install if routing policy must be updated. |
| `plugin-creator` | system | Create a Codex plugin, scaffold plugin directories, or update plugin metadata. | Invoke `$plugin-creator`. | Plugin authoring specialist. Distinct from `skill-creator`; use both only when a plugin includes skills. |

## World-of-Sofia Project Skills

Use these while working inside `World-of-Sofia`, evaluating that repository, or showcasing project-local skills.

| Skill | Location | Trigger | How to call | Relationship and handoff |
|---|---|---|---|---|
| `sofia-coordinatior` | project-local | World-of-Sofia skill routing, skill creation/update plans, boldness posture handoffs, or multi-skill workflow coordination. | Load `skills/sofia-coordinatior/SKILL.md`, then select the smallest specialist sequence and posture. | Coordinator owner. Produces posture handoffs, role handoffs, and routed plans or reviews. |
| `grill-me-aquinas` | project-local | Direct grill-me sessions, Sofia planning, fuzzy requests, project essence, canonical terms, constraints, non-goals, or pause conditions. | Load `skills/grill-me-aquinas/SKILL.md` as a compact observer before planning when meaning or essence could change the result; ask only when evidence cannot answer. | Meaning and essence owner. Feeds Descartes with facts, constraints, non-goals, pause conditions, and planning handoff candidates. |
| `check-with-maxi` | project-local | The user says to check with Maxi, ask Maxi, consult Maxi, compare against Maxi, inspect Maxi context, or use the local Maxi handoff. | Load `skills/check-with-maxi/SKILL.md`, read `C:\Users\garqu\OneDrive\COdex\Maxi-context\SOFIA-HANDOFF.md`, then explore `C:\Users\garqu\OneDrive\COdex\Maxi-context` with targeted search. | Local context lookup owner. Supplies Maxi evidence to Sofia, Aquinas, Descartes, Wittgenstein, Hegel, or Ciceron without replacing their role judgment. |
| `audit-plan-descartes` | project-local | Project-local planning audit demonstrations, final plans, or essence-fit checks. | Load `skills/audit-plan-descartes/SKILL.md` before finalizing a plan. | Plan-trust owner. Produces unresolved assumptions, verification requirements, and audit result. |
| `pattern-code-wittgenstein` | project-local | World-of-Sofia precedent discovery, pattern scout work, or evaluation of that project skill. | Load `skills/pattern-code-wittgenstein/SKILL.md` before implementation pattern choices. | Pre-implementation precedent owner. If code already changed, hand off to Hegel instead. |
| `synthesis-code-hegel` | project-local | Review a real diff, staged worktree, branch, PR, or completed implementation. | Load `skills/synthesis-code-hegel/SKILL.md` after concrete changes exist. | Post-diff review owner. Checks whether changed code should be left, renamed, extracted, merged, split, inlined, deprecated, or deleted. |
| `earned-presence-kondo` | project-local | Sofia or the user asks to simplify, declutter, reduce complexity, remove old structure, challenge additive fixes, or decide whether an element, option, abstraction, feature, copy block, workflow step, or rule deserves to stay. Also use when wording or subtext says be radical, playful, break compatibility, stop preserving the old structure, tear it down, start over, rebuild from scratch, or build something new without compatibility inertia. | Load `skills/earned-presence-kondo/SKILL.md`; run the Earned Presence Test; for radical rebuilds, ask what to destroy, what to preserve, and what simpler replacement should carry the surviving value. Use Ciceron or Hegel only when rendered UI evidence or real diff evidence is required. | Subtractive and rebuild review owner. Recommends keep, preserve, demote, group, delay, simplify, deprecate, delete, replace, rebuild simpler, leave as-is, or investigate further with evidence, risks, confidence, and re-checks. |
| `ui-attention-ciceron` | project-local | Any UI-changing work reaches rendered validation, final review, or completion; also use for screenshots, local pages, or mockups that need attention, hierarchy, CTA copy, or emotional language fit. | Load `skills/ui-attention-ciceron/SKILL.md` after rendered evidence exists. | Automatic UI validation owner. Routes missed UI outcomes back through Sofia. |
| `communication-review-ciceron` | project-local | Work includes messages, proposals, PR comments, reviews, or user-facing communication. | Load `skills/communication-review-ciceron/SKILL.md` when communication quality is a completion criterion. | Communication validation owner. Produces rhetorical-fit review and smallest useful rewrite. |

## Preferred Handoff Orders

Use the shortest sequence that covers the task:

- Check with Maxi: `check-with-maxi` -> relevant Sofia specialist only if the Maxi evidence affects planning, implementation, or review.
- New skill plan: `sofia-coordinatior` -> `skill-creator` -> `descartes-skill` or `audit-plan-descartes` -> final plan.
- New skill implementation: `sofia-coordinatior` -> `skill-creator` -> edit/validate -> optional forward-test.
- Bold skill update: `sofia-coordinatior` posture handoff -> `skill-creator` with degree-of-freedom requirement -> validation -> optional over-safe-assumption probe.
- Repo implementation plan: `sofia-coordinatior` -> `grill-me-aquinas` compact observer -> `audit-plan-descartes` -> `pattern-code-wittgenstein` when precedent matters -> final plan.
- UI implementation: plan -> implementation -> rendered evidence -> `ui-attention-ciceron` -> `earned-presence-kondo` if competing elements may need demotion/removal -> fixes if needed.
- Communication work: draft/rewrite -> `communication-review-ciceron` -> revised message.
- Subtractive review: `sofia-coordinatior` -> `earned-presence-kondo` -> specialist handoff only if rendered UI evidence, real diff evidence, or pattern discovery is needed.
- Radical rebuild: `sofia-coordinatior` -> `grill-me-aquinas` for said/meant/happened and essence -> `earned-presence-kondo` for destroy/preserve/rebuild -> `pattern-code-wittgenstein` or implementation when code patterns matter.
- Implemented change review: `sofia-coordinatior` -> inspect real diff -> `synthesis-code-hegel` -> `earned-presence-kondo` if deletion/deprecation/inlining/rebuild is plausible -> Descartes only if final recommendation depends on planning assumptions.

## Refresh Protocol

Refresh this registry when a global or World-of-Sofia project skill is added, removed, renamed, or given a materially different trigger. For each change, update only the affected row and rerun the coordinator skill validator.
