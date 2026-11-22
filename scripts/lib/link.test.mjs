import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  describeLinks,
  describePending,
  explainGitError,
  formatLogLine,
  linkSkills,
  pendingWork,
  pullRepo
} from "./link.mjs";

let root;
let paths;

function writeSkill(dir, slug, body = "Body.") {
  fs.mkdirSync(path.join(dir, slug), { recursive: true });
  fs.writeFileSync(path.join(dir, slug, "SKILL.md"), `---\nname: ${slug}\ndescription: "Demo."\n---\n\n${body}\n`);
}

function isLinkTo(linkPath, targetDir) {
  return fs.lstatSync(linkPath).isSymbolicLink() && fs.realpathSync(linkPath) === fs.realpathSync(targetDir);
}

function exists(filePath) {
  return fs.lstatSync(filePath, { throwIfNoEntry: false }) !== undefined;
}

const nothingChanged = { linked: [], replaced: [], relinked: [], archived: [], removed: [], failed: [] };

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "sofia-link-"));
  paths = {
    skillsRoot: path.join(root, "repo", "skills"),
    targetRoot: path.join(root, "claude", "skills"),
    backupRoot: path.join(root, "claude", ".backups", "world-of-sofia"),
    now: new Date("2026-11-21T06:00:00.000Z")
  };
  fs.mkdirSync(paths.skillsRoot, { recursive: true });
  fs.mkdirSync(paths.targetRoot, { recursive: true });
});

afterEach(() => {
  // Unlink first, so removing the temporary folder never walks through a link.
  for (const name of fs.readdirSync(paths.targetRoot)) {
    const entryPath = path.join(paths.targetRoot, name);
    if (fs.lstatSync(entryPath).isSymbolicLink()) {
      fs.unlinkSync(entryPath);
    }
  }
  fs.rmSync(root, { recursive: true, force: true });
});

