---
name: ui-attention-ciceron
description: "Review UI-changing work for visual attention, emotional language fit, hierarchy, and goal fit before final completion. Use when Codex or Sofia coordinates planned, implemented, reviewed, or validated UI changes; when a final rendered product needs attention and phrasing audit before close; or when Codex should inspect a live page, local browser target, screenshot, or UI mockup and rank likely attention peaks from observable visual, textual, and DOM evidence without claiming eye-tracking certainty."
---

# UI Attention Ciceron

Use this skill to review where a UI is likely to pull attention and whether that attention supports the intended user action or understanding. Treat the main trigger as UI-changing work reaching final product validation. Direct page, screenshot, and mockup reviews are still supported, but they are secondary.

Treat attention as an evidence-backed inference, not a fact. Separate what is visible, what can be measured, what is inferred, and how confident the inference is.

## Sofia Coordination Trigger

When Sofia coordinates UI-changing work, this skill should be offered before the final audit, final validation, or completion message.

Sofia asks:

`Do you want UI Attention Ciceron to review the final product before we close this UI change?`

If the user says yes:

1. Run this skill after implementation against the rendered final product.
2. Use browser inspection when a live page is available.
3. Ask or confirm the intended UI effect if it is unclear.
4. Classify findings by severity.
5. Route goal misses back through Sofia's improve process.

If the user says no, Sofia continues normal validation without this skill.

Default interference level is `Advisory`: report small issues as optional polish, but escalate missed primary goals.

## Core Workflow

1. Identify the workflow context:
   - UI plan, UI implementation, post-change review, final validation, or direct artifact review.
2. Identify the artifact:
   - Prefer a live URL, local dev server, or browser target when available.
   - Use screenshots or mockups as fallback.
3. Identify the intended UI effect:
   - Target attention: what the user should notice or focus on.
   - Intended outcome: what the user should understand, decide, or do next.
   - Emotional language objective: what the visible phrasing should make the user feel or expect, such as focused, confident, motivated, reassured, curious, or positively engaged.
4. Ask the intent-confirmation question when the intended UI effect is missing, ambiguous, or when active Plan Mode requires confirmation:

   `I understand this screen is supposed to make the user notice/focus on: "[target attention]", then understand/do: "[intended outcome]", and feel/expect: "[emotional language objective]". Is that right, or should I change the intended UI effect before reviewing?`

5. If the intended UI effect is already stated, proceed and label it as the comparison target.
6. Inspect the rendered UI before judging it:
   - Capture or examine the viewport.
   - Inspect DOM and computed styles when browser tooling makes that available.
   - Use screenshot evidence when DOM inspection is unavailable.
7. Rank the strongest attention peaks from observable signals.
8. Infer the likely attention path with confidence.
9. Compare the inferred attention path against the intended UI effect.
10. Classify severity and decide whether to report, hand off, or trigger improvement.
11. Recommend the smallest useful changes that would better align attention with intent.

## Evidence Signals

Use these signals as practical v1 heuristics. Do not treat them as a precise formula.

- Scale: largest text, largest controls, large images, or large empty regions that isolate an element.
- Contrast: strong luminance contrast, saturated color, warning colors, or high contrast against nearby elements.
- Position: top-of-viewport, center placement, above-the-fold visibility, sticky placement, or first-screen dominance.
- Isolation: whitespace around an element, low nearby clutter, or a lone element in a dense area.
- Semantics: primary buttons, warnings, badges, prices, forms, nav items, labels, and headings.
- Imagery: faces, product images, screenshots, icons, illustrations, or thumbnails.
- Motion: animation, video, cursor-following effects, flashing, carousels, or loading states.
- Density: repeated elements, icon or emoji clusters, text blocks, competing CTAs, and visual noise.
- Novelty: unusual shapes, emojis, bright accents, decorative marks, or elements that break the local pattern.
- Emotional language fit: visible copy, CTA verbs, labels, empty states, praise, urgency, reassurance, humor, warnings, and motivational language. Ask whether the phrasing supports the objective. For productivity goals, language should reduce noise and support focus or momentum. For engagement goals, language can be warmer, more positive, curious, or motivating. For trust goals, language should be clear, calm, and specific.

Prefer browser/DOM evidence for measurable claims:

- font size
- element bounding boxes
- viewport position
- visible area
- computed color
- contrast where practical
- z-index or sticky/fixed behavior
- animation or transition presence
- above-the-fold placement
- visible text, CTA labels, headings, helper text, warnings, and empty-state copy

