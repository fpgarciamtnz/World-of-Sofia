import { loadSkillsData } from "./lib/skills.mjs";

const requiredTraceFields = [
  "trigger evidence",
  "instructions applied",
  "resources/tools used",
  "observed evidence gathered",
  "decision impact",
  "skipped steps",
  "confidence gaps"
];

function includesText(content, text) {
  return content.toLowerCase().includes(text.toLowerCase());
}

function fail(message) {
  throw new Error(message);
}

const skillsData = await loadSkillsData();
const tracedSkills = skillsData.skills.filter((skill) => skill.developerTrace);

for (const skill of tracedSkills) {
  const trace = skill.developerTrace;

  if (trace.mode !== "opt-in") {
    fail(`Skill "${skill.slug}" developerTrace.mode must be "opt-in".`);
  }

  if (!trace.surfaces.includes("response")) {
    fail(`Skill "${skill.slug}" developerTrace.surfaces must include "response".`);
  }

  if (!skill.references.includes(trace.contract)) {
    fail(`Skill "${skill.slug}" developerTrace.contract must be registered in references.`);
  }

  const contract = skill.referencesContent.find((reference) => reference.path === trace.contract);
  if (!contract) {
    fail(`Skill "${skill.slug}" developerTrace.contract is missing: ${trace.contract}`);
  }

  for (const trigger of trace.triggers) {
    if (!includesText(skill.skillMarkdown, trigger)) {
      fail(`Skill "${skill.slug}" is missing trace trigger in SKILL.md: ${trigger}`);
    }
  }

  if (!includesText(skill.skillMarkdown, "Skill Impact Trace")) {
    fail(`Skill "${skill.slug}" must name the "Skill Impact Trace" response section.`);
  }

  for (const field of requiredTraceFields) {
    if (!includesText(contract.content, field)) {
      fail(`Skill "${skill.slug}" trace contract is missing required field: ${field}`);
    }
  }
}

console.warn(`Validated developer trace contracts for ${tracedSkills.length} skill(s).`);
