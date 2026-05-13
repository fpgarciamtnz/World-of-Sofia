import { describe, expect, it } from "vitest";

import { getPhilosophers, getSkills } from "@world-of-sofia/catalog";

import { getCatalogMetrics } from "../../app/utils/catalog-metrics";

describe("catalog metrics", () => {
  it("counts philosophers, skills, and tags", () => {
    const metrics = getCatalogMetrics(getSkills(), getPhilosophers());

    expect(metrics).toEqual({
      philosophers: 3,
      skills: 3,
      tags: 8
    });
  });
});
