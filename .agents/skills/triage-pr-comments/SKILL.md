---
compatibility: requires gh CLI (authenticated) and python3 (3.9+)
description: Use when the user wants to understand, survey, or prioritise PR review comments without necessarily fixing them. Trigger phrases include "triage the PR comments", "what are the review comments", "summarise the PR feedback", "show me what needs fixing". Also the fetch-and-classify phase of the full review-pr-comments workflow.
metadata:
  github-path: plugins/personal/personal-kdoherty/skills/triage-pr-comments
  github-ref: refs/heads/main
  github-repo: https://github.com/reapit-global/anz-shared-agentic-development
  github-tree-sha: d61138c0ddfd3e1884c8bf44773a822f8d4b9151
name: triage-pr-comments
permissions:
  - shell
---

# Triage PR Comments

A skill for fetching and classifying GitHub pull request review threads:
fetch → triage → plan.

Stops after presenting the approved action plan and emitting structured JSON
output. To apply fixes and close out threads, continue with the
`resolve-pr-comments` skill or run the full `review-pr-comments` workflow.

## Core principle

Review feedback is a set of suggestions to evaluate, not orders to follow.
Verify against the codebase before accepting. Be especially sceptical of bot
reviewers (Copilot, etc.) — they often miss context, suggest YAGNI features,
or flag intentional patterns as bugs.

## Prerequisites

- `gh` CLI authenticated with read access to the repository.
- `python3` (3.9+) on `PATH`.
- Either run from inside the repository being reviewed, or pass `--owner`
  and `--repo` explicitly.

---

## Scope

