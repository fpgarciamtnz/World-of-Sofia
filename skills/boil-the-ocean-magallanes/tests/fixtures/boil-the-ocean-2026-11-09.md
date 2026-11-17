---
name: boil-the-ocean
description: Use when your human asks for something huge, like a rewrite, a port, or a rebuild that looks like too much work, or says "there is no hard task anymore". Takes the full scope on and checks every step.
---

# Boil the ocean

When a request is this big, you will want to make it smaller before you start. Don't. Measure it first. Your sense of "too big" comes from watching human teams, and it may no longer match what agents can do.

## Why the old sizing is wrong

Effort used to be the limit. A rewrite, a port, or a rebuild took a team months, so people tried one only as a last resort. Current models can often do the same work in hours or days, as long as something checks each step. So take the request at its full size. This skill calls that full size the **ocean**. Then find out what really limits it.

Most reasons a task "can't" be done are **habits**. A habit is something people stopped trying because it used to cost too much. A few reasons are **real walls**: law, licenses, security, safety, money nobody approved, or a limit your human set. A habit goes away when you ask "why not?" and find no real answer. A real wall stays, and the plan goes around it.

Choose whatever reaches the goal fastest for agents, even if neither you nor your human would normally pick it. This covers the language, the framework, the shell, and how low in the stack you work.

## Throwaway code, owned checks

When code is cheap to write, you can write code to answer one question and then delete it. Some examples:

- a script that compares two outputs
- a small wrapper that lets you test against a flaky service
- a quick prototype of one approach
- three attempts in parallel, where two get thrown away

Write this kind of code whenever it answers a question or makes you more sure of the result. A failed attempt is still useful. It leaves checks behind, and it shows you what doesn't work.

This only works because you check the work, and the checking is your job. Reading code finds few bugs. Running it finds most. Give your human only work you have already run.

- Before you start, set a finish line you can measure. For example, the test suite passes, the output matches the reference on real inputs, or the new build runs twice as fast as the old one. With a vague goal, you will stop at the first sign of progress.
- Check against the real thing. Run it, open it in a browser, and compare it with the reference build. When docs claim something about a system, test the claim on the real system.
- Matching a reference also copies its bugs. List every known place where your result differs from the reference, so nobody mistakes those differences for your bugs.
- For a risky change, get a review from a model in a different family, such as another vendor's model.
- Stop and ask your human only when a check fails and you can't explain why.
- If attempts keep failing the same way, fix the cause in your setup before you try again.

## Steps

1. **Hold the ocean.** Write the request as one sentence, at its full size.
   Done when the sentence asks for everything the request asked for.

2. **Sort the walls.** List every reason the task can't be done. Ask "why not?" about each one, and mark it as a habit or a real wall. Back each mark with something you checked in the repository, the docs, or the tools.
   Done when every reason has a mark and its evidence.

3. **Find the oracle.** The oracle is whatever proves the work is right: an existing implementation to compare against, a test suite, a spec, known-good outputs, or a benchmark.
   Done when the oracle runs and reports a baseline, which is the result before you change anything. If no oracle exists yet, building one is your first unit of work.

4. **Cut the boil.** Split the ocean into units that the oracle can check one at a time. Work on a throwaway branch or worktree, which is a separate checkout of the repository. Set a budget in hours or tokens, and set a condition for stopping. Note where the stack you chose differs from what your human prefers.
   Done when another agent could start the first unit from the plan alone.

5. **Boil.** Work one unit at a time, and stay within what your human has already authorized. Run the oracle after each unit. Bring only the real walls to your human.

6. **Hand back.** Report what the oracle confirmed. Report what you could not verify, such as hardware, secrets, or judgment calls. Report the risks of shipping it. Your human then has to check only those things.
