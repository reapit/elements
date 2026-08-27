import { Octokit } from "octokit";

import type { ChangedFile, PullRequestData } from "./types.ts";

export interface GafferRepo {
  owner: string;
  repo: string;
}

export class GitHubClient {
  private readonly octokit: Octokit;
  readonly repo: GafferRepo;

  constructor(token: string, repo: GafferRepo) {
    this.octokit = new Octokit({ auth: token });
    this.repo = repo;
  }

  async getPullRequest(number: number): Promise<PullRequestData> {
    const { owner, repo } = this.repo;

    const [{ data: pr }, files, reviews] = await Promise.all([
      this.octokit.rest.pulls.get({ owner, repo, pull_number: number }),
      this.listChangedFiles(number),
      this.octokit.rest.pulls.listReviews({ owner, repo, pull_number: number }),
    ]);

    // A reviewer counts as requesting changes only if their most recent review
    // is CHANGES_REQUESTED (a subsequent APPROVED or DISMISSED overrides it).
    const latestByReviewer = new Map<string, string>();
    for (const review of reviews.data) {
      const login = review.user?.login;
      if (login && review.state) latestByReviewer.set(login, review.state);
    }
    const changesRequestedBy = [...latestByReviewer.entries()]
      .filter(([, state]) => state === "CHANGES_REQUESTED")
      .map(([login]) => login);

    return {
      number: pr.number,
      nodeId: pr.node_id,
      title: pr.title,
      body: pr.body ?? "",
      draft: pr.draft ?? false,
      mergeable: pr.mergeable,
      authorLogin: pr.user?.login ?? "unknown",
      authorIsBot: pr.user?.type === "Bot",
      headSha: pr.head.sha,
      baseRefName: pr.base.ref,
      labels: pr.labels.map((l) => (typeof l === "string" ? l : (l.name ?? ""))).filter(Boolean),
      changesRequestedBy,
      files,
    };
  }

  async listChangedFiles(number: number): Promise<ChangedFile[]> {
    const { owner, repo } = this.repo;
    const files = await this.octokit.paginate(this.octokit.rest.pulls.listFiles, {
      owner,
      repo,
      pull_number: number,
      per_page: 100,
    });
    return files.map((f) => ({
      path: f.filename,
      additions: f.additions,
      deletions: f.deletions,
      status: f.status as ChangedFile["status"],
      patch: f.patch,
    }));
  }

  /** Re-fetches PR.mergeable because GitHub computes it asynchronously after push. */
  async refreshMergeable(number: number): Promise<boolean | null> {
    const { owner, repo } = this.repo;
    const { data } = await this.octokit.rest.pulls.get({ owner, repo, pull_number: number });
    return data.mergeable;
  }

  /**
   * Applies `label` to the PR, removing any gaffer-managed labels from
   * `managedLabels` that are no longer appropriate. This keeps the label set
   * accurate when classification changes on a subsequent push.
   */
  async setLabel(number: number, label: string, managedLabels: string[]): Promise<void> {
    const { owner, repo } = this.repo;

    // Remove any currently-applied managed labels that differ from the new one.
    const { data: current } = await this.octokit.rest.issues.get({
      owner,
      repo,
      issue_number: number,
    });
    const toRemove = current.labels
      .map((l) => (typeof l === "string" ? l : (l.name ?? "")))
      .filter((name) => managedLabels.includes(name) && name !== label);

    await Promise.all([
      this.octokit.rest.issues.addLabels({ owner, repo, issue_number: number, labels: [label] }),
      ...toRemove.map((name) =>
        this.octokit.rest.issues.removeLabel({ owner, repo, issue_number: number, name }),
      ),
    ]);
  }
}
