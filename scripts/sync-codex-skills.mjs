import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSkillRecord, loadSkillsData } from "./lib/skills.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(projectRoot, "skills");
const ignoredNames = new Set([".cache", ".git", "dist", "node_modules"]);

function usage() {
  return [
    "Usage:",
    "  node ./scripts/sync-codex-skills.mjs [--dry-run] [--skill <slug>] [--no-backup]",
    "",
    "Options:",
    "  --dry-run     Print planned actions without writing files.",
    "  --skill       Sync only one skill slug from skills/<slug>.",
    "  --no-backup   Remove an existing target instead of backing it up."
  ].join("\n");
}

function parseArgs(argv) {
  const options = {
    dryRun: false,
    noBackup: false,
    skill: null
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--no-backup") {
      options.noBackup = true;
      continue;
    }

    if (arg === "--skill") {
      const slug = argv[index + 1];
      if (!slug || slug.startsWith("--")) {
        throw new Error("--skill requires a skill slug.");
      }
      options.skill = slug;
      index += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function codexSkillsRoot() {
  const codexHome = process.env.CODEX_HOME;
  return codexHome
    ? path.resolve(codexHome, "skills")
    : path.join(os.homedir(), ".codex", "skills");
}

function timestamp() {
  return new Date().toISOString().replace(/[-:.TZ]/g, "");
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function assertSkillDirectory(skillDir, slug) {
  if (slug === ".system" || slug.startsWith(".")) {
    throw new Error(`Refusing to sync reserved skill directory: ${slug}`);
  }

  const skillPath = path.join(skillDir, "SKILL.md");
  if (!(await pathExists(skillPath))) {
    throw new Error(`Missing SKILL.md for skill: ${slug}`);
  }
}

async function listProjectSkills(options) {
  if (options.skill) {
    const skillDir = path.join(sourceRoot, options.skill);
    if (!(await pathExists(skillDir))) {
      throw new Error(`Project skill not found: ${options.skill}`);
    }

    try {
      const skill = await loadSkillRecord(options.skill);
      return [skill.slug];
    } catch (error) {
      throw new Error(`Project skill is not validation-valid: ${options.skill}. ${error.message}`);
    }
  }

  const skillsData = await loadSkillsData();
  const skills = skillsData.skills.map((skill) => skill.slug).sort();

  for (const slug of skills) {
    await assertSkillDirectory(path.join(sourceRoot, slug), slug);
  }

  return skills;
}

function isInside(parentDir, childPath) {
  const relativePath = path.relative(parentDir, childPath);
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

async function nextBackupPath(backupRoot, slug, runTimestamp) {
  let candidate = path.join(backupRoot, `${slug}-${runTimestamp}`);
  let suffix = 2;

  while (await pathExists(candidate)) {
    candidate = path.join(backupRoot, `${slug}-${runTimestamp}-${suffix}`);
    suffix += 1;
  }

  return candidate;
}

async function syncSkill(slug, options, targetRoot, runTimestamp) {
  const sourceDir = path.resolve(sourceRoot, slug);
  const targetDir = path.resolve(targetRoot, slug);
  const backupRoot = path.resolve(targetRoot, ".backups", "world-of-sofia");

  if (!isInside(sourceRoot, sourceDir)) {
    throw new Error(`Resolved source is outside skills root: ${sourceDir}`);
  }
  if (!isInside(targetRoot, targetDir)) {
    throw new Error(`Resolved target is outside Codex skills root: ${targetDir}`);
  }
  if (path.basename(targetDir) === ".system") {
    throw new Error("Refusing to touch Codex .system skills.");
  }

  const targetExists = await pathExists(targetDir);
  const actionPrefix = options.dryRun ? "[DRY]" : "[OK]";

  console.log(`${actionPrefix} ${slug}: ${sourceDir} -> ${targetDir}`);

  if (targetExists) {
    if (options.noBackup) {
      console.log(`${actionPrefix} ${slug}: remove existing target without backup`);
      if (!options.dryRun) {
        await fs.rm(targetDir, { recursive: true, force: true });
      }
    } else {
      const backupPath = await nextBackupPath(backupRoot, slug, runTimestamp);
      console.log(`${actionPrefix} ${slug}: backup existing target to ${backupPath}`);
      if (!options.dryRun) {
        await fs.mkdir(backupRoot, { recursive: true });
        await fs.rename(targetDir, backupPath);
      }
    }
  }

  if (!options.dryRun) {
    await fs.mkdir(targetRoot, { recursive: true });
    await fs.cp(sourceDir, targetDir, {
      recursive: true,
      filter: (entryPath) => !ignoredNames.has(path.basename(entryPath))
    });
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const targetRoot = path.resolve(codexSkillsRoot());
  const skills = await listProjectSkills(options);
  const runTimestamp = timestamp();

  if (skills.length === 0) {
    throw new Error("No project skills found to sync.");
  }

  console.log(`Source: ${sourceRoot}`);
  console.log(`Target: ${targetRoot}`);
  console.log(`Skills: ${skills.join(", ")}`);

  if (options.dryRun) {
    console.log("Mode: dry run");
  }

  for (const slug of skills) {
    await syncSkill(slug, options, targetRoot, runTimestamp);
  }
}

try {
  await main();
} catch (error) {
  console.error(`[ERROR] ${error.message}`);
  console.error(usage());
  process.exit(1);
}
