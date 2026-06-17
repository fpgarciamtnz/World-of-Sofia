import { describe, expect, it } from "vitest";

import { loadSkillRecord, loadSkillsData } from "./skills.mjs";

describe("skill validation helpers", () => {
  it("loads all project skills", async () => {
    const skillsData = await loadSkillsData();

    expect(skillsData.skills.map((skill) => skill.slug).sort()).toEqual([
      "audit-plan-descartes",
      "check-with-maxi",
      "communication-review-ciceron",
      "earned-presence-kondo",
      "grill-me-aquinas",
      "pattern-code-wittgenstein",
      "sofia-coordinatior",
      "synthesis-code-hegel",
      "ui-attention-kahneman"
    ]);
  });

  it("loads a single skill by slug", async () => {
    const skill = await loadSkillRecord("audit-plan-descartes");

    expect(skill.title).toBe("Audit Plan Descartes");
  });

  it("preserves opt-in developer trace metadata", async () => {
    const sofia = await loadSkillRecord("sofia-coordinatior");
    const wittgenstein = await loadSkillRecord("pattern-code-wittgenstein");
    const hegel = await loadSkillRecord("synthesis-code-hegel");

    expect(sofia.developerTrace).toEqual({
      status: "pilot",
      mode: "opt-in",
      surfaces: ["response"],
      triggers: [
        "developer mode",
        "trace mode",
        "impact evidence",
        "show traces",
        "skill trace",
        "Sofia trace",
        "skill contributions"
      ],
      contract: "references/developer-trace-contract.md"
    });

    expect(wittgenstein.developerTrace).toEqual({
      status: "pilot",
      mode: "opt-in",
      surfaces: ["response"],
      triggers: ["developer mode", "trace mode", "impact evidence", "show traces"],
      contract: "references/developer-trace-contract.md"
    });

    expect(hegel.developerTrace).toEqual({
      status: "pilot",
      mode: "opt-in",
      surfaces: ["response"],
      triggers: [
        "developer mode",
        "trace mode",
        "impact evidence",
        "show traces",
        "skill trace",
        "Hegel tracer"
      ],
      contract: "references/developer-trace-contract.md"
    });
  });
});
