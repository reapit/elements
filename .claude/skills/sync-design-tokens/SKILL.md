---
name: sync-design-tokens
description: Sync design tokens from the Elements Figma file into this repo. Use when a designer has published variable or effect style changes in Figma, when the committed theme CSS has drifted from the token JSON, or when a token rename or removal needs a deprecation path and a codemod. Covers the Figma MCP export, classifying the diff, the migration work each class of change needs, and the changeset.
---

# Sync Design Tokens

Design tokens live in Figma variables and reach this repo as four DTCG files in
`packages/elements/src/tokens/`, from which `generate:tokens` builds the theme CSS
in `src/tokens/dist/`. That CSS is a published surface: consumers write
`var(--colour-fill-action-dark)` against it, so a token that leaves it breaks them.

Token data can only leave Figma from an editor session. There is no REST read on our
plan, so this sync runs from a machine with the Figma desktop app open on the Elements
file and an editor seat on it. Confirm both before starting; every step below depends on step 1.

## Step 1 — Export from Figma

The four token files total ~240KB and a `use_figma` response is capped at 20KB, so the
export cannot come back in one call. Both Semantics files are 110KB each, so **splitting
the transfer per file does not work either**: do not improvise that. The exporter
chunks the transfer instead, and the loop below is the whole protocol.

The Figma MCP server requires the `figma-use` skill before any `use_figma` call. Invoke
it first. [`scripts/export-figma-tokens.js`](scripts/export-figma-tokens.js) is the code
payload for every call below; it is read-only and writes nothing back to the file. Each
call needs its `REQUEST` line edited to say what to return.

### 1a — Fetch the manifest

Run the exporter with `REQUEST = { file: null }`. It returns no file content, so it
always fits. Expect a `manifest` with exactly these four keys, each carrying `bytes`,
`digest` and `chunks`, plus a `suspicious` array (often empty):

- `Semantics.Reapit.tokens.json`
- `Semantics.PayProp.tokens.json`
- `Primitives.Value.tokens.json`
- `effect.styles.tokens.json`

