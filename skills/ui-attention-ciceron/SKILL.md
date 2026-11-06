---
name: ui-attention-ciceron
description: "Review rendered UI for attention hierarchy, emotional language, and goal fit. Use during final validation of UI-changing work, or when inspecting a page, screenshot, or mockup to see whether it directs attention where it should."
---

# UI Attention Ciceron

Judge where a screen is likely to pull attention, and whether that attention and its wording support what the user should understand or do. Attention is an evidence-backed inference, so keep what is visible, what is measured, what is inferred, and how confident you are separate. There is no eye-tracking here: prefer "the strongest observable peak is here, so I infer it draws first attention" over "users will look here".

## When It Runs

Include this review at final validation of UI-changing work, including visible copy, CTA labels, hierarchy, styling, animation, imagery, spacing, and responsive changes. There is no need to ask whether to run it, and small issues are reported as optional polish.

Review the rendered result, not the source or the design intent. Use a screenshot or mockup you already have, and read it directly. Open a browser only when the user asked for this review or for browser work, using the session's preview or browser tools, and close any tab you opened. Otherwise, say that the rendered review is pending and offer it in one line rather than claiming a review of code you did not see rendered.

## Intended Effect

Compare against what the screen is for:

- Target attention: what the user should notice first.
- Intended outcome: what they should understand, decide, or do next.
- Language objective: what the wording should make them feel or expect, such as focused, reassured, or motivated.

If this is stated, label it as the comparison target. If it is missing or ambiguous, ask: `I understand this screen is supposed to make the user notice "[target]", then understand or do "[outcome]", and feel or expect "[objective]". Is that right, or should I change it before reviewing?` Do not invent product goals; when you cannot ask, label the goal as inferred and lower your confidence.

## The Review

The method borrows Kahneman's two systems as a practical model, not as a psychological claim.

**First-glance read.** Before analyzing, name the first three likely attention peaks from immediate salience: scale, contrast, position, isolation, motion, imagery, novelty, or loaded wording.

**Evidence check.** Test each peak against what can be observed. A screenshot often suffices; measure through the DOM when a claim depends on it, such as computed contrast, sticky or fixed position, above-the-fold placement, or animation. Check density and competing CTAs. Check language too: for productivity goals wording should reduce noise and support momentum, for engagement goals it can be warmer and more curious, and for trust goals it should be clear, calm, and specific. If a target is visually quiet but semantically important, say so.

**Bias guard.** Ask whether you are anchoring on the first thing noticed, overvaluing polish, confirming the design intent too easily, or recommending louder emphasis where reducing a competitor would work better. If the first glance and the evidence disagree, lower confidence and explain why.

Make a high-confidence claim only when several signals converge and the intended effect is known. Use medium when signals are mixed or the evidence is screenshot-only, and low when the page state is incomplete, the viewport is unrepresentative, or the intended effect is unclear.

When peaks compete or the recommendation depends on the competition, show the reasoning in this matrix. It makes the judgment inspectable; it is not a score, so never sum it or present it as proof.

| Element | First-glance salience | Task relevance | Semantic force | Competition risk | Evidence | Confidence |
|---|---|---|---|---|---|---|
| [element] | Low/Medium/High | Low/Medium/High | Low/Medium/High | Low/Medium/High | [observable signals] | Low/Medium/High |

## Severity

- `Polish`: a minor distraction; the primary focus and outcome are still clear. Non-blocking.
- `Concern`: attention conflict exists, but the primary goal is recoverable. Recommend a small change.
- `Goal miss`: the intended action or focus is not among the top peaks, or stronger peaks pull toward a different goal. Emit the handoff below.

Interference defaults to `Advisory`, which reports polish as optional and routes goal misses. Apply `Passive` (report only) or `Strict` (major conflicts block until fixed or waived) if the user or project chooses one.

## Fixing

Recommend the smallest change that aligns attention with intent, naming the visual problem before the fix, and preserve the user's intended effect unless the evidence shows the page does something else. Do not implement fixes unless the user has moved from review into implementation.

When the fix may be to demote, group, delay, or remove a competitor rather than make the primary element louder, use `earned-presence-kondo` first. Keep accessibility affordances, important warnings, legal or compliance content, trust information for risky actions, and recovery paths, since these can look like clutter while still earning their place.

Do not claim eye-tracking certainty, conversion impact, or accessibility compliance unless directly tested, or state user emotion as fact.

## Output

Lead with the verdict, then cover: what you see; the intended effect; the attention ranking with evidence and confidence; the likely attention path; language fit and goal fit; severity; and the smallest useful changes. Add the matrix and the bias check when they changed the judgment. The review is finished when the severity and the next action are clear.

For a `Goal miss`, or when asked for implementation routing, add:

```markdown
## Sofia Handoff Packet

Finding: [concise UI attention problem]
Severity: Polish | Concern | Goal miss
Evidence: [observable signals, attention rank, language fit, confidence]
Intended UI Effect: [target attention, outcome, language objective]
Product Location: [URL or page, viewport region, element]
Likely Code Location: [route, component, or file; if unknown, route through `pattern-code-wittgenstein`]
Recommended Fix Direction: [smallest useful UI change]
Route: [see below]
```

Route through `sofia-coordinatior`: use `pattern-code-wittgenstein` first if the code location or pattern is unclear, `earned-presence-kondo` first if the fix may remove or demote something, and direct implementation if the fix is obvious and local. Follow any of these with a re-review of the rendered result, then `synthesis-code-hegel` and validation. Polish alone does not force implementation unless `Strict` applies.
