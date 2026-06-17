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
  "repo",
  "reuse",
  "should",
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
  "skill definition": new Set(["skill definition", "skill tooling", "skill tests", "templates"]),
  "skill tooling": new Set(["skill tooling", "skill definition", "skill tests", "templates", "project config"]),
  "skill tests": new Set(["skill tests", "skill tooling", "skill definition"]),
  templates: new Set(["templates", "skill definition", "skill tooling"]),
  "project docs": new Set(["project docs", "skill definition", "project config"]),
  "project config": new Set(["project config", "skill tooling", "project docs"])
};

const SCRIPT_PATTERNS = [
  {
    id: "export-function",
    type: "structural",
    pattern: "export function $NAME($$$) { $$$ }",
    rationale: "Exports a reusable helper function."
  },
  {
    id: "export-async-function",
    type: "structural",
    pattern: "export async function $NAME($$$) { $$$ }",
    rationale: "Exports an async helper function."
  },
  {
    id: "export-const",
    type: "structural",
    pattern: "export const $NAME = $$$",
    rationale: "Exports a reusable constant."
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
  },
  {
    id: "json-parse",
    type: "behavioral",
    pattern: "JSON.parse($$$)",
    rationale: "Parses structured project data."
  },
  {
    id: "file-copy",
    type: "behavioral",
    pattern: "$FS.cp($$$)",
    rationale: "Copies skill files as part of project tooling."
  }
];

const CONTEXT_SUPPORT_PATHS = {
  "skill definition": [
    "skills/pattern-code-wittgenstein/SKILL.md",
    "skills/pattern-code-wittgenstein/skill.meta.json",
    "skills/pattern-code-wittgenstein/references/developer-trace-contract.md",
    "scripts/validate-skill-traces.mjs"
  ],
  "skill tooling": [
    "scripts/lib/skills.mjs",
    "scripts/sync-codex-skills.mjs",
    "scripts/new-skill.mjs",
    "scripts/lib/skills.test.mjs"
  ],
  templates: [
    "templates/skill/SKILL.md",
    "templates/skill/skill.meta.json",
    "scripts/new-skill.mjs"
  ],
  "project docs": [
    "README.md",
    "CONTRIBUTING.md",
    "docs/adr/0001-foundation.md"
  ],
  "project config": [
    "package.json",
    ".github/workflows/ci.yml",
    "eslint.config.mjs"
  ]
};

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function normalizeWord(word) {
  return word.toLowerCase().replace(/[^a-z0-9/-]+/g, "");
}

