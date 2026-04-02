# @reapit/elements

## 5.0.0-beta.85

### Major Changes

- **[Removed]** `ImageFallback` component and its `image-fallback` module. Use `MediaFallback` (exported from `@reapit/elements`) instead. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253), [`c19d7d1`](https://github.com/reapit-global/gbl-ds-elements/commit/c19d7d1730f98b0217409cbcc3c524dec802d167), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** the experimental `SelectCustom` component and related exports from `@reapit/elements/lab/select-custom`. Use `Select` from `@reapit/elements/core/select` as the stable replacement. ([#1261](https://github.com/reapit-global/gbl-ds-elements/pull/1261), [`927f955`](https://github.com/reapit-global/gbl-ds-elements/commit/927f9558d6ed7720a9b5694f4ac9e57e76449395), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** `@reapit/elements/deprecated/styles` subpath entry point. Re-exports `Intent`, `getIntentClassName`, and all deprecated CSS class helpers (`elIs*`, `elFlex*`, `elFade*`, etc.) that were previously only available from the top-level barrel. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256), [`3a54b08`](https://github.com/reapit-global/gbl-ds-elements/commit/3a54b0842b2c1090e8f22bcf1ff7224fd96d904c), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `MediaFallback` shared utility component used internally by `Image.Fallback` and `Video.Fallback`. Accepts an optional `icon` and `children` message. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253), [`c19d7d1`](https://github.com/reapit-global/gbl-ds-elements/commit/c19d7d1730f98b0217409cbcc3c524dec802d167), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `Theme` type re-exported from `@reapit/elements/core/theme-provider`. Previously only available from the top-level barrel. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256), [`3a54b08`](https://github.com/reapit-global/gbl-ds-elements/commit/3a54b0842b2c1090e8f22bcf1ff7224fd96d904c), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `Video` utility component. Renders a `<video>` element styled to fill its container with configurable `objectFit` behaviour. Shows a fallback UI when the video fails to load; the default fallback announces the error to screen readers via `aria-live="polite"`. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253), [`c19d7d1`](https://github.com/reapit-global/gbl-ds-elements/commit/c19d7d1730f98b0217409cbcc3c524dec802d167), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `variant` prop to `ComboboxButton`, `Select.Button`, and `Autocomplete.Button`, accepting `'default' | 'borderless'`. Use `variant="borderless"` to remove the border when embedding the button in a surface that provides its own border or background. ([#1262](https://github.com/reapit-global/gbl-ds-elements/pull/1262), [`69261e2`](https://github.com/reapit-global/gbl-ds-elements/commit/69261e21498b718758fe5b1e9c125d4d3ff3f6eb), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Fixed]** TypeScript path resolution for top-level type declarations when using the `#src/*` import alias. ([#1249](https://github.com/reapit-global/gbl-ds-elements/pull/1249), [`4434e90`](https://github.com/reapit-global/gbl-ds-elements/commit/4434e90cc73b1085d0dbbb8e6586fef5ee46fc3c), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Extract shared codemod utilities into `codemods/shared/` to reduce duplication across transforms ([#1252](https://github.com/reapit-global/gbl-ds-elements/pull/1252), [`b8d4a99`](https://github.com/reapit-global/gbl-ds-elements/commit/b8d4a99564650883e68a884143bb1355c809d5a9), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Changed]** Update CSS variables and design tokens to match Figma. Adds `black-000`, `white-000`, and `neutral-025` primitive tokens, removes the `transparent` primitive, and extends semantic colour tokens with `ai` variants for button fills, borders, and tertiary states across both Reapit and PayProp themes. Adds `gallery_viewer` semantic colour tokens for both themes. Adds a new `neutral` toast variant and renames the toast colour tokens — update any direct references to `--comp-toast-colour-fill-*` variables. ([#1260](https://github.com/reapit-global/gbl-ds-elements/pull/1260), [`192e3dd`](https://github.com/reapit-global/gbl-ds-elements/commit/192e3ddb81575b625401ef13f5cce09f757cca32), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Update `rewrite-v5-imports` codemod export map to cover all remaining barrel-only exports. The codemod now maps `Intent`, `getIntentClassName`, deprecated CSS class helpers, and `Theme` to their new subpath entry points. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256), [`3a54b08`](https://github.com/reapit-global/gbl-ds-elements/commit/3a54b0842b2c1090e8f22bcf1ff7224fd96d904c), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.84

### Major Changes

- **[Changed]** `ElAccordionSummaryRightInfo` renamed to `ElAccordionSummaryAccessory`. Update any direct imports of this styled element. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235), [`c2da4e9`](https://github.com/reapit-global/gbl-ds-elements/commit/c2da4e95ca8bf954e8f1c278cda254fea10e140a), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** the experimental lab `SearchInput` component and its associated `SearchInputProps` type. Run the `replace-lab-search-input` codemod to migrate to the stable `SearchInput` in `core/search-input`. ([#1231](https://github.com/reapit-global/gbl-ds-elements/pull/1231), [`f5c15f0`](https://github.com/reapit-global/gbl-ds-elements/commit/f5c15f04d8dc39c6d7a54fd80c15c3924ba59218), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** `TABLE_ROW_PRIMARY_ACTION_Z_INDEX` and `TABLE_ROW_INTERACTIVE_ELEMENT_Z_INDEX` constants from `@reapit/elements`. These were internal implementation details and should not have been part of the public API. Remove any usages from your codebase. ([#1232](https://github.com/reapit-global/gbl-ds-elements/pull/1232), [`a9b6145`](https://github.com/reapit-global/gbl-ds-elements/commit/a9b6145b64fdd582c3d2643fcf00859ee7f318de), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** `accessory` prop to `AccordionSummary`, replacing `rightInfo` for displaying optional content alongside the accordion title. Updated Figma Code Connect to target the new Accordion header component. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235), [`c2da4e9`](https://github.com/reapit-global/gbl-ds-elements/commit/c2da4e95ca8bf954e8f1c278cda254fea10e140a), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Deprecated]** `rightInfo` prop on `AccordionSummary`. Use `accessory` instead. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235), [`c2da4e9`](https://github.com/reapit-global/gbl-ds-elements/commit/c2da4e95ca8bf954e8f1c278cda254fea10e140a), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `AccordionGroup` component. A layout wrapper that stacks multiple `Accordion` components in a vertical column. ([#1237](https://github.com/reapit-global/gbl-ds-elements/pull/1237), [`bb4abc1`](https://github.com/reapit-global/gbl-ds-elements/commit/bb4abc13f6bb410f8195b43c2fc91d780f804056), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `GalleryViewerDialog.Header` and `GalleryViewerDialog.Content` subcomponents for structured, responsive layouts. ([#1230](https://github.com/reapit-global/gbl-ds-elements/pull/1230), [`36bacce`](https://github.com/reapit-global/gbl-ds-elements/commit/36baccee61b15b837f3ddfe5660ceb328618736a), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `GalleryViewerDialog` component at `src/core/gallery-viewer/dialog`. Provides a responsive full-screen dialog for gallery content — inset with a semi-transparent backdrop on large screens (≥1440px), and full-viewport on smaller screens. ([#1228](https://github.com/reapit-global/gbl-ds-elements/pull/1228), [`4314045`](https://github.com/reapit-global/gbl-ds-elements/commit/431404594583137cd0da576d6c77f7fb22dc1717), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Internal]** Update `CheckboxGroupControl` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1238](https://github.com/reapit-global/gbl-ds-elements/pull/1238), [`7311643`](https://github.com/reapit-global/gbl-ds-elements/commit/73116430a98bf065f5868d7a9b343a8f572d68eb), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Update `DescriptionList` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection. Wire `layout` and `children` props via `figma.enum` for stacked, inline, and grid variants, and add `size` prop mapping to `DescriptionList.Item` for stacked and inline item connections ([#1242](https://github.com/reapit-global/gbl-ds-elements/pull/1242), [`b3f189b`](https://github.com/reapit-global/gbl-ds-elements/commit/b3f189b96e3ec391829a1be3e61f1a01d91102d7), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Update `Dialog` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1239](https://github.com/reapit-global/gbl-ds-elements/pull/1239), [`52ffcc6`](https://github.com/reapit-global/gbl-ds-elements/commit/52ffcc67d0dd43533698d1095ff3460ba5aec1c2), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Update `Drawer` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1240](https://github.com/reapit-global/gbl-ds-elements/pull/1240), [`2c8cf98`](https://github.com/reapit-global/gbl-ds-elements/commit/2c8cf98896a6bce5d8d72c80d67af254038ebfd2), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Update `FocusedLayout` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection. Add Code Connect for `FocusedLayout.ProductLogo` and wire the `logo` prop via `figma.children` across all breakpoint mappings ([#1241](https://github.com/reapit-global/gbl-ds-elements/pull/1241), [`d9a550d`](https://github.com/reapit-global/gbl-ds-elements/commit/d9a550d248019d2b25ab9ead4c1d39ad60cdaac8), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Add Figma Code Connect for `AtAGlance`, `AnchorCard`, `ArticleCard`, and `ListboxOption` components ([#1236](https://github.com/reapit-global/gbl-ds-elements/pull/1236), [`24fc625`](https://github.com/reapit-global/gbl-ds-elements/commit/24fc62536f886957c52a7ce1ddf870ee1c487902), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Serialise `@wyw-in-js/vite` transform calls to fix intermittent `AbortError` build failures under Vite 8. ([#1233](https://github.com/reapit-global/gbl-ds-elements/pull/1233), [`5c61956`](https://github.com/reapit-global/gbl-ds-elements/commit/5c619568f4b4effb6028611c288bdd2d664e6f84), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.83

### Major Changes

- **[Changed]** `Image.Fallback` no longer renders a default message when `children` is omitted. Pass `children` explicitly to display a message. ([#1217](https://github.com/reapit-global/gbl-ds-elements/pull/1217), [`f6bc9f1`](https://github.com/reapit-global/gbl-ds-elements/commit/f6bc9f191c93a46a919e035fd95c89c9735a7fe3), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Changed]** `src` is now required on `Image` and `ResponsiveImage`. ([#1217](https://github.com/reapit-global/gbl-ds-elements/pull/1217), [`f6bc9f1`](https://github.com/reapit-global/gbl-ds-elements/commit/f6bc9f191c93a46a919e035fd95c89c9735a7fe3), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Changed]** `Image` now requires `width` and `height` props. Pass explicit CSS length strings to all `Image` usages (e.g. `width="300px"` `height="200px"` for fixed dimensions, or `width="100%"` `height="100%"` to fill a container). These props set CSS custom properties and are not forwarded as HTML `img` attributes. ([#1215](https://github.com/reapit-global/gbl-ds-elements/pull/1215), [`00df546`](https://github.com/reapit-global/gbl-ds-elements/commit/00df54623c50605463ace14904f611882c3e8297), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** `DeprecatedPagination` and related exports from `src/deprecated/pagination`. Use the `Pagination` component from `@reapit/elements/core/pagination` instead. Run the `replace-deprecated-pagination` codemod to migrate automatically. ([#1219](https://github.com/reapit-global/gbl-ds-elements/pull/1219), [`d69a604`](https://github.com/reapit-global/gbl-ds-elements/commit/d69a60460eafdbf8f9df48421dd7abd2a7bd0094), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** the experimental `MobileNavItem` component from `@reapit/elements/lab/mobile-nav-item`. Run the `replace-lab-mobile-nav-item` codemod to migrate to `TopBar` components. ([#1223](https://github.com/reapit-global/gbl-ds-elements/pull/1223), [`347f4cd`](https://github.com/reapit-global/gbl-ds-elements/commit/347f4cd82179136735829a1539cc00d8fda0348f), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** `replace-deprecated-pagination` codemod. Migrates `DeprecatedPagination` to the stable `Pagination` component from `@reapit/elements/core/pagination`. ([#1216](https://github.com/reapit-global/gbl-ds-elements/pull/1216), [`437fc3c`](https://github.com/reapit-global/gbl-ds-elements/commit/437fc3cbe57433f3d0e4dddc6c401190cccae471), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `replace-lab-mobile-nav-item` codemod. Migrates `MobileNavItem` from `@reapit/elements/lab/mobile-nav-item` to the stable `TopBar` core components. ([#1218](https://github.com/reapit-global/gbl-ds-elements/pull/1218), [`971033e`](https://github.com/reapit-global/gbl-ds-elements/commit/971033e9cebfea5c4ada8f4a70d59f5d81ed121a), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `replace-lab-search-input` codemod. Migrates `SearchInput` from `lab/search-input` to the stable `SearchInput` from `core/search-input`. ([#1224](https://github.com/reapit-global/gbl-ds-elements/pull/1224), [`9c62f31`](https://github.com/reapit-global/gbl-ds-elements/commit/9c62f31b7cbc72eee9632e4a9b3966687aa82151), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `GalleryViewerThumbnail` and `GalleryViewerThumbnailButton` components. Both render a thumbnail image with an optional video overlay. `Thumbnail` renders as an anchor for URL-driven navigation; `ThumbnailButton` renders as a button for click-handler-driven selection. ([#1207](https://github.com/reapit-global/gbl-ds-elements/pull/1207), [`0d95444`](https://github.com/reapit-global/gbl-ds-elements/commit/0d95444ffa6c5f6816848c86fc2f937f8ddf1b2f), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `GalleryViewer.ThumbnailList` component and associated `GalleryViewer.Thumbnail` and `GalleryViewer.ThumbnailButton` sub-components for rendering a list of gallery thumbnails. ([#1215](https://github.com/reapit-global/gbl-ds-elements/pull/1215), [`00df546`](https://github.com/reapit-global/gbl-ds-elements/commit/00df54623c50605463ace14904f611882c3e8297), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Fixed]** Updated export map for `rewrite-v5-imports` codemod. ([#1221](https://github.com/reapit-global/gbl-ds-elements/pull/1221), [`e5e30f1`](https://github.com/reapit-global/gbl-ds-elements/commit/e5e30f1233bcd386c10eb5a16ebe7865306877c6), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** `ChipSelectControl` text overflow and truncation now work correctly. ([#1222](https://github.com/reapit-global/gbl-ds-elements/pull/1222), [`a8cbe79`](https://github.com/reapit-global/gbl-ds-elements/commit/a8cbe796b1dba5796d990c3f50d6f880b811fe3a), [@copilot-swe-agent](https://github.com/apps/copilot-swe-agent))

- **[Internal]** Run related unit tests for staged files in the pre-commit hook via `vitest related`. Tests run in parallel with the lint and format tasks, keeping the hook as fast as possible. ([#1220](https://github.com/reapit-global/gbl-ds-elements/pull/1220), [`511bdde`](https://github.com/reapit-global/gbl-ds-elements/commit/511bdde2599b3b603e9e36bb185202ccfe2b3985), [@copilot-swe-agent](https://github.com/apps/copilot-swe-agent))

## 5.0.0-beta.82

### Minor Changes

- **[Added]** `whiteSpace` prop to `LineClamp`, supporting `normal`, `pre-line`, and `pre-wrap` values to control whitespace handling for static copy and user-authored API text. ([#1205](https://github.com/reapit-global/gbl-ds-elements/pull/1205), [`5c2433d`](https://github.com/reapit-global/gbl-ds-elements/commit/5c2433dc765d8e0519ce047813075276cb981b04), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Security]** pin glob@^10 resolutions to 10.5.0 to mitigate a command injection vulnerability in the glob CLI (GHSA-w7j8-c9jp-gg2c). ([#1195](https://github.com/reapit-global/gbl-ds-elements/pull/1195), [`ed044b1`](https://github.com/reapit-global/gbl-ds-elements/commit/ed044b1bf26643d593f9d3c89e81e286c18b64a8), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** replace string icon props with individual icon components in the deprecated Snack stories and `useSnack` hook, restoring correct icon rendering in Storybook docs. ([#1199](https://github.com/reapit-global/gbl-ds-elements/pull/1199), [`e96c4af`](https://github.com/reapit-global/gbl-ds-elements/commit/e96c4afb87ea93b48540b365c4ef6c50fad13a29), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.81

### Major Changes

- **[Removed]** the experimental lab table components — `Table`, `TableBody`, `TableHead`, `TableHeaderCell`, `TableRow`, `SingleLineCell`, `DoubleLineCell`, `TableContainer`, `TableText`, and `TableToolbar`. Use the `replace-lab-table` codemod to migrate to the stable core `Table` API. The `TableProvider` and `useTableContext`, `TableRowSelection`, and `useRowSelection` exports are unaffected. ([#1193](https://github.com/reapit-global/gbl-ds-elements/pull/1193), [`ef3dad9`](https://github.com/reapit-global/gbl-ds-elements/commit/ef3dad9e9b2ca3e7d54467cc61d432bdae6b028f), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** `replace-lab-table` codemod to migrate supported `lab/table` components to the stable core `Table` API, including import rewrites, prop renames, and TODO comments for manual review points. ([#1183](https://github.com/reapit-global/gbl-ds-elements/pull/1183), [`0e32505`](https://github.com/reapit-global/gbl-ds-elements/commit/0e32505a5b6b75f485344414aa2fe5c907a798b0), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** Reapit Verify branding assets now supported by `AppSwitcher`, `FocusedLayout`, and `TopBar` ([#1185](https://github.com/reapit-global/gbl-ds-elements/pull/1185), [`a2b60ab`](https://github.com/reapit-global/gbl-ds-elements/commit/a2b60ab8cbfbfd3a80c6f7d65af640c4032c7088), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Security]** pin minimatch resolutions to patched releases to mitigate known ReDoS vulnerabilities, including GHSA-7r86-cg39-jmmj. ([#1182](https://github.com/reapit-global/gbl-ds-elements/pull/1182), [`6d5d9d7`](https://github.com/reapit-global/gbl-ds-elements/commit/6d5d9d73552672956a094215f8f393660ee588d1), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** broken import in deprecated `FormLayout` docs ([#1191](https://github.com/reapit-global/gbl-ds-elements/pull/1191), [`fc24161`](https://github.com/reapit-global/gbl-ds-elements/commit/fc241614c51554d6776b308fc3895eaccdce7b71), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.80

### Major Changes

- **[Changed]** Move `Combobox` from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`. The component is also available from the `@reapit/elements/utils` barrel. Run the `rewrite-combobox-imports` codemod to migrate automatically. ([#1173](https://github.com/reapit-global/gbl-ds-elements/pull/1173), [`f959fc3`](https://github.com/reapit-global/gbl-ds-elements/commit/f959fc3ff6f3185315394cf947b8deeb29b38477), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** `DeprecatedLabel`, `DeprecatedLabelProps`, and `ElDeprecatedLabel` from `src/deprecated/label`; run the existing `replace-deprecated-label` codemod before upgrading to migrate to `LabelText` and `LabelText.Props`. ([#1169](https://github.com/reapit-global/gbl-ds-elements/pull/1169), [`3b1fec4`](https://github.com/reapit-global/gbl-ds-elements/commit/3b1fec43942f69da5aa6f5b0d6fbae94ddba6d1e), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** the deprecated `useClickOutside` hook. Run the `inline-use-click-outside` codemod to migrate automatically. ([#1172](https://github.com/reapit-global/gbl-ds-elements/pull/1172), [`abcb7e7`](https://github.com/reapit-global/gbl-ds-elements/commit/abcb7e7fb8bf96b7bf236fc28e56cdfbd2265376), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** the experimental `RadioGroup` component (`@reapit/elements/lab/radio-group`). Use the `replace-lab-radio-group` codemod to migrate to the stable `RadioGroupControl`. ([#1176](https://github.com/reapit-global/gbl-ds-elements/pull/1176), [`d44ac7c`](https://github.com/reapit-global/gbl-ds-elements/commit/d44ac7c7d0c1cf37ad31e8fcf28fbb1c45199913), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** the experimental `Radio` component (`@reapit/elements/lab/radio`). Use the `replace-lab-radio` codemod to migrate to the stable `RadioButton`. ([#1181](https://github.com/reapit-global/gbl-ds-elements/pull/1181), [`24ed176`](https://github.com/reapit-global/gbl-ds-elements/commit/24ed1767fa7b1735a3681098e6b23b9f0cc8cc8a), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** `Image` utility component. Supports fallback UI. On load failure, `Image` announces fallback text for meaningful images and keeps decorative images non-announcing. ([#1180](https://github.com/reapit-global/gbl-ds-elements/pull/1180), [`2ad8ef1`](https://github.com/reapit-global/gbl-ds-elements/commit/2ad8ef1ea3d0861d34294518e2f5d4e738c84e94), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `replace-lab-radio` codemod to migrate from the experimental `Radio` component to the stable `RadioButton`, renaming the `isRequired` prop to `required` and removing the `hasError` prop. ([#1177](https://github.com/reapit-global/gbl-ds-elements/pull/1177), [`907b938`](https://github.com/reapit-global/gbl-ds-elements/commit/907b93830293f0c07d181d8d3448c2f99abf43f8), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `replace-lab-radio-group` codemod to migrate from the experimental `RadioGroup` to the stable `RadioGroupControl`, renaming the `isRequired` and `errorMessage` props to `required` and `errorText`. ([#1174](https://github.com/reapit-global/gbl-ds-elements/pull/1174), [`777fb1b`](https://github.com/reapit-global/gbl-ds-elements/commit/777fb1bca83fd87c356846c98c4649855076cf33), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.79

### Major Changes

- **[Removed]** `DeprecatedBadge`, `DeprecatedBadgeGroup`, `DeprecatedBadgeProps`, `ElDeprecatedBadge`, `ElDeprecatedBadgeGroup`, and `ElDeprecatedBadgeGroupInner` from `src/deprecated/badge`. ([#1155](https://github.com/reapit-global/gbl-ds-elements/pull/1155), [`cd7a6cf`](https://github.com/reapit-global/gbl-ds-elements/commit/cd7a6cfa72f034373e8c8a7c72c92791c90e7f6b), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

  Use the `upgrade-deprecated-badge` codemod to migrate to `Badge` from `@reapit/elements/core/badge`.

- **[Removed]** `DeprecatedTag`, `DeprecatedTagGroup`, and related exports — run the `upgrade-deprecated-tag` codemod before upgrading to migrate to `Tag` and `TagGroup`. ([#1163](https://github.com/reapit-global/gbl-ds-elements/pull/1163), [`f82b10d`](https://github.com/reapit-global/gbl-ds-elements/commit/f82b10d514a4169a4a8dffb52d8c46aa270a86b2), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Changed]** `TextInput`, `Textarea`, `SelectNative`, `Combobox`, `CheckboxInput`, `RadioInput`, and `DateTimeInput` now trigger error styling when `aria-invalid="true"` and `data-show-validity="true"` are both set. `TextControl`, `TextareaControl`, `SelectNativeControl`, `SelectControl`, `AutocompleteControl`, `DateTimeControl`, `CheckboxControl`, `CheckboxGroupControl`, and `RadioGroupControl` now default `showValidity` to `true` when `errorText` is provided. Pass `showValidity={false}` explicitly to override. ([#1151](https://github.com/reapit-global/gbl-ds-elements/pull/1151), [`b9dfa21`](https://github.com/reapit-global/gbl-ds-elements/commit/b9dfa212a9ea3430ad183ab515b710c5802c15e3), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `replace-deprecated-label` codemod. Migrates `DeprecatedLabel` and `DeprecatedLabelProps` to `LabelText` and `LabelText.Props`. ([#1166](https://github.com/reapit-global/gbl-ds-elements/pull/1166), [`d0dad83`](https://github.com/reapit-global/gbl-ds-elements/commit/d0dad83f2b88922975646bbf42d07223573f887a), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `inline-use-click-outside` codemod to replace deprecated `useClickOutside` calls with inline `useEffect` logic and remove Elements or facade imports. ([#1161](https://github.com/reapit-global/gbl-ds-elements/pull/1161), [`0df6796`](https://github.com/reapit-global/gbl-ds-elements/commit/0df6796e243c74ea878d2dded9197a941a0a847f), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Internal]** Exclude `.figma.tsx` files from the Vite library build's icon entry point glob. ([#1153](https://github.com/reapit-global/gbl-ds-elements/pull/1153), [`0c0fef6`](https://github.com/reapit-global/gbl-ds-elements/commit/0c0fef6714f9515763b63c7a1a8ac83e708f6448), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** Replace nested `<a>` with `<svg>` in `DeprecatedNavResponsive` logo to resolve invalid DOM nesting. ([#1150](https://github.com/reapit-global/gbl-ds-elements/pull/1150), [`b7f178f`](https://github.com/reapit-global/gbl-ds-elements/commit/b7f178ffee0b9af5ebe13cd721f093659d5ff91f), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.78

### Patch Changes

- **[Internal]** Upgrade development-only dependencies ([#1149](https://github.com/reapit-global/gbl-ds-elements/pull/1149), [`efbddbc`](https://github.com/reapit-global/gbl-ds-elements/commit/efbddbcbd9994f1d2b9b42b14bf156b0f6d1060f), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Security]** pin `@isaacs/brace-expansion` to 5.0.1 to resolve GHSA-7h2j-956f-4vf2 (Uncontrolled Resource Consumption via unbounded brace range expansion). This is a dev-only dependency and does not affect the published package. ([#1144](https://github.com/reapit-global/gbl-ds-elements/pull/1144), [`9c37ed7`](https://github.com/reapit-global/gbl-ds-elements/commit/9c37ed7581e1cf4dc7a05d28922cc4e22d34223c), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** `Drawer` backdrop is now transparent on XS breakpoints. ([#1146](https://github.com/reapit-global/gbl-ds-elements/pull/1146), [`7cc55f5`](https://github.com/reapit-global/gbl-ds-elements/commit/7cc55f51c4868f681848fc87b6892e2333372d14), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** `upgrade-deprecated-button-group` codemod no longer wraps children in `<ButtonGroup.Item>`, which is itself a button. ([#1148](https://github.com/reapit-global/gbl-ds-elements/pull/1148), [`16ea8a7`](https://github.com/reapit-global/gbl-ds-elements/commit/16ea8a772def96a326ffe688d2706826464ecfb0), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** restrict the `post-checkout` hook to run only in linked worktrees so that `yarn install` runs automatically when a new linked worktree is created or when checking out a branch within a linked worktree, but is skipped in the main working tree. ([#1142](https://github.com/reapit-global/gbl-ds-elements/pull/1142), [`f28b29b`](https://github.com/reapit-global/gbl-ds-elements/commit/f28b29b87ce31e13138f8e147a47f95bbdf6d4e3), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Fix release workflow failing to create git tag and GitHub release after publishing to npm. ([#1147](https://github.com/reapit-global/gbl-ds-elements/pull/1147), [`90b464a`](https://github.com/reapit-global/gbl-ds-elements/commit/90b464aa9a1c65366802c8ec2ef3b0de7dca387b), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Update browserslist db ([#1145](https://github.com/reapit-global/gbl-ds-elements/pull/1145), [`6830293`](https://github.com/reapit-global/gbl-ds-elements/commit/6830293ad91420f325ac5daabb83aeee74232cc2), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.77

### Major Changes

- **[Changed]** `useDrawerContext` now returns `DrawerContext.Value | null` instead of throwing when called outside a `Drawer`. ([#1141](https://github.com/reapit-global/gbl-ds-elements/pull/1141), [`4e6232e`](https://github.com/reapit-global/gbl-ds-elements/commit/4e6232e01e39a8aed463bd6a6a811ea2130d48d2), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** `DeprecatedIcon` and `DeprecatedIcons`. Use icon components from `@reapit/elements/icons` instead. Run the `upgrade-deprecated-icon` codemod to migrate usages automatically. ([#1119](https://github.com/reapit-global/gbl-ds-elements/pull/1119), [`f538546`](https://github.com/reapit-global/gbl-ds-elements/commit/f5385461de5bb02d8108ef1522b516dc65b6def7), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** `DeprecatedButton`, `DeprecatedButtonGroup`, and `DeprecatedFloatingButton` and all associated types and styles. Run the `upgrade-deprecated-button` codemod to migrate `DeprecatedButton` usages to the `Button` API before upgrading. Run the `upgrade-deprecated-button-group` codemod to migrate `DeprecatedButtonGroup` usages. `DeprecatedFloatingButton` usages must be migrated manually. ([#1126](https://github.com/reapit-global/gbl-ds-elements/pull/1126), [`b99b895`](https://github.com/reapit-global/gbl-ds-elements/commit/b99b89573123684c3808ec54ae89340a85c04de8), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** the deprecated `useMediaQuery` hook and related exports. Use the `upgrade-deprecated-use-media-query` codemod to migrate usages automatically. ([#1131](https://github.com/reapit-global/gbl-ds-elements/pull/1131), [`1480122`](https://github.com/reapit-global/gbl-ds-elements/commit/148012285540b1c2482c328284dceae3443e9c34), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** `DeprecatedSplitButton`, `DeprecatedActionButton`, and `DeprecatedMenuButton`. Use the `upgrade-deprecated-split-button` codemod to migrate to the new `SplitButton` API. ([#1124](https://github.com/reapit-global/gbl-ds-elements/pull/1124), [`e82bba3`](https://github.com/reapit-global/gbl-ds-elements/commit/e82bba3de72891517520b5379a30f4255fb8b468), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** `autoFlow` and `justifyContent` props to `ButtonGroup`. ([#1135](https://github.com/reapit-global/gbl-ds-elements/pull/1135), [`47edd34`](https://github.com/reapit-global/gbl-ds-elements/commit/47edd348b87aeadcea483d7a6b80859b92ee19c4), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

  - `autoFlow?: 'row' | 'column'` — controls the direction the buttons flow when they wrap.
  - `justifyContent?: 'start' | 'end' | 'center' | 'stretch'` — controls the alignment of buttons along the main axis.

  The default behaviour preserves the existing horizontal button arrangement.

- **[Added]** `upgrade-deprecated-badge` codemod to migrate from `DeprecatedBadge` to the new `Badge`, mapping `intent` to `colour` and replacing `DeprecatedBadgeGroup` with an equivalent `div` layout. ([#1123](https://github.com/reapit-global/gbl-ds-elements/pull/1123), [`e870e51`](https://github.com/reapit-global/gbl-ds-elements/commit/e870e510850adfab5ee5788bb9c34e324083dc03), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `upgrade-deprecated-button-group` codemod to migrate from `DeprecatedButtonGroup` to the new `ButtonGroup`, mapping `alignment` to `justifyContent` and wrapping static children in `<ButtonGroup.Item>`. ([#1136](https://github.com/reapit-global/gbl-ds-elements/pull/1136), [`16e7a55`](https://github.com/reapit-global/gbl-ds-elements/commit/16e7a5528da098169189e1cc20e76ee471b0bdb4), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `upgrade-deprecated-use-media-query` codemod to migrate deprecated `useMediaQuery` and related exports to individual `useMatchMedia` calls and breakpoint utilities ([#1120](https://github.com/reapit-global/gbl-ds-elements/pull/1120), [`60f7be8`](https://github.com/reapit-global/gbl-ds-elements/commit/60f7be82e94283d83551767b7fbd113dd3b68b96), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `upgrade-deprecated-tag` codemod to migrate `DeprecatedTag` and `DeprecatedTagGroup` imports and JSX usage to the new `Tag` and `TagGroup` components, removing `intent` props and rewriting `DeprecatedTagProps` type references to `Tag.Props`. ([#1138](https://github.com/reapit-global/gbl-ds-elements/pull/1138), [`cf0eb9a`](https://github.com/reapit-global/gbl-ds-elements/commit/cf0eb9a880b631cec37c9388d2557cfe395a7905), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Internal]** Add custom changelog formatter for changesets. ([#1140](https://github.com/reapit-global/gbl-ds-elements/pull/1140), [`a551e87`](https://github.com/reapit-global/gbl-ds-elements/commit/a551e8795416f11fad890370c2ee1e60371cd212), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** Icon spacing in deprecated `Snack` and `TableCell` components after `DeprecatedIcon` removal. ([#1128](https://github.com/reapit-global/gbl-ds-elements/pull/1128), [`78374fc`](https://github.com/reapit-global/gbl-ds-elements/commit/78374fc626661ff982884bca6cc15a7fe21d8d91), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** `upgrade-deprecated-button` codemod incorrectly rewriting facade package import paths to subpaths. ([#1125](https://github.com/reapit-global/gbl-ds-elements/pull/1125), [`f084c71`](https://github.com/reapit-global/gbl-ds-elements/commit/f084c71af390fcdc6af24a847b60c8cde4d80006), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Add pre-commit and pre-push git hooks (Husky v9 + lint-staged) ([#1112](https://github.com/reapit-global/gbl-ds-elements/pull/1112), [`c28c285`](https://github.com/reapit-global/gbl-ds-elements/commit/c28c285e65934c33530d8a8cda41208bf66e14b0), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** Update the export map for the `rewrite-v5-imports` codemod post-removal of `DeprecatedIcon` ([#1130](https://github.com/reapit-global/gbl-ds-elements/pull/1130), [`a71ed2b`](https://github.com/reapit-global/gbl-ds-elements/commit/a71ed2b00dc9cd527369cb473c2546fb3ff259c7), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.76

### Major Changes

- **[Removed]** CJS build output. The package now ships ES modules only. Consumers using `require('@reapit/elements')` must migrate to `import`. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Removed]** Legacy-reapit token files and `globals.ts`. Internal CSS custom properties have been fully migrated to v5 design tokens. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Removed]** `Text` and `font` from the main entry point. `Text` is now available via `@reapit/elements/utils/text` and `font` via `@reapit/elements/utils/font`. Use the `rewrite-text-font-imports` codemod to migrate. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** `Heading` utility component for prototyping UI not yet supported by the Design System. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Added]** `rewrite-v4-imports` codemod to migrate from v4 components to their deprecated v5 equivalents, including support for `TextArea` and `NavResponsiveOption`. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Added]** `rewrite-v5-imports` codemod to migrate from barrel imports to v5 subpath imports. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Added]** `upgrade-deprecated-button` codemod to migrate from `DeprecatedButton` to the new `Button`, preserving import aliases. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Added]** `upgrade-deprecated-icon` codemod to migrate from deprecated icon components. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Added]** `upgrade-css-variables` codemod to migrate legacy CSS custom properties to v5 equivalents, including support for bare palette colours and legacy Reapit tokens. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Added]** `apply-textarea-field-sizing` codemod. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Fixed]** `upgrade-css-variables` corrupting `.tsx` files containing template literals. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Security]** Fix `brace-expansion` resolution to address CVE-2025-5889. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Fixed]** Missing entry points for deprecated units of code with `index.tsx` modules, allowing them to be imported from the `@reapit/elements/deprecated/*` subpath. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
- **[Internal]** Migrate release process to changesets. Versioning, changelog generation, and npm publishing are now automated via `changesets/action`. Contributors add a changeset file per PR; the release workflow handles the rest. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))
