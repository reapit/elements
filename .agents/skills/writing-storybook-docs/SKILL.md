---
name: writing-storybook-docs
description: Write Storybook story files for Reapit Elements components and utilities. Use when creating stories for a new component, adding stories to an existing component, updating stories after an API change, or reviewing story code in a PR.
---

# Writing Storybook Docs

This project uses [Storybook 10](https://storybook.js.org/) with the `@storybook/react-vite` framework. Stories serve as live component demos and the primary documentation surface. The project enables Autodocs globally, so every story file automatically generates a documentation page.

## When to Use This Skill

Invoke this skill when:

- Writing stories for a new component or utility
- Adding stories for an existing component's new props or behaviour
- Updating stories after a prop rename or API change
- Reviewing a PR that introduces or modifies story files

## Environment

| Setting           | Value                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Storybook version | 10.3.3                                                                                   |
| Framework         | `@storybook/react-vite`                                                                  |
| Autodocs          | Globally enabled in `preview.tsx` — do **not** add `tags: ['autodocs']` to story files   |
| Prop extraction   | `react-docgen-typescript` (supports namespace interface props)                           |
| Story format      | CSF 3 (`Meta` + `StoryObj` + `satisfies`)                                                |
| Theme wrapper     | Global `ThemeProvider` decorator in `preview.tsx` — all stories receive it automatically |

## File Organisation

### Naming

Place story files alongside the component file they document:

```
src/core/button/
  button.tsx
  button.stories.tsx     ✅ Correct
```

For components that need reusable story helpers, create a `__story__/` subdirectory:

```
src/core/drawer/
  drawer.tsx
  drawer.stories.tsx
  __story__/
    useDrawerContextDecorator.tsx
    Pattern.tsx
```

### Type alias

Declare the `Story` type alias immediately after `export default meta`. This alias is referenced by every named story export.

```tsx
const meta = { ... } satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>   // ✅ References meta, not the component directly
```

## Meta Definition

### `satisfies` pattern

Use `satisfies Meta<typeof Component>` — do **not** annotate with `: Meta<typeof Component>`. The `satisfies` keyword preserves the inferred type of the object literal while enforcing compatibility, giving better type narrowing downstream.

```tsx
// ✅ Correct
const meta = {
  title: 'Core/Button',
  component: Button,
} satisfies Meta<typeof Button>

// ❌ Wrong — annotation widens the type
const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
}
```

### Title convention

The `title` field places the component in the sidebar hierarchy. Follow `'Section/ComponentName'` with PascalCase for the component name. Common sections:

| Section       | Usage                                    |
| ------------- | ---------------------------------------- |
| `Core/`       | Main UI components in `src/core/`        |
| `Utils/`      | Utilities and primitives in `src/utils/` |
| `Icons/`      | Icon components                          |
| `Lab/`        | Experimental components in `src/lab/`    |
| `Deprecated/` | Legacy components in `src/deprecated/`   |

```tsx
// ✅ Correct
title: 'Core/Button'
title: 'Core/TextInput'
title: 'Utils/Combobox'

// ❌ Wrong — lowercase, wrong separator
title: 'core/button'
title: 'Core - Button'
```

### Subcomponents

When a component has companion components that share the same documentation page, list them in `subcomponents`. This causes their prop tables to appear in the Controls panel.

```tsx
const meta = {
  title: 'Core/Button',
  component: Button,
  subcomponents: { AnchorButton },
} satisfies Meta<typeof Button>
```

### ArgTypes

Use `argTypes` to improve the Controls panel experience for props that need special handling.

**Icon props** — use `radio` control with a `mapping` object that maps label strings to JSX elements. This lets the user toggle icons without typing JSX.

```tsx
argTypes: {
  iconLeft: {
    control: 'radio',
    options: ['None', 'Star', 'Add'],
    mapping: {
      None: undefined,
      Star: <StarIcon />,
      Add: <AddIcon />,
    },
  },
}
```

**Enum-like string props** — use `select` control with an explicit `options` array.

```tsx
argTypes: {
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
  },
}
```

**Props with complex types** — use `table.type.summary` to provide a readable summary when the inferred type would be unreadable in the Controls panel.

```tsx
argTypes: {
  value: {
    control: 'text',
    table: {
      type: {
        summary: 'string | number | readonly string[] | undefined',
      },
    },
  },
}
```

**Complex children** — when a component accepts children that can only be constructed as JSX, use `radio` with a `mapping` to named layout variants.

```tsx
argTypes: {
  children: {
    control: 'radio',
    options: ['Simple', 'With Footer', 'Empty'],
    mapping: {
      Simple: <ExampleSimpleLayout />,
      'With Footer': <ExampleFooterLayout />,
      Empty: null,
    },
  },
}
```

## The Example Story

Every story file must export an `Example` story as its first named export. This story is the primary interactive playground in the Controls panel. It must:

- Be named `Example` exactly (this controls the URL path)
- Provide a comprehensive `args` object covering all notable props
- Set sensible, non-edge-case defaults so the component renders in a useful initial state

**Checklist:**

- [ ] Named `Example`
- [ ] First named export in the file
- [ ] Covers all props users are likely to tweak in the Controls panel
- [ ] Uses the default/non-edge-case state

```tsx
// ✅ Correct
export const Example: Story = {
  args: {
    'aria-label': 'My input',
    disabled: false,
    placeholder: '',
    readOnly: false,
    required: false,
    showValidity: false,
    size: 'medium',
    type: 'text',
  },
}
```

## Additional Stories

### JSDoc descriptions

Every story other than `Example` must have a JSDoc comment directly above its export. This comment becomes the story's prose description in the auto-generated documentation page. Write it in the present tense and focus on what the story demonstrates.

`Example` does not require a JSDoc comment, but one is appropriate when the story has a non-obvious render function or requires context that would otherwise leave users confused. In those cases, use the comment to explain the interaction model rather than the props.

**Checklist:**

- [ ] JSDoc comment (`/** ... */`) on every story except `Example`
- [ ] `Example` gets a JSDoc only when its render function or behaviour needs explanation
- [ ] Present tense, active voice
- [ ] Explains the behaviour or prop combination being shown
- [ ] British English spelling

```tsx
// ✅ Correct
/**
 * Buttons support three variants: `primary`, `secondary`, and `tertiary`. Typically, there should
 * only be one primary action in the UI at any given time.
 */
export const Variants: Story = { ... }

// ❌ Wrong — no JSDoc
export const Variants: Story = { ... }

// ❌ Wrong — vague description
/**
 * Shows variants.
 */
export const Variants: Story = { ... }
```

### Spreading args from Example

Use the spread operator to build additional stories on top of `Example.args`. This keeps stories DRY and ensures they inherit the baseline prop configuration.

```tsx
// ✅ Correct
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

// ❌ Wrong — manually restating all args
export const Disabled: Story = {
  args: {
    disabled: true,
    size: 'medium',
    // ...
  },
}
```

You may also spread from intermediate stories when the result is clearer:

```tsx
export const Icons: Story = {
  args: {
    ...Example.args,
    iconLeft: 'Star',
    iconRight: 'Star',
  },
}

export const Disabled: Story = {
  args: {
    ...Icons.args, // inherits icon configuration
    disabled: true,
  },
}
```

### Disabling controls for the demonstrated prop

When a story demonstrates a specific prop by rendering multiple variants side by side, disable the Controls panel entry for that prop. This prevents the user from overriding the prop and breaking the visual comparison.

```tsx
export const Variants: Story = {
  args: { ...Example.args },
  argTypes: {
    variant: { control: false }, // ✅ disable the demonstrated prop
  },
  render: (args) => (
    <>
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="tertiary" />
    </>
  ),
}
```

### Render functions for multi-variant display

Use a `render` function when a story must display multiple instances of the component simultaneously. Pair this with an inline flex decorator to lay them out side by side.

```tsx
export const Sizes: Story = {
  args: { ...Example.args },
  argTypes: {
    size: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <TextInput {...args} size="small" />
      <TextInput {...args} size="medium" />
      <TextInput {...args} size="large" />
    </>
  ),
}
```

When using a complex `render` function, add `parameters.docs.source.type: 'code'` when the auto-generated source panel shows the render wrapper rather than the component call, making the output misleading.

```tsx
parameters: {
  docs: {
    source: { type: 'code' },
  },
},
```

### Name overrides

Storybook converts the export identifier to the display name using `startCase`. When the natural name contains characters that `startCase` would mangle (hyphens, special formatting), override it with the `name` field.

```tsx
// ✅ Correct — 'Icon-only' and 'Read-only' need hyphens preserved
export const IconOnly: Story = {
  name: 'Icon-only',
  ...
}

export const Readonly: Story = {
  name: 'Read-only',
  ...
}

// Not needed — 'Variants' and 'Disabled' render fine without a name override
export const Variants: Story = { ... }
export const Disabled: Story = { ... }
```

### Helper components

Define private helper components used only within the story file as unexported functions at the bottom of the file. Do not export them — Storybook will treat every named export that looks like a story as a story.

```tsx
// ✅ Correct — unexported, placed at the bottom
function ExampleSimpleLayout({ height }: { height: string }) {
  return (
    <>
      <Dialog.Header>Dialog title</Dialog.Header>
      <Dialog.Body>...</Dialog.Body>
    </>
  )
}
```

## Decorators

### Inline decorators

The most common decorator wraps the story output in a flex container to display multiple variants side by side. Use design tokens for spacing.

```tsx
decorators: [
  (Story) => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
      <Story />
    </div>
  ),
],
```

### Reusable decorators

When a decorator is shared across multiple stories or is complex enough to warrant its own file, place it in a `__story__/` subdirectory alongside the component.

```
src/core/drawer/
  __story__/
    useDrawerContextDecorator.tsx    // provides DrawerContext for subcomponent stories
    useDrawerBreakpointDecorator.tsx // grid layout for breakpoint demos
    Pattern.tsx                      // reusable placeholder content
```

Export decorator functions with a `use` prefix and a `Decorator` suffix:

```tsx
// src/core/drawer/__story__/useDrawerContextDecorator.tsx
import type { Decorator } from '@storybook/react-vite'

export function useDrawerContextDecorator(): Decorator {
  return (Story) => (
    <DrawerContext.Provider value={...}>
      <Story />
    </DrawerContext.Provider>
  )
}
```

### Global ThemeProvider

The global `ThemeProvider` decorator in `preview.tsx` wraps every story automatically. You do not need to add `ThemeProvider` to individual stories. The active theme is controlled by the toolbar switcher in the Storybook UI.

## Interactive State

### useArgs for open/close

When a component has a controlled open/close state (such as `Dialog` or `Drawer`), use `useArgs` from `storybook/preview-api` in the `Example` story's `render` function. This allows the Controls panel to reflect the current `isOpen` state.

```tsx
import { useArgs } from 'storybook/preview-api'

export const Example: Story = {
  args: {
    isOpen: false,
    // ...
  },
  render: function Example(args) {
    const [, setArgs] = useArgs()
    return (
      <>
        <button onClick={() => setArgs({ isOpen: true })}>Open</button>
        <Dialog onClose={() => setArgs({ isOpen: false })} {...args} />
      </>
    )
  },
}
```

Give the `render` function a name matching the story export name. This improves source panel output and stack traces.

### useState for story-local state

When a story needs state that should not be reflected in the Controls panel (e.g., a one-off interactive demo), use `useState` instead.

```tsx
render: function ClosedBy(args) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
},
```

## Common Mistakes

### Adding autodocs tag

**Do not** add `tags: ['autodocs']` to story files. It is already set globally in `preview.tsx`, so adding it again is redundant.

```tsx
// ❌ Wrong — redundant
const meta = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

// ✅ Correct — no tags needed
const meta = {
  title: 'Core/Button',
  component: Button,
} satisfies Meta<typeof Button>
```

### Using MDX for new core components

Do not create MDX documentation files for new components in `src/core/`. Autodocs generates the documentation page automatically from the story file. Reserve MDX for hand-authored conceptual pages (`src/storybook/`) and legacy deprecated components.

```
// ❌ Wrong — don't create this for new core components
src/core/button/button.mdx

// ✅ Correct — the story file is sufficient
src/core/button/button.stories.tsx
```

### Importing from the wrong framework package

Always import Storybook types from `@storybook/react-vite`, not `@storybook/react` or plain `storybook`.

```tsx
// ✅ Correct
import type { Meta, StoryObj } from '@storybook/react-vite'

// ❌ Wrong — wrong package
import type { Meta, StoryObj } from '@storybook/react'
import type { Meta, StoryObj } from 'storybook'
```

### Exporting helper components

In Storybook CSF, any named export from a `*.stories.*` file that is an object or function is treated as a story. Storybook skips exports that are listed in `excludeStories` or that are not objects or functions (for example, exported type aliases). Do not export helper components from story files; instead keep them unexported or move them into a separate helper module (for example under a `__story__/` directory).

```tsx
// ❌ Wrong — Storybook will attempt to render this as a story
export function ExampleLayout() { ... }

// ✅ Correct — unexported
function ExampleLayout() { ... }
```

### Omitting JSDoc on non-Example stories

Every story except `Example` must have a JSDoc comment. Without it, the documentation page will show the story with no descriptive text, leaving users to infer the intent.

```tsx
// ❌ Wrong — no JSDoc
export const Disabled: Story = {
  args: { ...Example.args, disabled: true },
}

// ✅ Correct
/**
 * Disabled inputs will not receive click events and are not submitted with the form
 * they are associated with.
 */
export const Disabled: Story = {
  args: { ...Example.args, disabled: true },
}
```

## Quick Checklist

Before committing a story file:

- [ ] File named `<component>.stories.tsx`, co-located with the component
- [ ] Types from `@storybook/react-vite` (not `@storybook/react`)
- [ ] `satisfies Meta<typeof Component>` (not `: Meta<typeof Component>`)
- [ ] `type Story = StoryObj<typeof meta>` declared after `export default meta`
- [ ] No `tags: ['autodocs']` in meta
- [ ] `Example` story is the first named export with comprehensive `args`
- [ ] Every story except `Example` has a JSDoc comment
- [ ] Multi-variant stories use a `render` function and disable the demonstrated prop's control
- [ ] Inline flex decorator uses `var(--spacing-6)` for gaps
- [ ] Helper components are unexported (or in `__story__/`)
- [ ] British English in all JSDoc prose
