# Earned Presence Foundation

Use this reference when a subtractive review needs deeper rationale, UI or code specifics, or danger checks.

## Summary Judgment

The skill is independent and self-contained. Subtractive judgment applies across UI, code, docs, prompts, workflows, features, meetings, dashboards, onboarding, architecture, and settings, so it lives in one skill instead of being repeated inside each kind of review.

## Problem

Review, design, and implementation often default to addition:

- add another UI element;
- add another explanation;
- add another abstraction;
- add another option;
- add another branch;
- add another workaround;
- add another layer;
- add another rule.

This skill counters that bias by asking whether the existing thing deserves to stay.

## Core Doctrine

Before adding more, ask what can be removed, demoted, grouped, delayed, progressively disclosed, simplified, deprecated, or replaced.

This is not minimalism for its own sake. It is presence discipline: every surviving thing must justify its cost.

## Radical Rebuild Triggers

Use the skill when the user explicitly says or strongly implies:

- be radical;
- be playful;
- break it;
- do not care about breaking changes;
- do not preserve the old structure;
- stop patching;
- tear it down;
- destroy the old version;
- erase and rebuild;
- rebuild from scratch;
- start over;
- make the new thing without compatibility inertia;
- build something new;
- remove the old assumption;
- ignore the current shape;
- the current structure is trapping us.

In these cases, the skill participates in both destruction and rebuild:

- `destroy`: identify what old structure, option, branch, abstraction, UI, workflow, or rule no longer earns its cost.
- `preserve`: identify what essence, user value, behavior, data, trust, accessibility, safety, or recovery path must survive.
- `rebuild simpler`: propose the smaller replacement shape only after the preserve list is clear.

Radical posture does not mean careless deletion. It means the existing form no longer receives default protection merely because it exists.

## Earned Presence

Translate "spark joy" into `earned presence`.

A thing earns its presence when it meaningfully supports the user, system, project, workflow, codebase, or intended effect.

A thing fails the test when its cost is higher than its contribution.

Costs may include:

- attention cost;
- cognitive cost;
- maintenance cost;
- coordination cost;
- emotional cost;
- trust cost;
- complexity cost;
- testing cost;
- migration cost;
- opportunity cost;
- future-change cost;
- code and resource cost.

Value may include:

- user understanding;
- user action;
- confidence;
- trust;
- safety;
- accessibility;
- recovery;
- domain clarity;
- behavior preservation;
- useful redundancy;
- debugging support;
- migration support;
- legal or compliance support;
- product emotion;
- implementation clarity;
- faster loading;
- smoother user experience.

## What It Should Not Do

- Do not turn "spark joy" into a literal emotional test.
- Do not make minimalism an aesthetic ideology.
- Do not delete as much as possible.
- Do not shame necessary complexity.
- Do not treat old, boring, ugly, duplicated, or emotionally flat as unnecessary.
- Do not erase domain knowledge, warnings, recovery paths, tests, or migration history without evidence.
- Do not recommend rebuilds because an artifact is unfashionable.

## Decision Verbs

Prefer concrete verbs:

- `keep`
- `preserve`
- `demote`
- `group`
- `delay`
- `progressively disclose`
- `simplify`
- `rename`
- `move`
- `split`
- `merge`
- `inline`
- `deprecate`
- `delete`
- `replace`
- `rebuild simpler`
- `leave as-is`
- `investigate further`

Avoid vague verbs such as `improve`, `optimize`, `clean up`, `make better`, or `polish` unless followed by a concrete action.

## Clues That Subtraction Is Needed

- A loud element does not support the main goal.
- Multiple CTAs ask for different user intentions at the same moment.
- A UI section exists only because the old layout had it.
- Copy explains complexity that could be removed.
- A workflow step compensates for confusing previous steps.
- A feature was once needed but no longer has a user.
- A setting burdens every user but is rarely needed.
- A code abstraction now requires many flags or special cases.
- Duplicate logic keeps drifting.
- A compatibility layer has no migration deadline.
- New work keeps patching around an obsolete assumption.
- The artifact needs a long explanation to justify why it still exists.
- Users, developers, or reviewers keep asking: "Why is this here?"

## When Removal Is Dangerous

Warn strongly when subtraction risks:

- breaking public behavior;
- removing legal or compliance information;
- damaging accessibility;
- hiding important warnings;
- deleting tests that encode real behavior;
- deleting migration or compatibility paths too early;
- removing useful domain distinctions;
- merging across bounded contexts;
- replacing explicit clarity with hidden magic;
- making error recovery harder;
- reducing trust;
- erasing historical knowledge;
- rebuilding from scratch without a migration plan;
- treating old as bad;
- treating boring as unnecessary.

## Rebuild Simpler Rule

Recommend `rebuild simpler` only when most of these are true:

1. The current structure no longer serves the intended purpose.
2. Local fixes keep adding more complexity.
3. The old structure forces new work to adapt to obsolete assumptions.
4. The essential value can be preserved in a simpler form.
5. The replacement boundary is small enough to understand.
6. Behavior, trust, accessibility, data, or migration needs can be preserved.
7. There is a clear re-check or validation method.
8. The risk of continuing to patch is higher than the risk of replacement.

Never recommend rebuilding merely because the current artifact is ugly, unfashionable, or emotionally unsatisfying.

## UI

An attention review asks where attention goes and whether it supports the intended effect. The earned-presence question is narrower: which attention peaks, sections, words, or controls do not earn their attention cost?

Ask it when:

- a competing CTA distracts from the primary action;
- a decorative or loud element outranks the real task;
- explanatory copy exists because the underlying UI is confusing;
- a new section is proposed before an existing section has been merged, delayed, or deleted;
- a stronger primary CTA is proposed before competing CTAs have been demoted or removed.

UI safety:

- Do not remove accessibility affordances.
- Do not remove important warnings.
- Do not hide recovery actions users need.
- Do not remove trust-building information when risk is high.
- Do not delete legal or compliance content because it is visually boring.
- Consider progressive disclosure before deletion.

## Code

A code review asks whether a real change reveals a deeper tension in the existing system. The earned-presence question is which code, abstraction, option, branch, file, or path no longer earns its maintenance cost.

Ask it when a real change shows:

- harmful duplication;
- wrong abstraction;
- narrow abstraction;
- boundary drift;
- plausible deletion, deprecation, inlining, replacement, or rebuild.

Code safety:

- Do not recommend deletion without checking references.
- Do not recommend deletion around public APIs without deprecation or migration.
- Do not remove tests unless the behavior is explicitly obsolete.
- Do not merge across bounded contexts merely because code looks similar.
- Do not remove compatibility code without a migration plan.
- Do not remove logs or observability without understanding operational value.
- Prefer `deprecate` before `delete` when users, callers, or integrations may exist.
- If evidence is weak, recommend `leave as-is` or `investigate further`.

## Confidence Model

- `High`: multiple evidence signals agree; removal or demotion has a clear safe path; value and cost are obvious.
- `Medium`: evidence is useful but incomplete; recommend reversible changes, demotion, grouping, delay, progressive disclosure, or deprecation before deletion.
- `Low`: intent, usage, references, or risk is unclear; recommend keep or investigate, and name the evidence that would settle it.

Low confidence should almost never recommend direct deletion.
