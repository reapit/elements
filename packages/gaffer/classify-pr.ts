#!/usr/bin/env node
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseArgs } from "node:util";

import {
  classify,
  denyListGate,
  loadPolicy,
  type Policy,
  prerequisitesGate,
  sizeCeilingGate,
} from "./classify-gates.ts";
import { GitHubClient } from "./github.ts";
import type { Classification, GateResult, PullRequestData } from "./types.ts";

function findRepoRoot(startDir: string): string {
  let dir = startDir;
  while (true) {
    const packageJsonPath = path.join(dir, "package.json");
    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
      if (packageJson.workspaces) return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(
        `Could not find repo root (a package.json with "workspaces") above ${startDir}`,
      );
    }
    dir = parent;
  }
}

const REPO_ROOT = findRepoRoot(import.meta.dirname);
const POLICY_PATH = path.join(REPO_ROOT, ".gaffer/policy.yml");

const MERGEABLE_POLL_ATTEMPTS = 5;
const MERGEABLE_POLL_DELAY_MS = 2000;

const LABEL_FACTORY_MADE = "factory-made";
const LABEL_QUALITY_HOLD = "quality-hold";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO: extract comment formatting to a dedicated module
function buildComment(label: string, classification: Classification): string {
  const isFactoryMade = label === LABEL_FACTORY_MADE;
  const alertType = isFactoryMade ? "[!TIP]" : "[!CAUTION]";
  const heading = isFactoryMade
    ? "### 🤩 Gaffer cleared this PR as factory-made"
    : "### 🙅‍♂️ Gaffer placed this PR on quality-hold";

  const inlineList = (matches: Classification["denyMatches"]) =>
    matches.map((m) => `\`${m.category}\``).join(" · ");

  const lines: string[] = [`> ${alertType}`, `> ${heading}`];

  if (classification.denyMatches.length > 0) {
    lines.push(">", `> **Denied categories:** ${inlineList(classification.denyMatches)}`);
  }

  if (classification.scrutinyMatches.length > 0) {
    lines.push(">", `> **High-impact categories:** ${inlineList(classification.scrutinyMatches)}`);
  }

  if (classification.advisoryMatches.length > 0) {
    lines.push(">", `> **Advisory:** ${inlineList(classification.advisoryMatches)}`);
  }

  lines.push(
    ">",
    `> <sub>Tier \`${classification.tier}\` · ${classification.substantiveLines} lines across ${classification.substantiveFiles} files</sub>`,
  );

  return lines.join("\n");
}

/** Writes a step output to $GITHUB_OUTPUT if available. */
function writeStepOutput(name: string, value: string): void {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (!outputFile) return;
  // Multi-line values use the heredoc syntax required by GitHub Actions.
  const delimiter = `EOF_${Date.now()}`;
  appendFileSync(outputFile, `${name}<<${delimiter}\n${value}\n${delimiter}\n`);
}

function parseCliArgs() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      repo: { type: "string", default: process.env.GITHUB_REPOSITORY ?? "" },
      "dry-run": { type: "boolean", default: false },
      verbose: { type: "boolean", short: "v", default: false },
    },
  });

  const prNumber = Number.parseInt(positionals[0] ?? "", 10);
  if (!Number.isInteger(prNumber) || prNumber <= 0) {
    throw new Error("Usage: classify-pr.ts <pr-number> [--repo owner/repo] [--dry-run] [-v]");
  }
  if (!values.repo || !values.repo.includes("/")) {
    throw new Error("--repo owner/repo is required (or set GITHUB_REPOSITORY).");
  }
  const [owner, repo] = values.repo.split("/");

  return {
    prNumber,
    owner,
    repo,
    dryRun: values["dry-run"] as boolean,
    verbose: values.verbose as boolean,
  };
}

async function main() {
  const args = parseCliArgs();
  const policy = loadPolicy(POLICY_PATH);
  const client = new GitHubClient(process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN ?? "", {
    owner: args.owner,
    repo: args.repo,
  });

  const gateResults: GateResult[] = [];

  let pr: PullRequestData = await client.getPullRequest(args.prNumber);

  for (let attempt = 0; pr.mergeable === null && attempt < MERGEABLE_POLL_ATTEMPTS; attempt++) {
    await sleep(MERGEABLE_POLL_DELAY_MS);
    const mergeable = await client.refreshMergeable(args.prNumber);
    pr = { ...pr, mergeable };
  }

  gateResults.push(prerequisitesGate(pr));

  const classification = classify(pr.files, policy);
  gateResults.push(denyListGate(classification));
  gateResults.push(sizeCeilingGate(classification, policy));

  const gatesPassed = gateResults.every((g) => g.passed);
  const label = gatesPassed ? LABEL_FACTORY_MADE : LABEL_QUALITY_HOLD;
  const denyingGate = gateResults.find((g) => !g.passed);
  const comment = buildComment(label, classification);

  if (args.verbose) {
    console.error(
      JSON.stringify(
        {
          pr: { number: pr.number, author: pr.authorLogin, headSha: pr.headSha },
          classification,
          gateResults,
          label,
        },
        null,
        2,
      ),
    );
  }

  if (args.dryRun) {
    console.log(
      `Dry run — would apply label "${label}" to PR #${args.prNumber}.${denyingGate ? ` Denying gate: ${denyingGate.message}` : ""}`,
    );
    return;
  }

  await client.setLabel(args.prNumber, label, [LABEL_FACTORY_MADE, LABEL_QUALITY_HOLD]);
  writeStepOutput("comment", comment);
  console.log(
    `Classified PR #${args.prNumber} as "${label}".${denyingGate ? ` Reason: ${denyingGate.message}` : ""}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
