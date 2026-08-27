# Reapit Design System

Monorepo for Reapit's Design System. Managed with [Yarn workspaces](https://yarnpkg.com/features/workspaces).

## Workspaces

| Workspace                                    | Package                  | Description                                                       |
| -------------------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| [`packages/elements`](./packages/elements)   | `@reapit/elements`       | The published React component library, its Storybook and codemods |
| [`packages/doc-evals`](./packages/doc-evals) | `@reapit/elements-evals` | Documentation quality evals (private)                             |
| [`packages/gaffer`](./packages/gaffer)       | `@reapit/gaffer`         | PR classification and merge gating (private)                      |

Repo-wide tooling (changesets, linting, formatting and git hooks) is configured at the root. Everything specific to a workspace lives inside it.

Common tasks run from the root and fan out across workspaces:

```bash
yarn install
yarn start        # starts the Storybook dev server for @reapit/elements
yarn check        # type-checking and linting
yarn test:ci      # unit tests
yarn build:lib    # builds the library
```

## Claude Code Plugin Marketplace

This repo hosts a [Claude Code plugin marketplace](.claude-plugin/marketplace.json) for the Design System: currently the `elements` plugin, giving consumer teams skills for working with Elements from their own codebases (Design System MCP server guidance, tokens, z-index conventions, and codemods). See [plugins/elements](plugins/elements).

## Documentation

Components and utilities are documented via Storybook and can be accessed via the following links:

- [Latest documentation](https://elements.reapit.com.au).
- [Canary documentation](https://canary.elements.reapit.com.au).
- [v4 documentation](https://v4.elements.reapit.com.au) (v4 is considered end-of-life).

## For Contributors & AI Agents

- **[CLAUDE.md](./CLAUDE.md)** - Essential guide for AI agents working on this project
- **[guidelines/\*](./guidelines)** - Guidelines concerning code style, patterns, and best practices
- **[.changeset/README.md](./.changeset/README.md)** - How to document your changes using changesets

### Contributing Changes

When making changes to Elements, please add a changeset to describe your changes:

```bash
yarn changeset
```

This ensures your changes are documented in the changelog and helps determine the next version number. See [.changeset/README.md](./.changeset/README.md) for detailed instructions.
