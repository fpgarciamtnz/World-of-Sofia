import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { loadSkillRecord, loadSkillsData, skillsRoot as sourceRoot } from "./lib/skills.mjs";

// Development-only folders that an installed skill never needs at runtime.
const ignoredNames = new Set([".cache", ".git", "dist", "node_modules", "tests"]);

// `synced` holds skills managed by the Claude app; dot folders hold its own state.
const reservedSlugs = new Set(["synced"]);

function usage() {
  return [
    "Usage:",
    "  node ./scripts/install-skills.mjs [--dry-run] [--skill <slug>] [--no-backup]",
    "",
    "Installs into $CLAUDE_CONFIG_DIR/skills, or ~/.claude/skills when it is not set.",
    "",
    "Options:",
    "  --dry-run     Print planned actions without writing files.",
    "  --skill       Install only one skill slug from skills/<slug>.",
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

function claudeConfigDir() {
  return path.resolve(process.env.CLAUDE_CONFIG_DIR ?? path.join(os.homedir(), ".claude"));
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

function assertInstallableSlug(slug) {
  if (slug.startsWith(".") || reservedSlugs.has(slug)) {
    throw new Error(`Refusing to install over a reserved skill directory: ${slug}`);
  }
}

async function listProjectSkills(options) {
  if (options.skill) {
    if (!(await pathExists(path.join(sourceRoot, options.skill)))) {
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
  return skillsData.skills.map((skill) => skill.slug).sort();
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

async function installSkill(slug, options, targetRoot, backupRoot, runTimestamp) {
  assertInstallableSlug(slug);

  const sourceDir = path.resolve(sourceRoot, slug);
  const targetDir = path.resolve(targetRoot, slug);

  if (!isInside(sourceRoot, sourceDir)) {
    throw new Error(`Resolved source is outside skills root: ${sourceDir}`);
  }
  if (!isInside(targetRoot, targetDir)) {
    throw new Error(`Resolved target is outside Claude skills root: ${targetDir}`);
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
  const configDir = claudeConfigDir();
  const targetRoot = path.join(configDir, "skills");
  // Backups stay outside the skills folder so Claude Code never discovers an old copy.
  const backupRoot = path.join(configDir, ".backups", "world-of-sofia");
  const skills = await listProjectSkills(options);
  const runTimestamp = timestamp();

  if (skills.length === 0) {
    throw new Error("No project skills found to install.");
  }

  console.log(`Source: ${sourceRoot}`);
  console.log(`Target: ${targetRoot}`);
  console.log(`Skills: ${skills.join(", ")}`);

  if (options.dryRun) {
    console.log("Mode: dry run");
  }

  for (const slug of skills) {
    await installSkill(slug, options, targetRoot, backupRoot, runTimestamp);
  }
}

try {
  await main();
} catch (error) {
  console.error(`[ERROR] ${error.message}`);
  console.error(usage());
  process.exit(1);
}
