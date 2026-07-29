export type Tier =
  | "T0-deterministic"
  | "T1a-trivial"
  | "T1b-small"
  | "T1c-medium"
  | "T1d-complex"
  | "T2-never";

export interface ChangedFile {
  path: string;
  additions: number;
  deletions: number;
  status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
  patch?: string;
}

export interface PullRequestData {
  number: number;
  nodeId: string;
  title: string;
  body: string;
  draft: boolean;
  mergeable: boolean | null;
  authorLogin: string;
  authorIsBot: boolean;
  headSha: string;
  baseRefName: string;
  labels: string[];
  changesRequestedBy: string[];
  files: ChangedFile[];
}

export interface GateResult {
  gate: string;
  passed: boolean;
  message: string;
}

export interface DenyMatch {
  category: string;
  description: string;
  paths: string[];
}

export interface Classification {
  tier: Tier;
  substantiveLines: number;
  substantiveFiles: number;
  denyMatches: DenyMatch[];
  scrutinyMatches: DenyMatch[];
  advisoryMatches: DenyMatch[];
  dependencyIssues: string[];
}
