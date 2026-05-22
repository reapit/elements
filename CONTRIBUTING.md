# Contributing

## Getting started

This project uses [Corepack](https://nodejs.org/api/corepack.html) to manage
Yarn automatically.

```bash
corepack enable
yarn install
yarn start        # starts the Storybook dev server
```

## Branching

Branch from `main` for all new work. Target `lts` only when backporting a fix
to the previous major version.

Branch names follow the pattern:

```
<type>/<DS-123>-<short-description>
<type>/<short-description>
```

Include a ticket reference when one exists. Use lowercase kebab-case for the
description.

### Allowed types

`feat` · `fix` · `chore` · `ci` · `docs` · `refactor` · `revert`

The branch type should match the PR title type where possible. The nature of
work sometimes changes after a branch is created — the PR title is what CI
validates, so ensure that is correct.

## Commits

We squash-merge pull requests, so the PR title becomes the canonical commit on
`main`. Keep individual commits however you find useful; there is no enforced
format for them.

## Pull requests

- PR titles must follow conventional commit format (`type: description`),
  validated by a CI check on the pull request.
- Include screenshots or video for any visual changes.
- Add a changeset for user-facing changes (`yarn changeset`). For non-user-facing
  changes that touch non-dot-path files, add an empty changeset
  (`yarn changeset --empty`).
  A pre-push hook enforces this. See [`.changeset/README.md`](.changeset/README.md)
  for details.

## Code style

Linting (`oxlint`) and formatting (`oxfmt`) run automatically on commit via git
hooks and on CI. Use British English for all prose — documentation, comments,
error messages, and UI text.