Any other key count means the collection allowlist no longer matches the Figma file: stop and read [reference.md](reference.md#editing-the-exporter) rather than committing
the result.

### 1b — Skip the files that have not changed

```sh
node .claude/skills/sync-design-tokens/scripts/token-digest.js
```

It prints `file`, `bytes` and `digest` for the committed files, computed the same way
the manifest computes them. **A file whose pair matches the manifest is unchanged in
Figma: do not transfer it.** Most syncs touch one theme, so this is usually what keeps
the call count down.

This comparison only holds because the exporter's key sorting mirrors `preprocess.js`,
so the bytes it emits are the bytes step 2 leaves on disk. If every file reads as changed
on a sync where Figma barely moved, suspect that mirroring rather than the designer.

### 1c — Transfer each changed file

For a file the manifest says has `chunks: N`, fetch chunks `0` to `N - 1` by running the
exporter with `REQUEST = { file: "<name>", chunk: <i> }`. These calls are independent, so
issue them in parallel: one message containing N `use_figma` blocks. Expect around 13
chunks for a Semantics file, 2 for Primitives and 1 for the effect styles.

Once every chunk for a file is in hand, write them **in chunk order**:

```sh
: > packages/elements/src/tokens/<name>                      # truncate first
printf %s '<b64 of chunk 0>' | base64 -d >> packages/elements/src/tokens/<name>
printf %s '<b64 of chunk 1>' | base64 -d >> packages/elements/src/tokens/<name>
```

Truncating first is what makes a retry safe; appending to a partial file from an earlier
attempt silently doubles it.

### 1d — Verify before rebuilding

Re-run `token-digest.js`. Every transferred file's `bytes` and `digest` must now equal
the manifest's. A mismatch means a chunk was dropped, duplicated or written out of
order: retry that file from `: >` rather than editing the JSON by hand.

**Done when** every file either matched at 1b or verifies at 1d.

## Step 2 — Rebuild

From the repo root:

```sh
yarn generate:tokens
```

The preprocess half re-sorts the JSON in place and the build half regenerates
`src/tokens/dist/*.css`. Running it is what guarantees the committed CSS matches the
committed JSON, which CI checks independently.

**Done when** the command exits 0.

## Step 3 — Classify the diff

```sh
node --experimental-strip-types \
  .claude/skills/sync-design-tokens/scripts/classify-token-diff.ts
```

It reports, for the JSON source and the generated CSS separately, which tokens were
added, changed, renamed and removed; where every departing CSS property is still
referenced; a suggested `bump`; and any suspicious names.

Two things in that output need judgement rather than acceptance:

- **Renames are inferred, not reported.** Figma turns a renamed variable into one gone
  and one arrived, so the script pairs a removal with an addition of identical value.
  A token deleted alongside an unrelated one added at the same value pairs falsely.
  Check each candidate against what actually changed in Figma.
- **`usage.interpolated: true` means the literal property was never found** and a
  shorter stem matched instead. Component styles build property names by
  interpolation, so the hit is a lead, not a confirmed reference: open the line and
  check whether the departing token is among the values that stem can take.

**Done when** every entry in `css.renamed` is either confirmed as a rename or moved to
`css.added` plus `css.removed` in your own accounting, and every `usage` entry with a
non-empty `hits` array has been read.

## Step 4 — Act on the classification

Take the branch matching the most severe class present, and read
[Deprecating a token](#deprecating-a-token) before writing any shim.

- **Nothing in the diff**: stop, there is nothing to commit.
- **Changed values only**: `patch`. Changeset naming the tokens whose values moved.
- **Added tokens**: `minor`. Changeset naming the new tokens.
- **Renamed or removed tokens**: `minor`, and all three of a deprecation shim, a
  codemod, and a changeset. Without the shim this is a `major`.

A rename or removal is a `minor` _because_ the shim keeps consumer CSS resolving and
the codemod moves consumer code across. Ship it without them and you have removed a
published custom property, which is a breaking change and must be labelled one.

The codemod migrates two surfaces, and the second is the one that gets missed:

- **CSS usage** — `var(--old)` in consumer stylesheets and styled templates.
- **The JS/React surface** — props typed against token names, which fail at build time
  in consumer code with no runtime signal. Find them with:

  ```sh
  grep -rnE -- '`--[a-z-]+\$\{string\}`' packages/elements/src
  ```

  Each match is a prop whose accepted values narrow to a token family. If a departing
  token belongs to one, the codemod has to rewrite the prop value too.

Follow `creating-codemods` for the codemod and `writing-changesets` for the changeset.
Neither is restated here.

**Done when** `yarn check` and `yarn test:unit` pass, every `usage` hit from step 3 either
points at a shimmed property or has been rewritten, and each removed token appears in
either the shim or the codemod.

## Step 5 — Raise the PR

Follow `writing-pull-requests`. Two additions specific to a token sync:

- **Put the classification in the description**: added, changed, renamed and removed
  tokens, named. This is the reviewer's only view of what moved; the diff itself is
  thousands of generated lines.
- **Any changed value is a UI change**, so the screenshot rule in `CLAUDE.md` applies.
  Follow `capturing-visual-changes`.

Surface the `suspicious` names from step 3 in the description rather than resolving
them yourself: see [Data hygiene](#data-hygiene). Do not let them block the PR.

## Deprecating a token

`src/tokens/dist/*.css` is generated, so a departing property cannot be kept there.
Hand-declare it in `packages/elements/src/styles/globals.css` instead, with a comment
naming the release it can be dropped in.

For a **rename**, alias the old name to the new one. `var()` resolves at the use site,
so one declaration covers both themes:

```css
:root {
  /** Deprecated: renamed in 5.4. Drop in 6.0. */
  --colour-fill-action-dark: var(--colour-fill-primary-dark);
}
```

For a **removal** there is no replacement to alias, so the last known value has to be
frozen. Check both theme files before writing one declaration: where the value differs
per theme it needs one declaration per theme selector, matching the selectors
`build.ts` generates.

```css
:root,
:root[data-theme="reapit"] {
  /** Deprecated: removed from Figma in 5.4. Drop in 6.0. */
  --colour-fill-action-dark: #4e56ea;
}

:root[data-theme="payprop"] {
  --colour-fill-action-dark: #0294d2;
}
```

Read the frozen values out of the pre-sync CSS, not out of Figma: `git show
HEAD:packages/elements/src/tokens/dist/reapit.css`.

## Data hygiene

A Figma name ending in a space and a digit, such as `comp/navigation/colour/border/top_bar 2`,
is the usual artefact of duplicating a variable. The exporter's name mapping turns
spaces into underscores, so a duplicate would otherwise land silently as a real token.
Both the exporter and the classifier flag these instead.

They are a question for whoever owns the Figma file, not something to fix in this repo:
deleting the token here just means the next sync reintroduces it.

## Reference

See [reference.md](reference.md) for the parts of the Figma-to-DTCG mapping that are not
mechanical, the collection allowlist, and why the transfer is chunked rather than written
straight to disk. Needed only when changing the tooling, not when running a sync.
