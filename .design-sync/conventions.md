# @reapit/elements conventions

## No root import — every import is a subpath

`@reapit/elements` has no `.` export; each component is its own subpath, mirroring the source
directory under `src/core`/`src/utils`/`src/icons` (kebab-case), e.g.:

```tsx
import { Button } from "@reapit/elements/core/button";
import { Card } from "@reapit/elements/core/card";
import { Flex } from "@reapit/elements/utils/flex";
import { ThemeProvider } from "@reapit/elements/utils/theme-provider";
```

Never `import { Button } from '@reapit/elements'` — that import has nothing to resolve to.

## Wrap every design in `ThemeProvider`

Reapit Elements themes via a `data-theme` attribute on the document root, not via React context —
without it, components fall back to whatever theme (if any) is already on `<html>`, usually none,
so colours/borders/spacing read as unstyled defaults. Wrap the app root once:

```tsx
import { ThemeProvider } from "@reapit/elements/utils/theme-provider";

function App() {
  return <ThemeProvider theme="reapit">{/* rest of the app */}</ThemeProvider>;
}
```

`theme` is `"reapit"` or `"payprop"` — use `"reapit"` unless the design is explicitly for the
PayProp product line. `ThemeProvider` only sets the attribute if the root doesn't already carry
one, so nesting it is harmless but redundant.

## Styling idiom: CSS custom properties, not utility classes or style props

There's no utility-class system (no `bg-*`/`p-*` equivalents) and no free-form styling-prop API.
Components take small, closed enums (`variant`, `size`, `isDestructive`, …) for their own
appearance; style your OWN layout glue (wrappers, gaps between components) with these CSS custom
properties so it stays on-theme and reacts to the `data-theme` switch automatically:

| Concern    | Example tokens                                                                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fill       | `--colour-fill-neutral-lightest`, `--colour-fill-neutral-darkest`, `--colour-fill-action-light`, `--colour-fill-error-light`, `--colour-fill-success-light` |
| Border     | `--colour-border-action-default`, `--colour-border-error-default`, `--colour-border-focus`, `--colour-border-neutral-dark`                                  |
| Spacing    | `--spacing-1` … `--spacing-40` (a numeric step scale; also `--spacing-half`, `--spacing-none`)                                                              |
| Typography | `--font-{base,sm,lg}-{regular,medium,bold}-{family,size,weight}`, e.g. `--font-base-regular-family`                                                         |

`Flex`'s own `gap`/`columnGap`/`rowGap` props take a spacing-token STRING directly (e.g.
`gap="--spacing-4"`), not a raw pixel number — the same step-scale vocabulary as everywhere else.

Component-internal tokens (prefixed `--comp-<component>-...`, e.g.
`--comp-badge-colour-fill-default-accent`) are implementation detail consumed by each component's
own compiled CSS — don't reference them directly; use the component's own props instead.

Example — a custom flex wrapper around two Buttons, using the real `Button` API and token-based
spacing (not px):

```tsx
import { Flex } from "@reapit/elements/utils/flex";
import { Button } from "@reapit/elements/core/button";

function SaveCancelRow() {
  return (
    <Flex
      gap="--spacing-2"
      style={{ padding: "var(--spacing-4)", background: "var(--colour-fill-neutral-lightest)" }}
    >
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </Flex>
  );
}
```

## Where the truth lives

Read `_ds/styles.css` (and its `@import` closure, which pulls in the compiled component CSS)
before styling anything — it's the actual shipped stylesheet, more reliable than this summary.
Each component's own usage reference is `_ds/components/<group>/<Name>/<Name>.prompt.md`; its type
contract is the sibling `.d.ts`.

## Before using a component, check the Reapit MCP docs tools

The previews in this project show _what_ a component looks like, not _when_ or _why_ to use it,
or its full React API. If the Reapit MCP is connected in this session, use it before placing any
Elements component in a design:

1. **Usage guidance** — call `reapit-elements-design-system_search-pages` (or `list-pages`) for
   the component you're about to use. This is where "use Badge for status, not Chip", "Drawer vs
   Dialog", spacing/composition rules, and other judgement calls live. Check this **before**
   choosing between two similar-looking components, not after.
2. **Component API** — call `reapit-elements_get-documentation-for-story` (or
   `get-documentation`) for the exact props, variants, and slot structure. A preview here shows
   one variant; the real component usually supports more than what's on screen.

Do this for every Elements component added to a design, not just ones you're unsure about — the
guidance frequently overrides what looks like the obvious choice from the preview alone. If the
Reapit MCP isn't connected in this session, say so explicitly rather than guessing at usage
guidance or props — a visual match against the preview is not a substitute for the documented
usage rules or API.

## Build snippet

```tsx
import { ThemeProvider } from "@reapit/elements/utils/theme-provider";
import { Flex } from "@reapit/elements/utils/flex";
import { Card } from "@reapit/elements/core/card";
import { Button } from "@reapit/elements/core/button";

function ConfirmArchiveScreen() {
  return (
    <ThemeProvider theme="reapit">
      <Card>
        <Flex direction="column" gap="--spacing-4">
          <p>Are you sure you want to archive this property?</p>
          <Flex gap="--spacing-2">
            <Button variant="primary" isDestructive>
              Archive
            </Button>
            <Button variant="secondary">Cancel</Button>
          </Flex>
        </Flex>
      </Card>
    </ThemeProvider>
  );
}
```
