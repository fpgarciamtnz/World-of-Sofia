import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  defaultPaths,
  describeLinks,
  describePending,
  formatLogLine,
  linkSkills,
  pendingWork,
  pullRepo
} from "./lib/link.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(repoRoot, "skills");

function usage() {
  return [
    "Usage:",
    "  node ./scripts/link-skills.mjs [--pull]",
    "",
    "Links each skills/<slug> into $CLAUDE_CONFIG_DIR/skills, or ~/.claude/skills when it is not set,",
    "and removes links whose skill no longer exists. Prints nothing when nothing needs attention.",
    "",
    "Options:",
    "  --pull   First fetch from GitHub (10 s limit) and fast-forward. A failed pull is reported and skipped."
  ].join("\n");
}

function appendLog(line) {
  // Inside .git, so the log is never tracked. A worktree has a .git file instead, and goes without a log.
  const gitDir = path.join(repoRoot, ".git");
  if (fs.statSync(gitDir, { throwIfNoEntry: false })?.isDirectory()) {
    fs.appendFileSync(path.join(gitDir, "sofia-sync.log"), `${line.replace(/\s+/g, " ")}\n`);
  }
}

function main(args) {
  const unknown = args.filter((arg) => arg !== "--pull");
  if (unknown.length > 0) {
    console.log(usage());
    process.exitCode = unknown.some((arg) => arg === "--help" || arg === "-h") ? 0 : 1;
    return;
  }

  const now = new Date();
  const pull = args.includes("--pull") ? pullRepo(repoRoot) : null;
  const result = linkSkills({ skillsRoot, ...defaultPaths(), now });
  const pending = pendingWork(repoRoot);

  const notes = [...(pull && !pull.ok ? [`pull skipped (${pull.reason})`] : []), ...describeLinks(result)];
  const lines = notes.length > 0 ? [`Sofia skills: ${notes.join("; ")}.`] : [];
  const pendingLine = describePending(pending);
  if (pendingLine) {
    lines.push(pendingLine);
  }
  if (lines.length > 0) {
    console.log(lines.join("\n"));
  }

  appendLog(formatLogLine({ now, pull, result, pending }));
}

const args = process.argv.slice(2);
try {
  main(args);
} catch (error) {
  console.log(`Sofia skills: sync failed (${error.message}).`);
  // As a SessionStart hook (--pull), only output from a zero exit reaches the session, so the agent can report it.
  process.exitCode = args.includes("--pull") ? 0 : 1;
}