function buildSearchTerms(task, hints = []) {
  return unique(
    `${task} ${hints.join(" ")}`
      .split(/[\s,.:;!?()[\]{}"'`]+/)
      .map(normalizeWord)
      .filter((word) => word && word.length > 1 && !STOP_WORDS.has(word))
  ).slice(0, 16);
}

export function detectBoundedContext(relativePath) {
  if (/^skills\/[^/]+\/(SKILL\.md|README\.md|skill\.meta\.json|references\/)/.test(relativePath)) {
    return "skill definition";
  }

  if (/^skills\/[^/]+\/tests\//.test(relativePath) || /^scripts\/.+\.test\.mjs$/.test(relativePath)) {
    return "skill tests";
  }

  if (relativePath.startsWith("templates/skill/")) {
    return "templates";
  }

  if (relativePath.startsWith("scripts/")) {
    return "skill tooling";
  }

  if (relativePath.startsWith("docs/")) {
    return "project docs";
  }

  return "project config";
}

export function detectLanguageGame(relativePath) {
  if (relativePath.endsWith("SKILL.md")) {
    return "skill instruction file";
  }

  if (relativePath.endsWith("skill.meta.json")) {
    return "skill manifest";
  }

  if (relativePath.includes("/references/")) {
    return "skill reference";
  }

  if (relativePath.includes("/tests/") || relativePath.endsWith(".test.mjs")) {
    return "test suite";
  }

  if (relativePath.startsWith("scripts/")) {
    return "project script";
  }

  if (relativePath.startsWith("templates/")) {
    return "skill template";
  }

  if (relativePath.endsWith(".md")) {
    return "documentation";
  }

  return "supporting module";
}

function detectFamilyLabel(relativePath) {
  if (relativePath === "scripts/lib/skills.mjs") {
    return "skill validation helper family";
  }

  if (relativePath === "scripts/sync-codex-skills.mjs") {
    return "skill install workflow family";
  }

  if (relativePath === "scripts/new-skill.mjs") {
    return "skill creation workflow family";
  }

  if (relativePath.endsWith("developer-trace-contract.md")) {
    return "developer trace contract family";
  }

  if (relativePath.endsWith("SKILL.md")) {
    return "skill instruction family";
  }

  if (relativePath.endsWith("skill.meta.json")) {
    return "skill manifest family";
  }

  if (relativePath.includes("/tests/") || relativePath.endsWith(".test.mjs")) {
    return "test coverage family";
  }

  if (relativePath.startsWith("templates/")) {
    return "skill template family";
  }

  if (relativePath.startsWith("docs/") || relativePath.endsWith(".md")) {
    return "documentation family";
  }

  return "supporting family";
}

function buildTaskProfile(task, hints = []) {
  const lowerTask = task.toLowerCase();
  let targetContext = "skill tooling";
  let targetLanguageGame = "project script";

  if (/\btrace|developer trace|contract\b/.test(lowerTask)) {
    targetContext = "skill definition";
    targetLanguageGame = "skill metadata";
  } else if (/\btemplate|scaffold|new skill\b/.test(lowerTask)) {
    targetContext = "templates";
    targetLanguageGame = "skill template";
  } else if (/\bdoc|readme|contributing|adr\b/.test(lowerTask)) {
    targetContext = "project docs";
    targetLanguageGame = "documentation";
  } else if (/\bconfig|ci|lint|package\b/.test(lowerTask)) {
    targetContext = "project config";
    targetLanguageGame = "supporting module";
  }

  return {
    task,
    hints,
    searchTerms: buildSearchTerms(task, hints),
    targetContext,
    targetLanguageGame,
    wantsExtraction: /\bextracting|extract a|extract an|generic|shared abstraction|common interface\b/i.test(task),
    wantsReuse: /\breuse\b/i.test(task),
    wantsCopyCarefully: /\bcompact|teaser|variant|borrow|adapt|quick\b/i.test(task),
    novelDomain: /\brelease note|changelog|analytics|billing|dashboard|external service\b/i.test(task),
    traceWork: /\btrace|developer trace|contract\b/i.test(task),
    validationWork: /\bvalidat|manifest|reference|install|sync|isolation\b/i.test(task)
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

function extractSegments(relativePath, content) {
  const ext = path.extname(relativePath).toLowerCase();

  if ([".ts", ".mts", ".cts"].includes(ext)) {
    return [{ language: Lang.TypeScript, source: content, lineOffset: 0 }];
  }

  if ([".js", ".mjs", ".cjs"].includes(ext)) {
    return [{ language: Lang.JavaScript, source: content, lineOffset: 0 }];
  }

  if ([".tsx", ".jsx"].includes(ext)) {
    return [{ language: Lang.Tsx, source: content, lineOffset: 0 }];
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

    let root;
    try {
      root = parse(segment.language, segment.source).root();
    } catch {
      continue;
    }

    for (const patternConfig of SCRIPT_PATTERNS) {
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

        const symbolMatch = match.getMatch("NAME");
        if (symbolMatch) {
          exportedSymbols.push(symbolMatch.text());
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
    candidate.relativePath.split(/[/.-]+/).map(normalizeWord).filter(Boolean)
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
    score: 1,
    supportSeeded: true
  };
}

function appendSupportMatches(selectedMatches, profile) {
  const seeded = [...selectedMatches];
  const seen = new Set(seeded.map((match) => match.relativePath));
  const supportPaths = [
    ...(CONTEXT_SUPPORT_PATHS[profile.targetContext] ?? []),
    ...(profile.traceWork ? CONTEXT_SUPPORT_PATHS["skill definition"] : []),
    ...(profile.validationWork ? CONTEXT_SUPPORT_PATHS["skill tooling"] : []),
    ...(profile.novelDomain ? CONTEXT_SUPPORT_PATHS["project config"] : [])
  ];

  for (const supportPath of unique(supportPaths)) {
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
    supportSeeded: Boolean(lexicalMatch.supportSeeded),
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

  if (profile.wantsExtraction && profile.validationWork) {
    risks.push("Shared file traversal and manifest checks do not prove a generic skill lifecycle abstraction.");
  }

  if (profile.traceWork) {
    risks.push("Response trace metadata is relevant, but it is not runtime instrumentation.");
  }

  if (profile.wantsCopyCarefully) {
    risks.push("A compact variant can borrow local shape without inheriting the whole workflow contract.");
  }

  if (profile.task.toLowerCase().includes("quick-fix")) {
    risks.push("The planned quick-fix command is still hypothetical, so it cannot count as proof of a stable multi-command abstraction.");
  }

  if (candidates.every((candidate) => candidate.relatedTests.length === 0)) {
    risks.push("Several nearby candidates lack clearly linked tests, so behavioral confidence remains lower.");
  }

  if (profile.novelDomain) {
    risks.push("The task introduces a novel domain, so name overlap with existing skill tooling is not enough to justify reuse.");
  }

  return unique(risks);
}

function buildMissingEvidence(candidates) {
  const missing = [];

  if (!candidates.some((candidate) => candidate.scoreBreakdown.structural >= 3)) {
    missing.push("No candidate has strong structural evidence yet.");
  }

  if (!candidates.some((candidate) => candidate.relatedTests.length > 0)) {
    missing.push("No closely aligned tests were found to mirror the intended behavior.");
  }

  return missing;
}

function decideRecommendation(candidates, profile) {
  const hasTraceContract = candidates.some((candidate) => candidate.familyLabel === "developer trace contract family");
  const hasValidationHelper = candidates.some((candidate) => candidate.familyLabel === "skill validation helper family");
  const hasInstallWorkflow = candidates.some((candidate) => candidate.familyLabel === "skill install workflow family");
  const strongSameContext = candidates.some(
    (candidate) => candidate.contextFit === "same" && candidate.scoreBreakdown.total >= 5
  );

  let recommendation = "copy carefully";
  let rationale = "The available precedents are useful, but the fit is not yet strong enough for automatic reuse.";
  const competingRecommendations = [];

  if (profile.novelDomain) {
    recommendation = "create new";
    rationale = "The task introduces a new domain, so forcing it through existing skill tooling would hide real differences.";
    competingRecommendations.push("extend was rejected because structural and domain evidence do not converge strongly enough.");
  } else if (profile.wantsExtraction && profile.validationWork) {
    recommendation = "extend";
    rationale = "Validation and install workflows share helper pressure, but the right move is to extend the helper boundary rather than extract a generic lifecycle abstraction.";
    competingRecommendations.push("extract was rejected because only part of the workflow repeats.");
  } else if (profile.traceWork && hasTraceContract && hasValidationHelper) {
    recommendation = "extend";
    rationale = "Developer trace work already has manifest metadata, a contract reference, and root validation support, so another trace-aware skill should extend that pattern.";
    competingRecommendations.push("create new was rejected because the trace contract and validation path already exist.");
  } else if (profile.wantsCopyCarefully && hasInstallWorkflow) {
    recommendation = "copy carefully";
    rationale = "The install workflow is instructive, but the requested command is a smaller variant and should not inherit the whole install contract.";
    competingRecommendations.push("extract was rejected because a single compact variant is not enough pressure for a new abstraction.");
  } else if (profile.wantsReuse && strongSameContext) {
    recommendation = "reuse";
    rationale = "A strong same-context precedent already exists and can be reused directly with minimal change.";
    competingRecommendations.push("extend was rejected because the requested shape already exists.");
  } else if (profile.validationWork && hasValidationHelper) {
    recommendation = "extend";
    rationale = "The work sits inside the existing validation helper family, so extending that boundary is safer than creating another validator.";
    competingRecommendations.push("create new was rejected because a local helper family already exists.");
  }

  const falseSimilarityRisks = buildFalseSimilarityRisks(candidates, profile);
  const missingEvidence = buildMissingEvidence(candidates);
  const confidence = recommendation === "reuse" ? "high" : "medium";

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
    "## Maxi/context reuse check",
    "",
    "- status: not run by the prototype CLI",
    String.raw`- next step: when Maxi-context is in scope, read C:\Users\garqu\OneDrive\COdex\Maxi-context\SOFIA-HANDOFF.md and follow references/maxi-context-reuse.md before finalizing the recommendation`,
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
    "- keep separate: workflows that only share file traversal or naming",
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

  const eligibleCandidates = candidates
    .filter((candidate) => candidate.familyLabel !== "documentation family" || candidate.scoreBreakdown.total >= 3);
  const topCandidates = eligibleCandidates.slice(0, profile.novelDomain ? 12 : 12);
  const topCandidatePaths = new Set(topCandidates.map((candidate) => candidate.target.path));
  const seededSupportCandidates = eligibleCandidates.filter(
    (candidate) => candidate.supportSeeded && !topCandidatePaths.has(candidate.target.path)
  );
  const filteredCandidates = [...topCandidates, ...seededSupportCandidates];

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
