import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { analyzePatternTask } from "../scripts/pattern-scout-core.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../..");
const casesDir = path.join(projectRoot, "docs/evaluations/pattern-code-wittgenstein-cases");

async function loadCases() {
  const entries = await fs.readdir(casesDir);
  const cases = [];

  for (const entry of entries.sort()) {
    if (!entry.endsWith(".json")) {
      continue;
    }

    const raw = await fs.readFile(path.join(casesDir, entry), "utf8");
    cases.push(JSON.parse(raw));
  }

  return cases;
}

const cases = await loadCases();

describe("pattern-code-wittgenstein prototype", () => {
  for (const evaluationCase of cases) {
    it(`returns ${evaluationCase.expectedRecommendation} for ${evaluationCase.id}`, async () => {
      const result = await analyzePatternTask({
        rootPath: projectRoot,
        task: evaluationCase.prompt,
        hints: evaluationCase.searchHints ?? []
      });

      expect(result.decision.recommendation).toBe(evaluationCase.expectedRecommendation);

      for (const requiredPath of evaluationCase.requiredPaths ?? []) {
        expect(result.candidates.some((candidate) => candidate.target.path === requiredPath)).toBe(true);
      }

      expect(result.report).toContain("## Recommendation");
      expect(result.decision.falseSimilarityRisks.length).toBeGreaterThan(0);
      expect(result.candidates.every((candidate) => candidate.evidenceItems.length > 0)).toBe(true);
      expect(
        result.candidates
          .flatMap((candidate) => candidate.evidenceItems)
          .every((item) => ["structural", "behavioral", "semantic", "naming", "domain", "historical"].includes(item.type))
      ).toBe(true);
    });
  }

  it("separates observed from inferred evidence", async () => {
    const result = await analyzePatternTask({
      rootPath: projectRoot,
      task: "Before adding opt-in developer trace metadata to another skill, inspect the repo."
    });

    const evidence = result.candidates.flatMap((candidate) => candidate.evidenceItems);
    expect(evidence.some((item) => item.observed)).toBe(true);
    expect(evidence.some((item) => !item.observed)).toBe(true);
  });

  it("rejects a generic lifecycle abstraction when only helper pressure aligns", async () => {
    const result = await analyzePatternTask({
      rootPath: projectRoot,
      task: "Before extracting a generic skill lifecycle abstraction for new-skill, install, validation, and a planned quick-fix command, inspect the repo and tell me what patterns actually belong together, what should stay separate, and whether the right action is reuse, extend, extract, copy carefully, or create new.",
      hints: ["skill lifecycle", "validation", "install", "quick-fix"]
    });

    expect(result.decision.recommendation).toBe("extend");
    expect(result.report).toContain("generic skill lifecycle abstraction");
    expect(result.report).toContain("planned quick-fix command is still hypothetical");
    expect(result.report).toContain("extract was rejected");
  });
});
