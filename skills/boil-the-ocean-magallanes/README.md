# Boil the Ocean Magallanes

Philosopher idea: Magellan's voyage becomes a route habit: he kept both his destination, the Spice Islands, and his limit, the treaty that left the eastern route to Portugal, so he sailed west, through a strait at the bottom of a continent and across the widest ocean on Earth.

Practical use: Use when the user asks for something huge, such as a rewrite, a port, or a rebuild, or describes where they want to end up and the way looks long or blocked. It takes the request at its full size as the destination, sorts every reason it "can't" be done into a limit, an obstacle, or a habit with evidence, writes the limits down before starting, finds the oracle that proves the result, goes around whatever blocks the way, as far around as it takes, and checks every unit until the oracle confirms arrival or a limit closes every route.

## What it keeps from boil-the-ocean

All of it. Every sentence of the original is in [SKILL.md](SKILL.md), with "the user" for "your human": the request at its full size, the ocean; habits and real walls, sorted with "why not?" and evidence; the fastest route for agents, down to the language, the shell, and how low in the stack you work; throwaway code and owned checks; the oracle and its baseline; and the six steps from holding the ocean to the hand-back.

## What it adds

- **A destination.** The ocean is where the user wants to end up. The destination and the limits stay fixed, and the route changes, around the world if needed.
- **Limits as premises.** There should always be limits, so they are written down before starting, including the ones nobody stated and the budget, and the user is told about them.
- **Obstacles.** A third kind of block, between habits and walls: real, but only on one route, so the route goes around it.
- **The Panama Canal.** Before a long detour, it asks whether the route will be sailed again. If so, building a channel through the obstacle can beat the detour even when it is slower now. The user maintains a canal, so a long detour or a canal is their call.
- **Audit Plan Descartes.** Every limit gets its source in Descartes' ledger, a "can't" is an assumption until checked, the oracle's results are facts, and a canal is an assumption until a prototype holds.
- **A clear stop.** When no route reaches the destination within the limits, it names the limit that closed the last route and who could move it.

One rule changed. The original asks the user only when a check fails and it cannot explain why, and brings them only real walls. This skill also tells the user the limits it wrote down, and asks before a long detour or a canal.

## Origin

Copied on 2026-11-17 from `boil-the-ocean` in [onmax/skills](https://github.com/onmax/skills), in the version installed on 2026-11-09, and it replaces that skill in Claude Code. The original is MIT licensed, and [LICENSE](LICENSE) keeps its notice. Upstream rewrote its skill on 2026-11-16 around subagent workers and its `check-your-work` skill; changes from there come in by hand.

## Distribution boundary

This folder is self-contained.
