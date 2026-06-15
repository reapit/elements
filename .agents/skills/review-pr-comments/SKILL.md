---
compatibility: requires gh CLI (authenticated) and python3 (3.9+)
description: Use when a user asks you to address, fix, work through, respond to, or resolve GitHub pull request review comments — including phrasings like "fix the Copilot comments", "sort out the review", "address reviewer feedback", or "go through the PR comments". Also use when handling inline review threads, suggested-change blocks, or reviewer questions on a PR.
metadata:
  github-path: skills/review-pr-comments
  github-ref: refs/heads/main
  github-repo: https://github.com/reapit-global/anz-shared-agentic-development
  github-tree-sha: 101abc4fcc72556ad34f9dbdac6b8f34599c41e7
name: review-pr-comments
---

# Reviewing PR Comments

A skill for resolving GitHub pull request review comments end-to-end:
fetch → triage → approve → execute → resolve.

This skill composes `triage-pr-comments` (Phases 1–3) and
`resolve-pr-comments` (Phases 4–5) into a single unified workflow. To run
either phase independently — for example, to survey comments without fixing
them, or to close out threads after manual edits — invoke those skills directly.

## Core principle

Review feedback is a set of suggestions to evaluate, not orders to follow.
Verify against the codebase before accepting. Push back with technical
reasoning when a suggestion is wrong. No performative agreement — actions
speak, the diff is the acknowledgement.

This applies to all reviewers, but be especially sceptical of bot reviewers
(Copilot, etc.) — they often miss context, suggest YAGNI features, or
flag intentional patterns as bugs.

## Prerequisites

- `gh` CLI authenticated with read/write access to the repository.
- `python3` (3.9+) on `PATH`.
- Either run from inside the repository being reviewed, or pass `--owner`
  and `--repo` to the fetch script explicitly.

---

## Phases 1–3 — Fetch, Triage, and Plan

Follow the `triage-pr-comments` skill in full. This covers:

1. Running the fetch script (with any `--filter` or `--reviewer` options the
   user specified) to retrieve unresolved threads.
2. Spawning parallel subagents to classify each thread.
3. Presenting a numbered action plan grouped by classification.
4. Emitting the approved verdicts as a JSON array.

**Stop and wait for user approval before proceeding to Phase 4.**

---

## Phase 4 — Execute

Work through approved items in this order:

1. **Blocking** — `must-fix` items that affect correctness or break things.
2. **Simple** — typos, imports, doc fixes, single-line changes.
3. **Complex** — refactors, multi-file changes, behaviour changes.

For each item:

1. **Re-read the file** at `path` (the file may have changed since triage).
2. **Apply the change** using the `Edit` tool.
   - If the thread contains a ` ```suggestion ` block, use that as the
     proposed replacement. Adapt it — do not apply it blindly if the file has
     changed since the comment was posted.
   - If there is no suggestion block, implement the change described in
     `proposedAction`.
3. **Verify the change in isolation** before moving on — run the relevant
   tests or type check for the affected file. Batching every edit and only
   testing at the end makes regressions hard to attribute.
4. **Invoke any applicable project skill** for the change you're making.
   Each project skill has a triggering description; load whichever match
   what you're editing (component types, tests, prose, contexts, z-index,
   stories, changesets, screenshots, codemods, etc.).
5. For `disagree` or `noise` items approved for no-action, skip the edit step.
6. For `question` items, draft a reply (handled in Phase 5).

If, while implementing, you discover the original `disagree` was wrong (the
reviewer was right), correct course factually — state what you checked, that
the reviewer was correct, and apply the fix. No long apology or
re-justification of the earlier verdict.

Do not mark any thread resolved until all edits for that thread are complete.

---

## Phase 5 — Resolve

Follow the `resolve-pr-comments` skill in full. The approved verdicts JSON
from Phase 3 is already in context — pass it to the skill so replies can be
drafted without re-fetching. This covers:

1. Drafting and presenting proposed replies for each thread.
2. Posting replies to every thread via the REST API.
3. Marking every thread resolved via the GraphQL mutation.
4. Pushing commits.

---

## Common pitfalls

| Pitfall                                            | Fix                                                                                 |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Triaging from comment text alone                   | Read the file first — the comment may not match current code.                       |
| Treating every Copilot suggestion as `must-fix`    | Bots miss context; verify against codebase like any reviewer.                       |
| Adding "proper" handling for an unused branch      | YAGNI check — grep for callers; remove the dead path instead.                       |
| Implementing a partial set when some items unclear | Stop and clarify all items first; partial = wrong implementation.                   |
| Batching every edit and testing only at the end    | Test after each fix so regressions are easy to attribute.                           |
| Defending a wrong `disagree` after the fact        | State factually that the reviewer was right and apply the fix.                      |
| Performative replies ("Great catch!", "Thanks!")   | The diff is the acknowledgement. State what changed, full stop.                     |
| Pushing commits before replying to threads         | Reply and resolve first; reviewers should read context with the push, not after it. |
