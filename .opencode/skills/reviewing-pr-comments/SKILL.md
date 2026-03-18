---
name: reviewing-pr-comments
description: >
  Work through unresolved GitHub pull request review comments end-to-end:
  fetch threads, triage each one with full file context, present an action
  plan for user approval, apply the approved changes, and optionally resolve
  each thread. Use this skill whenever a user asks you to address, fix, work
  through, or respond to PR review comments or reviewer feedback — even if
  they just say "fix the Copilot comments" or "sort out the review".
---

# Reviewing PR Comments

A skill for resolving GitHub pull request review comments end-to-end:
fetch → triage → approve → execute → resolve.

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
bash .opencode/skills/reviewing-pr-comments/scripts/fetch-comments.sh <PR_NUMBER>
```

The script accepts optional `owner` and `repo` arguments when the git remote
cannot be inferred:

```bash
bash .opencode/skills/reviewing-pr-comments/scripts/fetch-comments.sh <PR_NUMBER> <owner> <repo>
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
2. Assess whether the comment is valid given the actual code.
3. If the root comment contains a ```suggestion block, extract the proposed
   replacement.
4. Return ONLY a JSON object with this exact shape — no prose, no markdown:

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

**Stop here and wait for user approval before making any changes.**

---

## Phase 4 — Execute

Work through each approved item in order. For each:

1. **Re-read the file** at `path` (the file may have changed since triage).
2. **Apply the change** using the `Edit` tool.
   - If the thread contains a ` ```suggestion ` block, use that as the
     proposed replacement. Adapt it — do not apply it blindly if the file has
     changed since the comment was posted.
   - If there is no suggestion block, implement the change described in
     `proposedAction`.
3. **Invoke relevant project skills** as appropriate:
   - Changes to component props or types → load `component-interface-pattern`.
   - New or updated tests → load `writing-unit-tests`.
   - Prose changes (doc comments, JSDoc, error messages) → apply
     `writing-clear-prose` (British English, active voice, no needless words).
   - React context changes → load `react-context-pattern`.
4. For `disagree` or `noise` items approved for no-action, skip the edit step.
5. For `question` items, draft a reply (see Phase 5).

Do not mark any thread resolved until all edits for that thread are complete.

---

## Phase 5 — Resolve

After all edits are applied, resolve each thread and optionally post a reply.

### Post a reply (optional but recommended)

Use the REST API to post a reply to the root comment of each resolved thread.
Keep replies brief — one sentence stating what was done, or why no change was
made.

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/comments/{root_comment_id}/replies \
  --method POST \
  --field body="<reply text>"
```

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
