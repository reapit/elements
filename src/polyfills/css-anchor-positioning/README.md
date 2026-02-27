# CSS Anchor Positioning Polyfill

Polyfills the [CSS Anchor Positioning API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) for browsers that lack native support.

## Quick Start

```ts
import { applyCSSAnchorPositioningPolyfill } from '@reapit/elements'

await applyCSSAnchorPositioningPolyfill({
  elements: [anchorElement, positionedElement],
})
```

## File Structure

This directory contains three main files:

- **`index.ts`** - Main exports: `applyCSSAnchorPositioningPolyfill()` and `isCSSAnchorPositioningSupported()`
- **`polyfill.ts`** - Implementation (internal, do not import directly)
- **`preload.ts`** - Dedicated entry point for preloading the polyfill dependency (~50KB)

## Preloading for Better Performance

Preload the polyfill module to reduce latency if your first render includes components that rely on CSS anchor positioning.

**Important:** Preloading only loads the dependency. You still need to call `applyCSSAnchorPositioningPolyfill()` to apply it.

### Option 1: HTML Modulepreload (Recommended)

```html
<link rel="modulepreload" href="@reapit/elements/polyfills/css-anchor-positioning/preload.js" />
```

> **Note:** Adjust the path based on your build output. In production, this might be `/assets/css-anchor-positioning-polyfill-[hash].js`.

### Option 2: Dynamic Import

```ts
// At app entry point - starts loading the polyfill module
import('@reapit/elements/polyfills/css-anchor-positioning/preload')

// Later in components - module will already be loaded/loading
import { applyCSSAnchorPositioningPolyfill } from '@reapit/elements'
await applyCSSAnchorPositioningPolyfill({ elements: [myElement] })
```

## API

### `applyCSSAnchorPositioningPolyfill(options?)`

Applies the polyfill when the browser lacks native support.

**Options:**

- `elements?: HTMLElement[]` - Only apply polyfill to specified elements. The polyfill automatically filters out elements disconnected from the DOM.
- `excludeInlineStyles?: boolean` - When true (default), polyfills only inline styles on elements listed in `elements`. When false, polyfills all eligible inline styles.
- `useAnimationFrame?: boolean` - Updates anchor calculations on every animation frame. Use sparingly. **Default:** `false`

**Returns:** `Promise<void>`

### `isCSSAnchorPositioningSupported()`

Checks if the browser natively supports CSS anchor positioning.

**Returns:** `boolean`

## How It Works

1. Checks if browser supports CSS anchor positioning natively
2. If not supported, dynamically imports the polyfill from `preload.ts`
3. Filters out disconnected elements (if any)
4. Applies polyfill to specified elements
5. Browser module cache ensures polyfill is only downloaded once

## Performance Tips

- Use the `elements` option to limit scope
- Set `useAnimationFrame: false` (default) unless animating anchors with transforms
- Preload the module if it's needed in first render
- The polyfill is ~50KB gzipped and only loads once

## Browser Support

Works in all modern browsers supporting:

- CSS `position: absolute` or `position: fixed`
- JavaScript ES2020+
- CSS custom properties

## Credits

Wraps [@oddbird/css-anchor-positioning](https://github.com/oddbird/css-anchor-positioning) by OddBird.
