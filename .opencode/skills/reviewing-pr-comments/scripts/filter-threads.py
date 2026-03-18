#!/usr/bin/env python3
"""
filter-threads.py

Reads a GitHub GraphQL reviewThreads response from stdin and writes a slim
JSON array of actionable threads to stdout.

Keeps only threads that are:
  - unresolved
  - not outdated
  - opened by a human reviewer OR by the Copilot pull-request reviewer bot

All other bots are dropped silently.

Each thread node is expected to have two aliased comment fields produced by
fetch-comments.sh: ``firstComment`` (first: 1) and ``lastComments`` (last: 3).
This script merges them into a single ordered list, deduplicated by databaseId,
so that short threads (≤ 4 comments) do not have duplicates.
"""

import json
import sys
from typing import Optional

COPILOT_LOGIN = "copilot-pull-request-reviewer"


def is_actionable_author(author: Optional[dict]) -> bool:
    """Keep humans and the Copilot reviewer; drop all other bots."""
    if author is None:
        return False
    if author.get("__typename") == "User":
        return True
    if author.get("login") == COPILOT_LOGIN:
        return True
    return False


def slim_comment(c: dict) -> dict:
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


raw = json.load(sys.stdin)

if "errors" in raw:
    for err in raw["errors"]:
        print(f"GraphQL error: {err.get('message', err)}", file=sys.stderr)
    sys.exit(1)

data = raw.get("data")
if not data or not data.get("repository") or not data["repository"].get("pullRequest"):
    print(
        "Error: unexpected GraphQL response shape — 'data.repository.pullRequest' missing.",
        file=sys.stderr,
    )
    sys.exit(1)

threads = data["repository"]["pullRequest"]["reviewThreads"]["nodes"]

result = []
for thread in threads:
    if thread["isResolved"] or thread["isOutdated"]:
        continue

    # Merge firstComment and lastComments, preserving order and deduplicating
    # by databaseId (short threads will have overlapping nodes in both fields).
    seen_ids: set = set()
    comments = []
    for node in thread["firstComment"]["nodes"] + thread["lastComments"]["nodes"]:
        if node["databaseId"] not in seen_ids:
            seen_ids.add(node["databaseId"])
            comments.append(node)

    if not comments:
        continue

    root = comments[0]
    if not is_actionable_author(root.get("author")):
        continue

    result.append(
        {
            "threadId": thread["id"],
            "comments": [slim_comment(c) for c in comments],
        }
    )

print(json.dumps(result, indent=2))
