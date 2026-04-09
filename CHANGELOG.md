# @reapit/elements

## 5.0.0-beta.87

### Major Changes

- **[Removed]** internal implementation details from component barrel files. Linaria styled elements, CSS class name constants, internal context objects, and internal hooks are no longer part of the public API. Only intentionally public exports remain accessible from `@reapit/elements`. ([#1276](https://github.com/reapit-global/gbl-ds-elements/pull/1276))

### Patch Changes

- **[Fixed]** borderless `TextInput` and `ComboboxButton` now use a transparent border instead of `border: none`, so focus styles render correctly and layout remains stable. ([#1279](https://github.com/reapit-global/gbl-ds-elements/pull/1279))

## 5.0.0-beta.86

### Major Changes

- **[Removed]** `Toggle`, `ToggleRadio`, and related exports from `src/deprecated/toggle`. Run the `replace-deprecated-toggle` codemod to migrate `Toggle` to `Switch`, and the `replace-deprecated-toggle-radio` codemod to migrate `ToggleRadio` to `ChipSelect`. ([#1272](https://github.com/reapit-global/gbl-ds-elements/pull/1272))

### Minor Changes

- **[Added]** `GalleryViewerCarousel` compound component at `src/core/gallery-viewer/carousel`. Provides an accessible, controlled image and video carousel with `GalleryViewerCarousel.Item`, `GalleryViewerCarousel.ItemCaption`, and `GalleryViewerCarousel.Button` subcomponents. All subcomponent prop types are accessible from the parent namespace (e.g. `GalleryViewerCarousel.ItemProps`). ([#1259](https://github.com/reapit-global/gbl-ds-elements/pull/1259))

- **[Added]** `GalleryViewer.MediaList` compound component. Renders a vertical `<ul>` of media items. Exposes `GalleryViewer.MediaListItem` and `GalleryViewer.MediaItemCaption`. ([#1270](https://github.com/reapit-global/gbl-ds-elements/pull/1270))

- **[Added]** `replace-deprecated-toggle` codemod. Migrates usages of the deprecated `Toggle` component to `Switch`. ([#1267](https://github.com/reapit-global/gbl-ds-elements/pull/1267))

- **[Added]** `replace-deprecated-toggle-radio` codemod. Migrates usages of the deprecated `ToggleRadio` component to `ChipSelect`. ([#1264](https://github.com/reapit-global/gbl-ds-elements/pull/1264))

- **[Added]** `GalleryViewerCarousel` now supports dynamic filtering of carousel items. When children are added to or removed from the track at runtime, the carousel automatically observes new items and unobserves removed ones. When the currently visible item is removed, the carousel snaps instantly to the first remaining item. ([#1271](https://github.com/reapit-global/gbl-ds-elements/pull/1271))

- **[Added]** `GalleryViewerMediaItem` and `GalleryViewerMediaItemCaption` components at `src/core/gallery-viewer/media-item`. ([#1259](https://github.com/reapit-global/gbl-ds-elements/pull/1259))

### Patch Changes

- **[Fixed]** `replace-deprecated-toggle` codemod now correctly escapes `"` and `&` characters in extracted `ElToggleItem` label text, preventing malformed JSX attribute values in the output. ([#1268](https://github.com/reapit-global/gbl-ds-elements/pull/1268))

## 5.0.0-beta.85

### Major Changes

- **[Removed]** `ImageFallback` component and its `image-fallback` module. Use `MediaFallback` (exported from `@reapit/elements`) instead. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253))

- **[Removed]** the experimental `SelectCustom` component and related exports from `@reapit/elements/lab/select-custom`. Use `Select` from `@reapit/elements/core/select` as the stable replacement. ([#1261](https://github.com/reapit-global/gbl-ds-elements/pull/1261))

### Minor Changes

- **[Added]** `@reapit/elements/deprecated/styles` subpath entry point. Re-exports `Intent`, `getIntentClassName`, and all deprecated CSS class helpers (`elIs*`, `elFlex*`, `elFade*`, etc.) that were previously only available from the top-level barrel. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256))

- **[Added]** `MediaFallback` shared utility component used internally by `Image.Fallback` and `Video.Fallback`. Accepts an optional `icon` and `children` message. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253))

- **[Added]** `Theme` type re-exported from `@reapit/elements/core/theme-provider`. Previously only available from the top-level barrel. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256))

- **[Added]** `Video` utility component. Renders a `<video>` element styled to fill its container with configurable `objectFit` behaviour. Shows a fallback UI when the video fails to load; the default fallback announces the error to screen readers via `aria-live="polite"`. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253))

- **[Added]** `variant` prop to `ComboboxButton`, `Select.Button`, and `Autocomplete.Button`, accepting `'default' | 'borderless'`. Use `variant="borderless"` to remove the border when embedding the button in a surface that provides its own border or background. ([#1262](https://github.com/reapit-global/gbl-ds-elements/pull/1262))

### Patch Changes

- **[Fixed]** TypeScript path resolution for top-level type declarations when using the `#src/*` import alias. ([#1249](https://github.com/reapit-global/gbl-ds-elements/pull/1249))

- **[Internal]** Extract shared codemod utilities into `codemods/shared/` to reduce duplication across transforms ([#1252](https://github.com/reapit-global/gbl-ds-elements/pull/1252))

- **[Changed]** Update CSS variables and design tokens to match Figma. Adds `black-000`, `white-000`, and `neutral-025` primitive tokens, removes the `transparent` primitive, and extends semantic colour tokens with `ai` variants for button fills, borders, and tertiary states across both Reapit and PayProp themes. Adds `gallery_viewer` semantic colour tokens for both themes. Adds a new `neutral` toast variant and renames the toast colour tokens — update any direct references to `--comp-toast-colour-fill-*` variables. ([#1260](https://github.com/reapit-global/gbl-ds-elements/pull/1260))

- **[Internal]** Update `rewrite-v5-imports` codemod export map to cover all remaining barrel-only exports. The codemod now maps `Intent`, `getIntentClassName`, deprecated CSS class helpers, and `Theme` to their new subpath entry points. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256))

## 5.0.0-beta.84

### Major Changes

- **[Changed]** `ElAccordionSummaryRightInfo` renamed to `ElAccordionSummaryAccessory`. Update any direct imports of this styled element. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235))

- **[Removed]** the experimental lab `SearchInput` component and its associated `SearchInputProps` type. Run the `replace-lab-search-input` codemod to migrate to the stable `SearchInput` in `core/search-input`. ([#1231](https://github.com/reapit-global/gbl-ds-elements/pull/1231))

- **[Removed]** `TABLE_ROW_PRIMARY_ACTION_Z_INDEX` and `TABLE_ROW_INTERACTIVE_ELEMENT_Z_INDEX` constants from `@reapit/elements`. These were internal implementation details and should not have been part of the public API. Remove any usages from your codebase. ([#1232](https://github.com/reapit-global/gbl-ds-elements/pull/1232))

### Minor Changes

- **[Added]** `accessory` prop to `AccordionSummary`, replacing `rightInfo` for displaying optional content alongside the accordion title. Updated Figma Code Connect to target the new Accordion header component. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235))

- **[Deprecated]** `rightInfo` prop on `AccordionSummary`. Use `accessory` instead. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235))

- **[Added]** `AccordionGroup` component. A layout wrapper that stacks multiple `Accordion` components in a vertical column. ([#1237](https://github.com/reapit-global/gbl-ds-elements/pull/1237))

- **[Added]** `GalleryViewerDialog.Header` and `GalleryViewerDialog.Content` subcomponents for structured, responsive layouts. ([#1230](https://github.com/reapit-global/gbl-ds-elements/pull/1230))

- **[Added]** `GalleryViewerDialog` component at `src/core/gallery-viewer/dialog`. Provides a responsive full-screen dialog for gallery content — inset with a semi-transparent backdrop on large screens (≥1440px), and full-viewport on smaller screens. ([#1228](https://github.com/reapit-global/gbl-ds-elements/pull/1228))

### Patch Changes

- **[Internal]** Update `CheckboxGroupControl` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1238](https://github.com/reapit-global/gbl-ds-elements/pull/1238))

- **[Internal]** Update `DescriptionList` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection. Wire `layout` and `children` props via `figma.enum` for stacked, inline, and grid variants, and add `size` prop mapping to `DescriptionList.Item` for stacked and inline item connections ([#1242](https://github.com/reapit-global/gbl-ds-elements/pull/1242))

- **[Internal]** Update `Dialog` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1239](https://github.com/reapit-global/gbl-ds-elements/pull/1239))

- **[Internal]** Update `Drawer` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1240](https://github.com/reapit-global/gbl-ds-elements/pull/1240))

- **[Internal]** Update `FocusedLayout` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection. Add Code Connect for `FocusedLayout.ProductLogo` and wire the `logo` prop via `figma.children` across all breakpoint mappings ([#1241](https://github.com/reapit-global/gbl-ds-elements/pull/1241))

- **[Internal]** Add Figma Code Connect for `AtAGlance`, `AnchorCard`, `ArticleCard`, and `ListboxOption` components ([#1236](https://github.com/reapit-global/gbl-ds-elements/pull/1236))

- **[Internal]** Serialise `@wyw-in-js/vite` transform calls to fix intermittent `AbortError` build failures under Vite 8. ([#1233](https://github.com/reapit-global/gbl-ds-elements/pull/1233))

## 5.0.0-beta.83

### Major Changes

- **[Changed]** `Image.Fallback` no longer renders a default message when `children` is omitted. Pass `children` explicitly to display a message. ([#1217](https://github.com/reapit-global/gbl-ds-elements/pull/1217))

- **[Changed]** `src` is now required on `Image` and `ResponsiveImage`. ([#1217](https://github.com/reapit-global/gbl-ds-elements/pull/1217))

- **[Changed]** `Image` now requires `width` and `height` props. Pass explicit CSS length strings to all `Image` usages (e.g. `width="300px"` `height="200px"` for fixed dimensions, or `width="100%"` `height="100%"` to fill a container). These props set CSS custom properties and are not forwarded as HTML `img` attributes. ([#1215](https://github.com/reapit-global/gbl-ds-elements/pull/1215))

- **[Removed]** `DeprecatedPagination` and related exports from `src/deprecated/pagination`. Use the `Pagination` component from `@reapit/elements/core/pagination` instead. Run the `replace-deprecated-pagination` codemod to migrate automatically. ([#1219](https://github.com/reapit-global/gbl-ds-elements/pull/1219))

- **[Removed]** the experimental `MobileNavItem` component from `@reapit/elements/lab/mobile-nav-item`. Run the `replace-lab-mobile-nav-item` codemod to migrate to `TopBar` components. ([#1223](https://github.com/reapit-global/gbl-ds-elements/pull/1223))

### Minor Changes

- **[Added]** `replace-deprecated-pagination` codemod. Migrates `DeprecatedPagination` to the stable `Pagination` component from `@reapit/elements/core/pagination`. ([#1216](https://github.com/reapit-global/gbl-ds-elements/pull/1216))

- **[Added]** `replace-lab-mobile-nav-item` codemod. Migrates `MobileNavItem` from `@reapit/elements/lab/mobile-nav-item` to the stable `TopBar` core components. ([#1218](https://github.com/reapit-global/gbl-ds-elements/pull/1218))

- **[Added]** `replace-lab-search-input` codemod. Migrates `SearchInput` from `lab/search-input` to the stable `SearchInput` from `core/search-input`. ([#1224](https://github.com/reapit-global/gbl-ds-elements/pull/1224))

- **[Added]** `GalleryViewerThumbnail` and `GalleryViewerThumbnailButton` components. Both render a thumbnail image with an optional video overlay. `Thumbnail` renders as an anchor for URL-driven navigation; `ThumbnailButton` renders as a button for click-handler-driven selection. ([#1207](https://github.com/reapit-global/gbl-ds-elements/pull/1207))

- **[Added]** `GalleryViewer.ThumbnailList` component and associated `GalleryViewer.Thumbnail` and `GalleryViewer.ThumbnailButton` sub-components for rendering a list of gallery thumbnails. ([#1215](https://github.com/reapit-global/gbl-ds-elements/pull/1215))

### Patch Changes

- **[Fixed]** Updated export map for `rewrite-v5-imports` codemod. ([#1221](https://github.com/reapit-global/gbl-ds-elements/pull/1221))

- **[Fixed]** `ChipSelectControl` text overflow and truncation now work correctly. ([#1222](https://github.com/reapit-global/gbl-ds-elements/pull/1222))

- **[Internal]** Run related unit tests for staged files in the pre-commit hook via `vitest related`. Tests run in parallel with the lint and format tasks, keeping the hook as fast as possible. ([#1220](https://github.com/reapit-global/gbl-ds-elements/pull/1220))

## 5.0.0-beta.82

### Minor Changes

- **[Added]** `whiteSpace` prop to `LineClamp`, supporting `normal`, `pre-line`, and `pre-wrap` values to control whitespace handling for static copy and user-authored API text. ([#1205](https://github.com/reapit-global/gbl-ds-elements/pull/1205))

### Patch Changes

- **[Security]** pin glob@^10 resolutions to 10.5.0 to mitigate a command injection vulnerability in the glob CLI (GHSA-w7j8-c9jp-gg2c). ([#1195](https://github.com/reapit-global/gbl-ds-elements/pull/1195))

- **[Fixed]** replace string icon props with individual icon components in the deprecated Snack stories and `useSnack` hook, restoring correct icon rendering in Storybook docs. ([#1199](https://github.com/reapit-global/gbl-ds-elements/pull/1199))

## 5.0.0-beta.81

### Major Changes

- **[Removed]** the experimental lab table components — `Table`, `TableBody`, `TableHead`, `TableHeaderCell`, `TableRow`, `SingleLineCell`, `DoubleLineCell`, `TableContainer`, `TableText`, and `TableToolbar`. Use the `replace-lab-table` codemod to migrate to the stable core `Table` API. The `TableProvider` and `useTableContext`, `TableRowSelection`, and `useRowSelection` exports are unaffected. ([#1193](https://github.com/reapit-global/gbl-ds-elements/pull/1193))

### Minor Changes

- **[Added]** `replace-lab-table` codemod to migrate supported `lab/table` components to the stable core `Table` API, including import rewrites, prop renames, and TODO comments for manual review points. ([#1183](https://github.com/reapit-global/gbl-ds-elements/pull/1183))

- **[Added]** Reapit Verify branding assets now supported by `AppSwitcher`, `FocusedLayout`, and `TopBar` ([#1185](https://github.com/reapit-global/gbl-ds-elements/pull/1185))

### Patch Changes

- **[Security]** pin minimatch resolutions to patched releases to mitigate known ReDoS vulnerabilities, including GHSA-7r86-cg39-jmmj. ([#1182](https://github.com/reapit-global/gbl-ds-elements/pull/1182))

- **[Fixed]** broken import in deprecated `FormLayout` docs ([#1191](https://github.com/reapit-global/gbl-ds-elements/pull/1191))

## 5.0.0-beta.80

### Major Changes

- **[Changed]** Move `Combobox` from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`. The component is also available from the `@reapit/elements/utils` barrel. Run the `rewrite-combobox-imports` codemod to migrate automatically. ([#1173](https://github.com/reapit-global/gbl-ds-elements/pull/1173))

- **[Removed]** `DeprecatedLabel`, `DeprecatedLabelProps`, and `ElDeprecatedLabel` from `src/deprecated/label`; run the existing `replace-deprecated-label` codemod before upgrading to migrate to `LabelText` and `LabelText.Props`. ([#1169](https://github.com/reapit-global/gbl-ds-elements/pull/1169))

- **[Removed]** the deprecated `useClickOutside` hook. Run the `inline-use-click-outside` codemod to migrate automatically. ([#1172](https://github.com/reapit-global/gbl-ds-elements/pull/1172))

- **[Removed]** the experimental `RadioGroup` component (`@reapit/elements/lab/radio-group`). Use the `replace-lab-radio-group` codemod to migrate to the stable `RadioGroupControl`. ([#1176](https://github.com/reapit-global/gbl-ds-elements/pull/1176))

- **[Removed]** the experimental `Radio` component (`@reapit/elements/lab/radio`). Use the `replace-lab-radio` codemod to migrate to the stable `RadioButton`. ([#1181](https://github.com/reapit-global/gbl-ds-elements/pull/1181))

### Minor Changes

- **[Added]** `Image` utility component. Supports fallback UI. On load failure, `Image` announces fallback text for meaningful images and keeps decorative images non-announcing. ([#1180](https://github.com/reapit-global/gbl-ds-elements/pull/1180))

- **[Added]** `replace-lab-radio` codemod to migrate from the experimental `Radio` component to the stable `RadioButton`, renaming the `isRequired` prop to `required` and removing the `hasError` prop. ([#1177](https://github.com/reapit-global/gbl-ds-elements/pull/1177))

- **[Added]** `replace-lab-radio-group` codemod to migrate from the experimental `RadioGroup` to the stable `RadioGroupControl`, renaming the `isRequired` and `errorMessage` props to `required` and `errorText`. ([#1174](https://github.com/reapit-global/gbl-ds-elements/pull/1174))

## 5.0.0-beta.79

### Major Changes

- **[Removed]** `DeprecatedBadge`, `DeprecatedBadgeGroup`, `DeprecatedBadgeProps`, `ElDeprecatedBadge`, `ElDeprecatedBadgeGroup`, and `ElDeprecatedBadgeGroupInner` from `src/deprecated/badge`. ([#1155](https://github.com/reapit-global/gbl-ds-elements/pull/1155))

  Use the `upgrade-deprecated-badge` codemod to migrate to `Badge` from `@reapit/elements/core/badge`.

- **[Removed]** `DeprecatedTag`, `DeprecatedTagGroup`, and related exports — run the `upgrade-deprecated-tag` codemod before upgrading to migrate to `Tag` and `TagGroup`. ([#1163](https://github.com/reapit-global/gbl-ds-elements/pull/1163))

### Minor Changes

- **[Changed]** `TextInput`, `Textarea`, `SelectNative`, `Combobox`, `CheckboxInput`, `RadioInput`, and `DateTimeInput` now trigger error styling when `aria-invalid="true"` and `data-show-validity="true"` are both set. `TextControl`, `TextareaControl`, `SelectNativeControl`, `SelectControl`, `AutocompleteControl`, `DateTimeControl`, `CheckboxControl`, `CheckboxGroupControl`, and `RadioGroupControl` now default `showValidity` to `true` when `errorText` is provided. Pass `showValidity={false}` explicitly to override. ([#1151](https://github.com/reapit-global/gbl-ds-elements/pull/1151))

- **[Added]** `replace-deprecated-label` codemod. Migrates `DeprecatedLabel` and `DeprecatedLabelProps` to `LabelText` and `LabelText.Props`. ([#1166](https://github.com/reapit-global/gbl-ds-elements/pull/1166))

- **[Added]** `inline-use-click-outside` codemod to replace deprecated `useClickOutside` calls with inline `useEffect` logic and remove Elements or facade imports. ([#1161](https://github.com/reapit-global/gbl-ds-elements/pull/1161))

### Patch Changes

- **[Internal]** Exclude `.figma.tsx` files from the Vite library build's icon entry point glob. ([#1153](https://github.com/reapit-global/gbl-ds-elements/pull/1153))

- **[Fixed]** Replace nested `<a>` with `<svg>` in `DeprecatedNavResponsive` logo to resolve invalid DOM nesting. ([#1150](https://github.com/reapit-global/gbl-ds-elements/pull/1150))

## 5.0.0-beta.78

### Patch Changes

- **[Internal]** Upgrade development-only dependencies ([#1149](https://github.com/reapit-global/gbl-ds-elements/pull/1149))

- **[Security]** pin `@isaacs/brace-expansion` to 5.0.1 to resolve GHSA-7h2j-956f-4vf2 (Uncontrolled Resource Consumption via unbounded brace range expansion). This is a dev-only dependency and does not affect the published package. ([#1144](https://github.com/reapit-global/gbl-ds-elements/pull/1144))

- **[Fixed]** `Drawer` backdrop is now transparent on XS breakpoints. ([#1146](https://github.com/reapit-global/gbl-ds-elements/pull/1146))

- **[Fixed]** `upgrade-deprecated-button-group` codemod no longer wraps children in `<ButtonGroup.Item>`, which is itself a button. ([#1148](https://github.com/reapit-global/gbl-ds-elements/pull/1148))

- **[Internal]** restrict the `post-checkout` hook to run only in linked worktrees so that `yarn install` runs automatically when a new linked worktree is created or when checking out a branch within a linked worktree, but is skipped in the main working tree. ([#1142](https://github.com/reapit-global/gbl-ds-elements/pull/1142))

- **[Internal]** Fix release workflow failing to create git tag and GitHub release after publishing to npm. ([#1147](https://github.com/reapit-global/gbl-ds-elements/pull/1147))

- **[Internal]** Update browserslist db ([#1145](https://github.com/reapit-global/gbl-ds-elements/pull/1145))

## 5.0.0-beta.77

### Major Changes

- **[Changed]** `useDrawerContext` now returns `DrawerContext.Value | null` instead of throwing when called outside a `Drawer`. ([#1141](https://github.com/reapit-global/gbl-ds-elements/pull/1141))

- **[Removed]** `DeprecatedIcon` and `DeprecatedIcons`. Use icon components from `@reapit/elements/icons` instead. Run the `upgrade-deprecated-icon` codemod to migrate usages automatically. ([#1119](https://github.com/reapit-global/gbl-ds-elements/pull/1119))

- **[Removed]** `DeprecatedButton`, `DeprecatedButtonGroup`, and `DeprecatedFloatingButton` and all associated types and styles. Run the `upgrade-deprecated-button` codemod to migrate `DeprecatedButton` usages to the `Button` API before upgrading. Run the `upgrade-deprecated-button-group` codemod to migrate `DeprecatedButtonGroup` usages. `DeprecatedFloatingButton` usages must be migrated manually. ([#1126](https://github.com/reapit-global/gbl-ds-elements/pull/1126))

- **[Removed]** the deprecated `useMediaQuery` hook and related exports. Use the `upgrade-deprecated-use-media-query` codemod to migrate usages automatically. ([#1131](https://github.com/reapit-global/gbl-ds-elements/pull/1131))

- **[Removed]** `DeprecatedSplitButton`, `DeprecatedActionButton`, and `DeprecatedMenuButton`. Use the `upgrade-deprecated-split-button` codemod to migrate to the new `SplitButton` API. ([#1124](https://github.com/reapit-global/gbl-ds-elements/pull/1124))

### Minor Changes

- **[Added]** `autoFlow` and `justifyContent` props to `ButtonGroup`. ([#1135](https://github.com/reapit-global/gbl-ds-elements/pull/1135))

  - `autoFlow?: 'row' | 'column'` — controls the direction the buttons flow when they wrap.
  - `justifyContent?: 'start' | 'end' | 'center' | 'stretch'` — controls the alignment of buttons along the main axis.

  The default behaviour preserves the existing horizontal button arrangement.

- **[Added]** `upgrade-deprecated-badge` codemod to migrate from `DeprecatedBadge` to the new `Badge`, mapping `intent` to `colour` and replacing `DeprecatedBadgeGroup` with an equivalent `div` layout. ([#1123](https://github.com/reapit-global/gbl-ds-elements/pull/1123))

- **[Added]** `upgrade-deprecated-button-group` codemod to migrate from `DeprecatedButtonGroup` to the new `ButtonGroup`, mapping `alignment` to `justifyContent` and wrapping static children in `<ButtonGroup.Item>`. ([#1136](https://github.com/reapit-global/gbl-ds-elements/pull/1136))

- **[Added]** `upgrade-deprecated-use-media-query` codemod to migrate deprecated `useMediaQuery` and related exports to individual `useMatchMedia` calls and breakpoint utilities ([#1120](https://github.com/reapit-global/gbl-ds-elements/pull/1120))

- **[Added]** `upgrade-deprecated-tag` codemod to migrate `DeprecatedTag` and `DeprecatedTagGroup` imports and JSX usage to the new `Tag` and `TagGroup` components, removing `intent` props and rewriting `DeprecatedTagProps` type references to `Tag.Props`. ([#1138](https://github.com/reapit-global/gbl-ds-elements/pull/1138))

### Patch Changes

- **[Internal]** Add custom changelog formatter for changesets. ([#1140](https://github.com/reapit-global/gbl-ds-elements/pull/1140))

- **[Fixed]** Icon spacing in deprecated `Snack` and `TableCell` components after `DeprecatedIcon` removal. ([#1128](https://github.com/reapit-global/gbl-ds-elements/pull/1128))

- **[Fixed]** `upgrade-deprecated-button` codemod incorrectly rewriting facade package import paths to subpaths. ([#1125](https://github.com/reapit-global/gbl-ds-elements/pull/1125))

- **[Internal]** Add pre-commit and pre-push git hooks (Husky v9 + lint-staged) ([#1112](https://github.com/reapit-global/gbl-ds-elements/pull/1112))

- **[Fixed]** Update the export map for the `rewrite-v5-imports` codemod post-removal of `DeprecatedIcon` ([#1130](https://github.com/reapit-global/gbl-ds-elements/pull/1130))

## 5.0.0-beta.76

### Major Changes

- **[Removed]** CJS build output. The package now ships ES modules only. Consumers using `require('@reapit/elements')` must migrate to `import`. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Removed]** Legacy-reapit token files and `globals.ts`. Internal CSS custom properties have been fully migrated to v5 design tokens. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Removed]** `Text` and `font` from the main entry point. `Text` is now available via `@reapit/elements/utils/text` and `font` via `@reapit/elements/utils/font`. Use the `rewrite-text-font-imports` codemod to migrate. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))

### Minor Changes

- **[Added]** `Heading` utility component for prototyping UI not yet supported by the Design System. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Added]** `rewrite-v4-imports` codemod to migrate from v4 components to their deprecated v5 equivalents, including support for `TextArea` and `NavResponsiveOption`. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Added]** `rewrite-v5-imports` codemod to migrate from barrel imports to v5 subpath imports. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Added]** `upgrade-deprecated-button` codemod to migrate from `DeprecatedButton` to the new `Button`, preserving import aliases. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Added]** `upgrade-deprecated-icon` codemod to migrate from deprecated icon components. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Added]** `upgrade-css-variables` codemod to migrate legacy CSS custom properties to v5 equivalents, including support for bare palette colours and legacy Reapit tokens. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Added]** `apply-textarea-field-sizing` codemod. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))

### Patch Changes

- **[Fixed]** `upgrade-css-variables` corrupting `.tsx` files containing template literals. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Security]** Fix `brace-expansion` resolution to address CVE-2025-5889. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Fixed]** Missing entry points for deprecated units of code with `index.tsx` modules, allowing them to be imported from the `@reapit/elements/deprecated/*` subpath. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
- **[Internal]** Migrate release process to changesets. Versioning, changelog generation, and npm publishing are now automated via `changesets/action`. Contributors add a changeset file per PR; the release workflow handles the rest. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))
