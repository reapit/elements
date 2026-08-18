---
description: Migrates deprecated Input and InputGroup components to modern TextControl, DateTimeControl, TextareaControl, Checkbox, and RadioGroupControl components
---

# Migrate Deprecated Input Components

This guide covers migrating from the deprecated `Input`, `InputGroup`, `InputAddOn`, `InputError`, and `ElInputGroupLabel` components to their modern replacements in Reapit Elements v5.

Unlike other codemods in this directory, this migration has **no automated AST transform**. The variety of usage patterns and structural differences between the old and new APIs make agent-assisted migration more reliable than a mechanical codemod.

## Quick start

1. **Read** `MIGRATION_GUIDE.md` in this directory (included in the v5 migration docs in Storybook).
2. **Give the guide to an AI coding agent** with this prompt.
3. **Review all changes** before accepting them.

## Suggested prompt for AI agents

Paste this into your AI coding agent along with the contents of `MIGRATION_GUIDE.md`:

> Using the migration guide I have shared, migrate all deprecated `Input` and `InputGroup` usage in `src/` to the modern Reapit Elements v5 components. Follow the decision tree to choose the correct target component for each case. Preserve existing behaviour and props as closely as possible, and leave a `// TODO:` comment for any case that cannot be handled with confidence.

Adjust `src/` to the scope you want to migrate (e.g. `src/forms/`, specific file paths, etc.).

## What's in the migration guide

The `MIGRATION_GUIDE.md` file includes:

- **Decision tree** — How to classify each deprecated usage
- **Migration rules** — Step-by-step transformations for each component type
- **Prop mapping tables** — How deprecated props map to modern equivalents
- **Before/after examples** — 11 real-world migration examples
- **Edge cases** — Handling dynamic types, styled components, facade packages, and more
- **Facade package support** — Guidance for monorepos with internal facade layers

## Manual reference

You can also follow the guide manually by reviewing the tables, examples, and rules directly.

## Facade package support

If your project imports Elements through an internal facade package, the rule is: **rename identifiers, but preserve import paths pointing to the facade package**.

```tsx
// Before
import { InputGroup } from "@company/ui";

// After — identifier renamed, import path unchanged
import { TextControl } from "@company/ui";
```

The facade package itself must also be updated to re-export the new component names from Elements. That's a separate task — complete it before or immediately after migrating consumer code so imports resolve correctly.

## Questions?

See `MIGRATION_GUIDE.md` for detailed coverage of all patterns, edge cases, and limitations.
