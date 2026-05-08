import fs from "node:fs/promises";
import path from "node:path";

import { Lang, parse } from "@ast-grep/napi";

import { collectRepoEvidence } from "./collect-repo-evidence.mjs";

export const EVIDENCE_TYPES = [
  "structural",
  "behavioral",
  "semantic",
  "naming",
  "domain",
  "historical"
];

export const DECISION_TYPES = [
  "reuse",
  "extend",
  "extract",
  "copy carefully",
  "create new"
];

const EVIDENCE_WEIGHTS = {
  structural: 4,
  behavioral: 3,
  semantic: 2,
  naming: 1,
  domain: 3,
  historical: 1
};

const STOP_WORDS = new Set([
  "a",
  "add",
  "an",
  "and",
  "before",
  "borrow",
  "for",
  "from",
  "how",
  "i",
  "if",
  "implementing",
  "in",
  "inspect",
  "is",
  "it",
  "its",
  "me",
  "new",
  "not",
  "of",
  "or",
  "page",
  "repo",
  "reuse",
  "should",
  "shows",
  "tag",
  "tell",
  "that",
  "the",
  "this",
  "to",
  "what",
  "whether",
  "with"
]);

const CONTEXT_ADJACENCY = {
  "catalog access": new Set(["catalog access", "showroom route page", "catalog tests"]),
  "showroom route page": new Set(["showroom route page", "showroom presentation", "catalog access", "showroom tests"]),
  "showroom presentation": new Set(["showroom presentation", "showroom route page", "showroom landing page", "showroom tests"]),
  "showroom landing page": new Set(["showroom landing page", "showroom presentation", "catalog access", "showroom tests"]),
  "catalog tests": new Set(["catalog tests", "catalog access"]),
  "showroom tests": new Set(["showroom tests", "showroom route page", "showroom presentation", "showroom landing page"]),
  "skill internals": new Set(["skill internals"]),
  "project docs": new Set(["project docs"]),
  "project tooling": new Set(["project tooling"])
};

const SCRIPT_PATTERNS = [
  {
    id: "route-hook",
    type: "structural",
    pattern: "useRoute($$$)",
    rationale: "Reads route parameters using Nuxt route hooks."
  },
  {
    id: "error-construction",
    type: "behavioral",
    pattern: "createError({$$$})",
    rationale: "Builds route-level status or not-found errors."
  },
  {
    id: "seo-meta",
    type: "behavioral",
    pattern: "useSeoMeta({$$$})",
    rationale: "Configures route-level SEO metadata."
  },
  {
    id: "export-function",
    type: "structural",
    pattern: "export function $NAME($$$) { $$$ }",
    rationale: "Exports a reusable helper function."
  },
  {
    id: "export-function-typed",
    type: "structural",
    pattern: "export function $NAME($$$): $RET { $$$ }",
    rationale: "Exports a typed reusable helper function."
  },
  {
    id: "export-const",
    type: "structural",
    pattern: "export const $NAME = $$$",
    rationale: "Exports a reusable constant or arrow function."
  },
  {
    id: "test-case",
    type: "behavioral",
    pattern: "it($$$)",
    rationale: "Defines behavior-focused tests."
  },
  {
    id: "test-block",
    type: "behavioral",
    pattern: "test($$$)",
    rationale: "Defines behavior-focused tests."
  }
];

const TEMPLATE_PATTERNS = [
  {
    id: "skill-card",
    type: "behavioral",
    pattern: "<SkillCard $$$ />",
    rationale: "Renders skills via the shared SkillCard component."
  },
  {
    id: "philosopher-card",
    type: "behavioral",
    pattern: "<PhilosopherCard $$$ />",
    rationale: "Renders philosophers via the shared PhilosopherCard component."
  },
  {
    id: "nuxt-link",
    type: "structural",
    pattern: "<NuxtLink $$$>$$$</NuxtLink>",
    rationale: "Uses a route-aware UI navigation pattern."
  }
];

