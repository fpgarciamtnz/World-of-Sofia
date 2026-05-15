# Output Format

Use this format for most communication reviews.

## Standard Report

```markdown
## What You Said

Plain reading of the literal message. Keep this close to the user's wording.

## What It Is Doing

Likely communicative act and intent, with confidence.

## What Might Be Understood

Likely receiver interpretations, including unintended readings.

## Friction Points

Ambiguity, contradiction, tone mismatch, evidence gaps, framing problems, or face threat.

## Straight Feedback

Direct statement of the main communication problem.

## Better Version

One improved rewrite. Add variants only when useful.
```

## Compact Report

Use this when the user asks for speed, blunt feedback, or a short review:

```markdown
**Read:** ...
**Risk:** ...
**Fix:** ...
**Rewrite:** ...
```

## Plan Mode Evidence Gate

Use this only when the active collaboration mode is Plan Mode. The purpose is to confirm the intended meaning before drafting or rewriting.

```markdown
## Evidence Ledger

| Wording or context cue | What it directly says | Inference | Confidence |
|---|---|---|---|
| "..." | ... | ... | High/Medium/Low |

## Intended Meaning I Infer

I understand you want to mean: "..."

## Possible Misreadings

- ...
- ...

## Clarify Before Drafting

Is this intended meaning right, or should I change it before drafting?

## Drafting Hold

I am not drafting the better version yet because the intended meaning needs confirmation first.
```

If the user has already confirmed or corrected the intended meaning in the same Plan Mode interaction, replace `Drafting Hold` with `Better Version` and draft from the confirmed intent.

## Scored Report

Use this only when scoring is requested or clearly useful:

```markdown
| Dimension | Rating | Why |
|---|---:|---|
| Purpose clarity | /5 | ... |
| Act fit | /5 | ... |
| Audience fit | /5 | ... |
| Evidence or grounding | /5 | ... |
| Emotional cost | /5 | ... |
| Ethical fit | /5 | ... |
| Style clarity | /5 | ... |
```

## Example

Message:

> I guess we can do it your way again, since apparently my concerns do not matter.

Review:

```markdown
## What You Said

You are saying you feel overridden and unheard, but the literal wording frames the other person as dismissive and repeats a grievance.

## What It Is Doing

It is performing reluctant consent plus reproach. Confidence: high.

## What Might Be Understood

The receiver may hear, "You are unfair and I am giving up," rather than, "I still have concerns we need to address."

## Friction Points

- "Apparently" implies bad faith.
- "Again" expands this from one decision into a pattern accusation.
- "My concerns do not matter" names a conclusion, not the specific concern.

## Straight Feedback

The message hides a real concern inside resentment. That makes it harder for the other person to respond to the substance without defending themselves.

## Better Version

I can go with your approach for this round, but I still have one concern I want us to address: [specific concern]. Can we agree on how we will handle that risk before we move forward?
```
