import { z } from "zod";

export const skillStatusSchema = z.enum([
  "draft",
  "alpha",
  "beta",
  "stable",
  "archived"
]);

export const skillManifestSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  philosopher: z.string().min(1),
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  status: skillStatusSchema,
  sourceRepo: z.string().min(1),
  installCommand: z.string().min(1),
  references: z.array(z.string().min(1)),
  version: z.string().regex(/^\d+\.\d+\.\d+$/)
});

export const skillReferenceSchema = z.object({
  path: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1)
});

export const catalogSkillSchema = skillManifestSchema.extend({
  philosopherSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  readme: z.string().min(1),
  skillMarkdown: z.string().min(1),
  referencesContent: z.array(skillReferenceSchema)
});

export const catalogDataSchema = z.object({
  generatedAt: z.string().min(1),
  skills: z.array(catalogSkillSchema)
});

