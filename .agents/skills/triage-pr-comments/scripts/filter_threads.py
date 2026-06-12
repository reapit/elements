#!/usr/bin/env python3
"""
filter_threads.py [--filter everyone|humans|agents] [--reviewer <login>]

Reads a GitHub GraphQL reviewThreads response from stdin and writes a slim
JSON array of actionable threads to stdout. The response must include the
``firstComment``/``lastComments`` aliased comment fields produced by the
``fetch_comments.py`` query — a generic reviewThreads response without those
aliases will fail at runtime.

Can also be imported as a module — call filter_threads(raw, filter_mode, reviewer)
directly instead of going through the CLI.

Filter modes (--filter):
  everyone  All unresolved, non-outdated threads regardless of author (default).
  humans    Only threads opened by human reviewers (authorType == "User").
  agents    Only threads opened by bot reviewers (authorType == "Bot").

Use --reviewer <login> to restrict to a single GitHub login. Takes precedence
over --filter.
"""

import argparse
import json
import sys
from typing import Optional

from graphql_utils import raise_graphql_errors


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Filter a GitHub GraphQL reviewThreads response to actionable threads.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
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
        help="Keep only threads whose root comment was authored by this login",
    )
    return parser.parse_args()


def is_actionable_author(
    author: Optional[dict],
    filter_mode: str,
    reviewer: Optional[str],
) -> bool:
    """Return True if this thread's root comment author passes the active filter."""
    if author is None:
        return False
    if reviewer:
        return author.get("login") == reviewer
    if filter_mode == "everyone":
        return True
    if filter_mode == "humans":
        return author.get("__typename") == "User"
    if filter_mode == "agents":
        return author.get("__typename") == "Bot"
    raise ValueError(f"Unknown filter_mode: {filter_mode!r}. Expected 'everyone', 'humans', or 'agents'.")


def slim_comment(c: dict) -> dict:
    """Return a minimal comment dict with only the fields needed for triage."""
    return {
        "id": c["databaseId"],
        "author": (c["author"] or {}).get("login"),
        "authorType": (c["author"] or {}).get("__typename"),
        "body": c["body"],
        "path": c["path"],
        "line": c["line"],
        "startLine": c["startLine"],
        "url": c["url"],
    }


def filter_threads(
    raw: dict,
    filter_mode: str = "everyone",
    reviewer: Optional[str] = None,
) -> list[dict]:
    """Filter and slim a GraphQL reviewThreads response.

    Args:
        raw:         Full GraphQL response envelope. Each thread node must
                     contain ``firstComment`` and ``lastComments`` aliased
                     comment fields as produced by the fetch_comments.py query.
        filter_mode: One of "everyone", "humans", or "agents".
        reviewer:    When set, keeps only threads authored by this login.

    Returns:
        A list of slim thread dicts ready for triage.
    """
    if "errors" in raw:
        raise_graphql_errors(raw["errors"])

    try:
        nodes = raw["data"]["repository"]["pullRequest"]["reviewThreads"]["nodes"]
    except (KeyError, TypeError) as exc:
        raise RuntimeError(
            "Unexpected GraphQL response shape — "
            f"could not navigate to data.repository.pullRequest.reviewThreads.nodes: {exc}"
        ) from exc

    result = []
    for thread in nodes:
        if thread["isResolved"] or thread["isOutdated"]:
            continue

        # Merge firstComment and lastComments, preserving order and deduplicating
        # by databaseId. Short threads (≤ 5 comments) have overlapping nodes in
        # both aliased fields.
        try:
            first = thread["firstComment"]["nodes"]
            last = thread["lastComments"]["nodes"]
        except KeyError as exc:
            raise RuntimeError(
                "Thread node is missing the expected aliased comment fields — "
                "the response must include firstComment and lastComments aliases "
                f"as produced by the fetch_comments.py query: {exc}"
            ) from exc
        seen_ids: set = set()
        comments = []
        for node in first + last:
            if node["databaseId"] not in seen_ids:
                seen_ids.add(node["databaseId"])
                comments.append(node)

        if not comments:
            continue

        root = comments[0]
        if not is_actionable_author(root.get("author"), filter_mode, reviewer):
            continue

        result.append(
            {
                "threadId": thread["id"],
                "comments": [slim_comment(c) for c in comments],
            }
        )

    return result


if __name__ == "__main__":
    args = parse_args()
    raw = json.load(sys.stdin)
    try:
        threads = filter_threads(raw, filter_mode=args.filter, reviewer=args.reviewer)
    except (RuntimeError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)
    print(json.dumps(threads, indent=2))
