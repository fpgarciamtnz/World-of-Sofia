---
name: boil-the-ocean-magallanes
description: "Use when the user asks for something huge, like a rewrite, a port, or a rebuild that looks like too much work, says 'there is no hard task anymore', or describes where they want to end up and the way looks long or blocked. Takes the full scope on, keeps the destination and every limit fixed, goes around whatever blocks the way, and checks every step."
---

# Boil the Ocean Magallanes

When a request is this big, you will want to make it smaller before you start. Don't. Measure it first. Your sense of "too big" comes from watching human teams, and it may no longer match what agents can do.

The request names a destination: where the user wants to end up. Your job is to get there, by the direct route when it is open and the long way around when it is not, around the world if that is what it takes. Two things stay fixed for the whole voyage, the destination and the limits. Everything else is route, and the route is yours to change.

## Why the old sizing is wrong

Effort used to be the limit. A rewrite, a port, or a rebuild took a team months, so people tried one only as a last resort. Current models can often do the same work in hours or days, as long as something checks each step. So take the request at its full size. This skill calls that full size the **ocean**, and it is the destination. Then find out what really limits it.

Most reasons a task "can't" be done are **habits**. A habit is something people stopped trying because it used to cost too much. A few reasons are **real walls**: law, licenses, security, safety, money nobody approved, or a limit the user set. A habit goes away when you ask "why not?" and find no real answer. A real wall stays, and the plan goes around it.

Choose whatever reaches the goal fastest for agents, even if neither you nor the user would normally pick it. This covers the language, the framework, the shell, and how low in the stack you work.

## Limits are premises

There should always be limits. The real walls are limits, and so is the budget of the voyage. A route that crosses a limit is not a route, however much sooner it would arrive, because the user can only let you take a bold route if they can trust the limits to hold. So the voyage does not set out until its limits are written down, including the ones nobody stated.

## Degree Of Freedom

`bold-by-default`, for the route only. Consider the long way, the unfamiliar stack, the tool you would have to build first, and the ambitious option before narrowing. The limits get no boldness: keep every one, and treat destructive actions, credential use, broad filesystem changes, anything outward-facing, and anything the user has not authorized as limits that wait for their approval.

## Limits, obstacles, and habits

Habits and real walls are not the only things in the way. Sort each block into one of three kinds, because each is handled differently:

- A **limit** is a real wall or the budget. It bounds every route, so keep it and go around it. Limits you did not set are not yours to move: the user can move some, such as their own boundaries or the budget, and no one in the conversation can move others, such as law or safety.
- An **obstacle** blocks one route: a missing feature, an API that does not do what you need, a dependency that will not port, a test that cannot run here. It has a real answer to "why not?" but it is not a wall, so go around it with another library, a shim, the missing piece written yourself, a different stack, or a longer path.
- A **habit** has no real answer to "why not?", and most habits are about distance. "Too far" or "too much work" is a reason to plan a longer route, never to settle for a nearer port.

Check a block before accepting it: a limit needs a source you checked, and an obstacle needs a failed attempt or documented evidence, not an expectation.

## The Panama Canal

Before committing to a long detour, ask: do we need to go this far, or can we build a channel through the obstacle? Choosing the fastest route already covers building through when that is quicker. The canal adds the one question it leaves out: will this route be sailed again?

A detour is sailed again by every later task that meets the same obstacle. A canal, such as the missing feature, an adapter, or a fix upstream, is built once and shortens every later voyage, so it can be the right choice even when it is slower this time; for four centuries ships went around South America, until the Panama Canal opened in 1914. A one-off trip takes the detour.

A canal also outlives the voyage, and the user is the one who maintains it. So when the detour is long, meaning it adds units of its own, changes what the user will maintain, or uses a large share of the budget, put both options to the user with your recommendation. A short detour needs no question.

## Audit with Descartes

Every wall, every oracle result, and every line of the hand-back is a claim, and `audit-plan-descartes` keeps claims honest. Load it before sorting the walls when it is installed, and keep its foundation ledger until the hand-back. Without it, apply the same rule yourself:

- A limit is a `Foundation-Constraint`, recorded with its source: the license text, the law, the boundary the user stated, the budget set for the voyage.
- A "can't" without such a source is an unresolved assumption. Check it before it changes anything: either it becomes a limit with its source, or it is an obstacle or a habit, and the destination stays.
- The oracle's results are `Foundation-Fact`s. A claim about where you are that the oracle has not confirmed stays an assumption.
- A canal is an unresolved assumption until a prototype shows it holds.

## Throwaway code, owned checks

When code is cheap to write, you can write code to answer one question and then delete it. Some examples:

- a script that compares two outputs
- a small wrapper that lets you test against a flaky service
- a quick prototype of one approach
- three attempts in parallel, where two get thrown away

Write this kind of code whenever it answers a question or makes you more sure of the result. A failed attempt is still useful. It leaves checks behind, and it shows you what doesn't work.

This only works because you check the work, and the checking is your job. Reading code finds few bugs. Running it finds most. Give the user only work you have already run.

- Before you start, set a finish line you can measure. For example, the test suite passes, the output matches the reference on real inputs, or the new build runs twice as fast as the old one. With a vague goal, you will stop at the first sign of progress.
- Check against the real thing. Run it, open it in a browser, and compare it with the reference build. When docs claim something about a system, test the claim on the real system.
- Matching a reference also copies its bugs. List every known place where your result differs from the reference, so nobody mistakes those differences for your bugs.
- For a risky change, get a review from a model in a different family, such as another vendor's model.
- If attempts keep failing the same way, fix the cause in your setup before you try again.

## Steps

1. **Hold the ocean.** Write the request as one sentence, at its full size. That sentence is the destination, in the user's terms.
   Done when the sentence asks for everything the request asked for.

2. **Sort the walls.** List every reason the task can't be done. Ask "why not?" about each one, and mark it as a limit, an obstacle, or a habit. Back each mark with something you checked in the repository, the docs, or the tools, and enter it in the foundation ledger. Then write down the limits that apply even though nobody stated them, and tell the user, so they can move the ones that are theirs. Set a budget in hours or tokens, and set a condition for stopping. If the destination itself lies past a limit, say so now, since no route can reach it.
   Done when every reason has a mark and its evidence, and the limits, the budget, and the stopping condition are written down.

3. **Find the oracle.** The oracle is whatever proves the work is right: an existing implementation to compare against, a test suite, a spec, known-good outputs, or a benchmark.
   Done when the oracle runs and reports a baseline, which is the result before you change anything. If no oracle exists yet, building one is your first unit of work.

4. **Cut the boil.** Plot the route from the direct one, going around each limit and obstacle as far as it takes, and ask the Panama Canal question before a long detour. Split the ocean into units that the oracle can check one at a time. Work on a throwaway branch or worktree, which is a separate checkout of the repository. Note where the stack you chose differs from what the user prefers.
   Done when another agent could start the first unit from the plan alone, and the route reaches the destination without crossing a limit.

5. **Boil.** Work one unit at a time, and stay within the limits, the budget, and what the user has already authorized. Run the oracle after each unit. When a unit fails, change the route, not the destination. Bring the user only a limit that closes every route, a budget that runs out, or a check that fails in a way you cannot explain.

6. **Hand back.** Report what the oracle confirmed. Report what you could not verify, such as hardware, secrets, or judgment calls. Report the risks of shipping it, the detours you took and what forced each, and any canal you built and now leave behind for the user to own. If no route reached the destination within the limits, name the limit that closed the last route and who could move it. The user then has to check only those things.

The voyage is finished when the oracle confirms the destination, or when a limit closes every route and the user knows which one.
