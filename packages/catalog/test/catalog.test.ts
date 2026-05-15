import { describe, expect, it } from "vitest";

import { catalogDataSchema } from "../src/schema";
import catalog from "../src/generated/catalog.generated.json";
import { getPhilosopherBySlug, getSkillBySlug, getSkills } from "../src/index";

describe("catalog data", () => {
  it("parses the generated catalog", () => {
    expect(() => catalogDataSchema.parse(catalog)).not.toThrow();
  });

  it("finds a skill by slug", () => {
    expect(getSkillBySlug("audit-plan-descartes")?.title).toBe("Audit Plan Descartes");
  });

  it("groups skills by philosopher", () => {
    const cicero = getPhilosopherBySlug("marcus-tullius-cicero");
    const descartes = getPhilosopherBySlug("rene-descartes");
    const hegel = getPhilosopherBySlug("georg-wilhelm-friedrich-hegel");
    const wittgenstein = getPhilosopherBySlug("ludwig-wittgenstein");
    expect(cicero?.skills).toHaveLength(1);
    expect(descartes?.skills).toHaveLength(1);
    expect(hegel?.skills).toHaveLength(1);
    expect(wittgenstein?.skills).toHaveLength(1);
    expect(getSkills()).toHaveLength(4);
  });
});
