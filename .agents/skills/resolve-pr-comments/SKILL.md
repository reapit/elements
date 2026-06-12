---
name: resolve-pr-comments
description: >
  Use when code changes are already in place and you need to close out PR
  review threads: post replies, mark threads resolved, and push commits.
  Trigger phrases include: "resolve the PR threads", "reply to the PR
  comments", "close out the review threads", "mark the comments resolved
  and push", "reply and push".
---

# Resolve PR Comments

A skill for closing out GitHub pull request review threads after fixes have
been applied: reply → resolve → push.

Use this after you have already made the code changes for each thread. To
fetch, classify, and plan first, use the `triage-pr-comments` skill or run
the full `review-pr-comments` workflow instead.

## Prerequisites

- `gh` CLI authenticated with read/write access to the repository.
- All code edits already applied locally (committed or staged).
- Either the approved verdicts JSON from a prior `triage-pr-comments` run
  (already in context), or access to recent `git diff` output to infer what
  changed.

---

## Phase 1 — Collect threads

**When running as part of `review-pr-comments`:** the approved verdicts
JSON from `triage-pr-comments` is already in context. Use it directly —
`rootCommentId` and `threadId` are the fields needed for the REST and GraphQL
calls in Phases 3 and 4. Skip to Phase 2.

**When running standalone** (fixes were made manually without a prior triage):
invoke the `triage-pr-comments` skill's Phase 1 fetch step to re-fetch the
current unresolved threads and get their `threadId` and `rootCommentId` values.

Then inspect the recent diff to understand what changed for each thread:

```bash
git diff HEAD~1
```

---

## Phase 2 — Draft replies

For each thread, draft a reply. Keep replies to one sentence. The diff is
the acknowledgement; the reply labels what changed.

| Thread outcome           | Reply format                                            |
| ------------------------ | ------------------------------------------------------- |
| Fixed                    | `"Fixed in <file>:<line>."` or `"Updated to <change>."` |
| No change (`disagree`)   | `"No change — <one-sentence technical reason>."`        |
| Question answered        | A direct, factual answer.                               |
| Noise / no action needed | `"No action needed — <reason>."`                        |

**Do not write:**

- "You're absolutely right!" / "Great catch!" / "Great point!" / "Good spot!"
- "Thanks for catching that!" / "Thanks for the feedback!"
- Any expression of gratitude or agreement-as-performance

Present all proposed replies to the user before posting. Wait for approval.

If the reviewer was right and you initially classified as `disagree`, the
reply states the correction factually: "Verified — you're correct, the branch
is reachable via X. Fixed." No long apology.

---

## Phase 3 — Post replies

Post a reply to the root comment of each thread using the REST API:

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/comments/{rootCommentId}/replies \
  --method POST \
  --field body="<reply text>"
```

Post all replies before marking any thread resolved.

---

## Phase 4 — Resolve threads

After all replies are posted, resolve each thread using the GraphQL mutation:

```bash
gh api graphql -f query='
mutation($threadId: ID!) {
  resolveReviewThread(input: { threadId: $threadId }) {
    thread { id isResolved }
  }
}
' -f threadId="<threadId>"
```

Run all resolve mutations after all replies have been posted.

> **Note:** Replies (REST POST) and resolve mutations (GraphQL) are separate
> operations. If a reply posts successfully but the resolve mutation fails,
> re-running will post a duplicate reply before resolving. This is harmless —
> a minor cosmetic duplicate — but worth noting if you need to re-run after a
> partial failure.

---

## Phase 5 — Push

After all replies are posted and threads are resolved, push the commits:

```bash
git push
```

Reviewers get a single notification stream. They should see your replies and
resolved threads alongside the new commits, not after a silent push that
leaves them wondering whether their feedback was read.

The required order is:

1. Apply all edits locally.
2. Post replies to every thread.
3. Mark every thread resolved.
4. **Then** push.

If a push has to happen first for some reason (e.g. CI must pass before
verifying a fix), say so explicitly to the user before pushing — do not
silently reorder these steps.

---

## Tips

- **Re-run the fetch script** after a long execute phase to confirm no new
  threads were added while you were working.
- If a thread you expected to find no longer appears in the fetch output, it
  was likely resolved by another reviewer or a previous run. Skip it silently.
