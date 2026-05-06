export type SkillStatus = "draft" | "alpha" | "beta" | "stable" | "archived";

export interface SkillManifest {
  id: string;
  slug: string;
  title: string;
  philosopher: string;
  summary: string;
  tags: string[];
  status: SkillStatus;
  sourceRepo: string;
  installCommand: string;
  references: string[];
  version: string;
}

export interface SkillReference {
  path: string;
  title: string;
  content: string;
}

export interface CatalogSkill extends SkillManifest {
  philosopherSlug: string;
  readme: string;
  skillMarkdown: string;
  referencesContent: SkillReference[];
}

export interface CatalogPhilosopher {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  skills: CatalogSkill[];
}

export interface CatalogData {
  generatedAt: string;
  skills: CatalogSkill[];
}