describe("linking skills", () => {
  it("links every repository skill that has a SKILL.md, and nothing else", () => {
    writeSkill(paths.skillsRoot, "alpha");
    writeSkill(paths.skillsRoot, "beta");
    writeSkill(paths.skillsRoot, ".hidden");
    fs.mkdirSync(path.join(paths.skillsRoot, "no-skill-file"));

    const result = linkSkills(paths);

    expect(result.linked).toEqual(["alpha", "beta"]);
    expect(isLinkTo(path.join(paths.targetRoot, "alpha"), path.join(paths.skillsRoot, "alpha"))).toBe(true);
    expect(fs.readdirSync(paths.targetRoot).sort()).toEqual(["alpha", "beta"]);
  });

  it("changes nothing when run again", () => {
    writeSkill(paths.skillsRoot, "alpha");
    linkSkills(paths);

    const result = linkSkills(paths);

    expect(result).toEqual(nothingChanged);
    expect(describeLinks(result)).toEqual([]);
  });

  it("makes a repository edit visible through the link at once", () => {
    writeSkill(paths.skillsRoot, "alpha");
    linkSkills(paths);

    fs.writeFileSync(path.join(paths.skillsRoot, "alpha", "SKILL.md"), "edited");

    expect(fs.readFileSync(path.join(paths.targetRoot, "alpha", "SKILL.md"), "utf8")).toBe("edited");
  });

  it("replaces an installed copy that matches the repository, ignoring tests", () => {
    writeSkill(paths.skillsRoot, "alpha");
    fs.mkdirSync(path.join(paths.skillsRoot, "alpha", "tests"));
    fs.writeFileSync(path.join(paths.skillsRoot, "alpha", "tests", "alpha.test.mjs"), "test");
    writeSkill(paths.targetRoot, "alpha");

    const result = linkSkills(paths);

    expect(result.replaced).toEqual(["alpha"]);
    expect(isLinkTo(path.join(paths.targetRoot, "alpha"), path.join(paths.skillsRoot, "alpha"))).toBe(true);
    expect(exists(paths.backupRoot)).toBe(false);
  });

  it("moves an installed copy with its own changes to the backups folder before linking", () => {
    writeSkill(paths.skillsRoot, "alpha");
    writeSkill(paths.targetRoot, "alpha", "Edited outside the repository.");

    const result = linkSkills(paths);

    const archivedTo = path.join(paths.backupRoot, "alpha-20261121060000000");
    expect(result.archived).toEqual([{ slug: "alpha", archivedTo }]);
    expect(fs.readFileSync(path.join(archivedTo, "SKILL.md"), "utf8")).toContain("Edited outside the repository.");
    expect(isLinkTo(path.join(paths.targetRoot, "alpha"), path.join(paths.skillsRoot, "alpha"))).toBe(true);
    expect(describeLinks(result)).toEqual([`moved a different alpha folder to ${archivedTo}`]);
  });

  it("repoints a link that targets another folder, such as a stale clone, and keeps that folder", () => {
    const staleSkills = path.join(root, "stale", "skills");
    writeSkill(paths.skillsRoot, "alpha");
    writeSkill(staleSkills, "alpha", "Old text.");
    fs.symlinkSync(path.join(staleSkills, "alpha"), path.join(paths.targetRoot, "alpha"), "junction");

    const result = linkSkills(paths);

    expect(result.relinked).toEqual(["alpha"]);
    expect(isLinkTo(path.join(paths.targetRoot, "alpha"), path.join(paths.skillsRoot, "alpha"))).toBe(true);
    expect(exists(path.join(staleSkills, "alpha", "SKILL.md"))).toBe(true);
  });

  it("removes links whose repository skill no longer exists", () => {
    writeSkill(paths.skillsRoot, "alpha");
    writeSkill(paths.skillsRoot, "beta");
    linkSkills(paths);
    fs.rmSync(path.join(paths.skillsRoot, "beta"), { recursive: true });

    const result = linkSkills(paths);

    expect(result.removed).toEqual(["beta"]);
    expect(exists(path.join(paths.targetRoot, "beta"))).toBe(false);
    expect(exists(path.join(paths.targetRoot, "alpha"))).toBe(true);
  });

  it("never touches skills, links, or files that are not this repository's", () => {
    writeSkill(paths.skillsRoot, "alpha");
    writeSkill(paths.targetRoot, "other-skill");
    writeSkill(path.join(root, "elsewhere"), "linked-elsewhere");
    fs.symlinkSync(
      path.join(root, "elsewhere", "linked-elsewhere"),
      path.join(paths.targetRoot, "linked-elsewhere"),
      "junction"
    );
    fs.writeFileSync(path.join(paths.targetRoot, "stray-file"), "left alone");
    fs.mkdirSync(path.join(paths.targetRoot, "synced"));

    const result = linkSkills(paths);

    expect(result).toEqual({ ...nothingChanged, linked: ["alpha"] });
    expect(fs.readdirSync(paths.targetRoot).sort()).toEqual([
      "alpha",
      "linked-elsewhere",
      "other-skill",
      "stray-file",
      "synced"
    ]);
    expect(fs.lstatSync(path.join(paths.targetRoot, "other-skill")).isSymbolicLink()).toBe(false);
  });

  it("describes each kind of change briefly", () => {
    const result = { ...nothingChanged, linked: ["alpha"], removed: ["beta"], failed: [{ slug: "gamma", reason: "EPERM" }] };

    expect(describeLinks(result)).toEqual([
      "linked alpha",
      "removed links to deleted skills: beta",
      "could not link gamma (EPERM)"
    ]);
  });
});

