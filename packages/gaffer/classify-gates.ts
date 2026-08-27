import { readFileSync } from "node:fs";

import { load as loadYaml } from "js-yaml";
import { minimatch } from "minimatch";

import type {
  ChangedFile,
  Classification,
  DenyMatch,
  GateResult,
  PullRequestData,
  Tier,
} from "./types.ts";

export interface SizeThresholdTier {
  lines: number;
  files: number;
}

export interface PathCategory {
  description: string;
  pathPatterns: string[];
  contentPattern?: string;
}

export interface DependencyEcosystem {
  manifests: string[];
  lockfiles: string[];
}

export interface Policy {
  version: number;
  statusCheckContext: string;
  mergeMethod: "SQUASH" | "MERGE" | "REBASE";
  sizeExemptGlobs: string[];
  sizeThresholds: {
    hardCeiling: SizeThresholdTier;
    tiers: { t1a: SizeThresholdTier; t1b: SizeThresholdTier; t1c: SizeThresholdTier };
  };
  denyCategories: Record<string, PathCategory>;
  scrutinyFloorCategories: Record<string, PathCategory>;
  advisoryCategories: Record<string, PathCategory>;
  dependencyEcosystems: Record<string, DependencyEcosystem>;
}

export function loadPolicy(policyPath: string): Policy {
  const raw = readFileSync(policyPath, "utf8");
  return loadYaml(raw) as Policy;
}

export function isSizeExempt(path: string, policy: Policy): boolean {
  return policy.sizeExemptGlobs.some((glob) => minimatch(path, glob, { dot: true }));
}

export function substantiveSize(
  files: ChangedFile[],
  policy: Policy,
): { lines: number; files: number } {
  const substantive = files.filter((f) => !isSizeExempt(f.path, policy));
  const lines = substantive.reduce((sum, f) => sum + f.additions + f.deletions, 0);
  return { lines, files: substantive.length };
}

function matchCategories(
  files: ChangedFile[],
  categories: Record<string, PathCategory>,
): DenyMatch[] {
  const matches: DenyMatch[] = [];
  for (const [category, config] of Object.entries(categories)) {
    const contentRegex = config.contentPattern ? new RegExp(config.contentPattern) : null;
    const matchedPaths = files
      .filter((f) => config.pathPatterns.some((glob) => minimatch(f.path, glob, { dot: true })))
      .filter((f) => !contentRegex || contentRegex.test(f.patch ?? ""))
      .map((f) => f.path);

    if (matchedPaths.length > 0) {
      matches.push({ category, description: config.description, paths: matchedPaths });
    }
  }
  return matches;
}

/** Manifest changed with no matching lockfile change: the lockfile wasn't regenerated. */
function checkDependencyIntegrity(files: ChangedFile[], policy: Policy): string[] {
  const touchedPaths = new Set(files.map((f) => f.path));
  const issues: string[] = [];

  for (const [ecosystem, config] of Object.entries(policy.dependencyEcosystems)) {
    const manifestTouched = config.manifests.some((m) => touchedPaths.has(m));
    const lockfileTouched = config.lockfiles.some((l) => touchedPaths.has(l));
    if (manifestTouched && !lockfileTouched && config.lockfiles.length > 0) {
      issues.push(`${ecosystem}: manifest changed without a matching lockfile update`);
    }
  }
  return issues;
}

const TIER_ORDER: Tier[] = [
  "T0-deterministic",
  "T1a-trivial",
  "T1b-small",
  "T1c-medium",
  "T1d-complex",
  "T2-never",
];

function floorTier(tier: Tier, minimum: Tier): Tier {
  return TIER_ORDER.indexOf(tier) < TIER_ORDER.indexOf(minimum) ? minimum : tier;
}

function baseTier(lines: number, files: number, thresholds: Policy["sizeThresholds"]): Tier {
  if (lines === 0 && files === 0) return "T0-deterministic";
  const { t1a, t1b, t1c } = thresholds.tiers;
  if (lines <= t1a.lines && files <= t1a.files) return "T1a-trivial";
  if (lines <= t1b.lines && files <= t1b.files) return "T1b-small";
  if (lines <= t1c.lines && files <= t1c.files) return "T1c-medium";
  return "T1d-complex";
}

export function classify(files: ChangedFile[], policy: Policy): Classification {
  const { lines, files: substantiveFiles } = substantiveSize(files, policy);
  const denyMatches = matchCategories(files, policy.denyCategories);
  const scrutinyMatches = matchCategories(files, policy.scrutinyFloorCategories);
  const advisoryMatches = matchCategories(files, policy.advisoryCategories);
  const dependencyIssues = checkDependencyIntegrity(files, policy);

  if (dependencyIssues.length > 0) {
    denyMatches.push({
      category: "dependency_integrity",
      description: "Lockfile out of sync with manifest",
      paths: [],
    });
  }

  let tier = baseTier(lines, substantiveFiles, policy.sizeThresholds);
  if (scrutinyMatches.length > 0) tier = floorTier(tier, "T1c-medium");
  if (denyMatches.length > 0) tier = "T2-never";

  return {
    tier,
    substantiveLines: lines,
    substantiveFiles,
    denyMatches,
    scrutinyMatches,
    advisoryMatches,
    dependencyIssues,
  };
}

export function prerequisitesGate(pr: PullRequestData): GateResult {
  if (pr.draft) {
    return { gate: "prerequisites", passed: false, message: "PR is a draft." };
  }
  if (pr.mergeable === false) {
    return { gate: "prerequisites", passed: false, message: "PR has merge conflicts." };
  }
  if (pr.changesRequestedBy.length > 0) {
    return {
      gate: "prerequisites",
      passed: false,
      message: `Outstanding changes-requested review(s) from: ${pr.changesRequestedBy.join(", ")}.`,
    };
  }
  return { gate: "prerequisites", passed: true, message: "ok" };
}

export function denyListGate(classification: Classification): GateResult {
  if (classification.denyMatches.length > 0) {
    const summary = classification.denyMatches
      .map((m) => `${m.category} (${m.paths.length || "lockfile"} path(s))`)
      .join(", ");
    return { gate: "deny-list", passed: false, message: `Denied categories matched: ${summary}.` };
  }
  return { gate: "deny-list", passed: true, message: "ok" };
}

export function sizeCeilingGate(classification: Classification, policy: Policy): GateResult {
  const { lines, files } = policy.sizeThresholds.hardCeiling;
  if (classification.substantiveLines > lines || classification.substantiveFiles > files) {
    return {
      gate: "size-ceiling",
      passed: false,
      message: `${classification.substantiveLines} substantive lines / ${classification.substantiveFiles} substantive files exceeds the ${lines}-line / ${files}-file ceiling: too large for auto-review.`,
    };
  }
  return { gate: "size-ceiling", passed: true, message: "ok" };
}
