import { describe, expect, it } from "vitest";

import { catalogDataSchema } from "../src/schema";
import catalog from "../src/generated/catalog.generated.json";
import { getPhilosopherBySlug, getSkillBySlug, getSkills } from "../src/index";

describe("catalog data", () => {
  it("parses the generated catalog", () => {
    expect(() => catalogDataSchema.parse(catalog)).not.toThrow();
  });

  it("finds a skill by slug", () => {
    expect(getSkillBySlug("descartes-foundation-ledger")?.title).toBe("Descartes Foundation Ledger");
  });

  it("groups skills by philosopher", () => {
    const philosopher = getPhilosopherBySlug("rene-descartes");
    expect(philosopher?.skills).toHaveLength(1);
    expect(getSkills()).toHaveLength(1);
  });
});