This skill covers **inline review threads** only — comments anchored to a
specific line in the diff (GitHub's `reviewThreads` API field). It does not
fetch:

- **Conversation comments** — top-level PR comments posted outside a review
  (GitHub's `issues/{pr}/comments` endpoint).
- **Review summary bodies** — the top-level message an author submits when
  posting a formal review (GitHub's `pulls/{pr}/reviews` endpoint).

These two channels are intentionally excluded. Fetching them would require
additional API calls with their own bot-noise filtering, and in practice
review summaries ("LGTM", "left some comments") rarely contain actionable
items that aren't already represented as inline threads. If a reviewer leaves
important context only in a summary or conversation comment — not as an inline
thread — this skill will not surface it. Check the PR page directly if you
suspect that is the case.

---

## Phase 1 — Fetch

Run `fetch_comments.py` (located in the `scripts/` directory alongside this skill) to retrieve unresolved, non-outdated review threads.

```bash
python3 fetch_comments.py <PR_NUMBER> [options]
```

### Options

| Option               | Values                                   | Description                                                                |
| -------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `--filter`           | `everyone` (default), `humans`, `agents` | Filter threads by reviewer type                                            |
| `--reviewer <login>` | any GitHub login                         | Only threads from this specific reviewer; takes precedence over `--filter` |
| `--owner <owner>`    | GitHub org or user                       | Override the repository owner                                              |
| `--repo <repo>`      | repository name                          | Override the repository name (required with `--owner`)                     |

### Filter modes

- **`everyone`** (default) — all unresolved, non-outdated threads regardless of author.
- **`humans`** — only threads opened by human reviewers (`authorType == "User"`).
- **`agents`** — only threads opened by bot reviewers (`authorType == "Bot"`), such as Copilot.
- **`--reviewer <login>`** — only threads whose root comment was authored by this specific GitHub login; takes precedence over `--filter`.

### Examples

```bash
# All reviewers (default)
python3 fetch_comments.py 1234

# Human reviewers only
python3 fetch_comments.py 1234 --filter humans

# Bot reviewers only (Copilot, etc.)
python3 fetch_comments.py 1234 --filter agents

# Specific reviewer
python3 fetch_comments.py 1234 --reviewer copilot-pull-request-reviewer

# Explicit repo (when not in a git directory)
python3 fetch_comments.py 1234 --owner reapit --repo elements
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
file. In that case the comment applies to the file as a whole; start reading
from the top.

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

1. Load project context before reading the comment:
   - Read `AGENTS.md` in the repository root if it exists; fall back to
     `CLAUDE.md`. Note any rules that apply to the area being commented on.
   - Check whether a skills directory exists and list its contents. Based on
     the file path and comment text, identify any skills that govern this area
     (e.g. component patterns, z-index, barrel exports, tests). Read the
     `SKILL.md` for each relevant skill.
   - Keep these conventions in mind when classifying. A suggestion that
     conflicts with a documented project rule or skill convention should be
     classified as `disagree`, not `suggestion`.

2. Read the file at `path`, centred on the indicated line.

3. Check whether the comment uses a [conventional comment](https://conventionalcomments.org/)
   label (e.g. `**nitpick:**`, `**issue:**`, `**suggestion:**`). If so, use the
   label as a signal for classification:
   - Blocking labels (`issue`, `todo`, `chore`) → lean towards `must-fix`
   - Non-blocking labels (`nitpick`, `thought`, `note`, `praise`) → lean towards `nitpick` or `noise`
   - A `(non-blocking)` decoration on any label (e.g. `**issue (non-blocking):**`) downgrades it — treat as `suggestion` or `nitpick`
   - Labels are a signal, not a verdict — still verify against the codebase.

4. Verify the comment against codebase reality. Check:
   - Does the suggestion apply to THIS codebase, or is the reviewer missing
     context (project conventions, framework specifics, intentional patterns)?
   - Would applying it break existing functionality or callers?
   - Is there a documented or obvious reason for the current implementation
     (compatibility, performance, deprecated path)?
   - YAGNI: if the reviewer asks for "proper" handling of a case, grep the
     codebase to confirm that case actually occurs. If unused, recommend
     removing the code rather than expanding it.

5. If the root comment contains a ```suggestion block, extract the proposed
   replacement. Do not treat the block as authoritative — the file may have
   moved on since the comment was posted.

6. If the thread has follow-up comments, read them — the author may have
   already addressed or rebutted the original point, which makes it `noise`.

7. Return ONLY a JSON object with this exact shape — no prose, no markdown:

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

| Classification | When to use                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `must-fix`     | Correctness bug, broken behaviour, or a clear API contract violation.                                                                 |
| `suggestion`   | A valid improvement that is not strictly required (readability, style, best practice).                                                |
| `nitpick`      | Trivial stylistic preference with negligible impact.                                                                                  |
| `question`     | The reviewer is asking for clarification, not requesting a change.                                                                    |
| `disagree`     | The comment is factually incorrect, does not apply to this codebase, or conflicts with a documented project rule or skill convention. |
| `noise`        | A duplicate, outdated, or otherwise irrelevant comment that slipped through filtering.                                                |

Many reviewers in this org use [conventional comments](https://conventionalcomments.org/) labels.
Approximate mappings: `issue`/`todo`/`chore` → `must-fix`; `suggestion` → `suggestion`; `nitpick`/`thought` → `nitpick`; `question` → `question`; `praise`/`note` → `noise`. A `(non-blocking)` decoration on any label downgrades it to at most `suggestion`.

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

For each `disagree` item, state the technical reason concisely —
"the component already delegates labelling via X", "this branch is unreachable
because Y", "this conflicts with the project rule in AGENTS.md that says Z".
Reference the working code, test, or documented convention that proves the
point. Avoid defensiveness; state the fact and move on.

If a `disagree` conflicts with a prior decision the user made, call it out
explicitly and ask the user to confirm before replying.

**Stop here and wait for user approval before making any changes.**

If any item in the plan is unclear after triage, do **not** proceed with a
partial set. Ask for clarification on the unclear items first.

---

## Output

After the user approves the plan, emit the approved verdicts as a JSON array.
Each object combines the subagent verdict with thread metadata from Phase 1:

```json
[
  {
    "threadId": "PRRT_...",
    "rootCommentId": 1234567,
    "path": "src/core/button/button.tsx",
    "line": 42,
    "url": "https://github.com/...",
    "classification": "must-fix",
    "proposedAction": "Add continue-on-error: true to the step.",
    "hasSuggestionBlock": false,
    "suggestedReplacement": null,
    "approved": true
  }
]
```

Include all approved items — including `disagree` and `noise` items approved
for no-action (`approved: true`). Omit items the user explicitly excluded.
`rootCommentId` is the `id` of `comments[0]` from the Phase 1 thread data.

---

## Tips

- **Thread replies** (`comments[1]`, `comments[2]`, …) are conversation history.
  Read them before triaging — the author may have already addressed the comment,
  which makes it a candidate for `noise`.
- **`line: null`** means the comment was left on a file-level diff (typically a
  newly-added file). Read the whole file to understand the context.
- **Suggestion blocks** use GitHub's ` ```suggestion ` fence. Do not treat the
  block as authoritative — verify the replacement against the current file before
  accepting it.
