#!/usr/bin/env node

function printUsage() {
  console.log(
    "Usage: node scripts/seed-evidence-ledger.mjs --task <text> [--context <text>] [--language-game <text>]"
  );
}

function parseArgs(argv) {
  const options = {
    task: "",
    context: "unknown",
    languageGame: "unknown"
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--task") {
      options.task = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (arg === "--context") {
      options.context = argv[index + 1] ?? options.context;
      index += 1;
      continue;
    }

    if (arg === "--language-game") {
      options.languageGame = argv[index + 1] ?? options.languageGame;
      index += 1;
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

const { task, context, languageGame } = parseArgs(process.argv.slice(2));

console.log("## Task summary");
console.log("");
console.log(`- requested work: ${task}`);
console.log(`- bounded context: ${context}`);
console.log(`- language-game: ${languageGame}`);
console.log("");
console.log("## Candidate code families");
console.log("");
console.log("- Family A");
console.log("  - relevant files:");
console.log("  - resemblance type:");
console.log("  - strength:");
console.log("  - reason:");
console.log("- Family B");
console.log("  - relevant files:");
console.log("  - resemblance type:");
console.log("  - strength:");
console.log("  - reason:");
console.log("");
console.log("## Evidence of resemblance");
console.log("");
console.log("- code locations:");
console.log("- tests:");
console.log("- collaborators:");
console.log("- schemas or fixtures:");
console.log("- inference to verify:");
console.log("");
console.log("## False-similarity risks");
console.log("");
console.log("- naming collision:");
console.log("- bounded context mismatch:");
console.log("- side-effect mismatch:");
console.log("- missing tests:");
console.log("");
console.log("## Recommendation");
console.log("");
console.log("- decision: ");
console.log("- why: ");
console.log("");
console.log("## Implementation guidance");
console.log("");
console.log("- preserve:");
console.log("- vary:");
console.log("- avoid:");
console.log("");
console.log("## Tests to mirror or add");
console.log("");
console.log("- precedent tests:");
console.log("- new assertions:");
console.log("");
console.log("## Confidence and missing evidence");
console.log("");
console.log("- confidence:");
console.log("- missing evidence:");
