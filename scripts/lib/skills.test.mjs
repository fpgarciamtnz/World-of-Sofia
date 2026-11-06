import { describe, expect, it } from "vitest";

import {
  findUnknownSiblingSkills,
  lintReadme,
  lintSkill,
  loadSkillRecord,
  loadSkillsData,
  parseFrontmatter
} from "./skills.mjs";

const validSkill = [
  "---",
  "name: demo-skill",
  'description: "Do the demo thing. Use when a demo is requested."',
  "---",
  "",
  "# Demo"
].join("\n");

describe("skill validation helpers", () => {
  it("loads all project skills", async () => {
    const skillsData = await loadSkillsData();

    expect(skillsData.skills.map((skill) => skill.slug).sort()).toEqual([
      "audit-plan-descartes",
      "auditar-pec",
      "communication-review-ciceron",
      "earned-presence-kondo",
      "grill-me-aquinas",
      "pattern-code-wittgenstein",
      "sofia-coordinatior",
      "synthesis-code-hegel",
      "ui-attention-ciceron"
    ]);
  });

  it("loads a single skill by slug", async () => {
    const skill = await loadSkillRecord("audit-plan-descartes");

    expect(skill.title).toBe("Audit Plan Descartes");
  });

  it("preserves opt-in developer trace metadata", async () => {
    const sofia = await loadSkillRecord("sofia-coordinatior");
    const wittgenstein = await loadSkillRecord("pattern-code-wittgenstein");
    const hegel = await loadSkillRecord("synthesis-code-hegel");

    expect(sofia.developerTrace).toEqual({
      status: "pilot",
      mode: "opt-in",
      surfaces: ["response"],
      triggers: [
        "developer mode",
        "trace mode",
        "impact evidence",
        "show traces",
        "skill trace",
        "Sofia trace",
        "skill contributions"
      ],
      contract: "references/developer-trace-contract.md"
    });

    expect(wittgenstein.developerTrace).toEqual({
      status: "pilot",
      mode: "opt-in",
      surfaces: ["response"],
      triggers: ["developer mode", "trace mode", "impact evidence", "show traces"],
      contract: "references/developer-trace-contract.md"
    });

    expect(hegel.developerTrace).toEqual({
      status: "pilot",
      mode: "opt-in",
      surfaces: ["response"],
      triggers: [
        "developer mode",
        "trace mode",
        "impact evidence",
        "show traces",
        "skill trace",
        "Hegel tracer"
      ],
      contract: "references/developer-trace-contract.md"
    });
  });
});

describe("skill lint rules", () => {
  it("parses quoted frontmatter values", () => {
    expect(parseFrontmatter(validSkill)).toEqual({
      name: "demo-skill",
      description: "Do the demo thing. Use when a demo is requested."
    });
  });

  it("accepts a valid skill", () => {
    expect(lintSkill({ slug: "demo-skill", skillMarkdown: validSkill })).toEqual([]);
  });

  it("rejects a name that does not match the folder", () => {
    const issues = lintSkill({ slug: "other-skill", skillMarkdown: validSkill });

    expect(issues.join()).toContain("must match the folder");
  });

  it("rejects an oversized description", () => {
    const skillMarkdown = validSkill.replace("Do the demo thing.", "x".repeat(500));

    expect(lintSkill({ slug: "demo-skill", skillMarkdown }).join()).toContain("the limit is 400");
  });

  it("rejects vocabulary from the previous runtime in any bundled document", () => {
    const issues = lintSkill({
      slug: "demo-skill",
      skillMarkdown: validSkill,
      documents: [{ path: "references/old.md", content: "Run $demo-skill inside Codex." }]
    });

    expect(issues).toEqual([
      "references/old.md contains a Codex reference.",
      "references/old.md contains a $skill-name invocation (use /skill-name or the Skill tool)."
    ]);
  });

  it("rejects a mention of a retired skill", () => {
    const known = new Set(["sofia-coordinatior"]);

    expect(findUnknownSiblingSkills("Run `check-with-maxi` first.", known)).toEqual(["check-with-maxi"]);
  });

  it("rejects a folded description, whose length the parser cannot see", () => {
    const skillMarkdown = "---\nname: demo-skill\ndescription: >\n  Folded text.\n---\n";

    expect(lintSkill({ slug: "demo-skill", skillMarkdown }).join()).toContain("must be one line");
  });

  it("finds handoffs to skills that do not exist", () => {
    const known = new Set(["synthesis-code-hegel"]);
    const content = "Hand off to `synthesis-code-hegel`, then `ui-attention-kahneman`.";

    expect(findUnknownSiblingSkills(content, known)).toEqual(["ui-attention-kahneman"]);
  });

  it("derives name endings from known slugs, so a new skill is covered without an edit here", () => {
    const known = new Set(["ethics-review-kant"]);

    expect(findUnknownSiblingSkills("Use `ethics-reviw-kant`.", known)).toEqual(["ethics-reviw-kant"]);
  });

  it("catches the natural misspelling of the coordinator's slug", () => {
    const known = new Set(["sofia-coordinatior"]);

    expect(findUnknownSiblingSkills("Ask `sofia-coordinator`.", known)).toEqual(["sofia-coordinator"]);
  });

  it("accepts a README that opens with the contract after an optional title", () => {
    const body = "Philosopher idea: A habit.\n\nPractical use: When to use it.\n";

    expect(lintReadme(`# Title\n\n${body}`)).toEqual([]);
    expect(lintReadme(`# Title\r\n\r\n${body.replaceAll("\n", "\r\n")}`)).toEqual([]);
    expect(lintReadme(body)).toEqual([]);
  });

  it("rejects a README that buries or omits the contract", () => {
    expect(lintReadme("# Title\n\nIntro first.\n\nPhilosopher idea: Late.\n\nPractical use: Fine.\n")).toEqual([
      'README.md must state "Philosopher idea:" as described in CONTRIBUTING.md.'
    ]);
    expect(lintReadme("# Title\n\nPhilosopher idea: A habit.\n")).toEqual([
      'README.md must state "Practical use:" as described in CONTRIBUTING.md.'
    ]);
  });
});
