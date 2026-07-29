# sticky-comment

Composite action that creates or updates a single marker-tagged comment on an
issue or pull request, instead of posting a new comment on every workflow run.

Extracted from the pattern already used inline by `test-pr.yml`'s
deploy-preview job and `cleanup-preview.yml` (both find a comment by a hidden
`<!-- marker -->` prefix and `PATCH` it in place).

## Usage

```yaml
- uses: ./actions/sticky-comment
  with:
    marker: my-tool:comment
    body: |
      ### Some status
      Details here.
    issue-number: ${{ github.event.pull_request.number }}
    append-counter: "true" # optional — appends "Updated #N time(s)."
```

## Inputs

| Input            | Default             | Description                                                                                                                                                |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `marker`         | _(required)_        | Identifier for this comment. Pass only the inner text — `<!-- ` and ` -->` are added automatically. Passing the full HTML comment syntax is also accepted. |
| `body`           | _(required)_        | Comment body (markdown).                                                                                                                                   |
| `issue-number`   | _(required)_        | Issue or pull request number to comment on.                                                                                                                |
| `repo`           | `github.repository` | `owner/repo` to comment on.                                                                                                                                |
| `mode`           | `upsert`            | `upsert` creates the comment if absent, otherwise updates it. `update-only` updates an existing comment and silently no-ops if none is found.              |
| `append-counter` | `false`             | When `true`, appends `Updated #N time(s).` — `N` is read back from the previous comment's footer, not tracked externally.                                  |
| `github-token`   | `github.token`      | Token with permission to read/write issue comments.                                                                                                        |

## Outputs

| Output        | Description                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `comment-id`  | Id of the created or updated comment. Empty when `mode` is `update-only` and no comment was found.       |
| `comment-url` | HTML URL of the created or updated comment. Empty when `mode` is `update-only` and no comment was found. |

## How it works

The marker is normalised to an HTML comment of the form `<!-- <marker> -->`. Any
`<!-- `/ ` -->` affixes already present in the input are stripped before
re-applying, so both `storybook-preview` and `<!-- storybook-preview -->` produce
the same normalised marker.

Each run lists the issue's comments and finds the first whose body starts with
the normalised marker (matched literally via `jq`'s `startswith`, passed as a
`--arg` rather than interpolated into the filter — avoids quoting and escaping
surprises). If found, it is updated in place via `PATCH`.

When `mode` is `upsert` (the default) and no existing comment is found, a new
comment is created via `POST`. When `mode` is `update-only`, the action
silently no-ops instead — useful for cleanup workflows where posting a new
comment when none exists would be misleading.

Different callers can use different markers on the same issue without colliding.
