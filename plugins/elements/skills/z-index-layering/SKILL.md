---
name: z-index-layering
description: Apply z-index layering conventions in your own custom components alongside Reapit Elements. Use when adding z-index to a custom component, reviewing a PR that introduces z-index in your own code, or ensuring custom overlays do not conflict with Elements' overlay components. Do not use when authoring components inside Reapit Elements itself.
---

# Z-Index Layering for Custom Components

## When to Use This Skill

Invoke this skill when:

- Adding z-index to your own custom component (e.g., a sticky header, a custom dropdown, an internal stacking hierarchy)
- Reviewing a pull request that introduces or modifies z-index in your own code
- Deciding whether a custom overlay can appear above an Elements overlay (e.g., Dialog, Drawer, Menu)
- Determining whether to apply `isolation: isolate` to a container in your own code

## Key Principle: Reuse, Don't Invent

**Do not create arbitrary z-index values in your own code.** Reapit Elements exposes three semantic z-index tokens via CSS custom properties. Reuse them instead of inventing new numbers like `z-index: 999` or `z-index: 10000`, which risk collision with Elements' internal usage.

These tokens are an Elements implementation detail for coordinating stacking with its own components — not a formal Design System specification.

### Available Tokens

Elements defines three tokens in its global styles (`@reapit/elements/styles.css`). Import Elements' CSS to access them:

```javascript
// In your app
import "@reapit/elements/styles.css";
```

The three tokens are:

| Token                | Purpose                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `--z-index-base`     | Explicit base stacking level — use when an element must sit visibly below elevated siblings      |
| `--z-index-elevated` | Internal component stacking (e.g., active tab indicator, focus ring) — contained by `isolation`  |
| `--z-index-sticky`   | Sticky or fixed elements that must stay above scrolling content (e.g., fixed header, sticky nav) |

Reference them by name via `var(--z-index-*)` — their actual numeric values are an Elements
implementation detail and may change between versions; don't hardcode them.

## Required Pattern for Your Custom Components

### Rule 1: Use Token Variables, Never Hardcoded Numbers

In your own component stylesheets:

```typescript
// ❌ Wrong: hardcoded arbitrary value
export const CustomSticky = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
`;

// ✅ Correct: reuse Elements' token
export const CustomSticky = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
`;
```

### Rule 2: Apply `isolation: isolate` When Children Use Z-Index

If your own component has children that use z-index for internal stacking, apply `isolation: isolate` to the parent. This contains the stacking context so it cannot leak into unrelated siblings elsewhere on the page.

```typescript
// ✅ Correct: container with internal stacking
export const CustomTabs = styled.nav`
  display: flex;
  isolation: isolate; // Required: contains child z-index
`;

export const CustomTab = styled.a`
  &[aria-current="page"] {
    z-index: var(--z-index-elevated);
  }
`;
```

### Rule 3: Understand That You Cannot Out-Stack Elements' Overlays

**Critical limitation:** Elements' overlay components (`Dialog`, `Drawer`, `Menu`, `Tooltip`, `Combobox` popups) use native browser APIs (`<dialog>` element or `popover` attribute). These APIs place content in the browser's "top-layer," which sits above ALL z-index stacking contexts — no z-index value, however large, will place your own `position: fixed` element above an open Elements `Dialog`.

```typescript
// ❌ Won't work: your overlay cannot out-stack Elements' Dialog
export const CustomModal = styled.div`
  position: fixed;
  z-index: 999999; // Will still appear BELOW an open Elements Dialog
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

// ✅ If you need content above an Elements overlay, render it INSIDE the overlay
// Example: pass your content as a child of <Dialog>
<Dialog open>
  <YourCustomContent /> {/* This renders inside the Dialog's top-layer */}
</Dialog>
```

**If your custom content must appear alongside or above an open Elements overlay:**

- Render your content as a child or slot within the Elements overlay component
- Do not attempt to use z-index to place your own `position: fixed` element above it
- This also applies to composing multiple Elements overlays: e.g. a `Drawer` that needs to open a `Dialog` — nest the `Dialog` inside the `Drawer` rather than layering custom overlays

## Review Checklist

When reviewing code that introduces z-index in your own custom components:

- [ ] All z-index values use CSS custom property variables (`var(--z-index-*)`)
- [ ] No hardcoded numeric z-index values (e.g., `z-index: 1`, `z-index: 100`)
- [ ] Container has `isolation: isolate` if any of its children use z-index
- [ ] Sticky or fixed elements use `--z-index-sticky`
- [ ] Internal component stacking uses `--z-index-elevated`
- [ ] Elements that must sit below elevated siblings use `--z-index-base` explicitly
- [ ] Custom overlays do not attempt to out-stack Elements' Dialog/Drawer/Menu/Tooltip (use slots instead)

## See Also

- Reapit Elements: `@reapit/elements/styles.css` (compiled stylesheet defining the three tokens)
- MDN: [CSS `isolation` property](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation)
- MDN: [z-index and stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)
- Browser support: [`popover` / top-layer API](https://caniuse.com/mdn-api_htmlelement_popover)
