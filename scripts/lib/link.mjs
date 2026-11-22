// Links each skill in this repository into Claude Code's skills folder, so the repository stays the only copy.
// It uses only the Node standard library, because a SessionStart hook runs it whether or not `npm install` ran.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The old copy installer left these out, so an installed copy that lacks them still matches the repository.
const IGNORED_NAMES = new Set([".cache", ".git", "dist", "node_modules", "tests"]);

// `synced` holds skills managed by the Claude app; dot folders hold its own state.
const RESERVED_NAMES = new Set(["synced"]);

export const PULL_TIMEOUT_MS = 10_000;

const GIT_ERRORS = [
  {
    pattern: /could not resolve host|unable to access|failed to connect|connection timed out|network is unreachable/i,
    reason: "GitHub could not be reached"
  },
  { pattern: /not possible to fast-forward|diverged/i, reason: "this clone and GitHub both have new commits" },
  { pattern: /would be overwritten/i, reason: "uncommitted changes are in the way" },
  {
    pattern: /no upstream|no tracking information|does not point to a branch/i,
    reason: "the current branch does not track GitHub"
  },
  { pattern: /index\.lock|cannot lock ref|another git process/i, reason: "another Git command was running" }
];

export function defaultPaths(env = process.env) {
  const configDir = path.resolve(env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude"));
  return {
    targetRoot: path.join(configDir, "skills"),
    // Outside the skills folder, so Claude Code never loads a copy moved there.
    backupRoot: path.join(configDir, ".backups", "world-of-sofia")
  };
}

export function listRepoSkills(skillsRoot) {
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && !RESERVED_NAMES.has(entry.name))
    .filter((entry) => fs.existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();
}

function comparable(filePath) {
  const resolved = path.resolve(filePath);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function isInside(parentDir, childPath) {
  const relative = path.relative(comparable(parentDir), comparable(childPath));
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function lstatOrNull(filePath) {
  try {
    return fs.lstatSync(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function linkTarget(linkPath) {
  // Windows may report a junction's target with a `\\?\` or `\??\` prefix.
  const target = fs.readlinkSync(linkPath).replace(/^(?:\\\\\?|\\\?\?)\\/, "");
  return path.resolve(path.dirname(linkPath), target);
}

function pointsTo(linkPath, targetDir) {
  return Boolean(lstatOrNull(linkPath)?.isSymbolicLink()) && comparable(linkTarget(linkPath)) === comparable(targetDir);
}

function makeLink(sourceDir, linkPath) {
  try {
    // A junction needs neither admin rights nor Developer Mode on Windows; elsewhere Node makes a symlink.
    fs.symlinkSync(sourceDir, linkPath, "junction");
  } catch (error) {
    // Two sessions starting together may both make the same link.
    if (error.code !== "EEXIST" || !pointsTo(linkPath, sourceDir)) {
      throw error;
    }
  }
}

function listFiles(dir, base = dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_NAMES.has(entry.name)) {
      continue;
    }

    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(entryPath, base));
    } else {
      files.push(path.relative(base, entryPath).replaceAll("\\", "/"));
    }
  }
  return files.sort();
}

export function matchesRepoCopy(installedDir, sourceDir) {
  const installed = listFiles(installedDir);
  const source = listFiles(sourceDir);
  return (
    installed.length === source.length &&
    installed.every((file, index) => file === source[index]) &&
    installed.every((file) =>
      fs.readFileSync(path.join(installedDir, file)).equals(fs.readFileSync(path.join(sourceDir, file)))
    )
  );
}

function freePath(basePath) {
  let candidate = basePath;
  for (let suffix = 2; lstatOrNull(candidate); suffix += 1) {
    candidate = `${basePath}-${suffix}`;
  }
  return candidate;
}

function linkSkill(slug, { skillsRoot, targetRoot, backupRoot, now }) {
  const sourceDir = path.join(skillsRoot, slug);
  const linkPath = path.join(targetRoot, slug);
  const existing = lstatOrNull(linkPath);

  if (!existing) {
    makeLink(sourceDir, linkPath);
    return { action: "linked" };
  }

  if (existing.isSymbolicLink()) {
    if (pointsTo(linkPath, sourceDir)) {
      return { action: "kept" };
    }
    fs.unlinkSync(linkPath);
    makeLink(sourceDir, linkPath);
    return { action: "relinked" };
  }

  if (existing.isDirectory() && matchesRepoCopy(linkPath, sourceDir)) {
    fs.rmSync(linkPath, { recursive: true });
    makeLink(sourceDir, linkPath);
    return { action: "replaced" };
  }

  // Anything else in the way may hold work that exists nowhere else, so move it out of Claude Code's sight.
  fs.mkdirSync(backupRoot, { recursive: true });
  const archivedTo = freePath(path.join(backupRoot, `${slug}-${now.toISOString().replace(/[-:.TZ]/g, "")}`));
  fs.renameSync(linkPath, archivedTo);
  makeLink(sourceDir, linkPath);
  return { action: "archived", archivedTo };
}

export function linkSkills({ skillsRoot, targetRoot, backupRoot, now = new Date() }) {
  const slugs = listRepoSkills(skillsRoot);
  const result = { linked: [], replaced: [], relinked: [], archived: [], removed: [], failed: [] };
  fs.mkdirSync(targetRoot, { recursive: true });

  for (const slug of slugs) {
    try {
      const { action, archivedTo } = linkSkill(slug, { skillsRoot, targetRoot, backupRoot, now });
      if (action === "archived") {
        result.archived.push({ slug, archivedTo });
      } else if (action !== "kept") {
        result[action].push(slug);
      }
    } catch (error) {
      result.failed.push({ slug, reason: error.code ?? error.message });
    }
  }

  // Remove links whose skill is gone from the repository. Other skills and links are never touched.
  for (const name of fs.readdirSync(targetRoot)) {
    const linkPath = path.join(targetRoot, name);
    try {
      if (!lstatOrNull(linkPath)?.isSymbolicLink()) {
        continue;
      }
      const target = linkTarget(linkPath);
      if (isInside(skillsRoot, target) && !fs.existsSync(path.join(target, "SKILL.md"))) {
        fs.unlinkSync(linkPath);
        result.removed.push(name);
      }
    } catch (error) {
      result.failed.push({ slug: name, reason: error.code ?? error.message });
    }
  }

  return result;
}

export function describeLinks(result) {
  const notes = [];
  if (result.linked.length > 0) {
    notes.push(`linked ${result.linked.join(", ")}`);
  }
  if (result.replaced.length > 0) {
    notes.push(`replaced installed copies with links: ${result.replaced.join(", ")}`);
  }
  if (result.relinked.length > 0) {
    notes.push(`relinked ${result.relinked.join(", ")}`);
  }
  if (result.removed.length > 0) {
    notes.push(`removed links to deleted skills: ${result.removed.join(", ")}`);
  }
  for (const { slug, archivedTo } of result.archived) {
    notes.push(`moved a different ${slug} folder to ${archivedTo}`);
  }
  for (const { slug, reason } of result.failed) {
    notes.push(`could not link ${slug} (${reason})`);
  }
  return notes;
}

export function explainGitError(output) {
  const known = GIT_ERRORS.find(({ pattern }) => pattern.test(output));
  if (known) {
    return known.reason;
  }

  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const message = lines.find((line) => /^(?:fatal|error):/.test(line)) ?? lines[0] ?? "";
  return message.replace(/^(?:fatal|error):\s*/, "").slice(0, 120) || "git failed";
}

export function runGit(repoRoot, args, timeout = 5_000) {
  const result = spawnSync("git", ["-C", repoRoot, ...args], {
    encoding: "utf8",
    // Never wait on a credential prompt nobody will answer. LC_ALL=C keeps Git's messages in
    // English, which GIT_ERRORS matches, whatever language the machine uses.
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "never", LC_ALL: "C" },
    timeout,
    windowsHide: true
  });

  if (result.error?.code === "ETIMEDOUT") {
    return { ok: false, reason: `no answer within ${timeout / 1000} s` };
  }
  if (result.error?.code === "ENOENT") {
    return { ok: false, reason: "git was not found" };
  }
  if (result.error) {
    return { ok: false, reason: result.error.message };
  }
  if (result.status !== 0) {
    return { ok: false, reason: explainGitError(`${result.stderr}\n${result.stdout}`) };
  }
  return { ok: true, stdout: result.stdout };
}

export function pullRepo(repoRoot, run = runGit) {
  // Only the fetch talks to GitHub, so only it gets the time limit: a slow network is cut off
  // before anything changes here. The fast-forward is local and never merges or rewrites work.
  const fetched = run(repoRoot, ["fetch", "--quiet"], PULL_TIMEOUT_MS);
  if (!fetched.ok) {
    return fetched;
  }
  return run(repoRoot, ["merge", "--ff-only", "--quiet", "@{u}"]);
}

export function pendingWork(repoRoot, run = runGit) {
  const status = run(repoRoot, ["--no-optional-locks", "status", "--porcelain"]);
  const ahead = run(repoRoot, ["rev-list", "--count", "@{u}..HEAD"]);
  return {
    uncommitted: status.ok && status.stdout.trim() !== "",
    unpushed: ahead.ok ? Number.parseInt(ahead.stdout, 10) || 0 : 0
  };
}

export function describePending({ uncommitted, unpushed }) {
  const commits = `${unpushed} unpushed commit${unpushed === 1 ? "" : "s"}`;
  if (uncommitted && unpushed > 0) {
    return `World-of-Sofia has uncommitted changes and ${commits}: commit and push World-of-Sofia.`;
  }
  if (uncommitted) {
    return "World-of-Sofia has uncommitted changes: commit and push World-of-Sofia.";
  }
  if (unpushed > 0) {
    return `World-of-Sofia has ${commits}: push World-of-Sofia.`;
  }
  return null;
}

export function formatLogLine({ now, pull, result, pending }) {
  const pullField = pull === null ? "off" : pull.ok ? "ok" : `skipped (${pull.reason})`;
  const counts = Object.entries(result)
    .map(([key, items]) => `${key}=${items.length}`)
    .join(" ");
  return `${now.toISOString()} pull=${pullField} ${counts} uncommitted=${pending.uncommitted ? "yes" : "no"} unpushed=${pending.unpushed}`;
}
