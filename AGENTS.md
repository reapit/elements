# AGENTS.md

**Package Manager**: Yarn

## Core Directories

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

- Write components in TypeScript with proper type definitions
- Follow existing naming conventions and file structure
- Include Storybook stories
- Use design tokens for consistent styling
- Ensure accessibility compliance
- **All components MUST follow the namespace interface pattern** (use `component-interface-pattern` skill)
- **React contexts MUST follow the context pattern** (use `react-context-pattern` skill)
- **Tests MUST follow testing guidelines** (use `writing-unit-tests` skill)
- **All prose MUST use British English and follow clarity principles** (use `writing-clear-prose` skill)
- **Codemods for breaking changes MUST follow the codemod workflow** (use `creating-codemods` skill)
- **When addressing PR review comments, use the end-to-end review workflow** (use `reviewing-pr-comments` skill)
- **Changesets MUST follow the changeset conventions** (use `writing-changesets` skill)
- **PR titles and descriptions MUST follow the pull request conventions** (use `writing-pull-requests` skill)
