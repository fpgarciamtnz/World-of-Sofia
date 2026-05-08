#!/usr/bin/env node

import path from "node:path";

import { analyzePatternTask } from "./pattern-scout-core.mjs";

function printUsage() {
  console.log(
    "Usage: node scripts/run-pattern-scout.mjs --task <text> [--root <path>] [--hint <text>] [--max-files <n>] [--json]"
  );
}

function parseArgs(argv) {
  const options = {
    rootPath: process.cwd(),
    task: "",
    hints: [],
    maxFiles: 18,
    json: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--task") {
      options.task = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (arg === "--root") {
      options.rootPath = path.resolve(argv[index + 1] ?? options.rootPath);
      index += 1;
      continue;
    }

    if (arg === "--hint") {
      options.hints.push(argv[index + 1] ?? "");
      index += 1;
      continue;
    }

    if (arg === "--max-files") {
      options.maxFiles = Number.parseInt(argv[index + 1] ?? "", 10) || options.maxFiles;
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

  if (!options.task) {
    printUsage();
    process.exit(1);
  }

  return options;
}

const options = parseArgs(process.argv.slice(2));
const result = await analyzePatternTask(options);

if (options.json) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(`${result.report}\n`);
}