const CONTEXT_SUPPORT_PATHS = {
  "showroom route page": [
    "packages/catalog/src/index.ts",
    "packages/catalog/test/catalog.test.ts",
    "apps/showroom/test/e2e/smoke.spec.ts",
    "apps/showroom/app/components/SkillCard.vue"
  ],
  "showroom presentation": [
    "apps/showroom/app/pages/index.vue",
    "apps/showroom/test/e2e/smoke.spec.ts"
  ],
  "catalog access": [
    "packages/catalog/test/catalog.test.ts"
  ]
};

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function countNewlines(input) {
  return input.split(/\r?\n/).length - 1;
}

function normalizeWord(word) {
  return word.toLowerCase().replace(/[^a-z0-9/-]+/g, "");
}

function buildSearchTerms(task, hints = []) {
  const routeTerms = Array.from(task.matchAll(/\/[a-z0-9-]+(?:\/\[[a-z0-9-]+\])?/gi)).flatMap((match) =>
    match[0].split("/").filter(Boolean).map(normalizeWord).filter(Boolean)
  );

  return unique(
    `${task} ${hints.join(" ")}`
      .split(/[\s,.:;!?()[\]{}"'`]+/)
      .map(normalizeWord)
      .filter((word) => word && word.length > 1 && !STOP_WORDS.has(word))
      .concat(routeTerms)
  ).slice(0, 16);
}

export function detectBoundedContext(relativePath) {
  if (relativePath.startsWith("packages/catalog/src/")) {
    return "catalog access";
  }

  if (relativePath.startsWith("packages/catalog/test/")) {
    return "catalog tests";
  }

  if (relativePath.startsWith("apps/showroom/app/pages/")) {
    return relativePath.endsWith("index.vue") ? "showroom landing page" : "showroom route page";
  }

  if (relativePath.startsWith("apps/showroom/app/components/")) {
    return "showroom presentation";
  }

  if (relativePath.startsWith("apps/showroom/test/")) {
    return "showroom tests";
  }

  if (relativePath.startsWith("skills/pattern-code-wittgenstein/")) {
    return "skill internals";
  }

  if (relativePath.startsWith("docs/")) {
    return "project docs";
  }

  return "project tooling";
}

export function detectLanguageGame(relativePath) {
  if (/app\/pages\/.+\[slug\]\.vue$/.test(relativePath)) {
    return "slug detail page";
  }

  if (relativePath.startsWith("apps/showroom/app/pages/")) {
    return "route page";
  }

  if (relativePath.startsWith("apps/showroom/app/components/")) {
    return "ui component";
  }

  if (relativePath.startsWith("packages/catalog/src/")) {
    return "helper module";
  }

  if (relativePath.includes("/test/")) {
    return "test suite";
  }

  if (relativePath.startsWith("skills/pattern-code-wittgenstein/")) {
    return "scout tooling";
  }

  return "supporting module";
}

function detectFamilyLabel(relativePath) {
  if (/packages\/catalog\/src\/index\.ts$/.test(relativePath)) {
    return "catalog helper family";
  }

  if (/apps\/showroom\/app\/pages\/.+\[slug\]\.vue$/.test(relativePath)) {
    return "slug route page family";
  }

  if (/apps\/showroom\/app\/components\/SkillCard\.vue$/.test(relativePath)) {
    return "skill card presentation family";
  }

  if (/apps\/showroom\/app\/components\/.+Card\.vue$/.test(relativePath)) {
    return "card presentation family";
  }

  if (/apps\/showroom\/app\/pages\/index\.vue$/.test(relativePath)) {
    return "landing page family";
  }

  if (relativePath.includes("/test/")) {
    return "test coverage family";
  }

  if (relativePath.startsWith("docs/")) {
    return "documentation family";
  }

  return "supporting family";
}

function buildTaskProfile(task, hints = []) {
  const lowerTask = task.toLowerCase();
  let targetContext = "project tooling";
  let targetLanguageGame = "supporting module";

  if (lowerTask.includes("/tags/[slug]") || (lowerTask.includes("slug") && lowerTask.includes("page"))) {
    targetContext = "showroom route page";
    targetLanguageGame = "slug detail page";
  } else if (lowerTask.includes("card") || lowerTask.includes("panel") || lowerTask.includes("teaser")) {
    targetContext = "showroom presentation";
    targetLanguageGame = "ui component";
  } else if (lowerTask.includes("page") || lowerTask.includes("route")) {
    targetContext = "showroom route page";
    targetLanguageGame = "route page";
  } else if (lowerTask.includes("catalog") || lowerTask.includes("helper") || lowerTask.includes("lookup")) {
    targetContext = "catalog access";
    targetLanguageGame = "helper module";
  }

  return {
    task,
    hints,
    searchTerms: buildSearchTerms(task, hints),
    targetContext,
    targetLanguageGame,
    wantsExtraction: /\bextract|generic|shared abstraction|common interface\b/i.test(task),
    wantsReuse: /\breuse\b/i.test(task),
    wantsCopyCarefully: /\bcompact|teaser|variant|borrow|adapt\b/i.test(task),
    novelDomain: /\bdeployment|audit|cloudflare|wrangler|dashboard|infra|infrastructure\b/i.test(task)
  };
}

function getContextFit(profile, candidateContext) {
  if (candidateContext === profile.targetContext) {
    return "same";
  }

  const adjacency = CONTEXT_ADJACENCY[profile.targetContext] ?? new Set([profile.targetContext]);
  if (adjacency.has(candidateContext)) {
    return "adjacent";
  }

  return "distant";
}

function createEvidenceItem({
  type,
  relativePath,
  line,
  observed,
  rationale,
  confidence,
  excerpt
}) {
  return {
    type,
    source: {
      path: relativePath,
      line
    },
    observed,
    rationale,
    confidence,
    excerpt
  };
}

function getAstLanguage(segment) {
  if (segment.language === "html") {
    return Lang.Html;
  }

  if (segment.language === "tsx") {
    return Lang.Tsx;
  }

  if (segment.language === "javascript") {
    return Lang.JavaScript;
  }

  return Lang.TypeScript;
}

function extractVueSegments(content) {
  const segments = [];
  const templateRegex = /<template\b[^>]*>([\s\S]*?)<\/template>/gi;
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of content.matchAll(templateRegex)) {
    segments.push({
      kind: "template",
      language: "html",
      source: match[1] ?? "",
      lineOffset: countNewlines(content.slice(0, match.index))
    });
  }

  for (const match of content.matchAll(scriptRegex)) {
    const attrs = match[1] ?? "";
    segments.push({
      kind: "script",
      language: /lang=["']ts["']/i.test(attrs) ? "typescript" : "javascript",
      source: match[2] ?? "",
      lineOffset: countNewlines(content.slice(0, match.index))
    });
  }

  return segments;
}

function extractSegments(relativePath, content) {
  const ext = path.extname(relativePath).toLowerCase();

  if (ext === ".vue") {
    return extractVueSegments(content);
  }

  if ([".ts", ".mts", ".cts"].includes(ext)) {
    return [{ kind: "script", language: "typescript", source: content, lineOffset: 0 }];
  }

  if ([".tsx", ".jsx"].includes(ext)) {
    return [{ kind: "script", language: "tsx", source: content, lineOffset: 0 }];
  }

  if ([".js", ".mjs", ".cjs"].includes(ext)) {
    return [{ kind: "script", language: "javascript", source: content, lineOffset: 0 }];
  }

  if (ext === ".html") {
    return [{ kind: "template", language: "html", source: content, lineOffset: 0 }];
  }

  return [];
}

function extractImports(source) {
  const imports = [];
  const importRegex = /import\s+(?:type\s+)?(?:[\w*\s{},]+)\s+from\s+["']([^"']+)["']/g;

  for (const match of source.matchAll(importRegex)) {
    imports.push(match[1]);
  }

  return unique(imports);
}

function analyzeSegments(relativePath, content) {
  const evidence = [];
  const exportedSymbols = [];
  const collaborators = [];

  for (const segment of extractSegments(relativePath, content)) {
    collaborators.push(...extractImports(segment.source));
    const lang = getAstLanguage(segment);
    const patterns = segment.kind === "template" ? TEMPLATE_PATTERNS : SCRIPT_PATTERNS;

    let root;
    try {
      root = parse(lang, segment.source).root();
    } catch {
      continue;
    }

    for (const patternConfig of patterns) {
      const matches = root.findAll(patternConfig.pattern).slice(0, 3);

      for (const match of matches) {
        const range = match.range();
        const line = range.start.line + 1 + segment.lineOffset;
        const excerpt = match.text().split(/\r?\n/)[0].trim();

        evidence.push(
          createEvidenceItem({
            type: patternConfig.type,
            relativePath,
            line,
            observed: true,
            rationale: patternConfig.rationale,
            confidence: 0.9,
            excerpt
          })
        );

        if (patternConfig.id === "export-function" || patternConfig.id === "export-const") {
          const symbolMatch = match.getMatch("NAME");
          if (symbolMatch) {
            exportedSymbols.push(symbolMatch.text());
          }
        }
      }
    }
  }

  return {
    evidence,
    exportedSymbols: unique(exportedSymbols),
    collaborators: unique(collaborators)
  };
}

function buildNamingEvidence(relativePath, lexicalMatch) {
  const evidenceItems = [];

  for (const hit of lexicalMatch.hits.slice(0, 2)) {
    evidenceItems.push(
      createEvidenceItem({
        type: "naming",
        relativePath,
        line: hit.lineNumber,
        observed: true,
        rationale: `Line overlaps task terms: ${hit.matchedTerms.join(", ")}.`,
        confidence: 0.5,
        excerpt: hit.text
      })
    );
  }

  evidenceItems.push(
    createEvidenceItem({
      type: "semantic",
      relativePath,
      line: lexicalMatch.hits[0]?.lineNumber ?? 1,
      observed: false,
      rationale: `The file name and nearby lines align with the requested vocabulary around ${path.basename(relativePath)}.`,
      confidence: 0.45,
      excerpt: path.basename(relativePath)
    })
  );

  return evidenceItems;
}

function buildDomainEvidence(relativePath, profile) {
  const boundedContext = detectBoundedContext(relativePath);
  const fit = getContextFit(profile, boundedContext);

  if (fit === "same") {
    return [
      createEvidenceItem({
        type: "domain",
        relativePath,
        line: 1,
        observed: false,
        rationale: `The file sits in the same bounded context as the requested work: ${boundedContext}.`,
        confidence: 0.85,
        excerpt: boundedContext
      })
    ];
  }

  if (fit === "adjacent") {
    return [
      createEvidenceItem({
        type: "domain",
        relativePath,
        line: 1,
        observed: false,
        rationale: `The file sits in an adjacent bounded context that commonly supports ${profile.targetContext}.`,
        confidence: 0.65,
        excerpt: boundedContext
      })
    ];
  }

  return [];
}

function scoreEvidenceItems(evidenceItems, contextFit) {
  const breakdown = {
    structural: 0,
    behavioral: 0,
    semantic: 0,
    naming: 0,
    domain: 0,
    historical: 0,
    total: 0
  };

  for (const evidence of evidenceItems) {
    const multiplier = evidence.observed ? 1 : 0.6;
    const contribution = EVIDENCE_WEIGHTS[evidence.type] * evidence.confidence * multiplier;
    breakdown[evidence.type] += contribution;
  }

  const contextMultiplier = contextFit === "same" ? 1.15 : contextFit === "adjacent" ? 1 : 0.65;

  for (const key of EVIDENCE_TYPES) {
    breakdown[key] = Number(breakdown[key].toFixed(2));
  }

  breakdown.total = Number(
    (EVIDENCE_TYPES.reduce((sum, key) => sum + breakdown[key], 0) * contextMultiplier).toFixed(2)
  );

  return breakdown;
}

function deriveRelatedTests(candidate, testMatches) {
  const candidateTokens = unique(
    candidate.relativePath.split(/[\/.-]+/).map(normalizeWord).filter(Boolean)
  );

  return testMatches
    .filter((testMatch) => candidateTokens.some((token) => testMatch.relativePath.toLowerCase().includes(token)))
    .slice(0, 3)
    .map((testMatch) => ({
      path: testMatch.relativePath,
      lines: testMatch.hits.map((hit) => hit.lineNumber).slice(0, 3)
    }));
}

function buildSyntheticMatch(relativePath) {
  return {
    relativePath,
    hits: [],
    score: 1
  };
}

function appendSupportMatches(selectedMatches, profile) {
  const seeded = [...selectedMatches];
  const seen = new Set(seeded.map((match) => match.relativePath));
  const supportPaths = [...(CONTEXT_SUPPORT_PATHS[profile.targetContext] ?? [])];

  if (profile.novelDomain) {
    supportPaths.push("package.json");
  }

  for (const supportPath of supportPaths) {
    if (seen.has(supportPath)) {
      continue;
    }

    seeded.push(buildSyntheticMatch(supportPath));
    seen.add(supportPath);
  }

  return seeded;
}

function createCandidate({ relativePath, lexicalMatch, profile, relatedTests, analysis }) {
  const boundedContext = detectBoundedContext(relativePath);
  const languageGame = detectLanguageGame(relativePath);
  const familyLabel = detectFamilyLabel(relativePath);
  const contextFit = getContextFit(profile, boundedContext);
  const evidenceItems = [
    ...analysis.evidence,
    ...buildNamingEvidence(relativePath, lexicalMatch),
    ...buildDomainEvidence(relativePath, profile)
  ];

  if (relatedTests.length > 0) {
    evidenceItems.push(
      createEvidenceItem({
        type: "behavioral",
        relativePath: relatedTests[0].path,
        line: relatedTests[0].lines[0] ?? 1,
        observed: true,
        rationale: "Adjacent tests exist in the same subsystem and can mirror the recommendation.",
        confidence: 0.6,
        excerpt: relatedTests[0].path
      })
    );
  }

  return {
    id: relativePath,
    familyLabel,
    target: {
      path: relativePath,
      symbol: analysis.exportedSymbols[0] ?? null
    },
    boundedContext,
    languageGame,
    contextFit,
    relatedTests,
    collaborators: analysis.collaborators,
    evidenceItems,
    scoreBreakdown: scoreEvidenceItems(evidenceItems, contextFit)
  };
}

function buildFalseSimilarityRisks(candidates, profile) {
  const risks = [];

  if (
    candidates.some((candidate) =>
      candidate.contextFit === "distant" && candidate.scoreBreakdown.naming > candidate.scoreBreakdown.structural
    )
  ) {
    risks.push("Some matches are naming-heavy but live in distant bounded contexts.");
  }

  if (
    profile.targetLanguageGame === "slug detail page" &&
    candidates.some((candidate) => candidate.familyLabel === "skill card presentation family")
  ) {
    risks.push("Presentation components are relevant, but they do not replace route-level data and error handling.");
  }

  if (
    profile.wantsExtraction &&
    profile.targetLanguageGame === "slug detail page" &&
    candidates.some((candidate) => candidate.familyLabel === "slug route page family")
  ) {
    risks.push("Shared slug parsing, createError(...), and SEO hooks do not prove a generic entity-detail page contract.");
  }

  if (
    profile.task.includes("/tags/[slug]") &&
    !candidates.some((candidate) => candidate.target.path.includes("/tags/[slug].vue"))
  ) {
    risks.push("The planned /tags/[slug] route is still hypothetical, so it cannot count as proof of a stable three-page abstraction.");
  }

  if (candidates.every((candidate) => candidate.relatedTests.length === 0)) {
    risks.push("Several nearby candidates lack clearly linked tests, so behavioral confidence remains lower.");
  }

  if (profile.novelDomain) {
    risks.push("The task introduces a novel domain, so route-shape similarity alone is not enough to justify reuse.");
  }

  return unique(risks);
}

function buildMissingEvidence(candidates, profile) {
  const missing = [];

  if (!candidates.some((candidate) => candidate.scoreBreakdown.structural >= 3)) {
    missing.push("No candidate has strong structural evidence yet.");
  }

  if (!candidates.some((candidate) => candidate.relatedTests.length > 0)) {
    missing.push("No closely aligned tests were found to mirror the intended behavior.");
  }

  if (profile.targetContext === "showroom route page" && !candidates.some((candidate) => candidate.boundedContext === "catalog access")) {
    missing.push("A supporting catalog lookup family was not confirmed for the target route.");
  }

  return missing;
}

function decideRecommendation(candidates, profile) {
  const hasCatalogHelper = candidates.some((candidate) => candidate.familyLabel === "catalog helper family" && candidate.scoreBreakdown.total >= 4);
  const hasSlugRoute = candidates.some((candidate) => candidate.familyLabel === "slug route page family" && candidate.scoreBreakdown.total >= 4);
  const hasSkillCard = candidates.some((candidate) => candidate.familyLabel === "skill card presentation family" && candidate.scoreBreakdown.total >= 3);
  const strongCandidates = candidates.filter((candidate) => candidate.scoreBreakdown.total >= 5);
  const mostlyNamingOnly =
    strongCandidates.length === 0 ||
    candidates.every((candidate) => candidate.scoreBreakdown.structural < 2 && candidate.scoreBreakdown.domain < 2);

  let recommendation = "copy carefully";
  let rationale = "The available precedents are useful, but the fit is not yet strong enough for automatic reuse.";
  const competingRecommendations = [];

  if (profile.wantsExtraction && candidates.filter((candidate) => candidate.familyLabel === "catalog helper family").length >= 2) {
    recommendation = "extract";
    rationale = "The task explicitly asks for shared structure and there are repeated helper precedents worth consolidating.";
    competingRecommendations.push("extend would preserve local duplication even though repeated helper structure is already visible.");
  } else if (profile.wantsReuse && strongCandidates.some((candidate) => candidate.contextFit === "same" && candidate.scoreBreakdown.structural >= 4)) {
    recommendation = "reuse";
    rationale = "A strong same-context precedent already exists and can be reused directly with minimal change.";
    competingRecommendations.push("extend was rejected because the requested shape already exists instead of being a new variant.");
  } else if (mostlyNamingOnly || profile.novelDomain) {
    recommendation = "create new";
    rationale = "The task either introduces a new domain or only has shallow matches, so forcing reuse would hide meaningful differences.";
    competingRecommendations.push("extend was rejected because structural and domain evidence do not converge strongly enough.");
  } else if (hasCatalogHelper && hasSlugRoute && (profile.targetLanguageGame === "slug detail page" || profile.targetLanguageGame === "route page")) {
    recommendation = "extend";
    rationale = "The task sits inside an existing route/page family and is supported by adjacent catalog helpers, so extending the established pattern is safer than inventing a new one.";
    competingRecommendations.push("extract was rejected because there is not enough repeated page-body structure for a generic detail abstraction.");
    competingRecommendations.push("create new was rejected because strong adjacent families already exist.");
  } else if (profile.wantsCopyCarefully || (hasSkillCard && !hasSlugRoute && profile.targetContext === "showroom presentation")) {
    recommendation = "copy carefully";
    rationale = "There is an instructive precedent nearby, but the target is a presentation variant rather than a stable family extension.";
    competingRecommendations.push("extend was rejected because the surrounding component contract is not stable enough yet.");
  }

  const falseSimilarityRisks = buildFalseSimilarityRisks(candidates, profile);
  const missingEvidence = buildMissingEvidence(candidates, profile);
  const confidence = recommendation === "reuse" ? "high" : recommendation === "extend" ? "medium" : "medium";

  return {
    recommendation,
    rationale,
    competingRecommendations,
    falseSimilarityRisks,
    missingEvidence,
    confidence
  };
}

function describeTask(profile) {
  return `Inspect repository precedents for ${profile.task} within the ${profile.targetContext} context and the ${profile.targetLanguageGame} language-game.`;
}

function buildTestsToMirror(candidates) {
  return unique(
    candidates.flatMap((candidate) =>
      candidate.relatedTests.map((testRecord) => `${testRecord.path}${testRecord.lines[0] ? `:${testRecord.lines[0]}` : ""}`)
    )
  );
}

function renderCandidateSection(candidate) {
  const strength = candidate.scoreBreakdown.total >= 7 ? "strong" : candidate.scoreBreakdown.total >= 4 ? "moderate" : "weak";
  const resemblanceTypes = unique(candidate.evidenceItems.map((item) => item.type)).join(", ");

  return [
    `- ${candidate.familyLabel}`,
    `  - relevant files: ${candidate.target.path}${candidate.target.symbol ? ` (${candidate.target.symbol})` : ""}`,
    `  - resemblance type: ${resemblanceTypes}`,
    `  - strength: ${strength}`,
    `  - reason: ${candidate.evidenceItems[0]?.rationale ?? "Lexical and structural overlap were detected."}`
  ].join("\n");
}

function renderEvidenceSection(candidates) {
  const lines = [];

  for (const candidate of candidates.slice(0, 4)) {
    for (const evidence of candidate.evidenceItems.slice(0, 3)) {
      lines.push(
        `- ${evidence.source.path}:${evidence.source.line} [${evidence.type}] ${evidence.observed ? "observed" : "inferred"} - ${evidence.rationale}`
      );
    }
  }

  return lines.length > 0 ? lines.join("\n") : "- none";
}

export function renderScoutReport(result) {
  const candidateSection = result.candidates.slice(0, 5).map(renderCandidateSection).join("\n");
  const riskSection = result.decision.falseSimilarityRisks.map((risk) => `- ${risk}`).join("\n") || "- none";
  const testsSection = result.testsToMirror.map((testEntry) => `- ${testEntry}`).join("\n") || "- none";
  const missingEvidence = result.decision.missingEvidence.map((item) => `- ${item}`).join("\n") || "- none";
  const preserve = result.candidates
    .filter((candidate) => candidate.contextFit !== "distant")
    .slice(0, 3)
    .map((candidate) => candidate.familyLabel)
    .join(", ") || "the strongest adjacent family";

  return [
    "## Task summary",
    "",
    result.taskSummary,
    "",
    "## Candidate code families",
    "",
    candidateSection || "- none",
    "",
    "## Evidence of resemblance",
    "",
    renderEvidenceSection(result.candidates),
    "",
    "## False-similarity risks",
    "",
    riskSection,
    "",
    "## Recommendation",
    "",
    `- decision: ${result.decision.recommendation}`,
    `- why: ${result.decision.rationale}`,
    `- rejected alternatives: ${result.decision.competingRecommendations.join(" | ") || "none recorded"}`,
    "",
    "## Implementation guidance",
    "",
    `- preserve: ${preserve}`,
    `- vary: adapt the target to the requested ${result.profile.targetLanguageGame} instead of forcing a generic abstraction`,
    "- keep separate: page-body contracts that only share route shell, slug parsing, or error plumbing",
    "- avoid: name-only reuse or cross-context abstraction without stronger evidence",
    "",
    "## Tests to mirror or add",
    "",
    testsSection,
    "",
    "## Confidence and missing evidence",
    "",
    `- confidence: ${result.decision.confidence}`,
    "- missing evidence:",
    missingEvidence
  ].join("\n");
}

export async function analyzePatternTask({
  rootPath,
  task,
  hints = [],
  maxFiles = 18
}) {
  const profile = buildTaskProfile(task, hints);
  const lexical = await collectRepoEvidence({
    rootPath,
    terms: profile.searchTerms,
    maxFiles
  });

  const candidates = [];
  const selectedMatches = appendSupportMatches(
    lexical.selectedMatches.filter((match) => !match.relativePath.startsWith(".logs/")),
    profile
  );

  for (const lexicalMatch of selectedMatches) {
    const absolutePath = path.join(lexical.root, lexicalMatch.relativePath);
    const content = await fs.readFile(absolutePath, "utf8");
    const analysis = analyzeSegments(lexicalMatch.relativePath, content);
    const relatedTests = deriveRelatedTests(
      { relativePath: lexicalMatch.relativePath },
      lexical.tests
    );

    candidates.push(
      createCandidate({
        relativePath: lexicalMatch.relativePath,
        lexicalMatch,
        profile,
        relatedTests,
        analysis
      })
    );
  }

  candidates.sort((left, right) => right.scoreBreakdown.total - left.scoreBreakdown.total);

  const filteredCandidates = candidates
    .filter((candidate) => candidate.familyLabel !== "documentation family" || candidate.scoreBreakdown.total >= 3)
    .filter((candidate) => profile.targetContext === "skill internals" || candidate.boundedContext !== "skill internals")
    .slice(0, profile.novelDomain ? 7 : 8);

  if (profile.novelDomain) {
    const packageCandidate = candidates.find((candidate) => candidate.target.path === "package.json");
    if (packageCandidate && !filteredCandidates.some((candidate) => candidate.target.path === packageCandidate.target.path)) {
      filteredCandidates.push(packageCandidate);
    }
  }

  const decision = decideRecommendation(filteredCandidates, profile);
  const testsToMirror = buildTestsToMirror(filteredCandidates);
  const taskSummary = describeTask(profile);

  const result = {
    taskSummary,
    profile,
    candidates: filteredCandidates,
    decision,
    testsToMirror
  };

  return {
    ...result,
    report: renderScoutReport(result)
  };
}
