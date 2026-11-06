import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, "../..");
export const skillsRoot = path.join(projectRoot, "skills");

export const developerTraceSchema = z.object({
  status: z.enum(["pilot"]),
  mode: z.enum(["opt-in"]),
  surfaces: z.array(z.enum(["response"])).min(1),
  triggers: z.array(z.string().min(1)).min(1),
  contract: z.string().min(1)
});

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
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  developerTrace: developerTraceSchema.optional()
});

// The skill listing always costs context, so descriptions stay short; Claude Code
// itself truncates a description at 1,536 characters and advises under 500 lines.
export const MAX_DESCRIPTION_CHARS = 400;
export const MAX_SKILL_LINES = 500;

const STALE_VOCABULARY = [
  { pattern: /\bcodex\b|\bCodex\b/, label: "a Codex reference" },
  { pattern: /\$[a-z]+(?:-[a-z]+)+/, label: "a $skill-name invocation (use /skill-name or the Skill tool)" },
  { pattern: /openai\.yaml|AGENTS\.md|descartes-skill/, label: "a retired file or skill name" }
];

// Endings of names that once existed or are easy to misspell, on top of those derived from real slugs.
const RETIRED_SKILL_ENDINGS = ["coordinator", "kahneman"];

const README_OPENINGS = [
  { pattern: /^(?:# [^\r\n]+\r?\n\s*)?Philosopher idea:[ \t]*\S/, label: "Philosopher idea:" },
  { pattern: /^Practical use:[ \t]*\S/m, label: "Practical use:" }
];

export function parseFrontmatter(markdown) {
  const block = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) {
    return null;
  }

  const fields = {};
  for (const line of block[1].split(/\r?\n/)) {
    const field = line.match(/^([a-z-]+):\s*(.*)$/);
    if (field) {
      fields[field[1]] = field[2].replace(/^"(.*)"$/, "$1");
    }
  }

  return fields;
}

export function lintSkill({ slug, skillMarkdown, documents = [] }) {
  const issues = [];
  const frontmatter = parseFrontmatter(skillMarkdown);

  if (!frontmatter) {
    return ["SKILL.md has no frontmatter block."];
  }

  if (frontmatter.name !== slug) {
    issues.push(`SKILL.md name "${frontmatter.name}" must match the folder "${slug}".`);
  }

  if (!frontmatter.description) {
    issues.push("SKILL.md needs a description.");
  } else if (/^[>|]/.test(frontmatter.description)) {
    issues.push("SKILL.md description must be one line, so its length can be checked.");
  } else if (frontmatter.description.length > MAX_DESCRIPTION_CHARS) {
    issues.push(
      `SKILL.md description has ${frontmatter.description.length} characters; the limit is ${MAX_DESCRIPTION_CHARS}.`
    );
  }

  const lineCount = skillMarkdown.split(/\r?\n/).length;
  if (lineCount > MAX_SKILL_LINES) {
    issues.push(`SKILL.md has ${lineCount} lines; the limit is ${MAX_SKILL_LINES}.`);
  }

  for (const document of [{ path: "SKILL.md", content: skillMarkdown }, ...documents]) {
    for (const { pattern, label } of STALE_VOCABULARY) {
      if (pattern.test(document.content)) {
        issues.push(`${document.path} contains ${label}.`);
      }
    }
  }

  return issues;
}

export function lintReadme(readme) {
  return README_OPENINGS.filter(({ pattern }) => !pattern.test(readme)).map(
    ({ label }) => `README.md must state "${label}" as described in CONTRIBUTING.md.`
  );
}

export function findUnknownSiblingSkills(content, knownSlugs) {
  const endings = new Set(RETIRED_SKILL_ENDINGS);
  for (const slug of knownSlugs) {
    endings.add(slug.split("-").at(-1));
  }

  const siblingName = new RegExp(`\\b[a-z]+(?:-[a-z]+)*-(?:${[...endings].join("|")})\\b`, "g");
  const mentioned = new Set(content.match(siblingName) ?? []);
  return [...mentioned].filter((name) => !knownSlugs.has(name));
}

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

function extractMarkdownLinks(markdown) {
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
    ...extractMarkdownLinks(readme),
    ...extractMarkdownLinks(skillMarkdown),
    ...referencesContent.flatMap((reference) => extractMarkdownLinks(reference.content))
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

  const issues = [
    ...lintSkill({
      slug: skillSlug,
      skillMarkdown,
      documents: [
        { path: "README.md", content: readme },
        ...referencesContent.map((reference) => ({ path: reference.path, content: reference.content }))
      ]
    }),
    ...lintReadme(readme)
  ];

  if (issues.length > 0) {
    throw new Error(`Skill "${skillSlug}" failed validation:\n- ${issues.join("\n- ")}`);
  }

  return {
    ...manifest,
    philosopherSlug: slugify(manifest.philosopher),
    readme,
    skillMarkdown,
    referencesContent
  };
}

export async function loadSkillsData() {
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

  // A handoff to a skill that does not exist fails silently at runtime, so catch it here.
  for (const skill of skills) {
    const texts = [
      skill.skillMarkdown,
      skill.readme,
      ...skill.referencesContent.map((reference) => reference.content)
    ];
    const unknown = findUnknownSiblingSkills(texts.join("\n"), seenSlugs);
    if (unknown.length > 0) {
      throw new Error(`Skill "${skill.slug}" mentions skills that do not exist: ${unknown.join(", ")}`);
    }
  }

  return {
    skills
  };
}