describe("pulling and pending work", () => {
  it("skips the fast-forward and says why when the fetch fails", () => {
    const calls = [];
    const run = (repoRoot, args) => {
      calls.push(args[0]);
      return { ok: false, reason: explainGitError("fatal: unable to access 'https://github.com/x/y/': Could not resolve host: github.com") };
    };

    expect(pullRepo("repo", run)).toEqual({ ok: false, reason: "GitHub could not be reached" });
    expect(calls).toEqual(["fetch"]);
  });

  it("explains common Git failures in plain words", () => {
    expect(explainGitError("fatal: Not possible to fast-forward, aborting.")).toBe(
      "this clone and GitHub both have new commits"
    );
    expect(explainGitError("error: Your local changes to the following files would be overwritten by merge:")).toBe(
      "uncommitted changes are in the way"
    );
    expect(explainGitError("hint: something\nfatal: an unusual failure")).toBe("an unusual failure");
  });

  it("asks to commit and push only when work is waiting", () => {
    expect(describePending({ uncommitted: true, unpushed: 2 })).toBe(
      "World-of-Sofia has uncommitted changes and 2 unpushed commits: commit and push World-of-Sofia."
    );
    expect(describePending({ uncommitted: true, unpushed: 0 })).toBe(
      "World-of-Sofia has uncommitted changes: commit and push World-of-Sofia."
    );
    expect(describePending({ uncommitted: false, unpushed: 1 })).toBe("World-of-Sofia has 1 unpushed commit: push World-of-Sofia.");
    expect(describePending({ uncommitted: false, unpushed: 0 })).toBeNull();
  });

  it("writes one log line per run", () => {
    const line = formatLogLine({
      now: paths.now,
      pull: { ok: false, reason: "GitHub could not be reached" },
      result: { ...nothingChanged, linked: ["alpha"] },
      pending: { uncommitted: true, unpushed: 0 }
    });

    expect(line).toBe(
      "2026-11-21T06:00:00.000Z pull=skipped (GitHub could not be reached) linked=1 replaced=0 relinked=0 archived=0 removed=0 failed=0 uncommitted=yes unpushed=0"
    );
  });
});

describe("pulling a real Git repository", () => {
  function git(cwd, ...args) {
    const result = spawnSync(
      "git",
      ["-c", "user.name=Test", "-c", "user.email=test@example.com", "-c", "init.defaultBranch=main", ...args],
      { cwd, encoding: "utf8" }
    );
    if (result.status !== 0) {
      throw new Error(result.stderr);
    }
    return result.stdout;
  }

  function commitFile(cwd, name) {
    fs.writeFileSync(path.join(cwd, name), name);
    git(cwd, "add", name);
    git(cwd, "commit", "--quiet", "-m", `Add ${name}`);
  }

  function makeClones() {
    const remote = path.join(root, "remote.git");
    const upstream = path.join(root, "upstream");
    const clone = path.join(root, "clone");
    git(root, "init", "--quiet", "--bare", remote);
    git(root, "clone", "--quiet", remote, upstream);
    commitFile(upstream, "first.md");
    git(upstream, "push", "--quiet", "-u", "origin", "main");
    git(root, "clone", "--quiet", remote, clone);
    return { upstream, clone };
  }

  it("fast-forwards to new commits and reports pending work", () => {
    const { upstream, clone } = makeClones();
    commitFile(upstream, "second.md");
    git(upstream, "push", "--quiet");

    expect(pullRepo(clone)).toEqual({ ok: true, stdout: "" });
    expect(exists(path.join(clone, "second.md"))).toBe(true);

    fs.writeFileSync(path.join(clone, "draft.md"), "draft");
    expect(pendingWork(clone)).toEqual({ uncommitted: true, unpushed: 0 });
  }, 30_000);

  it("leaves a diverged clone as it is and says why", () => {
    const { upstream, clone } = makeClones();
    commitFile(upstream, "remote-change.md");
    git(upstream, "push", "--quiet");
    commitFile(clone, "local-change.md");

    expect(pullRepo(clone)).toEqual({ ok: false, reason: "this clone and GitHub both have new commits" });
    expect(exists(path.join(clone, "local-change.md"))).toBe(true);
    expect(exists(path.join(clone, "remote-change.md"))).toBe(false);
    expect(pendingWork(clone)).toEqual({ uncommitted: false, unpushed: 1 });
  }, 30_000);
});
