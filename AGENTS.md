# AGENTS.md

## Project Overview

**Reapit Elements** is a TypeScript-based React UI component library for the Reapit Design System. It provides reusable, cross-platform components distributed via NPM.

## Project Structure
- **Language**: TypeScript with React
- **Build Tool**: Vite
- **Package Manager**: Yarn
- **Testing**: Vitest + Playwright for visual regression
- **Styling**: Linaria (compile-time CSS-in-JS)
- **Documentation**: Storybook

## Core Directories
- `src/core/` - Main UI components (buttons, inputs, dialogs, etc.)
- `src/icons/` - Generated SVG icon components
- `src/tokens/` - Generated design tokens and CSS variables
- `src/utils/` - Utility functions and helpers
- `src/deprecated/` - Legacy components (avoid modifying)
- `src/lab/` - Experimental components

## Development Commands
```bash
yarn start           # Start Storybook dev server
yarn build           # Build library and Storybook
yarn test            # Run unit tests
yarn visual-test     # Run Playwright visual tests
yarn check           # Check TS types
yarn lint            # Lint JS & CSS
yarn generate:icons  # Generate SVG icon components
yarn generate:tokens # Generate CSS variables
```

## Component Architecture
- Each component occupies its own directory containing `index.ts`, component file, and tests
- Styled with Linaria (CSS-in-JS)
- Built on atomic design principles
- Typed with TypeScript
- Exported as individual components and bundled library

## Requirements and Features
- Requires Node.js >= 22.18.0
- Components use design tokens from `src/tokens/`
- Visual regression tests ensure UI consistency
- Supports ESM and CJS exports

## Lab Components (`src/lab/`)
**Experimental components with unstable APIs. We may change or remove these components without notice.**

**BEFORE implementing any lab component, you MUST:**
1. Read `src/lab/README.md` for current requirements
2. Confirm with the user that all approval and contribution guidelines are met

## Contributing Guidelines
- Follow guidelines/writing-clarity.md when writing documentation, error messages, or comments
- Write components in TypeScript with proper type definitions
- Follow existing naming conventions and file structure
- Include unit tests following guidelines/unit-tests.md
- Include Storybook stories
- Use design tokens for consistent styling
- Ensure accessibility compliance
- **All components MUST follow the namespace interface pattern (see guidelines/interface-pattern.md)**
- **React contexts MUST follow the context pattern (see guidelines/context-pattern.md)**