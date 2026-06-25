# @reapit/elements

## 5.0.4

### Patch Changes

- **[Fixed]** icons in deprecated table, drawer, and nav components now render at the correct size. ([#1492](https://github.com/reapit-global/gbl-ds-elements/pull/1492))

- **[Fixed]** `MultiSelectInput` empty state icon now renders at `md` size with `primary` colour. ([#1490](https://github.com/reapit-global/gbl-ds-elements/pull/1490))

## 5.0.3

### Patch Changes

- **[Fixed]** `DeprecatedTable` now correctly renders icon names passed as strings (e.g. `icon="contact"`) as icon components rather than plain text. Icons resolved from strings default to `md` size and `primary` colour. ([#1487](https://github.com/reapit-global/gbl-ds-elements/pull/1487))

## 5.0.2

### Patch Changes

- **[Fixed]** Wrap `reset.css` rules in `@layer elements.base` so the reset stylesheet participates correctly in the cascade layer order ([#1483](https://github.com/reapit-global/gbl-ds-elements/pull/1483))

- **[Fixed]** User-agent default body margin is now reset in the `elements.base` cascade layer. ([#1485](https://github.com/reapit-global/gbl-ds-elements/pull/1485))

## 5.0.1

### Patch Changes

- **[Fixed]** `Dialog.Header` and `Dialog.Footer` now remain above scrolling body content when sticky. ([#1480](https://github.com/reapit-global/gbl-ds-elements/pull/1480))

## 5.0.0

### Major Changes

- **[Changed]** `ElAccordionSummaryRightInfo` renamed to `ElAccordionSummaryAccessory`. Update any direct imports of this styled element. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235))

- **[Removed]** Unreleased changes accumulated prior to changeset adoption (beta.76 development): ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))

  **Breaking changes**

  - Removed CJS build output. The package now ships ES modules only. Consumers using `require('@reapit/elements')` must migrate to `import`.
  - Moved `Text` and `font` to utils. `Text` is available via `@reapit/elements/utils/text` and `font` via `@reapit/elements/utils/font`. Use the `rewrite-text-font-imports` codemod to migrate.
  - Removed legacy-reapit token files and stripped `globals.ts`. Internal CSS custom properties have been fully migrated to v5 design tokens.

  **New features**

  - Added `Heading` utility component for prototyping UI not yet supported by the Design System.
  - Added `rewrite-v4-imports` codemod to migrate from v4 components to their deprecated v5 equivalents, including support for `TextArea` and `NavResponsiveOption`.
  - Added `rewrite-v5-imports` codemod to migrate from barrel imports to v5 subpath imports.
  - Added `upgrade-deprecated-button` codemod to migrate from `DeprecatedButton` to the new `Button`, preserving import aliases.
  - Added `upgrade-deprecated-icon` codemod to migrate from deprecated icon components.
  - Added `upgrade-css-variables` codemod to migrate legacy CSS custom properties to v5 equivalents, including support for bare palette colours and legacy Reapit tokens.
  - Added `apply-textarea-field-sizing` codemod.

  **Bug fixes**

  - Fixed `upgrade-css-variables` corrupting `.tsx` files containing template literals.
  - Fixed `brace-expansion` resolution to address CVE-2025-5889.
  - Added missing entry points for deprecated units of code with `index.tsx` modules, allowing them to be imported from the `@reapit/elements/deprecated/*` subpath.

- **[Changed]** `ChipSelect` single-select now works without a form association or shared `name` attribute. `ChipSelectChip` is now purely presentational and no longer auto-deselects siblings when checked — that behaviour now lives in `ChipSelect.Option`. Consumers relying on the previous `ChipSelectChip` behaviour should wrap chips in `ChipSelect` with `ChipSelect.Option`, or manage selection state themselves. ([#1377](https://github.com/reapit-global/gbl-ds-elements/pull/1377))

- **[Removed]** `ChipSelect.Option` no longer accepts a `required` prop. Use `required` on `ChipSelect` to enforce that at least one option remains selected. ([#1378](https://github.com/reapit-global/gbl-ds-elements/pull/1378))

- **[Changed]** `ChipSelect` `required` now prevents deselecting the last selected option and applies native form validation to the group. ([#1378](https://github.com/reapit-global/gbl-ds-elements/pull/1378))

- **[Changed]** `useDrawerContext` now returns `DrawerContext.Value | null` instead of throwing when called outside a `Drawer`. ([#1141](https://github.com/reapit-global/gbl-ds-elements/pull/1141))

- **[Changed]** Move `Combobox` from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`. The component is also available from the `@reapit/elements/utils` barrel. Run the `rewrite-combobox-imports` codemod to migrate automatically. ([#1173](https://github.com/reapit-global/gbl-ds-elements/pull/1173))

- **[Changed]** `GalleryViewer.Thumbnail` `aria-current` prop now accepts `"location"` instead of `"page"`. Update any usage of `aria-current="page"` to `aria-current="location"`. ([#1292](https://github.com/reapit-global/gbl-ds-elements/pull/1292))

- **[Removed]** `DeprecatedIcon` and `DeprecatedIcons`. Use icon components from `@reapit/elements/icons` instead. Run the `upgrade-deprecated-icon` codemod to migrate usages automatically. ([#1119](https://github.com/reapit-global/gbl-ds-elements/pull/1119))

- **[Changed]** `Image.Fallback` no longer renders a default message when `children` is omitted. Pass `children` explicitly to display a message. ([#1217](https://github.com/reapit-global/gbl-ds-elements/pull/1217))

- **[Changed]** `src` is now required on `Image` and `ResponsiveImage`. ([#1217](https://github.com/reapit-global/gbl-ds-elements/pull/1217))

- **[Changed]** `Image` now requires `width` and `height` props. Pass explicit CSS length strings to all `Image` usages (e.g. `width="300px"` `height="200px"` for fixed dimensions, or `width="100%"` `height="100%"` to fill a container). These props set CSS custom properties and are not forwarded as HTML `img` attributes. ([#1215](https://github.com/reapit-global/gbl-ds-elements/pull/1215))

- **[Removed]** `DeprecatedButton`, `DeprecatedButtonGroup`, and `DeprecatedFloatingButton` and all associated types and styles. Run the `upgrade-deprecated-button` codemod to migrate `DeprecatedButton` usages to the `Button` API before upgrading. Run the `upgrade-deprecated-button-group` codemod to migrate `DeprecatedButtonGroup` usages. `DeprecatedFloatingButton` usages must be migrated manually. ([#1126](https://github.com/reapit-global/gbl-ds-elements/pull/1126))

- **[Changed]** `MainContainer` now includes block (top and bottom) padding by default. Previously, only inline padding was applied. To restore the previous behaviour, use the new `hasNoTopPadding` and `hasNoBottomPadding` props. ([#1301](https://github.com/reapit-global/gbl-ds-elements/pull/1301))

- **[Changed]** `ThemeProvider`, `Theme`, and `useTheme` have moved from `@reapit/elements/core/theme-provider` to `@reapit/elements/utils/theme-provider`. Run the `rewrite-theme-provider-imports` codemod to migrate automatically. ([#1477](https://github.com/reapit-global/gbl-ds-elements/pull/1477))

- **[Removed]** the `@reapit/elements` bare specifier entry point and all top-level barrel files (`src/index.ts`, `src/core/index.ts`, `src/utils/index.ts`, `src/lab/index.ts`, `src/deprecated/index.ts`). Use subpath imports such as `@reapit/elements/core/button` instead. Run the `rewrite-v5-imports` codemod to migrate automatically. ([#1368](https://github.com/reapit-global/gbl-ds-elements/pull/1368))

- **[Removed]** `DeprecatedBadge`, `DeprecatedBadgeGroup`, `DeprecatedBadgeProps`, `ElDeprecatedBadge`, `ElDeprecatedBadgeGroup`, and `ElDeprecatedBadgeGroupInner` from `src/deprecated/badge`. ([#1155](https://github.com/reapit-global/gbl-ds-elements/pull/1155))

  Use the `upgrade-deprecated-badge` codemod to migrate to `Badge` from `@reapit/elements/core/badge`.

- **[Removed]** `Input`, `InputGroup`, `InputAddOn`, and `InputError` components from `@reapit/elements`. See `codemods/migrate-deprecated-input/README.md` for the migration guide. ([#1287](https://github.com/reapit-global/gbl-ds-elements/pull/1287))

- **[Removed]** `DeprecatedLabel`, `DeprecatedLabelProps`, and `ElDeprecatedLabel` from `src/deprecated/label`; run the existing `replace-deprecated-label` codemod before upgrading to migrate to `LabelText` and `LabelText.Props`. ([#1169](https://github.com/reapit-global/gbl-ds-elements/pull/1169))

- **[Removed]** `DeprecatedPagination` and related exports from `src/deprecated/pagination`. Use the `Pagination` component from `@reapit/elements/core/pagination` instead. Run the `replace-deprecated-pagination` codemod to migrate automatically. ([#1219](https://github.com/reapit-global/gbl-ds-elements/pull/1219))

- **[Removed]** `DeprecatedTag`, `DeprecatedTagGroup`, and related exports — run the `upgrade-deprecated-tag` codemod before upgrading to migrate to `Tag` and `TagGroup`. ([#1163](https://github.com/reapit-global/gbl-ds-elements/pull/1163))

- **[Removed]** `Toggle`, `ToggleRadio`, and related exports from `src/deprecated/toggle`. Run the `replace-deprecated-toggle` codemod to migrate `Toggle` to `Switch`, and the `replace-deprecated-toggle-radio` codemod to migrate `ToggleRadio` to `ChipSelect`. ([#1272](https://github.com/reapit-global/gbl-ds-elements/pull/1272))

- **[Removed]** the deprecated `useClickOutside` hook. Run the `inline-use-click-outside` codemod to migrate automatically. ([#1172](https://github.com/reapit-global/gbl-ds-elements/pull/1172))

- **[Removed]** the deprecated `useMediaQuery` hook and related exports. Use the `upgrade-deprecated-use-media-query` codemod to migrate usages automatically. ([#1131](https://github.com/reapit-global/gbl-ds-elements/pull/1131))

- **[Removed]** direct named exports of sub-components that are accessible via their parent component namespace. Affected components: `Accordion`, `AppSwitcher`, `AtAGlance`, `Autocomplete`, `BottomBar`, `Breadcrumbs`, `ButtonGroup`, `CheckboxGroupControl`, `ChipSelect`, `CompactSelect`, `DescriptionList`, `Drawer`, `Features`, `FilterBar`, `FocusedLayout`, `FolderTabs`, `FormControl`, `Menu`, `OfficeSwitcher`, `PageHeader`, `PageLayout`, `Pagination`, `PrimaryTabs`, `RadioGroupControl`, `SecondaryTabs`, `Select`, `SideBar`, `SplitButton`, `SupplementaryInfo`, `Table`, `TagGroup`, and `TopBar`. ([#1335](https://github.com/reapit-global/gbl-ds-elements/pull/1335))

  To migrate, import the parent component and access the sub-component via the namespace. For example:

  ```ts
  // Before
  import { AccordionSummary, DrawerBody, TableBody } from "@reapit/elements";

  // After
  import { Accordion, Drawer, Table } from "@reapit/elements";
  // AccordionSummary → Accordion.Summary
  // DrawerBody       → Drawer.Body
  // TableBody        → Table.Body
  ```

- **[Removed]** `ImageFallback` component and its `image-fallback` module. Use `MediaFallback` (exported from `@reapit/elements`) instead. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253))

- **[Removed]** internal exports from the public API surface. Top-level barrel files in `src/core`, `src/utils`, and `src/lab` now use explicit named exports instead of `export *`, removing leaked internal hooks, utilities, and sub-components that were never intended to be public. ([#1383](https://github.com/reapit-global/gbl-ds-elements/pull/1383))

- **[Removed]** internal implementation details from component barrel files. Linaria styled elements, CSS class name constants, internal context objects, and internal hooks are no longer part of the public API. Only intentionally public exports remain accessible from `@reapit/elements`. ([#1276](https://github.com/reapit-global/gbl-ds-elements/pull/1276))

- **[Removed]** the experimental `MobileNavItem` component from `@reapit/elements/lab/mobile-nav-item`. Run the `replace-lab-mobile-nav-item` codemod to migrate to `TopBar` components. ([#1223](https://github.com/reapit-global/gbl-ds-elements/pull/1223))

- **[Removed]** the experimental `RadioGroup` component (`@reapit/elements/lab/radio-group`). Use the `replace-lab-radio-group` codemod to migrate to the stable `RadioGroupControl`. ([#1176](https://github.com/reapit-global/gbl-ds-elements/pull/1176))

- **[Removed]** the experimental `Radio` component (`@reapit/elements/lab/radio`). Use the `replace-lab-radio` codemod to migrate to the stable `RadioButton`. ([#1181](https://github.com/reapit-global/gbl-ds-elements/pull/1181))

- **[Removed]** the experimental lab `SearchInput` component and its associated `SearchInputProps` type. Run the `replace-lab-search-input` codemod to migrate to the stable `SearchInput` in `core/search-input`. ([#1231](https://github.com/reapit-global/gbl-ds-elements/pull/1231))

- **[Removed]** the experimental `SelectCustom` component and related exports from `@reapit/elements/lab/select-custom`. Use `Select` from `@reapit/elements/core/select` as the stable replacement. ([#1261](https://github.com/reapit-global/gbl-ds-elements/pull/1261))

- **[Removed]** the experimental lab table components — `Table`, `TableBody`, `TableHead`, `TableHeaderCell`, `TableRow`, `SingleLineCell`, `DoubleLineCell`, `TableContainer`, `TableText`, and `TableToolbar`. Use the `replace-lab-table` codemod to migrate to the stable core `Table` API. The `TableProvider` and `useTableContext`, `TableRowSelection`, and `useRowSelection` exports are unaffected. ([#1193](https://github.com/reapit-global/gbl-ds-elements/pull/1193))

- **[Removed]** `TABLE_ROW_PRIMARY_ACTION_Z_INDEX` and `TABLE_ROW_INTERACTIVE_ELEMENT_Z_INDEX` constants from `@reapit/elements`. These were internal implementation details and should not have been part of the public API. Remove any usages from your codebase. ([#1232](https://github.com/reapit-global/gbl-ds-elements/pull/1232))

- **[Changed]** `EmptyData` component and all related exports renamed to `EmptyState`. Run the `rename-empty-data` codemod to migrate automatically. ([#1328](https://github.com/reapit-global/gbl-ds-elements/pull/1328))

- **[Removed]** `DeprecatedSplitButton`, `DeprecatedActionButton`, and `DeprecatedMenuButton`. Use the `upgrade-deprecated-split-button` codemod to migrate to the new `SplitButton` API. ([#1124](https://github.com/reapit-global/gbl-ds-elements/pull/1124))

### Minor Changes

- **[Added]** `accessory` prop to `AccordionSummary`, replacing `rightInfo` for displaying optional content alongside the accordion title. Updated Figma Code Connect to target the new Accordion header component. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235))

- **[Deprecated]** `rightInfo` prop on `AccordionSummary`. Use `accessory` instead. ([#1235](https://github.com/reapit-global/gbl-ds-elements/pull/1235))

- **[Added]** `AccordionGroup` component. A layout wrapper that stacks multiple `Accordion` components in a vertical column. ([#1237](https://github.com/reapit-global/gbl-ds-elements/pull/1237))

- **[Added]** `@reapit/elements/core/app-switcher/anz` subpath for ANZ-specific `AppSwitcher` exports. Run the `rewrite-anz-app-switcher-imports` codemod to migrate automatically. ([#1435](https://github.com/reapit-global/gbl-ds-elements/pull/1435))

- **[Added]** `orientation` and `align` props to `ButtonGroup`. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Added]** `Card`, `ButtonCard`, and `AnchorCard` components. `Card` is a generic surface for containing related content. `ButtonCard` and `AnchorCard` are interactive variants that render as `<button>` and `<a>` elements respectively. ([#1455](https://github.com/reapit-global/gbl-ds-elements/pull/1455))

- **[Added]** `CurrencyControl` component. A pre-baked `CurrencyInput` + `FormControl` for use when a currency input needs a label, help text, or error message. ([#1457](https://github.com/reapit-global/gbl-ds-elements/pull/1457))

- **[Added]** `CurrencyInput` component. Builds on `NumberInput` to format a monetary value for a given `currency`, with the localised currency symbol placed automatically as a prefix or suffix based on the locale. ([#1457](https://github.com/reapit-global/gbl-ds-elements/pull/1457))

- **[Added]** `@reapit/elements/deprecated/styles` subpath entry point. Re-exports `Intent`, `getIntentClassName`, and all deprecated CSS class helpers (`elIs*`, `elFlex*`, `elFade*`, etc.) that were previously only available from the top-level barrel. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256))

- **[Added]** `Flex` utility component at `@reapit/elements/utils/flex`. Use `Flex.Item` to control item-level flex properties on individual children. Both components accept a polymorphic `as` prop. ([#1473](https://github.com/reapit-global/gbl-ds-elements/pull/1473))

- **[Added]** `FormLayout` component. Provides consistent layout and spacing for forms, with `FormLayout.Header`, `FormLayout.Title`, `FormLayout.Description`, and `FormLayout.Footer` sub-components. Renders as a `<section>` element with automatic ARIA wiring between the section and its title and description. ([#1453](https://github.com/reapit-global/gbl-ds-elements/pull/1453))

- **[Added]** `FormLayout.Section` sub-component. Use `FormLayout.SectionHeader`, `FormLayout.SectionTitle`, and `FormLayout.SectionDescription` to label sections of a form layout with a heading and optional description. Also added: `as` prop on `FormLayout.Title` for configuring the heading level. ([#1451](https://github.com/reapit-global/gbl-ds-elements/pull/1451))

- **[Added]** `GalleryViewerCarousel` compound component at `src/core/gallery-viewer/carousel`. Provides an accessible, controlled image and video carousel with `GalleryViewerCarousel.Item`, `GalleryViewerCarousel.ItemCaption`, and `GalleryViewerCarousel.Button` subcomponents. All subcomponent prop types are accessible from the parent namespace (e.g. `GalleryViewerCarousel.ItemProps`). ([#1259](https://github.com/reapit-global/gbl-ds-elements/pull/1259))

- **[Added]** `GalleryViewer` component. Composes the gallery viewer subcomponents — `GalleryViewer.Header`, `GalleryViewer.Content`, `GalleryViewer.CarouselLayout`, `GalleryViewer.MediaListLayout`, `GalleryViewer.Carousel`, `GalleryViewer.MediaList`, and `GalleryViewer.Caption` — under a single import. ([#1284](https://github.com/reapit-global/gbl-ds-elements/pull/1284))

- **[Added]** `GalleryViewerDialog.Header` and `GalleryViewerDialog.Content` subcomponents for structured, responsive layouts. ([#1230](https://github.com/reapit-global/gbl-ds-elements/pull/1230))

- **[Added]** `GalleryViewerDialog` component at `src/core/gallery-viewer/dialog`. Provides a responsive full-screen dialog for gallery content — inset with a semi-transparent backdrop on large screens (≥1440px), and full-viewport on smaller screens. ([#1228](https://github.com/reapit-global/gbl-ds-elements/pull/1228))

- **[Added]** `GalleryViewerCarouselLayout` and `GalleryViewerMediaListLayout` layout components for the gallery viewer. `GalleryViewerCarouselLayout` provides a two-column layout; `GalleryViewerMediaListLayout` provides a single-column stacked layout. ([#1281](https://github.com/reapit-global/gbl-ds-elements/pull/1281))

- **[Added]** `GalleryViewer.MediaList` compound component. Renders a vertical `<ul>` of media items. Exposes `GalleryViewer.MediaListItem` and `GalleryViewer.MediaItemCaption`. ([#1270](https://github.com/reapit-global/gbl-ds-elements/pull/1270))

- **[Added]** `GridIcon` icon component. ([#1370](https://github.com/reapit-global/gbl-ds-elements/pull/1370))

- **[Added]** `Grid` utility component with a `Grid.Item` subcomponent. Exposes mainstream CSS grid container and item properties as React props, with polymorphic `as` support on both components. Prop-driven styles take precedence over any `className` styles. ([#1472](https://github.com/reapit-global/gbl-ds-elements/pull/1472))

- **[Added]** `Image` utility component. Supports fallback UI. On load failure, `Image` announces fallback text for meaningful images and keeps decorative images non-announcing. ([#1180](https://github.com/reapit-global/gbl-ds-elements/pull/1180))

- **[Added]** `keepMounted` prop to `Accordion`. When `false`, children are unmounted when the accordion is closed, deferring rendering until first open. Defaults to `true` (existing behaviour unchanged). ([#1356](https://github.com/reapit-global/gbl-ds-elements/pull/1356))

- **[Added]** `MediaFallback` shared utility component used internally by `Image.Fallback` and `Video.Fallback`. Accepts an optional `icon` and `children` message. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253))

- **[Added]** `AiSparkle1Icon`, `AiSparkle2Icon`, `BuildingIcon`, `BuildingSizeIcon`, `LayersIcon`, `ListIcon`, `MapIcon`, `PhoneOutlineIcon`, `SofaIcon`, `ThumbDownIcon`, and `ThumbUpIcon` icons. ([#1365](https://github.com/reapit-global/gbl-ds-elements/pull/1365))

- **[Added]** `NumberControl` component. Wraps `NumberInput` with `FormControl` for label, help text, and error text support. ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Added]** `getLocaleNumberSeparators`, `getIntlNumberFormat`, `getNumberAffix`, and `DESCRIPTIVE_PART_TYPES` utilities, and the `LocaleNumberSeparators` and `NumberAffix` types, at `@reapit/elements/utils/number-format`. ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Added]** `NumberInput` component. Displays locale-aware formatted numbers via an overlay whilst keeping the raw numeric value as the input value. Accepts `locale`, `formatOptions`, `inputMode`, `min`, and `max` props. When `formatOptions.style` is `'currency'`, `'percent'`, or `'unit'` and no affix prop is supplied, the localised affix is automatically derived and rendered as a prefix or suffix; supplying an explicit `prefix`, `suffix`, `leadingIcon`, or `trailingIcon` takes precedence and disables the derivation. With `style: 'percent'`, values are stored and edited as model-space decimals (e.g. `0.255` displays as `25.5%`). ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Added]** `replace-deprecated-button-group-layout-props` codemod to migrate `ButtonGroup` usage from the deprecated `autoFlow` and `justifyContent` props to the new `orientation` and `align` props. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Added]** `replace-deprecated-pagination` codemod. Migrates `DeprecatedPagination` to the stable `Pagination` component from `@reapit/elements/core/pagination`. ([#1216](https://github.com/reapit-global/gbl-ds-elements/pull/1216))

- **[Added]** `replace-deprecated-snack` codemod. Migrates `SnackProvider`, `useSnack`, `Snack`, `SnackHolder`, and related exports to the `Toaster` and `toast` API from `@reapit/elements/core/toaster`. Supports facade packages via `--facade-package`. ([#1317](https://github.com/reapit-global/gbl-ds-elements/pull/1317))

- **[Added]** `replace-deprecated-toggle` codemod. Migrates usages of the deprecated `Toggle` component to `Switch`. ([#1267](https://github.com/reapit-global/gbl-ds-elements/pull/1267))

- **[Added]** `replace-deprecated-toggle-radio` codemod. Migrates usages of the deprecated `ToggleRadio` component to `ChipSelect`. ([#1264](https://github.com/reapit-global/gbl-ds-elements/pull/1264))

- **[Added]** `replace-lab-mobile-nav-item` codemod. Migrates `MobileNavItem` from `@reapit/elements/lab/mobile-nav-item` to the stable `TopBar` core components. ([#1218](https://github.com/reapit-global/gbl-ds-elements/pull/1218))

- **[Added]** `replace-lab-radio` codemod to migrate from the experimental `Radio` component to the stable `RadioButton`, renaming the `isRequired` prop to `required` and removing the `hasError` prop. ([#1177](https://github.com/reapit-global/gbl-ds-elements/pull/1177))

- **[Added]** `replace-lab-search-input` codemod. Migrates `SearchInput` from `lab/search-input` to the stable `SearchInput` from `core/search-input`. ([#1224](https://github.com/reapit-global/gbl-ds-elements/pull/1224))

- **[Added]** `replace-lab-table` codemod to migrate supported `lab/table` components to the stable core `Table` API, including import rewrites, prop renames, and TODO comments for manual review points. ([#1183](https://github.com/reapit-global/gbl-ds-elements/pull/1183))

- **[Added]** Storybook MCP endpoint hosted on `elements.reapit.com.au`. AI tools that support the Model Context Protocol can now query component stories and documentation directly. ([#1319](https://github.com/reapit-global/gbl-ds-elements/pull/1319))

- **[Added]** `formatValue` prop to `TextInput`. Accepts a `(value: string) => string` function that renders formatted text in an overlay while preserving the raw value in the underlying input. ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Added]** `Theme` type re-exported from `@reapit/elements/core/theme-provider`. Previously only available from the top-level barrel. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256))

- **[Added]** `Toast` component. A presentation-only notification supporting `error`, `info`, `neutral`, `success`, and `warning` variants with an optional animated timeout bar. ([#1307](https://github.com/reapit-global/gbl-ds-elements/pull/1307))

- **[Added]** `children` prop to `Toaster`, allowing it to wrap application content in the same way as the deprecated `SnackProvider`. ([#1317](https://github.com/reapit-global/gbl-ds-elements/pull/1317))

- **[Added]** `Toaster` component with `toast()` imperative API for displaying timed, dismissible toast notifications. Supports swipe-to-dismiss, auto-dismiss with configurable duration, and page-visibility-aware timer pausing. ([#1311](https://github.com/reapit-global/gbl-ds-elements/pull/1311))

- **[Added]** `verifyweb` to the `AppSwitcher` product display order. ([#1358](https://github.com/reapit-global/gbl-ds-elements/pull/1358))

- **[Added]** `Video` utility component. Renders a `<video>` element styled to fill its container with configurable `objectFit` behaviour. Shows a fallback UI when the video fails to load; the default fallback announces the error to screen readers via `aria-live="polite"`. ([#1253](https://github.com/reapit-global/gbl-ds-elements/pull/1253))

- **[Added]** `upgrade-deprecated-tag` codemod to migrate `DeprecatedTag` and `DeprecatedTagGroup` imports and JSX usage to the new `Tag` and `TagGroup` components, removing `intent` props and rewriting `DeprecatedTagProps` type references to `Tag.Props`. ([#1138](https://github.com/reapit-global/gbl-ds-elements/pull/1138))

- **[Added]** `autoFlow` and `justifyContent` props to `ButtonGroup`. ([#1135](https://github.com/reapit-global/gbl-ds-elements/pull/1135))

  - `autoFlow?: 'row' | 'column'` — controls the direction the buttons flow when they wrap.
  - `justifyContent?: 'start' | 'end' | 'center' | 'stretch'` — controls the alignment of buttons along the main axis.

  The default behaviour preserves the existing horizontal button arrangement.

- **[Added]** `useAIStyle` prop to `Button` and `AnchorButton`. Applies an AI-themed visual style across all three variants. ([#1341](https://github.com/reapit-global/gbl-ds-elements/pull/1341))

- **[Added]** `variant` prop to `ComboboxButton`, `Select.Button`, and `Autocomplete.Button`, accepting `'default' | 'borderless'`. Use `variant="borderless"` to remove the border when embedding the button in a surface that provides its own border or background. ([#1262](https://github.com/reapit-global/gbl-ds-elements/pull/1262))

- **[Deprecated]** `SupportedProductId`, `ProductConfig`, `AppSwitcher.AppAvatar`, `AppSwitcher.ProductMenuItem`, `AppSwitcher.getDisplayableProductsForYourAppsGroup`, and `AppSwitcher.getDisplayableProductsForExploreGroup` from `@reapit/elements/core/app-switcher`. Import from `@reapit/elements/core/app-switcher/anz` instead. ([#1435](https://github.com/reapit-global/gbl-ds-elements/pull/1435))

- **[Deprecated]** `autoFlow` and `justifyContent` props on `ButtonGroup`. Use `orientation` and `align` instead. Run the `replace-deprecated-button-group-layout-props` codemod to migrate automatically. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Added]** `variant` and `aria-orientation` props to `Divider` component. Supports `'solid'` and `'dashed'` styles and both horizontal and vertical orientation. ([#1417](https://github.com/reapit-global/gbl-ds-elements/pull/1417))

- **[Added]** `GalleryViewerCarousel` now supports dynamic filtering of carousel items. When children are added to or removed from the track at runtime, the carousel automatically observes new items and unobserves removed ones. When the currently visible item is removed, the carousel snaps instantly to the first remaining item. ([#1271](https://github.com/reapit-global/gbl-ds-elements/pull/1271))

- **[Added]** `GalleryViewerThumbnail` and `GalleryViewerThumbnailButton` components. Both render a thumbnail image with an optional video overlay. `Thumbnail` renders as an anchor for URL-driven navigation; `ThumbnailButton` renders as a button for click-handler-driven selection. ([#1207](https://github.com/reapit-global/gbl-ds-elements/pull/1207))

- **[Added]** `GalleryViewer.ThumbnailList` component and associated `GalleryViewer.Thumbnail` and `GalleryViewer.ThumbnailButton` sub-components for rendering a list of gallery thumbnails. ([#1215](https://github.com/reapit-global/gbl-ds-elements/pull/1215))

- **[Added]** `TextControl`, `TextareaControl`, `SelectNativeControl`, `CheckboxControl`, and `DateTimeControl` now forward refs to their underlying input elements. ([#1283](https://github.com/reapit-global/gbl-ds-elements/pull/1283))

- **[Added]** `whiteSpace` prop to `LineClamp`, supporting `normal`, `pre-line`, and `pre-wrap` values to control whitespace handling for static copy and user-authored API text. ([#1205](https://github.com/reapit-global/gbl-ds-elements/pull/1205))

- **[Changed]** `GalleryViewerDialog.Content` no longer applies padding. Padding is now the responsibility of the layout components (`GalleryViewerCarouselLayout` and `GalleryViewerMediaListLayout`) placed inside `Content`. ([#1281](https://github.com/reapit-global/gbl-ds-elements/pull/1281))

- **[Added]** `GalleryViewerMediaItem` and `GalleryViewerMediaItemCaption` components at `src/core/gallery-viewer/media-item`. ([#1259](https://github.com/reapit-global/gbl-ds-elements/pull/1259))

- **[Added]** support for breaking icon size CSS variable change to upgrade-css-variables codemod ([#1460](https://github.com/reapit-global/gbl-ds-elements/pull/1460))

- **[Changed]** `TextInput`, `Textarea`, `SelectNative`, `Combobox`, `CheckboxInput`, `RadioInput`, and `DateTimeInput` now trigger error styling when `aria-invalid="true"` and `data-show-validity="true"` are both set. ([#1151](https://github.com/reapit-global/gbl-ds-elements/pull/1151))

  `TextControl`, `TextareaControl`, `SelectNativeControl`, `SelectControl`, `AutocompleteControl`, `DateTimeControl`, `CheckboxControl`, `CheckboxGroupControl`, and `RadioGroupControl` now default `showValidity` to `true` when `errorText` is provided. Pass `showValidity={false}` explicitly to override.

- **[Added]** Reapit Verify branding assets now supported by `AppSwitcher`, `FocusedLayout`, and `TopBar` ([#1185](https://github.com/reapit-global/gbl-ds-elements/pull/1185))

- **[Changed]** Wrap all component styles in cascade layers (`@layer elements.base` and `@layer elements.main`) so that consumer-supplied classes can override defaults without needing higher specificity or `!important`. A layer order declaration (`@layer elements.base, elements.main;`) is emitted first to guarantee consistent ordering. Consumers using their own named `@layer`s should review how their layer order interacts with `elements.base` and `elements.main`. The `elFont` class is now a no-op — the font is loaded unconditionally from the global stylesheet. ([#1398](https://github.com/reapit-global/gbl-ds-elements/pull/1398))

- **[Added]** `replace-deprecated-label` codemod. Migrates `DeprecatedLabel` and `DeprecatedLabelProps` to `LabelText` and `LabelText.Props`. ([#1166](https://github.com/reapit-global/gbl-ds-elements/pull/1166))

- **[Added]** `replace-lab-radio-group` codemod to migrate from the experimental `RadioGroup` to the stable `RadioGroupControl`, renaming the `isRequired` and `errorMessage` props to `required` and `errorText`. ([#1174](https://github.com/reapit-global/gbl-ds-elements/pull/1174))

- **[Added]** `inline-use-click-outside` codemod to replace deprecated `useClickOutside` calls with inline `useEffect` logic and remove Elements or facade imports. ([#1161](https://github.com/reapit-global/gbl-ds-elements/pull/1161))

- **[Added]** `upgrade-deprecated-badge` codemod to migrate from `DeprecatedBadge` to the new `Badge`, mapping `intent` to `colour` and replacing `DeprecatedBadgeGroup` with an equivalent `div` layout. ([#1123](https://github.com/reapit-global/gbl-ds-elements/pull/1123))

- **[Added]** `upgrade-deprecated-button-group` codemod to migrate from `DeprecatedButtonGroup` to the new `ButtonGroup`, mapping `alignment` to `justifyContent` and wrapping static children in `<ButtonGroup.Item>`. ([#1136](https://github.com/reapit-global/gbl-ds-elements/pull/1136))

- **[Added]** `upgrade-deprecated-use-media-query` codemod to migrate deprecated `useMediaQuery` and related exports to individual `useMatchMedia` calls and breakpoint utilities ([#1120](https://github.com/reapit-global/gbl-ds-elements/pull/1120))

- **[Changed]** `Features.Bathrooms`, `Features.Bedrooms` and `Features.CarSpaces` now accept `ReactNode` values rather than `number` ([#1418](https://github.com/reapit-global/gbl-ds-elements/pull/1418))

### Patch Changes

- **[Changed]** `AtAGlance.Card` now uses new core `Card`, `ButtonCard` and `AnchorCard`. ([#1462](https://github.com/reapit-global/gbl-ds-elements/pull/1462))

- **[Internal]** Add a searchable `Icons/Gallery` story to Storybook. Each tile shows the icon name and a **Copy import** button that copies the icon's subpath import statement to the clipboard. Search matches against the icon's name or a small set of curated synonyms in `src/icons/docs/icon-synonyms.json`. ([#1403](https://github.com/reapit-global/gbl-ds-elements/pull/1403))

- **[Internal]** `yarn generate:icons` now fetches and processes SVG files directly from Figma, removing the need to export them manually. ([#1362](https://github.com/reapit-global/gbl-ds-elements/pull/1362))

- **[Fixed]** Updated export map for `rewrite-v5-imports` codemod. ([#1221](https://github.com/reapit-global/gbl-ds-elements/pull/1221))

- **[Internal]** Upgrade development-only dependencies ([#1149](https://github.com/reapit-global/gbl-ds-elements/pull/1149))

- **[Internal]** Update `CheckboxGroupControl` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1238](https://github.com/reapit-global/gbl-ds-elements/pull/1238))

- **[Internal]** Update `DescriptionList` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection. Wire `layout` and `children` props via `figma.enum` for stacked, inline, and grid variants, and add `size` prop mapping to `DescriptionList.Item` for stacked and inline item connections ([#1242](https://github.com/reapit-global/gbl-ds-elements/pull/1242))

- **[Internal]** Update `Dialog` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1239](https://github.com/reapit-global/gbl-ds-elements/pull/1239))

- **[Internal]** Update `Drawer` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection ([#1240](https://github.com/reapit-global/gbl-ds-elements/pull/1240))

- **[Internal]** Update `FocusedLayout` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection. Add Code Connect for `FocusedLayout.ProductLogo` and wire the `logo` prop via `figma.children` across all breakpoint mappings ([#1241](https://github.com/reapit-global/gbl-ds-elements/pull/1241))

- **[Changed]** ButtonGroup now connected to new version in Figma ([#1467](https://github.com/reapit-global/gbl-ds-elements/pull/1467))

- **[Internal]** Add custom changelog formatter for changesets. ([#1140](https://github.com/reapit-global/gbl-ds-elements/pull/1140))

- **[Security]** pin minimatch resolutions to patched releases to mitigate known ReDoS vulnerabilities, including GHSA-7r86-cg39-jmmj. ([#1182](https://github.com/reapit-global/gbl-ds-elements/pull/1182))

- **[Security]** pin glob@^10 resolutions to 10.5.0 to mitigate a command injection vulnerability in the glob CLI (GHSA-w7j8-c9jp-gg2c). ([#1195](https://github.com/reapit-global/gbl-ds-elements/pull/1195))

- **[Fixed]** Replace string icon props with individual icon components in the deprecated Snack stories and `useSnack` hook, restoring correct icon rendering in Storybook docs. ([#1199](https://github.com/reapit-global/gbl-ds-elements/pull/1199))

- **[Internal]** Add Figma Code Connect for `AtAGlance`, `AnchorCard`, `ArticleCard`, and `ListboxOption` components ([#1236](https://github.com/reapit-global/gbl-ds-elements/pull/1236))

- **[Internal]** Add Figma Code Connect for `MainContainer` and `PageLayout` components ([#1293](https://github.com/reapit-global/gbl-ds-elements/pull/1293))

- **[Fixed]** `ChipSelect` no longer causes the page to scroll or appear blank when an option receives focus inside a fixed-height layout. ([#1295](https://github.com/reapit-global/gbl-ds-elements/pull/1295))

- **[Internal]** Add Figma Code Connect for `AlertBanner` ([#1325](https://github.com/reapit-global/gbl-ds-elements/pull/1325))

- **[Fixed]** `AlertBanner` actions no longer stretch to match the height of wrapping description text when actions are inline with the description at wider breakpoints. ([#1427](https://github.com/reapit-global/gbl-ds-elements/pull/1427))

- **[Fixed]** Default `position` for `buildAnchorPositioningCSS` and `Popover` is now `'fixed'` instead of `'absolute'`, preventing unexpected document scrolling when an anchored popup is open inside a scrolled container such as a `Drawer`. ([#1338](https://github.com/reapit-global/gbl-ds-elements/pull/1338))

- **[Fixed]** `Badge` no longer stretches to fill its container width. ([#1407](https://github.com/reapit-global/gbl-ds-elements/pull/1407))

- **[Fixed]** borderless `TextInput` and `ComboboxButton` now use a transparent border instead of `border: none`, so focus styles render correctly and layout remains stable. ([#1279](https://github.com/reapit-global/gbl-ds-elements/pull/1279))

- **[Fixed]** `TextInput` and `Button` busy spinner animations now play correctly. ([#1444](https://github.com/reapit-global/gbl-ds-elements/pull/1444))

- **[Fixed]** `ButtonGroup` with `orientation="horizontal"` and `align="stretch"` now correctly stretches buttons to equal height. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Fixed]** `ButtonGroup` buttons are now always vertically centred, including when a tertiary button with no block padding is present in the group. ([#1427](https://github.com/reapit-global/gbl-ds-elements/pull/1427))

- **[Fixed]** `GalleryViewer.Carousel` no longer calls `onChange` for intermediate items that cross the viewport threshold during a programmatic smooth scroll. ([#1285](https://github.com/reapit-global/gbl-ds-elements/pull/1285))

- **[Fixed]** `CheckboxInput` and `RadioInput` icons now display correctly. ([#1433](https://github.com/reapit-global/gbl-ds-elements/pull/1433))

- **[Fixed]** `Checkbox` now sizes to its content width rather than stretching to fill its container. ([#1337](https://github.com/reapit-global/gbl-ds-elements/pull/1337))

- **[Fixed]** `ChipSelectControl` text overflow and truncation now work correctly. ([#1222](https://github.com/reapit-global/gbl-ds-elements/pull/1222))

- **[Fixed]** `DateTimeInput` custom picker button displays correctly when supported. ([#1468](https://github.com/reapit-global/gbl-ds-elements/pull/1468))

- **[Fixed]** icon spacing in deprecated `Snack` and `TableCell` components after `DeprecatedIcon` removal ([#1128](https://github.com/reapit-global/gbl-ds-elements/pull/1128))

- **[Fixed]** Visual bugs in `DescriptionList.Item` stories for tabular layout. The `Tabular` story now uses the correct `<DescriptionList grid="...">` decorator. ([#1348](https://github.com/reapit-global/gbl-ds-elements/pull/1348))

- **[Fixed]** Correct the Figma URL for the `EmptyState` component in the code connect configuration. ([#1331](https://github.com/reapit-global/gbl-ds-elements/pull/1331))

- **[Internal]** Exclude `.figma.tsx` files from the Vite library build's icon entry point glob. ([#1153](https://github.com/reapit-global/gbl-ds-elements/pull/1153))

- **[Internal]** Fix `'Show footer'` layer name to `'↳ Show footer'` in `FormLayout` code connect to match the actual Figma layer name ([#1474](https://github.com/reapit-global/gbl-ds-elements/pull/1474))

- **[Fixed]** `GalleryViewer.CarouselLayout` no longer overflows the dialog height. Each layout component now manages its own scroll: `MediaListLayout` scrolls internally and `CarouselLayout` remains fully contained within the available space. ([#1284](https://github.com/reapit-global/gbl-ds-elements/pull/1284))

- **[Fixed]** Icon and affix containers in `TextInput` clipped by unlayered global `box-sizing: border-box` reset overriding layered `content-box` declarations ([#1404](https://github.com/reapit-global/gbl-ds-elements/pull/1404))

- **[Fixed]** TypeScript path resolution for top-level type declarations when using the `#src/*` import alias. ([#1249](https://github.com/reapit-global/gbl-ds-elements/pull/1249))

- **[Security]** pin `@isaacs/brace-expansion` to 5.0.1 to resolve GHSA-7h2j-956f-4vf2 (Uncontrolled Resource Consumption via unbounded brace range expansion). This is a dev-only dependency and does not affect the published package. ([#1144](https://github.com/reapit-global/gbl-ds-elements/pull/1144))

- **[Internal]** Migrate anonymous `@layer {}` blocks to the named `@layer default` convention across all non-deprecated components. ([#1300](https://github.com/reapit-global/gbl-ds-elements/pull/1300))

- **[Fixed]** `MainContainer` grid columns now use `minmax(0, Xfr)` to prevent content from forcing columns to grow beyond their fractional width. ([#1425](https://github.com/reapit-global/gbl-ds-elements/pull/1425))

- **[Fixed]** Fix MDX docs pages failing to load in production Storybook builds due to a CSF4 chunk-splitting bug in Storybook 10 ([storybookjs/storybook#34373](https://github.com/storybookjs/storybook/issues/34373)) ([#1349](https://github.com/reapit-global/gbl-ds-elements/pull/1349))

- **[Fixed]** `PageHeader` no longer inherits `MainContainer` block padding ([#1304](https://github.com/reapit-global/gbl-ds-elements/pull/1304))

- **[Fixed]** custom date/time picker button appearing alongside native one on Firefox. The native picker button will always be used when the browser does not support hiding it. ([#1420](https://github.com/reapit-global/gbl-ds-elements/pull/1420))

- **[Fixed]** React 19 consumers no longer see "Invalid DOM property" console warnings for Popover API attributes. ([#1346](https://github.com/reapit-global/gbl-ds-elements/pull/1346))

- **[Fixed]** `replace-deprecated-toggle` codemod now correctly escapes `"` and `&` characters in extracted `ElToggleItem` label text, preventing malformed JSX attribute values in the output. ([#1268](https://github.com/reapit-global/gbl-ds-elements/pull/1268))

- **[Internal]** Correct `repository`, `homepage`, and `bugs` URLs in `package.json` to point to `reapit-global/gbl-ds-elements`. ([#1357](https://github.com/reapit-global/gbl-ds-elements/pull/1357))

- **[Fixed]** `Table.BodyCell` Figma code connect to reference the correct Figma node and avatar layer name. ([#1366](https://github.com/reapit-global/gbl-ds-elements/pull/1366))

- **[Fixed]** `Table` Figma Code Connect URLs updated to the Reapit DS file, and `Table.PrimaryData` icon props corrected to use `figma.nestedProps`. ([#1367](https://github.com/reapit-global/gbl-ds-elements/pull/1367))

- **[Fixed]** `Table.PrimaryData` content container now flows children into columns and handles white-space correctly. ([#1408](https://github.com/reapit-global/gbl-ds-elements/pull/1408))

- **[Fixed]** `TagGroup` contained CSS selectors for `data-overflow='hidden'` and `data-overflow='scroll'` that were unreachable — the prop type only allows `'auto'` and `'visible'`. Also corrected the invalid `scrollbar-width: 0` to `scrollbar-width: none`. ([#1401](https://github.com/reapit-global/gbl-ds-elements/pull/1401))

- **[Fixed]** `TextInput` affix text no longer overflows into the input region when the text is wider than the default padding. ([#1399](https://github.com/reapit-global/gbl-ds-elements/pull/1399))

- **[Fixed]** `upgrade-deprecated-button` codemod incorrectly rewriting facade package import paths to subpaths. ([#1125](https://github.com/reapit-global/gbl-ds-elements/pull/1125))

- **[Internal]** Serialise `@wyw-in-js/vite` transform calls to fix intermittent `AbortError` build failures under Vite 8. ([#1233](https://github.com/reapit-global/gbl-ds-elements/pull/1233))

- **[Fixed]** `Drawer` backdrop is now transparent on XS breakpoints ([#1146](https://github.com/reapit-global/gbl-ds-elements/pull/1146))

- **[Fixed]** Replace nested `<a>` with `<svg>` in `DeprecatedNavResponsive` logo to resolve invalid DOM nesting. ([#1150](https://github.com/reapit-global/gbl-ds-elements/pull/1150))

- **[Internal]** Rewrite barrel imports in the Storybook MCP manifest to use subpath imports (e.g. `@reapit/elements/core/button`) ([#1326](https://github.com/reapit-global/gbl-ds-elements/pull/1326))

- **[Internal]** Migrate release process to changesets. Versioning, changelog generation, and npm publishing are now automated via `changesets/action`. Contributors add a changeset file per PR; the release workflow handles the rest. ([#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105))

- **[Fixed]** `upgrade-deprecated-button-group` codemod no longer wraps children in `<ButtonGroup.Item>`, which is itself a button. ([#1148](https://github.com/reapit-global/gbl-ds-elements/pull/1148))

- **[Internal]** Add pre-commit and pre-push git hooks (Husky v9 + lint-staged) ([#1112](https://github.com/reapit-global/gbl-ds-elements/pull/1112))

- **[Fixed]** broken import in deprecated `FormLayout` docs ([#1191](https://github.com/reapit-global/gbl-ds-elements/pull/1191))

- **[Internal]** restrict the `post-checkout` hook to run only in linked worktrees so that `yarn install` runs automatically when a new linked worktree is created or when checking out a branch within a linked worktree, but is skipped in the main working tree. ([#1142](https://github.com/reapit-global/gbl-ds-elements/pull/1142))

- **[Internal]** Run related unit tests for staged files in the pre-commit hook via `vitest related`. Tests run in parallel with the lint and format tasks, keeping the hook as fast as possible. ([#1220](https://github.com/reapit-global/gbl-ds-elements/pull/1220))

- **[Internal]** Extract shared codemod utilities into `codemods/shared/` to reduce duplication across transforms ([#1252](https://github.com/reapit-global/gbl-ds-elements/pull/1252))

- **[Security]** Remove `globalThis.top` cross-frame access from Storybook stories, preventing CORS errors when embedding stories in external documentation ([#1297](https://github.com/reapit-global/gbl-ds-elements/pull/1297))

- **[Internal]** Fix release workflow failing to create git tag and GitHub release after publishing to npm. ([#1147](https://github.com/reapit-global/gbl-ds-elements/pull/1147))

- **[Internal]** Update browserslist db ([#1145](https://github.com/reapit-global/gbl-ds-elements/pull/1145))

- **[Fixed]** Update the export map for the `rewrite-v5-imports` codemod post-removal of `DeprecatedIcon` ([#1130](https://github.com/reapit-global/gbl-ds-elements/pull/1130))

- **[Changed]** Update CSS variables and design tokens to match Figma. Adds `black-000`, `white-000`, and `neutral-025` primitive tokens, removes the `transparent` primitive, and extends semantic colour tokens with `ai` variants for button fills, borders, and tertiary states across both Reapit and PayProp themes. Adds `gallery_viewer` semantic colour tokens for both themes. Adds a new `neutral` toast variant and renames the toast colour tokens — update any direct references to `--comp-toast-colour-fill-*` variables. ([#1260](https://github.com/reapit-global/gbl-ds-elements/pull/1260))

- **[Internal]** Update deploy config for v5 stable. ([#1466](https://github.com/reapit-global/gbl-ds-elements/pull/1466))

- **[Internal]** Update all component styles to reference the renamed `--icon_size` tokens (`-l` → `-lg`, `-m` → `-md`, `-s` → `-sm`) and the consolidated gallery viewer caption colour token. Use `upgrade-css-variables` codemod to migrate usage of these tokens. ([#1454](https://github.com/reapit-global/gbl-ds-elements/pull/1454))

- **[Internal]** Update `rewrite-v5-imports` codemod export map to cover all remaining barrel-only exports. The codemod now maps `Intent`, `getIntentClassName`, deprecated CSS class helpers, and `Theme` to their new subpath entry points. ([#1256](https://github.com/reapit-global/gbl-ds-elements/pull/1256))

- **[Changed]** Updated export map used by rewrite-v5-imports codemod ([#1351](https://github.com/reapit-global/gbl-ds-elements/pull/1351))

- **[Changed]** Core components now use new shadow design tokens. ([#1463](https://github.com/reapit-global/gbl-ds-elements/pull/1463))

## 5.0.0-rc.9

### Minor Changes

- **[Added]** `@reapit/elements/core/app-switcher/anz` subpath for ANZ-specific `AppSwitcher` exports. Run the `rewrite-anz-app-switcher-imports` codemod to migrate automatically. ([#1435](https://github.com/reapit-global/gbl-ds-elements/pull/1435))

- **[Added]** `orientation` and `align` props to `ButtonGroup`. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Added]** `Card`, `ButtonCard`, and `AnchorCard` components. `Card` is a generic surface for containing related content. `ButtonCard` and `AnchorCard` are interactive variants that render as `<button>` and `<a>` elements respectively. ([#1455](https://github.com/reapit-global/gbl-ds-elements/pull/1455))

- **[Added]** `CurrencyControl` component. A pre-baked `CurrencyInput` + `FormControl` for use when a currency input needs a label, help text, or error message. ([#1457](https://github.com/reapit-global/gbl-ds-elements/pull/1457))

- **[Added]** `CurrencyInput` component. Builds on `NumberInput` to format a monetary value for a given `currency`, with the localised currency symbol placed automatically as a prefix or suffix based on the locale. ([#1457](https://github.com/reapit-global/gbl-ds-elements/pull/1457))

- **[Added]** `FormLayout` component. Provides consistent layout and spacing for forms, with `FormLayout.Header`, `FormLayout.Title`, `FormLayout.Description`, and `FormLayout.Footer` sub-components. Renders as a `<section>` element with automatic ARIA wiring between the section and its title and description. ([#1453](https://github.com/reapit-global/gbl-ds-elements/pull/1453))

- **[Added]** `FormLayout.Section` sub-component. Use `FormLayout.SectionHeader`, `FormLayout.SectionTitle`, and `FormLayout.SectionDescription` to label sections of a form layout with a heading and optional description. Also added: `as` prop on `FormLayout.Title` for configuring the heading level. ([#1451](https://github.com/reapit-global/gbl-ds-elements/pull/1451))

- **[Added]** `NumberControl` component. Wraps `NumberInput` with `FormControl` for label, help text, and error text support. ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Added]** `getLocaleNumberSeparators`, `getIntlNumberFormat`, `getNumberAffix`, and `DESCRIPTIVE_PART_TYPES` utilities, and the `LocaleNumberSeparators` and `NumberAffix` types, at `@reapit/elements/utils/number-format`. ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Added]** `NumberInput` component. Displays locale-aware formatted numbers via an overlay whilst keeping the raw numeric value as the input value. Accepts `locale`, `formatOptions`, `inputMode`, `min`, and `max` props. When `formatOptions.style` is `'currency'`, `'percent'`, or `'unit'` and no affix prop is supplied, the localised affix is automatically derived and rendered as a prefix or suffix; supplying an explicit `prefix`, `suffix`, `leadingIcon`, or `trailingIcon` takes precedence and disables the derivation. With `style: 'percent'`, values are stored and edited as model-space decimals (e.g. `0.255` displays as `25.5%`). ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Added]** `replace-deprecated-button-group-layout-props` codemod to migrate `ButtonGroup` usage from the deprecated `autoFlow` and `justifyContent` props to the new `orientation` and `align` props. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Added]** `formatValue` prop to `TextInput`. Accepts a `(value: string) => string` function that renders formatted text in an overlay while preserving the raw value in the underlying input. ([#1445](https://github.com/reapit-global/gbl-ds-elements/pull/1445))

- **[Deprecated]** `SupportedProductId`, `ProductConfig`, `AppSwitcher.AppAvatar`, `AppSwitcher.ProductMenuItem`, `AppSwitcher.getDisplayableProductsForYourAppsGroup`, and `AppSwitcher.getDisplayableProductsForExploreGroup` from `@reapit/elements/core/app-switcher`. Import from `@reapit/elements/core/app-switcher/anz` instead. ([#1435](https://github.com/reapit-global/gbl-ds-elements/pull/1435))

- **[Deprecated]** `autoFlow` and `justifyContent` props on `ButtonGroup`. Use `orientation` and `align` instead. Run the `replace-deprecated-button-group-layout-props` codemod to migrate automatically. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Added]** support for breaking icon size CSS variable change to upgrade-css-variables codemod ([#1460](https://github.com/reapit-global/gbl-ds-elements/pull/1460))

### Patch Changes

- **[Changed]** `AtAGlance.Card` now uses new core `Card`, `ButtonCard` and `AnchorCard`. ([#1462](https://github.com/reapit-global/gbl-ds-elements/pull/1462))

- **[Fixed]** `TextInput` and `Button` busy spinner animations now play correctly. ([#1444](https://github.com/reapit-global/gbl-ds-elements/pull/1444))

- **[Fixed]** `ButtonGroup` with `orientation="horizontal"` and `align="stretch"` now correctly stretches buttons to equal height. ([#1440](https://github.com/reapit-global/gbl-ds-elements/pull/1440))

- **[Internal]** Update all component styles to reference the renamed `--icon_size` tokens (`-l` → `-lg`, `-m` → `-md`, `-s` → `-sm`) and the consolidated gallery viewer caption colour token. Use `upgrade-css-variables` codemod to migrate usage of these tokens. ([#1454](https://github.com/reapit-global/gbl-ds-elements/pull/1454))

- **[Changed]** Core components now use new shadow design tokens. ([#1463](https://github.com/reapit-global/gbl-ds-elements/pull/1463))

## 5.0.0-rc.8

### Patch Changes

- **[Fixed]** `CheckboxInput` and `RadioInput` icons now display correctly. ([#1433](https://github.com/reapit-global/gbl-ds-elements/pull/1433))

## 5.0.0-rc.7

### Patch Changes

- **[Fixed]** `AlertBanner` actions no longer stretch to match the height of wrapping description text when actions are inline with the description at wider breakpoints. ([#1427](https://github.com/reapit-global/gbl-ds-elements/pull/1427))

- **[Fixed]** `ButtonGroup` buttons are now always vertically centred, including when a tertiary button with no block padding is present in the group. ([#1427](https://github.com/reapit-global/gbl-ds-elements/pull/1427))

- **[Fixed]** `MainContainer` grid columns now use `minmax(0, Xfr)` to prevent content from forcing columns to grow beyond their fractional width. ([#1425](https://github.com/reapit-global/gbl-ds-elements/pull/1425))

## 5.0.0-rc.6

### Patch Changes

- **[Fixed]** custom date/time picker button appearing alongside native one on Firefox. The native picker button will always be used when the browser does not support hiding it. ([#1420](https://github.com/reapit-global/gbl-ds-elements/pull/1420))

## 5.0.0-rc.5

### Minor Changes

- **[Added]** `variant` and `aria-orientation` props to `Divider` component. Supports `'solid'` and `'dashed'` styles and both horizontal and vertical orientation. ([#1417](https://github.com/reapit-global/gbl-ds-elements/pull/1417))

- **[Changed]** `Features.Bathrooms`, `Features.Bedrooms` and `Features.CarSpaces` now accept `ReactNode` values rather than `number` ([#1418](https://github.com/reapit-global/gbl-ds-elements/pull/1418))

## 5.0.0-rc.4

### Patch Changes

- **[Fixed]** `Badge` no longer stretches to fill its container width. ([#1407](https://github.com/reapit-global/gbl-ds-elements/pull/1407))

- **[Fixed]** `Table.PrimaryData` content container now flows children into columns and handles white-space correctly. ([#1408](https://github.com/reapit-global/gbl-ds-elements/pull/1408))

## 5.0.0-rc.3

### Minor Changes

- **[Changed]** Wrap all component styles in cascade layers (`@layer elements.base` and `@layer elements.main`) so that consumer-supplied classes can override defaults without needing higher specificity or `!important`. A layer order declaration (`@layer elements.base, elements.main;`) is emitted first to guarantee consistent ordering. Consumers using their own named `@layer`s should review how their layer order interacts with `elements.base` and `elements.main`. The `elFont` class is now a no-op — the font is loaded unconditionally from the global stylesheet. ([#1398](https://github.com/reapit-global/gbl-ds-elements/pull/1398))

### Patch Changes

- **[Internal]** Add a searchable `Icons/Gallery` story to Storybook. Each tile shows the icon name and a **Copy import** button that copies the icon's subpath import statement to the clipboard. Search matches against the icon's name or a small set of curated synonyms in `src/icons/docs/icon-synonyms.json`. ([#1403](https://github.com/reapit-global/gbl-ds-elements/pull/1403))

- **[Fixed]** Icon and affix containers in `TextInput` clipped by unlayered global `box-sizing: border-box` reset overriding layered `content-box` declarations ([#1404](https://github.com/reapit-global/gbl-ds-elements/pull/1404))

- **[Fixed]** `TagGroup` contained CSS selectors for `data-overflow='hidden'` and `data-overflow='scroll'` that were unreachable — the prop type only allows `'auto'` and `'visible'`. Also corrected the invalid `scrollbar-width: 0` to `scrollbar-width: none`. ([#1401](https://github.com/reapit-global/gbl-ds-elements/pull/1401))

- **[Fixed]** `TextInput` affix text no longer overflows into the input region when the text is wider than the default padding. ([#1399](https://github.com/reapit-global/gbl-ds-elements/pull/1399))

## 5.0.0-rc.2

### Major Changes

- **[Changed]** `ChipSelect` single-select now works without a form association or shared `name` attribute. `ChipSelectChip` is now purely presentational and no longer auto-deselects siblings when checked — that behaviour now lives in `ChipSelect.Option`. Consumers relying on the previous `ChipSelectChip` behaviour should wrap chips in `ChipSelect` with `ChipSelect.Option`, or manage selection state themselves. ([#1377](https://github.com/reapit-global/gbl-ds-elements/pull/1377))

- **[Removed]** `ChipSelect.Option` no longer accepts a `required` prop. Use `required` on `ChipSelect` to enforce that at least one option remains selected. ([#1378](https://github.com/reapit-global/gbl-ds-elements/pull/1378))

- **[Changed]** `ChipSelect` `required` now prevents deselecting the last selected option and applies native form validation to the group. ([#1378](https://github.com/reapit-global/gbl-ds-elements/pull/1378))

- **[Removed]** internal exports from the public API surface. Top-level barrel files in `src/core`, `src/utils`, and `src/lab` now use explicit named exports instead of `export *`, removing leaked internal hooks, utilities, and sub-components that were never intended to be public. ([#1383](https://github.com/reapit-global/gbl-ds-elements/pull/1383))

### Patch Changes

- **[Internal]** Correct `repository`, `homepage`, and `bugs` URLs in `package.json` to point to `reapit-global/gbl-ds-elements`. ([#1357](https://github.com/reapit-global/gbl-ds-elements/pull/1357))

## 5.0.0-rc.1

### Major Changes

- **[Removed]** the `@reapit/elements` bare specifier entry point and all top-level barrel files (`src/index.ts`, `src/core/index.ts`, `src/utils/index.ts`, `src/lab/index.ts`, `src/deprecated/index.ts`). Use subpath imports such as `@reapit/elements/core/button` instead. Run the `rewrite-v5-imports` codemod to migrate automatically. ([#1368](https://github.com/reapit-global/gbl-ds-elements/pull/1368))

### Minor Changes

- **[Added]** `GridIcon` icon component. ([#1370](https://github.com/reapit-global/gbl-ds-elements/pull/1370))

- **[Added]** `AiSparkle1Icon`, `AiSparkle2Icon`, `BuildingIcon`, `BuildingSizeIcon`, `LayersIcon`, `ListIcon`, `MapIcon`, `PhoneOutlineIcon`, `SofaIcon`, `ThumbDownIcon`, and `ThumbUpIcon` icons. ([#1365](https://github.com/reapit-global/gbl-ds-elements/pull/1365))

### Patch Changes

- **[Internal]** `yarn generate:icons` now fetches and processes SVG files directly from Figma, removing the need to export them manually. ([#1362](https://github.com/reapit-global/gbl-ds-elements/pull/1362))

- **[Fixed]** `Table.BodyCell` Figma code connect to reference the correct Figma node and avatar layer name. ([#1366](https://github.com/reapit-global/gbl-ds-elements/pull/1366))

- **[Fixed]** `Table` Figma Code Connect URLs updated to the Reapit DS file, and `Table.PrimaryData` icon props corrected to use `figma.nestedProps`. ([#1367](https://github.com/reapit-global/gbl-ds-elements/pull/1367))

## 5.0.0-beta.95

### Minor Changes

- **[Added]** `keepMounted` prop to `Accordion`. When `false`, children are unmounted when the accordion is closed, deferring rendering until first open. Defaults to `true` (existing behaviour unchanged). ([#1356](https://github.com/reapit-global/gbl-ds-elements/pull/1356))

- **[Added]** `verifyweb` to the `AppSwitcher` product display order. ([#1358](https://github.com/reapit-global/gbl-ds-elements/pull/1358))

### Patch Changes

- **[Changed]** Updated export map used by rewrite-v5-imports codemod ([#1351](https://github.com/reapit-global/gbl-ds-elements/pull/1351))

## 5.0.0-beta.94

### Major Changes

- **[Removed]** direct named exports of sub-components that are accessible via their parent component namespace. Affected components: `Accordion`, `AppSwitcher`, `AtAGlance`, `Autocomplete`, `BottomBar`, `Breadcrumbs`, `ButtonGroup`, `CheckboxGroupControl`, `ChipSelect`, `CompactSelect`, `DescriptionList`, `Drawer`, `Features`, `FilterBar`, `FocusedLayout`, `FolderTabs`, `FormControl`, `Menu`, `OfficeSwitcher`, `PageHeader`, `PageLayout`, `Pagination`, `PrimaryTabs`, `RadioGroupControl`, `SecondaryTabs`, `Select`, `SideBar`, `SplitButton`, `SupplementaryInfo`, `Table`, `TagGroup`, and `TopBar`. ([#1335](https://github.com/reapit-global/gbl-ds-elements/pull/1335))

  To migrate, import the parent component and access the sub-component via the namespace. For example:

  ```ts
  // Before
  import { AccordionSummary, DrawerBody, TableBody } from "@reapit/elements";

  // After
  import { Accordion, Drawer, Table } from "@reapit/elements";
  // AccordionSummary → Accordion.Summary
  // DrawerBody       → Drawer.Body
  // TableBody        → Table.Body
  ```

- **[Changed]** `EmptyData` component and all related exports renamed to `EmptyState`. Run the `rename-empty-data` codemod to migrate automatically. ([#1328](https://github.com/reapit-global/gbl-ds-elements/pull/1328))

### Minor Changes

- **[Added]** `useAIStyle` prop to `Button` and `AnchorButton`. Applies an AI-themed visual style across all three variants. ([#1341](https://github.com/reapit-global/gbl-ds-elements/pull/1341))

### Patch Changes

- **[Fixed]** Default `position` for `buildAnchorPositioningCSS` and `Popover` is now `'fixed'` instead of `'absolute'`, preventing unexpected document scrolling when an anchored popup is open inside a scrolled container such as a `Drawer`. ([#1338](https://github.com/reapit-global/gbl-ds-elements/pull/1338))

- **[Fixed]** `Checkbox` now sizes to its content width rather than stretching to fill its container. ([#1337](https://github.com/reapit-global/gbl-ds-elements/pull/1337))

- **[Fixed]** Visual bugs in `DescriptionList.Item` stories for tabular layout. The `Tabular` story now uses the correct `<DescriptionList grid="...">` decorator. ([#1348](https://github.com/reapit-global/gbl-ds-elements/pull/1348))

- **[Fixed]** Correct the Figma URL for the `EmptyState` component in the code connect configuration. ([#1331](https://github.com/reapit-global/gbl-ds-elements/pull/1331))

- **[Fixed]** Fix MDX docs pages failing to load in production Storybook builds due to a CSF4 chunk-splitting bug in Storybook 10 ([storybookjs/storybook#34373](https://github.com/storybookjs/storybook/issues/34373))

- **[Fixed]** React 19 consumers no longer see "Invalid DOM property" console warnings for Popover API attributes. ([#1346](https://github.com/reapit-global/gbl-ds-elements/pull/1346))

## 5.0.0-beta.93

### Minor Changes

- **[Added]** Storybook MCP endpoint hosted on `elements.reapit.com.au`. AI tools that support the Model Context Protocol can now query component stories and documentation directly. ([#1319](https://github.com/reapit-global/gbl-ds-elements/pull/1319))

### Patch Changes

- **[Internal]** Add Figma Code Connect for `AlertBanner` ([#1325](https://github.com/reapit-global/gbl-ds-elements/pull/1325))

- **[Internal]** Rewrite barrel imports in the Storybook MCP manifest to use subpath imports (e.g. `@reapit/elements/core/button`) ([#1326](https://github.com/reapit-global/gbl-ds-elements/pull/1326))

## 5.0.0-beta.92

### Minor Changes

- **[Added]** `replace-deprecated-snack` codemod. Migrates `SnackProvider`, `useSnack`, `Snack`, `SnackHolder`, and related exports to the `Toaster` and `toast` API from `@reapit/elements/core/toaster`. Supports facade packages via `--facade-package`. ([#1317](https://github.com/reapit-global/gbl-ds-elements/pull/1317))

- **[Added]** `Toast` component. A presentation-only notification supporting `error`, `info`, `neutral`, `success`, and `warning` variants with an optional animated timeout bar. ([#1307](https://github.com/reapit-global/gbl-ds-elements/pull/1307))

- **[Added]** `children` prop to `Toaster`, allowing it to wrap application content in the same way as the deprecated `SnackProvider`. ([#1317](https://github.com/reapit-global/gbl-ds-elements/pull/1317))

- **[Added]** `Toaster` component with `toast()` imperative API for displaying timed, dismissible toast notifications. Supports swipe-to-dismiss, auto-dismiss with configurable duration, and page-visibility-aware timer pausing. ([#1311](https://github.com/reapit-global/gbl-ds-elements/pull/1311))

## 5.0.0-beta.91

### Patch Changes

- **[Fixed]** `PageHeader` no longer inherits `MainContainer` block padding ([#1304](https://github.com/reapit-global/gbl-ds-elements/pull/1304))

## 5.0.0-beta.90

### Major Changes

- **[Changed]** `MainContainer` now includes block (top and bottom) padding by default. Previously, only inline padding was applied. To restore the previous behaviour, use the new `hasNoTopPadding` and `hasNoBottomPadding` props. ([#1301](https://github.com/reapit-global/gbl-ds-elements/pull/1301))

### Patch Changes

- **[Internal]** Migrate anonymous `@layer {}` blocks to the named `@layer default` convention across all non-deprecated components. ([#1300](https://github.com/reapit-global/gbl-ds-elements/pull/1300))

- **[Security]** Remove `globalThis.top` cross-frame access from Storybook stories, preventing CORS errors when embedding stories in external documentation ([#1297](https://github.com/reapit-global/gbl-ds-elements/pull/1297))

## 5.0.0-beta.89

### Major Changes

- **[Removed]** `Input`, `InputGroup`, `InputAddOn`, and `InputError` components from `@reapit/elements`. See `codemods/migrate-deprecated-input/README.md` for the migration guide. ([#1287](https://github.com/reapit-global/gbl-ds-elements/pull/1287))

### Patch Changes

- **[Internal]** Add Figma Code Connect for `MainContainer` and `PageLayout` components ([#1293](https://github.com/reapit-global/gbl-ds-elements/pull/1293))

- **[Fixed]** `ChipSelect` no longer causes the page to scroll or appear blank when an option receives focus inside a fixed-height layout. ([#1295](https://github.com/reapit-global/gbl-ds-elements/pull/1295))

## 5.0.0-beta.88

### Major Changes

- **[Changed]** `GalleryViewer.Thumbnail` `aria-current` prop now accepts `"location"` instead of `"page"`. Update any usage of `aria-current="page"` to `aria-current="location"`. ([#1292](https://github.com/reapit-global/gbl-ds-elements/pull/1292))

### Minor Changes

- **[Added]** `GalleryViewer` component. Composes the gallery viewer subcomponents — `GalleryViewer.Header`, `GalleryViewer.Content`, `GalleryViewer.CarouselLayout`, `GalleryViewer.MediaListLayout`, `GalleryViewer.Carousel`, `GalleryViewer.MediaList`, and `GalleryViewer.Caption` — under a single import. ([#1284](https://github.com/reapit-global/gbl-ds-elements/pull/1284))

- **[Added]** `GalleryViewerCarouselLayout` and `GalleryViewerMediaListLayout` layout components for the gallery viewer. `GalleryViewerCarouselLayout` provides a two-column layout; `GalleryViewerMediaListLayout` provides a single-column stacked layout. ([#1281](https://github.com/reapit-global/gbl-ds-elements/pull/1281))

- **[Added]** `TextControl`, `TextareaControl`, `SelectNativeControl`, `CheckboxControl`, and `DateTimeControl` now forward refs to their underlying input elements. ([#1283](https://github.com/reapit-global/gbl-ds-elements/pull/1283))

- **[Changed]** `GalleryViewerDialog.Content` no longer applies padding. Padding is now the responsibility of the layout components (`GalleryViewerCarouselLayout` and `GalleryViewerMediaListLayout`) placed inside `Content`. ([#1281](https://github.com/reapit-global/gbl-ds-elements/pull/1281))

### Patch Changes

- **[Fixed]** `GalleryViewer.Carousel` no longer calls `onChange` for intermediate items that cross the viewport threshold during a programmatic smooth scroll. ([#1285](https://github.com/reapit-global/gbl-ds-elements/pull/1285))

- **[Fixed]** `GalleryViewer.CarouselLayout` no longer overflows the dialog height. Each layout component now manages its own scroll: `MediaListLayout` scrolls internally and `CarouselLayout` remains fully contained within the available space. ([#1284](https://github.com/reapit-global/gbl-ds-elements/pull/1284))

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
