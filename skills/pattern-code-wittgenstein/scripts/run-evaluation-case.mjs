#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

import { analyzePatternTask } from "./pattern-scout-core.mjs";

function printUsage() {
  console.log(
    "Usage: node scripts/run-evaluation-case.mjs --case <path-to-json> [--root <path>] [--json]"
  );
}

function parseArgs(argv) {
  const options = {
    casePath: "",
    rootPath: process.cwd(),
    json: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--case") {
      options.casePath = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (arg === "--root") {
      options.rootPath = path.resolve(argv[index + 1] ?? options.rootPath);
      index += 1;
      continue;
    }

    if (arg === "--json") {
      options.json = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
  }

  if (!options.casePath) {
    printUsage();
    process.exit(1);
  }

  return options;
}

const options = parseArgs(process.argv.slice(2));
const evaluationCase = JSON.parse(await fs.readFile(options.casePath, "utf8"));
const analysis = await analyzePatternTask({
  rootPath: options.rootPath,
  task: evaluationCase.prompt,
  hints: evaluationCase.searchHints ?? []
});

const verdict = {
  caseId: evaluationCase.id,
  expectedRecommendation: evaluationCase.expectedRecommendation,
  actualRecommendation: analysis.decision.recommendation,
  passed: analysis.decision.recommendation === evaluationCase.expectedRecommendation,
  requiredPathsFound: (evaluationCase.requiredPaths ?? []).map((requiredPath) => ({
    requiredPath,
    found: analysis.candidates.some((candidate) => candidate.target.path === requiredPath)
  })),
  report: analysis.report
};

if (options.json) {
  process.stdout.write(`${JSON.stringify(verdict, null, 2)}\n`);
} else {
  process.stdout.write(`# ${evaluationCase.title}\n\n`);
  process.stdout.write(`- expected: ${verdict.expectedRecommendation}\n`);
  process.stdout.write(`- actual: ${verdict.actualRecommendation}\n`);
  process.stdout.write(`- passed: ${verdict.passed}\n\n`);
  process.stdout.write(`${analysis.report}\n`);
}
