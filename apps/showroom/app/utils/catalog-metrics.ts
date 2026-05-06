import type { CatalogPhilosopher, CatalogSkill } from "@world-of-sofia/catalog";

export interface CatalogMetrics {
  philosophers: number;
  skills: number;
  tags: number;
}

export function getCatalogMetrics(
  skills: CatalogSkill[],
  philosophers: CatalogPhilosopher[]
): CatalogMetrics {
  return {
    philosophers: philosophers.length,
    skills: skills.length,
    tags: new Set(skills.flatMap((skill) => skill.tags)).size
  };
}

