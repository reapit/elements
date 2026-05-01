---
name: reviewing-pr-comments
description: >
  Use when a user asks you to address, fix, work through, respond to, or
  resolve GitHub pull request review comments — including phrasings like
  "fix the Copilot comments", "sort out the review", "address reviewer
  feedback", or "go through the PR comments". Also use when handling
  inline review threads, suggested-change blocks, or reviewer questions
  on a PR.
---

# Reviewing PR Comments

A skill for resolving GitHub pull request review comments end-to-end:
fetch → triage → approve → execute → resolve.

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
- `python3` on `PATH` (used by the fetch script).
- Either run from inside the repository being reviewed, or pass `<owner>` and
  `<repo>` explicitly as arguments to the fetch script.

---

## Phase 1 — Fetch

Run the fetch script to retrieve all unresolved, non-outdated review threads.
The script filters out noise bots automatically, keeping only Copilot and human
reviewers.

```bash
bash .agents/skills/reviewing-pr-comments/scripts/fetch-comments.sh <PR_NUMBER>
```

The script accepts optional `owner` and `repo` arguments when the git remote
cannot be inferred:

```bash
bash .agents/skills/reviewing-pr-comments/scripts/fetch-comments.sh <PR_NUMBER> <owner> <repo>
```

**Output**: a JSON array of thread objects. Each thread has this shape:

````json
{
  "threadId": "PRRT_...",
  "comments": [
    {
      "id": 1234567,
      "author": "copilot-pull-request-reviewer",
      "authorType": "Bot",
      "body": "The comment text, including any ```suggestion blocks",
      "path": "src/core/button/button.tsx",
      "line": 42,
      "startLine": 40,
      "url": "https://github.com/..."
    }
  ]
}
````

`line` and `startLine` may be `null` for comments anchored to a newly-added
file (where no right-side line number exists yet). In that case the comment
applies to the file as a whole; start reading from the top.

If the output is `[]`, there are no actionable threads. Tell the user and stop.

---

## Phase 2 — Triage (parallel subagents)

For each thread, spawn a subagent to assess it. Run all subagents in parallel
in a single message — do not wait for one to finish before launching the next.

### What to pass each subagent

Give each subagent:

1. The full thread JSON (all comments in the thread, in order).
2. An instruction to read `path` using the `Read` tool, focused on the region
   around `line` / `startLine` (read at least 20 lines either side for context).
   When `line` is `null`, read the first 60 lines of the file.
3. An instruction to return a structured verdict as JSON (see below).

### Subagent prompt template

````
You are triaging a single GitHub pull request review thread. Your job is to
read the comment(s), read the relevant section of the file, and return a
structured verdict.

Thread:
<paste thread JSON here>

Instructions:
1. Read the file at the path above, centred on the indicated line.
2. Verify the comment against codebase reality. Check:
   - Does the suggestion apply to THIS codebase, or is the reviewer missing
     context (project conventions, framework specifics, intentional patterns)?
   - Would applying it break existing functionality or callers?
   - Is there a documented or obvious reason for the current implementation
     (compatibility, performance, deprecated path)?
   - YAGNI: if the reviewer asks for "proper" handling of a case, grep the
     codebase to confirm that case actually occurs. If unused, recommend
     removing the code rather than expanding it.
3. If the root comment contains a ```suggestion block, extract the proposed
   replacement. Do not treat the block as authoritative — the file may have
   moved on since the comment was posted.
4. If the thread has follow-up comments, read them — the author may have
   already addressed or rebutted the original point, which makes it `noise`.
5. Return ONLY a JSON object with this exact shape — no prose, no markdown:

{
  "threadId": "<threadId from input>",
  "classification": "must-fix | suggestion | nitpick | question | disagree | noise",
  "valid": true | false,
  "rationale": "One or two sentences explaining the verdict.",
  "proposedAction": "Concrete description of the change to make, or null if no change is needed.",
  "hasSuggestionBlock": true | false,
  "suggestedReplacement": "<extracted replacement text, or null>"
}
````

### Classification guide

| Classification | When to use                                                                            |
| -------------- | -------------------------------------------------------------------------------------- |
| `must-fix`     | Correctness bug, broken behaviour, or a clear API contract violation.                  |
| `suggestion`   | A valid improvement that is not strictly required (readability, style, best practice). |
| `nitpick`      | Trivial stylistic preference with negligible impact.                                   |
| `question`     | The reviewer is asking for clarification, not requesting a change.                     |
| `disagree`     | The comment is factually incorrect or does not apply to this codebase.                 |
| `noise`        | A duplicate, outdated, or otherwise irrelevant comment that slipped through filtering. |

---

## Phase 3 — Plan

Collect all subagent verdicts. Build a numbered action plan grouped by
classification, in this order: `must-fix` → `suggestion` → `nitpick` →
`question` → `disagree` → `noise`.

Present the plan clearly. For each item include:

- **Number** and **classification** label.
- **File and line** (`path:line`).
- **What the reviewer said** (one sentence summary).
- **Proposed action** (what you will do, or why you will do nothing).
- A direct link to the thread (`url`).

Example:

```
## PR #1206 — Action Plan (3 threads)

