# Writing Storybook Docs — Reference

## ArgTypes

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
export const Variants = meta.story({ ... })

// ❌ Wrong — no JSDoc
export const Variants = meta.story({ ... })

// ❌ Wrong — vague description
/**
 * Shows variants.
 */
export const Variants = meta.story({ ... })
```

### Extending stories with `.extend()`

Use `.extend()` to build additional stories on top of `Example` or other stories. This uses smart merging: `args` are shallow merged, `parameters` are deep merged, `decorators` and `tags` are concatenated.

```tsx
// ✅ Correct — uses .extend() for smart merging
/**
 * Disabled buttons do not receive click events.
 */
export const Disabled = Example.extend({
  args: { disabled: true },
});

// ❌ Wrong — manually restating all args
export const Disabled = meta.story({
  args: {
    disabled: true,
    size: "medium",
    // ...
  },
});
```

You may also extend from intermediate stories when the result is clearer:

```tsx
export const Icons = Example.extend({
  args: {
    iconLeft: "Star",
    iconRight: "Star",
  },
});

/**
 * Disabled buttons with icons inherit both the icon configuration and the disabled state.
 */
export const Disabled = Icons.extend({
  args: { disabled: true },
});
```

When a story only extends `Example` but needs other properties (like `argTypes`, `render`, or `decorators`), use `.extend()` rather than `meta.story()` with a spread:

```tsx
// ✅ Correct
export const Variants = Example.extend({
  argTypes: {
    variant: { control: false },
  },
  render: (args) => (
    <>
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
    </>
  ),
})

// ❌ Wrong — using meta.story with manual args spread
export const Variants = meta.story({
  args: { ...Example.input.args },
  argTypes: { variant: { control: false } },
  render: (args) => ( ... ),
})
```

### Accessing story properties

When you need to read a story's properties directly (e.g., spreading args into JSX within a render function), use `.input` for the direct story input:

```tsx
render: (args) => <Component {...Example.input.args} />;
```

### Disabling controls for the demonstrated prop

When a story demonstrates a specific prop by rendering multiple variants side by side, disable the Controls panel entry for that prop. This prevents the user from overriding the prop and breaking the visual comparison.

```tsx
export const Variants = Example.extend({
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
});
```

### Render functions for multi-variant display

Use a `render` function when a story must display multiple instances of the component simultaneously. Pair this with an inline flex decorator to lay them out side by side.

```tsx
export const Sizes = Example.extend({
  argTypes: {
    size: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "var(--spacing-6)" }}>
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
});
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
export const IconOnly = Example.extend({
  name: 'Icon-only',
  ...
})

export const Readonly = Example.extend({
  name: 'Read-only',
  ...
})

// Not needed — 'Variants' and 'Disabled' render fine without a name override
export const Variants = Example.extend({ ... })
export const Disabled = Example.extend({ ... })
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
  );
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
import { useArgs } from "storybook/preview-api";

export const Example = meta.story({
  args: {
    isOpen: false,
    // ...
  },
  render: function Example(args) {
    const [, setArgs] = useArgs();
    return (
      <>
        <button onClick={() => setArgs({ isOpen: true })}>Open</button>
        <Dialog onClose={() => setArgs({ isOpen: false })} {...args} />
      </>
    );
  },
});
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
const meta = preview.meta({
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
});

// ✅ Correct — no tags needed
const meta = preview.meta({
  title: "Core/Button",
  component: Button,
});
```

### Using MDX for new core components

Do not create MDX documentation files for new components in `src/core/`. Autodocs generates the documentation page automatically from the story file. Reserve MDX for hand-authored conceptual pages (`src/storybook/`) and legacy deprecated components.

```
// ❌ Wrong — don't create this for new core components
src/core/button/button.mdx

// ✅ Correct — the story file is sufficient
src/core/button/button.stories.tsx
```

### Using old CSF 3 patterns

Do **not** use the old CSF 3 patterns. Use the CSF Next factory functions instead.

```tsx
// ❌ Wrong — old CSF 3
import type { Meta, StoryObj } from '@storybook/react-vite'
const meta = { ... } satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Example: Story = { ... }

// ✅ Correct — CSF Next
import preview from '#.storybook/preview'
const meta = preview.meta({ ... })
export const Example = meta.story({ ... })
```

### Using `meta.story()` with arg spreads instead of `.extend()`

When building on an existing story, always use `.extend()` rather than `meta.story()` with `...Story.input.args`.

```tsx
// ❌ Wrong — manual spread
export const Disabled = meta.story({
  args: { ...Example.input.args, disabled: true },
});

// ✅ Correct — .extend()
export const Disabled = Example.extend({
  args: { disabled: true },
});
```

### Importing a subcomponent directly instead of via the parent namespace

When a component is a subcomponent (part of a parent namespace such as `Dialog.Body`), do not import it directly from its own file. Import the parent and reference the subcomponent through the namespace. This ensures the `component` field, JSX, and Figma Code Connect all reflect the public API.

```tsx
// ❌ Wrong — direct import from the subcomponent file
import { DialogBody } from "./body";

const meta = preview.meta({
  title: "Core/Dialog/Body",
  component: DialogBody,
});

// ✅ Correct — import parent and reference via namespace
import { Dialog } from "../dialog";

const meta = preview.meta({
  title: "Core/Dialog/Body",
  component: Dialog.Body,
});
```

### Importing from the wrong framework package

When you need Storybook types (e.g., `Decorator`), import them from `@storybook/react-vite`, not `@storybook/react` or plain `storybook`.

```tsx
// ✅ Correct
import type { Decorator } from "@storybook/react-vite";

// ❌ Wrong — wrong package
import type { Decorator } from "@storybook/react";
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
export const Disabled = Example.extend({
  args: { disabled: true },
});

// ✅ Correct
/**
 * Disabled inputs will not receive click events and are not submitted with the form
 * they are associated with.
 */
export const Disabled = Example.extend({
  args: { disabled: true },
});
```
