---
name: audit-plan-descartes
description: "Audit a plan or prior work by separating facts, constraints, assumptions, risks, and verification evidence. Use when planning needs an evidence or assumption check, when several sources of truth disagree, or when previous work must be verified before building on it."
---

# Audit Plan Descartes

Use this skill when planning work would benefit from explicit evidence handling, when multiple sources of truth are in play, or when previous code or work needs to be verified.

The focus is on establishing what evidence and proof show that the material we are working on is relevant, matters, or is complete. The final goal is to avoid hallucinations and to have a solid foundation before starting the work.

## Workflow

1. Gather direct evidence before asking planning questions, since most questions can be answered by inspection.
2. Build the foundation ledger:
   - `Foundation-Fact`: directly observed, with its source, such as a path, command output, or document.
   - `Foundation-Constraint`: a requirement stated by the user, a project law, or the environment.
   - Unresolved assumption: anything inferred, along with the evidence that would upgrade it.
3. Keep inference out of the facts. A claim that sounds settled but has no source stays an assumption until it is checked.
4. If essence context is available, run the essence-fit check below.
5. When an unresolved assumption could change the plan, offer an assumption audit before finalizing, using AskUserQuestion with `Audit this plan` first and `Do not review the plan` second. When none could, finalize without asking. In plan mode, put the ledger in the plan.

An assumption audit tries to break the plan: check each assumption against evidence, name what would change if it were false, and adjust the plan or list what must be verified first.

## Essence Fit

Run this check only when there is evidence to support it. Valid sources are explicit user correction, `.agents/CONTEXT.md`, `.agents/adr/`, `.agents/aquinas/essence-ledger.md`, repository facts, or a `grill-me-aquinas` handoff.

Check whether the plan preserves project essence, respects project laws, avoids treating accidents as constraints, and does not rely on an unresolved potency as if it were fact. An essence claim without such a source is an unresolved assumption. If the plan is factually sound but violates project essence, surface that as an essence-fit risk, and adjust the plan or mark the conflict explicitly.

Read [references/foundation-ledger.md](references/foundation-ledger.md) for prompts when a claim is hard to classify.

## Output

- Foundation ledger
- Data needed to upgrade unresolved assumptions
- Essence fit, when essence context is available
- Assumption audit, when run
- Final plan, or for prior work, a verdict on what is verified, what is not, and what to check next

The audit is finished when every claim the plan depends on is classified and each assumption that could change it has been checked or named as open.
