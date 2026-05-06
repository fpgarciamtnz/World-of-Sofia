import generatedCatalog from "./generated/catalog.generated.json";
import { catalogDataSchema } from "./schema";
import type { CatalogData, CatalogPhilosopher, CatalogSkill } from "./types";

const catalog = catalogDataSchema.parse(generatedCatalog) as CatalogData;

function buildPhilosophers(skills: CatalogSkill[]): CatalogPhilosopher[] {
  const philosopherMap = new Map<string, CatalogPhilosopher>();

  for (const skill of skills) {
    const current = philosopherMap.get(skill.philosopherSlug);

    if (current) {
      current.skills.push(skill);
      current.tags = Array.from(new Set([...current.tags, ...skill.tags])).sort();
      continue;
    }

    philosopherMap.set(skill.philosopherSlug, {
      slug: skill.philosopherSlug,
      name: skill.philosopher,
      summary: skill.summary,
      tags: [...skill.tags].sort(),
      skills: [skill]
    });
  }

  return Array.from(philosopherMap.values()).sort((left, right) =>
    left.name.localeCompare(right.name)
  );
}

export function getCatalog(): CatalogData {
  return catalog;
}

export function getSkills(): CatalogSkill[] {
  return [...catalog.skills].sort((left, right) => left.title.localeCompare(right.title));
}

export function getSkillBySlug(slug: string): CatalogSkill | undefined {
  return catalog.skills.find((skill) => skill.slug === slug);
}

export function getPhilosophers(): CatalogPhilosopher[] {
  return buildPhilosophers(getSkills());
}

export function getPhilosopherBySlug(slug: string): CatalogPhilosopher | undefined {
  return getPhilosophers().find((philosopher) => philosopher.slug === slug);
}

export function getFeaturedTags(): string[] {
  return Array.from(new Set(catalog.skills.flatMap((skill) => skill.tags))).sort();
}

export type { CatalogData, CatalogPhilosopher, CatalogSkill } from "./types";