## Truth Model

Use this chain for every important claim:

`observable visual, textual, or DOM evidence -> ranked attention and language signals -> labeled inference -> confidence -> comparison to intended UI effect`

Avoid absolute claims such as "users will look here." Prefer:

`The strongest observable attention peak is here, so I infer this is likely to draw first attention. Confidence: high.`

Confidence guidance:

- High: multiple strong observable signals converge and the element is clearly visible.
- Medium: signals are mixed, the element competes with nearby content, or evidence is screenshot-only.
- Low: the page state is incomplete, the viewport is not representative, or the intended effect is unclear.

## Severity And Interference

Classify every finding before recommending action.

- `Polish`: minor distraction; the intended primary focus and outcome are still clear. Report as non-blocking: `Ciceron-UI detected that attention may be slightly distracted here: [evidence]. This is optional polish, not a blocker.`
- `Concern`: attention conflict exists, but the primary goal remains recoverable. Report the issue, recommend a small change, and let Sofia decide whether to route implementation.
- `Goal miss`: the intended primary action or focus is not among the top attention peaks, or multiple stronger peaks pull attention toward a different goal. Emit a Sofia handoff packet and trigger the improve process.

Default behavior is `Advisory`. If the user or project chooses another interference level, apply it:

- `Passive`: report findings only; never auto-route.
- `Advisory`: report polish as optional; route goal misses back through Sofia.
- `Strict`: treat major attention conflicts as blocking until fixed or explicitly waived.

## Sofia Handoff Packet

Emit this packet when a `Goal miss` is found, when the user asks to implement feedback, or when Sofia asks for implementation routing.

```markdown
## Sofia Handoff Packet

Finding:
[Concise UI attention problem.]

Severity:
Polish | Concern | Goal miss

Evidence:
[Observable visual, textual, or DOM signals, attention rank, language fit, and confidence.]

Intended UI Effect:
[Confirmed or stated target attention, intended outcome, and emotional language objective.]

Product Location:
[URL/page, viewport region, element label, and visual location.]

Likely Code Location:
[Exact or likely route/component/file if easy. If not obvious: Unknown; route through Wittgenstein for pattern/location discovery.]

Recommended Fix Direction:
[Smallest useful UI change, not a full implementation plan.]

Route Through Sofia:
[Recommended route.]
```

Use these routing defaults:

- If the code location or project pattern is unclear: `UI Ciceron -> Sofia -> pattern-code-wittgenstein -> implementation -> UI Ciceron re-review -> synthesis-code-hegel -> validation`.
- If the fix is obvious and local: `UI Ciceron -> Sofia -> direct implementation -> UI Ciceron re-review -> synthesis-code-hegel -> validation`.
- If only polish exists: report it without forcing implementation unless the user selected `Strict`.

## Required Output

Use this structure unless the user requests a shorter format:

1. `What I See` - literal visual read of the rendered screen.
2. `Intended UI Effect` - confirmed, stated, or clearly labeled inferred attention and outcome target.
3. `Attention Ranking` - top visual peaks with evidence and confidence.
4. `Likely User Attention Path` - inferred sequence of attention, not a certainty claim.
5. `Language Fit` - whether visible phrasing and emotional tone support the objective.
6. `Goal Fit` - whether the inferred attention path and language support the intended UI effect.
7. `Severity` - polish, concern, or goal miss, with the selected interference level.
8. `Friction Points` - distractions, hierarchy conflicts, misleading emphasis, attention leaks, or tone mismatch.
9. `Straight Feedback` - the direct UI or wording problem to fix.
10. `Smallest Useful Changes` - minimal changes that would improve attention and language alignment.
11. `Sofia Handoff Packet` - include only when escalation, implementation, or coordination is needed.

## Review Rules

- Review the rendered experience, not only the design intent or source code.
- Use browser inspection when a live target is available and the environment supports it.
- Do not invent product goals. If the goal is missing, ask the intent-confirmation question or label the goal as inferred.
- Do not claim eye-tracking certainty, conversion impact, or accessibility compliance unless directly tested.
- Do not claim user emotion as fact. Treat emotional response as an inference from visible wording, product goal, audience, and context.
- Do not make broad redesigns when a smaller hierarchy fix would address the attention problem.
- Preserve the user's intended effect unless the visual evidence shows the page is performing a different one.
- Keep feedback direct. Name the visual attention problem before suggesting changes.
- Do not implement fixes yourself unless the user has explicitly moved from review/coordination into implementation. Route through Sofia when coordination is requested.
