# Styles Architecture

This document explains how the cascade layer order and the library's global
styles reach both Storybook and the production CSS bundle. For the rules
contributors should follow when writing component styles, see the
[`cascade-layering`](../../.agents/skills/cascade-layering/SKILL.md) skill.

## Overview

The library declares two named cascade layers, `elements.base` and
`elements.main`. The order declaration must appear in the stylesheet
**before** any rules that reference those layers, otherwise the browser
falls back to declaration order and the wrong layer wins.

Reaching this state in both environments takes three coordinated pieces:

1. **`src/styles/layer-order.css`** — the canonical `@layer` order
   declaration.
2. **`src/styles/globals.ts`** — the entry point that pulls
   `layer-order.css`, the design tokens, and `globals.css` into the build.
3. **`build/cascade-layer-order.ts`** — a Vite plugin that prepends the
   layer order to the production bundle.

In Storybook, the normal import chain is enough. In the production build,
the plugin is required because LightningCSS — the minifier Vite ships by
default — strips standalone `@layer` order declarations during
minification.

## The Pieces

### `src/styles/layer-order.css`

Holds the canonical `@layer elements.base, elements.main;` declaration and
nothing else. Kept in its own file so the Vite plugin can read it
independently and prepend its content to the bundled CSS.

Edit this file to change the layer order. Both Storybook and the
production bundle pick the change up automatically.

### `src/styles/globals.ts`

Side-effect imports every stylesheet that must appear in the combined
library CSS bundle but does not belong to a specific component:

1. `layer-order.css` — first, so the `@layer` order statement precedes
   any layered rules.
2. The Reapit and PayProp design token stylesheets.
3. `globals.css` — the Google Fonts `@import`, the `box-sizing` reset,
   and `:root`-level z-index custom properties.

Registered as an explicit build entry point in `vite.config.ts`. Nothing
in `src/core`, `src/lab`, `src/deprecated`, etc. imports this file, so
without an entry point the bundler would never reach it and its styles
would never appear in `dist/js/style.css`.

Storybook reaches the same module through `.storybook/preview.tsx`,
which imports it for the same side effects.

### `src/styles/globals.css`

Plain CSS for genuinely global styles. Kept out of a Linaria `css`
tagged template because these rules target the document, not a
component. A tagged template would generate a synthetic class name
nothing uses and would require a `:global()` wrapper to escape Linaria's
scoping.

### `build/cascade-layer-order.ts`

A Vite plugin that reads `layer-order.css` from disk and prepends its
content to the emitted CSS file during `writeBundle`. Restores the
declaration that LightningCSS removed during minification.

Only runs in production builds. Storybook does not need it: in dev mode
no minification happens, so the `@layer` declaration imported through
`globals.ts` survives untouched.

## Why It Works This Way

### Why is `layer-order.css` a separate file?

LightningCSS strips standalone `@layer` order declarations during
minification. Inlining the declaration in `globals.css` or in a Linaria
tagged template does not help — the minifier removes it either way.
Keeping the declaration in its own file lets the Vite plugin read it
verbatim and prepend it to the final bundle after minification has run.

### Why is `globals.ts` an explicit build entry point?

The Vite library build only emits CSS for files reachable from a
declared entry point. The entry points are the public barrels in
`src/core`, `src/lab`, `src/deprecated`, `src/utils`, and `src/icons`,
plus a polyfill preload entry — none of which import `globals.ts`.
Without registering `globals.ts` as its own entry point, the bundler
would never traverse it and the global styles would never appear in
`dist/js/style.css`.

### Why plain CSS for `globals.css` instead of a Linaria template?

The rules in `globals.css` (font `@import`, `box-sizing` reset,
`:root`-level custom properties) target the document, not a component.
A `css` tagged template would generate a class name nothing applies,
and Linaria's scoping would require a `:global()` wrapper to publish
the rules globally. A plain `.css` file expresses the intent directly
and is processed by Vite without an extra layer of indirection.

### Why doesn't Storybook need the plugin?

Storybook runs Vite in dev mode, which does not invoke LightningCSS
minification. The `@layer` order declaration imported through
`globals.ts` reaches the browser intact. The plugin only matters for
the minified production bundle.

## Common Pitfalls

- **Removing the `globals.ts` entry point.** The styles will silently
  disappear from `dist/js/style.css` — there is no error, only missing
  global rules at runtime.
- **Reordering the imports in `globals.ts`.** `layer-order.css` must be
  imported first; otherwise the `@layer` declaration appears after the
  font `@import` and other rules, which violates the CSS spec
  (`@import` and `@layer` order rules must come before other
  statements).
- **Inlining the layer order in `globals.css`.** LightningCSS strips it
  during minification. Keep the declaration in `layer-order.css` so the
  plugin can re-emit it post-minification.
- **Disabling the Vite plugin.** The production bundle will load but
  the layer order will be missing, so `elements.base` will win over
  `elements.main` (the opposite of the intended cascade).
