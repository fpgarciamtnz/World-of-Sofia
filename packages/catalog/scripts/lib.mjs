import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, "../../..");
export const skillsRoot = path.join(projectRoot, "skills");
export const generatedCatalogPath = path.join(
  projectRoot,
  "packages/catalog/src/generated/catalog.generated.json"
);

export const skillManifestSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  philosopher: z.string().min(1),
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  status: z.enum(["draft", "alpha", "beta", "stable", "archived"]),
  sourceRepo: z.string().min(1),
  installCommand: z.string().min(1),
  references: z.array(z.string().min(1)),
  version: z.string().regex(/^\d+\.\d+\.\d+$/)
});

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function listDirectories(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

async function listSkillSlugs() {
  const directories = await listDirectories(skillsRoot);
  const skillSlugs = [];

  for (const directory of directories) {
    const manifestPath = path.join(skillsRoot, directory, "skill.meta.json");
    try {
      await fs.access(manifestPath);
      skillSlugs.push(directory);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return skillSlugs;
}

async function listReferenceFiles(dirPath, basePath = dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listReferenceFiles(entryPath, basePath)));
      continue;
    }

    files.push(path.relative(basePath, entryPath).replaceAll("\\", "/"));
  }

  return files.sort();
}

function assertRelativePathInsideSkill(skillSlug, relativePath) {
  if (path.isAbsolute(relativePath) || relativePath.includes("..")) {
    throw new Error(`Skill "${skillSlug}" has an out-of-bounds reference path: ${relativePath}`);
  }
}

async function extractMarkdownLinks(markdown) {
  const matches = [];
  const regex = /\[[^\]]+\]\(([^)]+)\)/g;

  for (const match of markdown.matchAll(regex)) {
    matches.push(match[1]);
  }

  return matches;
}

export async function loadSkillRecord(skillSlug) {
  const skillDir = path.join(skillsRoot, skillSlug);
  const manifestPath = path.join(skillDir, "skill.meta.json");
  const readmePath = path.join(skillDir, "README.md");
  const skillPath = path.join(skillDir, "SKILL.md");
  const referencesDir = path.join(skillDir, "references");

  await Promise.all([
    fs.access(manifestPath),
    fs.access(readmePath),
    fs.access(skillPath)
  ]);

  const [manifestRaw, readme, skillMarkdown] = await Promise.all([
    readJson(manifestPath),
    fs.readFile(readmePath, "utf8"),
    fs.readFile(skillPath, "utf8")
  ]);

  const manifest = skillManifestSchema.parse(manifestRaw);

  if (manifest.slug !== skillSlug) {
    throw new Error(
      `Skill folder "${skillSlug}" must match the manifest slug "${manifest.slug}".`
    );
  }

  const referencesContent = [];
  for (const relativePath of manifest.references) {
    assertRelativePathInsideSkill(skillSlug, relativePath);
    const absolutePath = path.join(skillDir, relativePath);
    const content = await fs.readFile(absolutePath, "utf8");
    referencesContent.push({
      path: relativePath,
      title: path.basename(relativePath, path.extname(relativePath)).replaceAll("-", " "),
      content
    });
  }

  let discoveredReferenceFiles = [];
  try {
    discoveredReferenceFiles = await listReferenceFiles(referencesDir);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  for (const referenceFile of discoveredReferenceFiles) {
    if (!manifest.references.includes(`references/${referenceFile}`)) {
      throw new Error(
        `Skill "${skillSlug}" has an unregistered reference file "references/${referenceFile}".`
      );
    }
  }

  const localLinks = [
    ...(await extractMarkdownLinks(readme)),
    ...(await extractMarkdownLinks(skillMarkdown)),
    ...(
      await Promise.all(referencesContent.map((reference) => extractMarkdownLinks(reference.content)))
    ).flat()
  ];

  for (const link of localLinks) {
    if (link.startsWith("http://") || link.startsWith("https://") || link.startsWith("#")) {
      continue;
    }

    assertRelativePathInsideSkill(skillSlug, link);

    const resolvedPath = path.join(skillDir, link);
    try {
      await fs.access(resolvedPath);
    } catch {
      throw new Error(`Skill "${skillSlug}" links to a missing local file: ${link}`);
    }
  }

  return {
    ...manifest,
    philosopherSlug: slugify(manifest.philosopher),
    readme,
    skillMarkdown,
    referencesContent
  };
}

export async function loadCatalogData() {
  const skillSlugs = await listSkillSlugs();
  const skills = [];
  const seenIds = new Set();
  const seenSlugs = new Set();

  for (const skillSlug of skillSlugs) {
    const skill = await loadSkillRecord(skillSlug);
    if (seenIds.has(skill.id)) {
      throw new Error(`Duplicate skill id detected: ${skill.id}`);
    }

    if (seenSlugs.has(skill.slug)) {
      throw new Error(`Duplicate skill slug detected: ${skill.slug}`);
    }

    seenIds.add(skill.id);
    seenSlugs.add(skill.slug);
    skills.push(skill);
  }

  return {
    generatedAt: new Date().toISOString(),
    skills
  };
}

export async function writeGeneratedCatalog() {
  const catalog = await loadCatalogData();
  await fs.writeFile(generatedCatalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  return catalog;
}
