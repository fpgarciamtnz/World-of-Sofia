import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

// Magallanes replaces onmax's boil-the-ocean in Claude Code (ADR 0004), so it keeps every
// sentence of the version installed on 2026-11-09, with "the user" for "your human".
// A sentence leaves only as a recorded change below, with its reason.

const skillDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const flatten = (text) => text.replace(/\s+/g, " ");

const originalBody = fs
  .readFileSync(path.join(skillDir, "tests/fixtures/boil-the-ocean-2026-11-09.md"), "utf8")
  .replace(/^---[\s\S]*?---/, "")
  .replace(/^#.*$/gm, "")
  .replaceAll("your human", "the user")
  .replaceAll("Your human", "The user");
const original = flatten(originalBody);
const magallanes = flatten(fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8"));

const kept = [
  "When a request is this big, you will want to make it smaller before you start.",
  "Don't. Measure it first.",
  'Your sense of "too big" comes from watching human teams, and it may no longer match what agents can do.',
  "Effort used to be the limit.",
  "A rewrite, a port, or a rebuild took a team months, so people tried one only as a last resort.",
  "Current models can often do the same work in hours or days, as long as something checks each step.",
  "So take the request at its full size.",
  "This skill calls that full size the **ocean**",
  "Then find out what really limits it.",
  'Most reasons a task "can\'t" be done are **habits**.',
  "A habit is something people stopped trying because it used to cost too much.",
  "A few reasons are **real walls**: law, licenses, security, safety, money nobody approved, or a limit the user set.",
  'A habit goes away when you ask "why not?" and find no real answer.',
  "A real wall stays, and the plan goes around it.",
  "Choose whatever reaches the goal fastest for agents, even if neither you nor the user would normally pick it.",
  "This covers the language, the framework, the shell, and how low in the stack you work.",
  "When code is cheap to write, you can write code to answer one question and then delete it.",
  "Some examples:",
  "a script that compares two outputs",
  "a small wrapper that lets you test against a flaky service",
  "a quick prototype of one approach",
  "three attempts in parallel, where two get thrown away",
  "Write this kind of code whenever it answers a question or makes you more sure of the result.",
  "A failed attempt is still useful. It leaves checks behind, and it shows you what doesn't work.",
  "This only works because you check the work, and the checking is your job.",
  "Reading code finds few bugs. Running it finds most.",
  "Give the user only work you have already run.",
  "Before you start, set a finish line you can measure.",
  "For example, the test suite passes, the output matches the reference on real inputs, or the new build runs twice as fast as the old one.",
  "With a vague goal, you will stop at the first sign of progress.",
  "Check against the real thing. Run it, open it in a browser, and compare it with the reference build.",
  "When docs claim something about a system, test the claim on the real system.",
  "Matching a reference also copies its bugs. List every known place where your result differs from the reference, so nobody mistakes those differences for your bugs.",
  "For a risky change, get a review from a model in a different family, such as another vendor's model.",
  "If attempts keep failing the same way, fix the cause in your setup before you try again.",
  "**Hold the ocean.** Write the request as one sentence, at its full size.",
  "Done when the sentence asks for everything the request asked for.",
  "**Sort the walls.** List every reason the task can't be done.",
  'Ask "why not?" about each one',
  "Back each mark with something you checked in the repository, the docs, or the tools",
  "Done when every reason has a mark and its evidence",
  "**Find the oracle.** The oracle is whatever proves the work is right: an existing implementation to compare against, a test suite, a spec, known-good outputs, or a benchmark.",
  "Done when the oracle runs and reports a baseline, which is the result before you change anything. If no oracle exists yet, building one is your first unit of work.",
  "**Cut the boil.**",
  "Split the ocean into units that the oracle can check one at a time.",
  "Work on a throwaway branch or worktree, which is a separate checkout of the repository.",
  "Set a budget in hours or tokens, and set a condition for stopping.",
  "Note where the stack you chose differs from what the user prefers.",
  "Done when another agent could start the first unit from the plan alone",
  "**Boil.** Work one unit at a time, and stay within",
  "what the user has already authorized",
  "Run the oracle after each unit.",
  "**Hand back.** Report what the oracle confirmed.",
  "Report what you could not verify, such as hardware, secrets, or judgment calls.",
  "Report the risks of shipping it",
  "The user then has to check only those things."
];

const changed = [
  {
    original: ", and mark it as a habit or a real wall.",
    now: ", and mark it as a limit, an obstacle, or a habit.",
    why: "Magallanes adds obstacles, blocks that are real but close only one route."
  },
  {
    original: "Stop and ask the user only when a check fails and you can't explain why.",
    now: "put both options to the user with your recommendation",
    why: "The user asked to be consulted before a long detour or a canal, which they will maintain."
  },
  {
    original: "Bring only the real walls to the user.",
    now: "Bring the user only a limit that closes every route, a budget that runs out, or a check that fails in a way you cannot explain.",
    why: "Limits now include the budget, and an unexplained failing check still goes to the user."
  }
];

describe("boil-the-ocean inside Magallanes", () => {
  it("lists only text that is in the original", () => {
    for (const phrase of [...kept, ...changed.map(({ original: text }) => text)]) {
      expect(original, phrase).toContain(phrase);
    }
  });

  it("keeps every listed sentence of the original", () => {
    for (const phrase of kept) {
      expect(magallanes, phrase).toContain(phrase);
    }
  });

  it("carries each recorded change", () => {
    for (const { now } of changed) {
      expect(magallanes, now).toContain(now);
    }
  });

  it("accounts for the whole original, so no sentence can go missing unlisted", () => {
    let rest = original;
    for (const phrase of [...kept, ...changed.map(({ original: text }) => text)]) {
      rest = rest.replace(phrase, " ");
    }

    expect(rest.replace(/[\s.,:\-\d]/g, "")).toBe("");
  });
});
