# AGENTS.md

## Project Overview

**Reapit Elements** is a TypeScript-based React UI component library for building web applications using the Reapit Design System. The library provides a comprehensive set of reusable components with cross-platform support and is distributed via NPM.

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
yarn lint            # Lint TypeScript and CSS
yarn generate:icons  # Generate SVG icon components
yarn generate:tokens # Generate CSS variables
```

## Component Architecture
- Each component has its own directory with `index.ts`, component file, and tests
- Uses CSS-in-JS with Linaria for styling
- Follows atomic design principles
- Includes comprehensive TypeScript types
- Exports both individual components and bundled library

## Important Notes
- Node.js >= 22.18.0 required
- Components use design tokens from `src/tokens/`
- Visual regression tests ensure UI consistency
- Library supports both ESM and CJS exports

## Lab Components (`src/lab/`)
**Experimental components with special naming requirements:**

- Components have unstable APIs and are subject to change or removal. They may not be fit-for-purpose in all use cases.
- **Styled components MUST use `ElExperimental` prefix** (e.g., `const ElExperimentalButton = styled.button`...)
- **CSS class names MUST use `elExperimental` prefix** (e.g., `const elExperimentalButton = css`...)
- These prefixes prevent naming conflicts with existing components in `src/core`, `src/deprecated`, and `src/utils`
- See `src/lab/README.md` for detailed guidelines and examples

## Contributing Guidelines
- Components should be TypeScript with proper type definitions
- Follow existing naming conventions and file structure
- Include unit tests and Storybook stories
- Use design tokens for consistent styling
- Ensure accessibility compliance
- **All components MUST follow the namespace interface pattern (see guidelines/interface-pattern.md)**
- **React contexts MUST follow the context pattern (see guidelines/context-pattern.md)**
