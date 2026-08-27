---
name: design-tokens
description: Apply Design System tokens to consumer code. Use when styling custom layout, wrappers, or glue code with CSS variables instead of hardcoded colours, spacing, or typography. Refer to this skill whenever a consumer team integrates @reapit/elements into their app and needs to align custom styling with the design system.
---

# Using Design System Tokens

## When to Use This Skill

Invoke this skill when:

- Styling custom layout, wrappers, or wrapper components
- Deciding whether a style should use a token or a component prop
- Reviewing code that hardcodes colours, spacing, or typography
- Migrating custom styles to the Design System token vocabulary
- Confirming custom styling stays consistent with the active theme

## How to Get Tokens into Your App

Import the main stylesheet early in your application setup:

```tsx
import "@reapit/elements/styles.css";
```

This contains all tokens. Reapit theme tokens apply by default, defined on the document root; a separate PayProp theme exists but is internal only, so third-party consumers don't need to set it up. Reference tokens as CSS custom properties (e.g. `var(--colour-fill-neutral-lightest)`) in inline styles or CSS files.

## Token Categories

The full, current set of tokens lives in the compiled stylesheet: `@reapit/elements/styles.css`. Rather than enumerate every variable here (they change as the design system evolves), this table explains what each category is for so you can pick the right one and find it in the stylesheet.

| Category      | Pattern                                                                                                                                                    | Purpose                                                                                                                                                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fill          | `--colour-fill-*`                                                                                                                                          | Background colours for regions, surfaces, and interactive states. Semantic suffixes (`neutral`, `action`, `error`, `success`, `warning`, `pending`, `info`, `accent_1`, `accent_2`) each have `light`/`lightest`/`dark` variants.                                   |
| Border        | `--colour-border-*`                                                                                                                                        | Border colours, same semantic suffixes as fill, plus `--colour-border-focus`.                                                                                                                                                                                       |
| Text          | `--colour-text-*`                                                                                                                                          | Foreground/text colours: `primary`/`secondary`/`tertiary`/`placeholder` for neutral text, plus one per semantic colour.                                                                                                                                             |
| Icon          | `--colour-icon-*`                                                                                                                                          | Icon colours, same semantic pattern, plus `hover`/`disabled`/`star` states.                                                                                                                                                                                         |
| Spacing       | `--spacing-{1-40}` (4px steps), plus `half` (2px) and `none` (0px)                                                                                         | Margins, padding, gaps, and other layout dimensions. Components with spacing props (e.g. `Flex`'s `gap`/`columnGap`/`rowGap`, `Card`'s `padding`) accept the bare token name directly; their prop types are `` `--spacing-${string}` ``, which TypeScript enforces. |
| Typography    | `--font-{size}-{weight}-{property}` (size `2xs`–`3xl`, weight `regular`/`medium`/`bold`, property `family`/`size`/`weight`/`line_height`/`letter_spacing`) | Font family, size, weight, line-height, and letter-spacing.                                                                                                                                                                                                         |
| Border radius | `--border-radius-*`                                                                                                                                        | Named scale from `none` to `full` (fully rounded).                                                                                                                                                                                                                  |
| Border width  | `--border-width-*`                                                                                                                                         | `none`, `default` (1px), `double` (2px), `triple` (4px).                                                                                                                                                                                                            |
| Shadows       | `--shadow-up-*` / `--shadow-down-*`                                                                                                                        | Elevation shadows in both directions, sized `xs` through `2xl`.                                                                                                                                                                                                     |
| Z-index       | `--z-index-*`                                                                                                                                              | Layering tokens for custom stacking contexts. See the `z-index-layering` skill for how to use them and why most overlay components don't need them at all.                                                                                                          |

Don't use fill/border/text/icon tokens interchangeably: pick the category that matches what you're styling (a background is `fill`, not `text`).

If you're using Linaria (`css`/`styled` template literals), the `font` helper from `@reapit/elements/utils/font` generates the five typography properties above from a size and weight, so you don't have to spell them out by hand:

```tsx
import { font } from "@reapit/elements/utils/font";
import { css } from "@linaria/core";

const heading = css`
  ${font("xl", "bold")}
`;
```

## Required Pattern

### Styling your own layout/wrapper code

Use tokens instead of hardcoded hex values, pixel numbers, or literal font values for any custom colour, spacing, or typography in wrappers and layout glue.

```tsx
// ✅ Correct: uses tokens for all custom styling
function ContentWrapper() {
  return (
    <div
      style={{
        padding: "var(--spacing-4)",
        background: "var(--colour-fill-neutral-lightest)",
        border: `var(--border-width-default) solid var(--colour-border-neutral-light_default)`,
        borderRadius: "var(--border-radius-l)",
      }}
    >
      {/* content */}
    </div>
  );
}
```

### Using component props instead of internal tokens

Never reference `--comp-<component>-*` tokens directly: they are implementation detail. Use the component's own props instead:

```tsx
// ❌ Wrong: reaching into Button's internal token
<div style={{ background: "var(--comp-button-colour-fill-primary-default)" }}>
  Click me
</div>

// ✅ Correct: use Button's variant prop
<Button variant="primary">Click me</Button>
```

## Reference

For the complete, current token list, see the compiled stylesheet:

- `@reapit/elements/styles.css` (imported in consumer apps) — all semantic and primitive tokens

For component-specific styling (use instead of tokens):

- Check the component's prop API in its Storybook story
- Use the `mcp-server-guidance` skill in this plugin to determine how to look up a component's API and usage guidance
