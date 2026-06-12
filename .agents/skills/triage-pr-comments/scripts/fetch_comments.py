#!/usr/bin/env python3
"""
fetch_comments.py -- fetch unresolved PR review threads from GitHub.

Usage:
    python3 fetch_comments.py <PR_NUMBER> [options]

Options:
    --filter   everyone|humans|agents   Filter by reviewer type (default: everyone)
    --reviewer <login>                  Only threads from this specific reviewer
    --owner    <owner>                  Repository owner (inferred from git remote if omitted)
    --repo     <repo>                   Repository name (required with --owner)

Output:
    A JSON array of slim thread objects, written to stdout.

Requirements:
    gh CLI authenticated with repo read access.
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Optional

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR))
from filter_threads import filter_threads
from graphql_utils import raise_graphql_errors

_REVIEW_THREADS_QUERY = """
query($owner: String!, $repo: String!, $pr: Int!, $cursor: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      reviewThreads(first: 100, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          isResolved
          isOutdated
          # firstComment gives us the root for author-based filtering.
          # lastComments gives us recent replies to check if the thread has
          # been addressed. Middle comments on long threads are not fetched;
          # filter_threads.py deduplicates the overlap on short threads.
          firstComment: comments(first: 1) {
            nodes {
              databaseId
              author { login __typename }
              body
              path
              line
              startLine
              url
            }
          }
          lastComments: comments(last: 5) {
            nodes {
              databaseId
              author { login __typename }
              body
              path
              line
              startLine
              url
            }
          }
        }
      }
    }
  }
}
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Fetch unresolved PR review threads from GitHub.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("pr", type=int, metavar="PR_NUMBER")
    parser.add_argument(
        "--filter",
        choices=["everyone", "humans", "agents"],
        default="everyone",
        help="Filter threads by reviewer type (default: everyone)",
    )
    parser.add_argument(
        "--reviewer",
        default=None,
        metavar="LOGIN",
        help="Only threads from this specific GitHub login",
    )
    parser.add_argument("--owner", default=None, help="Repository owner")
    parser.add_argument("--repo", default=None, help="Repository name (required with --owner)")
    return parser.parse_args()


def resolve_repo(owner: Optional[str], repo: Optional[str]) -> tuple[str, str]:
    """Return (owner, repo), inferring from the git remote when not provided."""
    if owner and repo:
        return owner, repo
    if bool(owner) != bool(repo):
        sys.exit("Error: --owner and --repo must be provided together.")

    try:
        remote_url = subprocess.check_output(
            ["git", "remote", "get-url", "origin"],
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
    except FileNotFoundError:
        sys.exit("Error: git not found. Install git or pass --owner and --repo explicitly.")
    except subprocess.CalledProcessError:
        sys.exit("Error: could not determine git remote. Pass --owner and --repo explicitly.")

    match = re.search(r"github\.com[:/]([^/]+)/([^/]+?)(?:\.git)?/?$", remote_url)
    if not match:
        sys.exit(f"Error: remote URL does not look like a GitHub URL: {remote_url}")

    return match.group(1), match.group(2)


def run_gh_graphql(query: str, variables: dict) -> dict:
    """Run a gh api graphql call and return the parsed JSON response."""
    args = ["gh", "api", "graphql"]
    for key, value in variables.items():
        if value is None:
            args += ["-F", f"{key}=null"]
        elif isinstance(value, bool):
            args += ["-F", f"{key}={'true' if value else 'false'}"]
        elif isinstance(value, int):
            args += ["-F", f"{key}={value}"]
        else:
            args += ["-f", f"{key}={value}"]
    args += ["-f", f"query={query}"]

    try:
        result = subprocess.run(args, capture_output=True, text=True)
    except FileNotFoundError:
        sys.exit("Error: gh not found. Install the GitHub CLI and authenticate with `gh auth login`.")
    if result.returncode != 0:
        sys.exit(f"Error: gh api graphql failed:\n{result.stderr.strip()}")

    return json.loads(result.stdout)


def fetch_page(
    owner: str,
    repo: str,
    pr: int,
    cursor: Optional[str] = None,
) -> tuple[list[dict], bool, Optional[str]]:
    """Fetch one page of review thread nodes.

    Returns (nodes, has_next_page, end_cursor).
    """
    response = run_gh_graphql(
        _REVIEW_THREADS_QUERY,
        {"owner": owner, "repo": repo, "pr": pr, "cursor": cursor},
    )

    if "errors" in response:
        raise_graphql_errors(response["errors"])

    try:
        threads = response["data"]["repository"]["pullRequest"]["reviewThreads"]
    except (KeyError, TypeError) as exc:
        raise RuntimeError(
            "Unexpected GraphQL response shape — "
            f"could not navigate to data.repository.pullRequest.reviewThreads: {exc}"
        ) from exc

    page_info = threads["pageInfo"]
    return threads["nodes"], page_info["hasNextPage"], page_info.get("endCursor")


def fetch_all_threads(owner: str, repo: str, pr: int) -> list[dict]:
    """Paginate through all review thread pages and return all nodes."""
    all_nodes: list[dict] = []
    cursor: Optional[str] = None

    while True:
        nodes, has_next, cursor = fetch_page(owner, repo, pr, cursor)
        all_nodes.extend(nodes)
        if not has_next:
            break
        if cursor is None:
            raise RuntimeError(
                "GitHub returned hasNextPage=True but endCursor=null — pagination stalled."
            )

    return all_nodes


def main() -> None:
    args = parse_args()
    owner, repo = resolve_repo(args.owner, args.repo)
    try:
        nodes = fetch_all_threads(owner, repo, args.pr)
    except RuntimeError as exc:
        sys.exit(f"Error: {exc}")

    # Re-wrap nodes in the envelope shape that filter_threads expects. That
    # function accepts a raw API response so it can also be used standalone
    # (piping a captured response from stdin), so we meet its interface here.
    envelope = {
        "data": {
            "repository": {
                "pullRequest": {
                    "reviewThreads": {"nodes": nodes}
                }
            }
        }
    }

    try:
        threads = filter_threads(envelope, filter_mode=args.filter, reviewer=args.reviewer)
    except (RuntimeError, ValueError) as exc:
        sys.exit(f"Error: {exc}")
    print(json.dumps(threads, indent=2))


if __name__ == "__main__":
    main()
