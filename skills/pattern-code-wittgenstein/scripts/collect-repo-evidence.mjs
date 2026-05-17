#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_MAX_FILES = 24;
const DEFAULT_MAX_HITS_PER_FILE = 3;
const DEFAULT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".yml",
  ".yaml",
  ".css",
  ".scss",
  ".html"
]);
const SKIP_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  ".output",
  ".turbo",
  "dist",
  "coverage"
]);

function printUsage() {
  console.log(
    "Usage: node scripts/collect-repo-evidence.mjs [--root <path>] [--max-files <n>] <term> [more terms...]"
  );
}

function parseArgs(argv) {
  const terms = [];
  let root = process.cwd();
  let maxFiles = DEFAULT_MAX_FILES;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--root") {
      root = path.resolve(argv[index + 1] ?? root);
      index += 1;
      continue;
    }

    if (arg === "--max-files") {
      maxFiles = Number.parseInt(argv[index + 1] ?? "", 10) || DEFAULT_MAX_FILES;
      index += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }

    terms.push(arg);
  }

  if (terms.length === 0) {
    printUsage();
    process.exit(1);
  }

  return { root, maxFiles, terms };
}

function isTestFile(relativePath) {
  return /(^|\/)(__tests__|test|tests|spec|e2e)(\/|\.|$)/i.test(relativePath);
}

async function walkFiles(root) {
  const collected = [];

  async function visit(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRECTORIES.has(entry.name)) {
          await visit(absolutePath);
        }
        continue;
      }

      if (!DEFAULT_EXTENSIONS.has(path.extname(entry.name))) {
        continue;
      }

      collected.push(absolutePath);
    }
  }

  await visit(root);
  return collected.sort();
}

function findLineHits(content, lowerTerms, maxHitsPerFile = DEFAULT_MAX_HITS_PER_FILE) {
  const hits = [];
  const lines = content.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const lowered = line.toLowerCase();
    const matchedTerms = lowerTerms.filter((term) => lowered.includes(term));

    if (matchedTerms.length === 0) {
      continue;
    }

    hits.push({
      lineNumber: index + 1,
      text: line.trim(),
      matchedTerms
    });

    if (hits.length >= maxHitsPerFile) {
      break;
    }
  }

  return hits;
}

function scoreFile(relativePath, hits, lowerTerms) {
  const fileName = path.basename(relativePath).toLowerCase();
  const fileNameMatches = lowerTerms.filter((term) => fileName.includes(term)).length;
  const testBonus = isTestFile(relativePath) ? 2 : 0;
  return hits.length * 3 + fileNameMatches * 2 + testBonus;
}

function formatSection(title, results) {
  if (results.length === 0) {
    return `## ${title}\n\n- none\n`;
  }

  const lines = [`## ${title}`, ""];
  for (const result of results) {
    lines.push(`- \`${result.relativePath}\``);
    for (const hit of result.hits) {
      lines.push(`  - L${hit.lineNumber}: ${hit.text}`);
    }
  }

  lines.push("");
  return lines.join("\n");
}

export async function collectRepoEvidence({
  rootPath,
  terms,
  maxFiles = DEFAULT_MAX_FILES,
  maxHitsPerFile = DEFAULT_MAX_HITS_PER_FILE
}) {
  const root = path.resolve(rootPath ?? process.cwd());
  const lowerTerms = terms.map((term) => term.toLowerCase());
  const files = await walkFiles(root);
  const matches = [];

  for (const absolutePath of files) {
    const relativePath = path.relative(root, absolutePath).replaceAll("\\", "/");
    const content = await fs.readFile(absolutePath, "utf8");
    const hits = findLineHits(content, lowerTerms, maxHitsPerFile);

    if (hits.length === 0 && !lowerTerms.some((term) => relativePath.toLowerCase().includes(term))) {
      continue;
    }

    matches.push({
      relativePath,
      hits,
      score: scoreFile(relativePath, hits, lowerTerms)
    });
  }

  matches.sort((left, right) => right.score - left.score || left.relativePath.localeCompare(right.relativePath));

  const selectedMatches = matches.slice(0, maxFiles);
  const production = selectedMatches.filter((match) => !isTestFile(match.relativePath));
  const tests = selectedMatches.filter((match) => isTestFile(match.relativePath));

  return {
    root,
    scannedFiles: files.length,
    matchingFiles: matches.length,
    matches,
    selectedMatches,
    production,
    tests
  };
}

export function formatRepoEvidence(evidence, terms) {
  return [
    `# Repo evidence for: ${terms.join(", ")}`,
    "",
    `- root: \`${evidence.root.replaceAll("\\", "/")}\``,
    `- scanned files: ${evidence.scannedFiles}`,
    `- matching files: ${evidence.matchingFiles}`,
    "",
    formatSection("Production candidates", evidence.production),
    formatSection("Test candidates", evidence.tests)
  ].join("\n");
}

function isDirectExecution(importMetaUrl) {
  return process.argv[1] && importMetaUrl === pathToFileURL(process.argv[1]).href;
}

if (isDirectExecution(import.meta.url)) {
  const { root, maxFiles, terms } = parseArgs(process.argv.slice(2));
  const evidence = await collectRepoEvidence({
    rootPath: root,
    terms,
    maxFiles
  });
  process.stdout.write(formatRepoEvidence(evidence, terms));
}
