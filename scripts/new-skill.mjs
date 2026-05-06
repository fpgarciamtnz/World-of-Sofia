import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const templateRoot = path.join(projectRoot, "templates/skill");
const skillsRoot = path.join(projectRoot, "skills");

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function copyDirectory(sourceDir, targetDir, replacements) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath, replacements);
      continue;
    }

    let content = await fs.readFile(sourcePath, "utf8");
    for (const [placeholder, value] of Object.entries(replacements)) {
      content = content.replaceAll(placeholder, value);
    }

    await fs.writeFile(targetPath, content, "utf8");
  }
}

const [, , titleArg, philosopherArg = "Unknown Philosopher"] = process.argv;

if (!titleArg) {
  throw new Error("Usage: npm run new:skill -- \"Skill Title\" \"Philosopher Name\"");
}

const slug = slugify(titleArg);
const targetDir = path.join(skillsRoot, slug);

try {
  await fs.access(targetDir);
  throw new Error(`Skill directory already exists: ${slug}`);
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

await copyDirectory(templateRoot, targetDir, {
  "__ID__": `world-of-sofia.${slug}`,
  "__SLUG__": slug,
  "__TITLE__": titleArg,
  "__PHILOSOPHER__": philosopherArg,
  "__SUMMARY__": `A ${philosopherArg}-inspired skill for practical reasoning.`,
  "__TAG__": slug.split("-")[0] || "philosophy"
});

