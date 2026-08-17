# Reapit Elements

A React implementation of Reapit's Design System for cross-platform web applications. Distributed via NPM [here](https://www.npmjs.com/package/@reapit/elements).

![lines](/coverage/badges/badge-lines.svg) ![functions](/coverage/badges/badge-functions.svg) ![branches](/coverage/badges/badge-branches.svg) ![statements](/coverage/badges/badge-statements.svg)

## Claude Code Plugin Marketplace

This repo hosts a [Claude Code plugin marketplace](.claude-plugin/marketplace.json) for the Design System — currently the `elements` plugin, giving consumer teams skills for working with Elements from their own codebases (Design System MCP server guidance, tokens, z-index conventions, and codemods). See [plugins/elements](plugins/elements).

## Documentation

Components and utilities are documented via Storybook and can be accessed via the following links:

- [Latest documentation](https://elements.reapit.com.au).
- [Canary documentation](https://canary.elements.reapit.com.au).
- [v4 documentation](https://v4.elements.reapit.com.au) (v4 is considered end-of-life).

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