**1. must-fix** · `.github/workflows/release.yml:83`
The `Log published packages` step can fail the deployment job if `jq` is
missing. Add `continue-on-error: true` to make the step non-blocking.
→ https://github.com/.../pull/1206#discussion_r2949826845

**2. suggestion** · `src/utils/image/responsive-image.tsx:26`
JSDoc claims aspect ratio is always preserved, but `objectFit: fill` does not
preserve it. Update the doc comment to match the actual behaviour.
→ https://github.com/.../pull/1206#discussion_r2916330517

**3. disagree** · `src/core/button/button.tsx:14`
Reviewer flags a missing `aria-label`, but the component already delegates
labelling to its consumer via `ButtonHTMLAttributes`. No change needed.
→ https://github.com/.../pull/1206#discussion_r2916330518

Proceed with all? Or let me know which items to skip or adjust.
```

### Pushing back on `disagree` items

For each `disagree` item, the plan should state the technical reason
concisely — "the component already delegates labelling via X", "this branch
is unreachable because Y", "this conflicts with the architectural decision
in Z". Reference the working code or test that proves the point. Avoid
defensiveness; state the fact and move on.

If a `disagree` conflicts with a prior decision the user made (architectural
direction, deliberate exception, deprecated path being removed), call it out
explicitly in the plan and ask the user to confirm before replying.

**Stop here and wait for user approval before making any changes.**

If any item in the plan is unclear after triage, do **not** proceed with a
partial set. Ask for clarification on the unclear items first — items often
relate, and a partial implementation based on incomplete understanding leads
to rework.

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
6. For `question` items, draft a reply (see Phase 5).

If, while implementing, you discover the original `disagree` was wrong (the
reviewer was right), correct course factually — state what you checked, that
the reviewer was correct, and apply the fix. No long apology or
re-justification of the earlier verdict.

Do not mark any thread resolved until all edits for that thread are complete.

---

## Phase 5 — Resolve

After all edits are applied, reply to and resolve each thread **before
pushing the commits**. Reviewers get a single notification stream; they
should see your reply (and the resolved state) alongside the new commits,
not after a silent force-push that leaves them wondering whether their
feedback was read.

The required order is:

1. Apply all edits locally (Phase 4).
2. Post replies to every thread.
3. Mark every thread resolved.
4. **Then** `git push` (or `gh pr ready`, etc.).

If a push has to happen first for some reason (e.g. CI must run before you
can verify a fix), say so explicitly to the user before pushing — do not
silently reorder these steps.

### Post a reply

Reply to every thread before resolving. A bare resolve is curt and leaves
reviewers without confirmation that you read the comment. Use the REST API
to post a reply to the root comment of each thread. Keep replies brief —
one sentence stating what was done, or why no change was made.

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/comments/{root_comment_id}/replies \
  --method POST \
  --field body="<reply text>"
```

#### Reply tone

Replies must be factual and terse. The diff is the acknowledgement; the reply
just labels what changed.

**Do not write:**

- "You're absolutely right!"
- "Great catch!" / "Great point!" / "Good spot!"
- "Thanks for catching that!" / "Thanks for the feedback!"
- Any expression of gratitude or agreement-as-performance

**Write instead:**

- "Fixed in <file>:<line>." or "Updated to <change>."
- "No change — <one-sentence technical reason>." (for `disagree`)
- A direct answer to the question (for `question` items).

If the reviewer was right and you initially classified as `disagree`, the
reply states the correction factually: "Verified — you're correct, the
branch is reachable via X. Fixed." No long apology.

### Mark a thread resolved

Use the GraphQL mutation to mark each thread resolved:

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
> operations. If a reply is posted successfully but the resolve mutation fails,
> re-running will post a duplicate reply before attempting to resolve again.
> This is harmless — a duplicate reply is a minor cosmetic issue — but worth
> being aware of if you need to re-run after a partial failure.

---

## Tips

- **Re-run the fetch script** after a long execute phase to confirm no new
  threads were added while you were working.
- **Suggestion blocks** use GitHub's ` ```suggestion ` fence. The content
  between the fences is the verbatim replacement for the lines the comment
  spans (`startLine` to `line`). Always verify the replacement still makes
  sense against the current file before applying it.
- **`line: null`** means the comment was left on a file-level diff (typically
  a newly-added file). Read the whole file to understand the context.
- **Thread replies** (comments with `comments[1]`, `comments[2]`, …) are
  conversation history. Read them before triaging — the author may have
  already acknowledged and addressed the comment, which would make it a
  candidate for `noise`.

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
