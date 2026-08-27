---
description: Migrates deprecated useMediaQuery and related exports to the new breakpoint utilities
---

# Upgrade Deprecated useMediaQuery Codemod

Automates migrating from the deprecated `useMediaQuery` hook and related exports to the new
`useMatchMedia` hook and breakpoint utilities introduced in Reapit Elements v5.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-deprecated-use-media-query

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-use-media-query src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-use-media-query src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-use-media-query src/ --ext .tsx,.jsx,.ts
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-use-media-query src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package matches all its subpaths:

```bash
# Matches @company/design-system, @company/design-system/deprecated/use-media-query, etc.
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-use-media-query src/ --facade-package @company/design-system
```

## Background

The `useMediaQuery` hook and its associated `MediaStateContext` / `MediaStateProvider` were deprecated in
Reapit Elements v5 in favour of `useMatchMedia`, a leaner hook that accepts any media-query string. The
breakpoint constants (`MOBILE_BREAKPOINT` etc.) were also deprecated in favour of the
`isWidthAtOrAbove` / `isWidthBelow` helpers from `@reapit/elements/utils/breakpoints`.

The deprecated exports still exist at `@reapit/elements/deprecated/use-media-query` but will be removed
in a future major version.

## Transformations

### Destructured `useMediaQuery()` calls

Each destructured property is replaced with a dedicated `useMatchMedia` call using the appropriate
breakpoint expression.

| Before                                          | After                                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `const { isMobile } = useMediaQuery()`          | `const isMobile = useMatchMedia(isWidthBelow('SM'))`                                                  |
| `const { isTablet } = useMediaQuery()`          | `const isTablet = useMatchMedia(\`\${isWidthAtOrAbove('SM')} and \${isWidthBelow('MD')}\`)`           |
| `const { isDesktop } = useMediaQuery()`         | `const isDesktop = useMatchMedia(\`\${isWidthAtOrAbove('MD')} and \${isWidthBelow('LG')}\`)`          |
| `const { isWideScreen } = useMediaQuery()`      | `const isWideScreen = useMatchMedia(\`\${isWidthAtOrAbove('LG')} and \${isWidthBelow('XL')}\`)`       |
| `const { isSuperWideScreen } = useMediaQuery()` | `const isSuperWideScreen = useMatchMedia(\`\${isWidthAtOrAbove('XL')} and \${isWidthBelow('2XL')}\`)` |
| `const { is4KScreen } = useMediaQuery()`        | `const is4KScreen = useMatchMedia(isWidthAtOrAbove('2XL'))`                                           |
| `const { isMobile: mobile } = useMediaQuery()`  | `const mobile = useMatchMedia(isWidthBelow('SM'))`                                                    |

### `MediaStateProvider` removal

The `<MediaStateProvider>` wrapper is removed and its children are inlined.

| Before                                                        | After                     |
| ------------------------------------------------------------- | ------------------------- |
| `<MediaStateProvider><App /></MediaStateProvider>`            | `<App />`                 |
| `<MediaStateProvider><Header /><Main /></MediaStateProvider>` | `<><Header /><Main /></>` |

### Breakpoint constant inlining

Breakpoint constants are replaced with their numeric values and a `TODO` comment prompting migration to
the breakpoint helpers.

| Before                        | After                                                   |
| ----------------------------- | ------------------------------------------------------- |
| `MOBILE_BREAKPOINT`           | `768 /* TODO: Consider using breakpoint utilities … */` |
| `TABLET_BREAKPOINT`           | `1024 /* TODO: … */`                                    |
| `DESKTOP_BREAKPOINT`          | `1440 /* TODO: … */`                                    |
| `WIDESCREEN_BREAKPOINT`       | `1920 /* TODO: … */`                                    |
| `SUPER_WIDESCREEN_BREAKPOINT` | `2560 /* TODO: … */`                                    |

### Import updates

Old deprecated imports are removed. New utility imports are added only when needed:

| Condition                                             | Import added                                                            |
| ----------------------------------------------------- | ----------------------------------------------------------------------- |
| Any destructured `useMediaQuery` property transformed | `import { useMatchMedia } from '@reapit/elements/utils/match-media'`    |
| Any compound breakpoint expression used               | `import { isWidthAtOrAbove } from '@reapit/elements/utils/breakpoints'` |
| Any upper-bound breakpoint expression used            | `import { isWidthBelow } from '@reapit/elements/utils/breakpoints'`     |

## Limitations

### Non-destructured `useMediaQuery` calls

When the return value of `useMediaQuery()` is assigned to a plain variable (not destructured), the
codemod cannot safely determine which properties will be accessed at runtime. It adds a `TODO` comment
instead:

```tsx
// Before
const media = useMediaQuery();
return media.isMobile ? <Mobile /> : <Desktop />;

// After (manual migration required)
// TODO: Migrate to useMatchMedia — see @reapit/elements migration guide
const media = useMediaQuery();
return media.isMobile ? <Mobile /> : <Desktop />;
```

Migrate each property access manually to a separate `useMatchMedia` call.

### `MediaStateContext`

`MediaStateContext` cannot be safely auto-migrated because the codemod cannot statically determine how
the context value is consumed. A `TODO` comment is added and the import is removed.

### Breakpoint constants need manual review

Although numeric values are inlined for safety, the preferred long-term solution is to use
`isWidthAtOrAbove` / `isWidthBelow` directly. Review each inlined constant after running the codemod.

### `MediaType` type

The `MediaType` interface is removed. Type annotations using `MediaType` are replaced with a `TODO`
comment. Update these manually: a narrower interface or `ReturnType<typeof useMatchMedia>` is usually
the right replacement.
