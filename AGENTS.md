# AGENTS.md

**Package Manager**: Yarn

## Branching

- Branch from `main`
- Branch name format: `<type>/<DS-123>-<short-description>` or `<type>/<short-description>`
- Allowed types: `feat` · `fix` · `chore` · `ci` · `docs` · `refactor` · `revert`

## Workspaces

This is a Yarn workspaces monorepo. Run yarn scripts from the repo root — `check`, `test:ci`,
`build:lib` and `build:docs` fan out across every workspace that defines them.

- `packages/elements/` - `@reapit/elements`, the published library, its Storybook and codemods
- `packages/doc-evals/` - `@reapit/elements-evals`, documentation quality evals (private)
- `packages/gaffer/` - `@reapit/gaffer`, PR classification and merge gating (private)

Repo-wide tooling lives at the root: changesets, oxlint, oxfmt, lint-staged and git hooks.
Everything specific to a workspace lives inside it.

## Core Directories

All paths below, and in `guidelines/` and the skills, are relative to `packages/elements/`.

- `src/core/` - Main UI components (buttons, inputs, dialogs, etc.)
- `src/icons/` - Generated SVG icon components
- `src/tokens/` - Generated design tokens and CSS variables
- `src/utils/` - Utility functions and helpers
- `src/deprecated/` - Legacy components (avoid modifying)
- `src/lab/` - Experimental components

## Lab Components (`src/lab/`)

**Experimental components with unstable APIs. We may change or remove these components without notice.**

**BEFORE implementing any lab component, you MUST:**

1. Read `src/lab/README.md` for current requirements
2. Confirm with the user that all approval and contribution guidelines are met

## Contributing Guidelines

- Write components in TypeScript with explicit type definitions
- Follow existing naming conventions and file structure
- Include Storybook stories
- Use design tokens for consistent styling
- Make components accessible
- Top-level barrel files MUST follow the barrel export conventions
- All components MUST follow the namespace interface pattern
- React contexts MUST follow the context pattern
- Components with `z-index` MUST follow the z-index layering conventions
- All component styles MUST use the cascade layering pattern
- Tests MUST follow testing guidelines
- Stories MUST follow Storybook documentation guidelines
- All prose MUST use British English and follow clarity principles
- Codemods for breaking changes MUST follow the codemod workflow
- When addressing PR review comments, use the end-to-end review workflow
- Changesets MUST follow the changeset conventions
- PR titles and descriptions MUST follow the pull request conventions
- PRs with UI changes MUST include screenshots or video
- When workflow architecture changes, update `.github/CI.md` (new jobs, composite actions, job dependencies, or deployment strategy)
- `.gitignore` patterns containing a slash MUST declare their anchoring: `**/` for any depth, leading `/` for the repo root only

## Code Quality

- Linting (`oxlint`) and formatting (`oxfmt`) run automatically on commit via git hooks and CI
