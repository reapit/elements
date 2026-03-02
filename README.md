# Reapit Elements

A React implementation of Reapit's Design System for cross-platform web applications. Distributed via NPM [here](https://www.npmjs.com/package/@reapit/elements).

![lines](/coverage/badges/badge-lines.svg) ![functions](/coverage/badges/badge-functions.svg) ![branches](/coverage/badges/badge-branches.svg) ![statements](/coverage/badges/badge-statements.svg)

[![Test PR](https://github.com/reapit/elements/actions/workflows/test-pr.yml/badge.svg)](https://github.com/reapit/elements/actions/workflows/test-pr.yml)
[![Release](https://github.com/reapit/elements/actions/workflows/release.yml/badge.svg)](https://github.com/reapit/elements/actions/workflows/release.yml)
[![Deploy Storybook (Dev)](https://github.com/reapit/elements/actions/workflows/deploy-storybook-dev.yml/badge.svg)](https://github.com/reapit/elements/actions/workflows/deploy-storybook-dev.yml)
[![Visual Regression Tests](https://github.com/reapit/elements/actions/workflows/playwright.yml/badge.svg)](https://github.com/reapit/elements/actions/workflows/playwright.yml)

## Documentation

Components and utilities are documented via Storybook and can be accessed via the following links:

- [v4 documentation](https://elements.prod.paas.reapit.cloud); v4 is considered end-of-life.
- [v5 documentation](https://elements-beta.prod.paas.reapit.cloud).

## For Contributors & AI Agents

- **[AGENTS.md](./AGENTS.md)** - Essential guide for AI agents working on this project
- **[guidelines/\*](./guidelines)** - Guidelines concerning code style, patterns, and best practices
- **[.changeset/README.md](./.changeset/README.md)** - How to document your changes using changesets

### Contributing Changes

When making changes to Elements, please add a changeset to describe your changes:

```bash
yarn changeset
```

This ensures your changes are documented in the changelog and helps determine the next version number. See [.changeset/README.md](./.changeset/README.md) for detailed instructions.
