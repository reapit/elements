---
name: writing-storybook-docs
description: Write Storybook story files for Reapit Elements components and utilities. Use when creating stories for a new component, adding stories to an existing component, updating stories after an API change, or reviewing story code in a PR.
---

# Writing Storybook Docs

This project uses [Storybook](https://storybook.js.org/) with the `@storybook/react-vite` framework. Stories serve as live component demos and the primary documentation surface. The project enables Autodocs globally, so every story file automatically generates a documentation page.

## When to Use This Skill

Invoke this skill when:

- Writing stories for a new component or utility
- Adding stories for an existing component's new props or behaviour
- Updating stories after a prop rename or API change
- Reviewing a PR that introduces or modifies story files

## Environment

| Setting         | Value                                                                                   |
| --------------- | --------------------------------------------------------------------------------------- |
| Framework       | `@storybook/react-vite`                                                                 |
| Autodocs        | Globally enabled in `preview.tsx`; do **not** add `tags: ['autodocs']` to story files   |
| Prop extraction | `react-docgen-typescript` (supports namespace interface props)                          |
| Story format    | CSF Next (`preview.meta()` + `meta.story()` + `.extend()`)                              |
| Theme wrapper   | Global `ThemeProvider` decorator in `preview.tsx`; all stories receive it automatically |

## File Organisation

Place story files alongside the component file they document:

```
src/core/button/
  button.tsx
  button.stories.tsx     ✅ Correct
```

For components that need reusable story helpers, create a `__story__/` subdirectory (see
[reference.md](reference.md#reusable-decorators)).

CSF Next infers all types through the factory function chain. Do **not** declare `type Story`
aliases or import `Meta`/`StoryObj` types.

## Meta Definition

Use `preview.meta({ ... })` to define component metadata, imported via the `#.storybook/preview`
subpath import. Types are inferred automatically: no annotations or `satisfies` needed.

```tsx
// ✅ Correct
import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Core/Button",
  component: Button,
});

// ❌ Wrong: old CSF 3 pattern
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  title: "Core/Button",
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;
```

**Title convention:** `'Section/ComponentName'`, PascalCase for the component name. Common
sections: `Core/`, `Utils/`, `Icons/`, `Lab/`, `Deprecated/`.

**Subcomponent stories** (e.g. `Dialog.Body`, `Table.HeaderCell`): reference the `component` field
and any JSX through the parent namespace, not a direct import from the subcomponent's own file;
this keeps the story aligned with the public API. This applies only when the parent actually
exports the subcomponent as a namespace property.

```tsx
// ✅ Correct
import { Dialog } from "../dialog";
const meta = preview.meta({ title: "Core/Dialog/Body", component: Dialog.Body });

// ❌ Wrong: direct import from the subcomponent file
import { DialogBody } from "./body";
const meta = preview.meta({ title: "Core/Dialog/Body", component: DialogBody });
```

Companion components sharing the same doc page go in `subcomponents: { AnchorButton }` so their
prop tables appear in the Controls panel. Use `argTypes` for props that need special Controls
handling (icon pickers, enum selects, complex-type summaries); see
[reference.md](reference.md#argtypes).

## The Example Story

Every story file must export an `Example` story as its first named export, created via
`meta.story()`. It's the primary interactive playground in the Controls panel.

**Checklist:**

- [ ] Named `Example`, first named export in the file
- [ ] Created with `meta.story({ ... })`
- [ ] Covers all props users are likely to tweak in the Controls panel
- [ ] Uses the default/non-edge-case state

```tsx
// ✅ Correct
export const Example = meta.story({
  args: {
    "aria-label": "My input",
    disabled: false,
    placeholder: "",
    size: "medium",
    type: "text",
  },
});
```

Additional stories build on `Example` with `.extend()`, need a JSDoc description, and sometimes
need `render` functions, decorators, or controlled-state hooks (`useArgs`/`useState`); see
[reference.md](reference.md) for the full patterns, plus the list of common mistakes to catch in
review.

## Quick Checklist

Before committing a story file:

- [ ] File named `<component>.stories.tsx`, co-located with the component
- [ ] `import preview from '#.storybook/preview'` (subpath import, no type imports needed)
- [ ] `const meta = preview.meta({ ... })` (no `satisfies`, no `export default`)
- [ ] `export const Example = meta.story({ ... })` as the first named export
- [ ] Additional stories use `Example.extend({ ... })` or `meta.story({ ... })`
- [ ] No `tags: ['autodocs']` in meta
- [ ] No `type Story` alias, no `StoryObj` or `Meta` imports
- [ ] Subcomponent stories reference `component` via the parent namespace (e.g. `Dialog.Body`, not `DialogBody`)
- [ ] Every story except `Example` has a JSDoc comment
- [ ] Multi-variant stories use a `render` function and disable the demonstrated prop's control
- [ ] Inline flex decorator uses `var(--spacing-6)` for gaps
- [ ] Helper components are unexported (or in `__story__/`)
- [ ] British English in all JSDoc prose

## Reference

See [reference.md](reference.md) for `argTypes` patterns, extending stories, decorators,
controlled interactive state, and the full list of common mistakes.
