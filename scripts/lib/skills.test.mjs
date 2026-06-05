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
      "ui-attention-ciceron"
    ]);
  });

  it("loads a single skill by slug", async () => {
    const skill = await loadSkillRecord("audit-plan-descartes");

    expect(skill.title).toBe("Audit Plan Descartes");
  });

  it("preserves opt-in developer trace metadata", async () => {
    const skill = await loadSkillRecord("pattern-code-wittgenstein");

    expect(skill.developerTrace).toEqual({
      status: "pilot",
      mode: "opt-in",
      surfaces: ["response"],
      triggers: ["developer mode", "trace mode", "impact evidence", "show traces"],
      contract: "references/developer-trace-contract.md"
    });
  });
});
