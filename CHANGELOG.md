# @reapit/elements

## 5.0.0-beta.78

### Patch Changes

- **[Internal]** Upgrade development-only dependencies ([#1149](https://github.com/reapit-global/gbl-ds-elements/pull/1149), [`efbddbc`](https://github.com/reapit-global/gbl-ds-elements/commit/efbddbcbd9994f1d2b9b42b14bf156b0f6d1060f), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Security]** pin `@isaacs/brace-expansion` to 5.0.1 to resolve GHSA-7h2j-956f-4vf2 (Uncontrolled Resource Consumption via unbounded brace range expansion). This is a dev-only dependency and does not affect the published package. ([#1144](https://github.com/reapit-global/gbl-ds-elements/pull/1144), [`9c37ed7`](https://github.com/reapit-global/gbl-ds-elements/commit/9c37ed7581e1cf4dc7a05d28922cc4e22d34223c), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** Fix: `Drawer` backdrop is now transparent on XS breakpoints ([#1146](https://github.com/reapit-global/gbl-ds-elements/pull/1146), [`7cc55f5`](https://github.com/reapit-global/gbl-ds-elements/commit/7cc55f51c4868f681848fc87b6892e2333372d14), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** Fix: `upgrade-deprecated-button-group` codemod no longer wraps children in `<ButtonGroup.Item>`, which is itself a button ([#1148](https://github.com/reapit-global/gbl-ds-elements/pull/1148), [`16ea8a7`](https://github.com/reapit-global/gbl-ds-elements/commit/16ea8a772def96a326ffe688d2706826464ecfb0), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** restrict the `post-checkout` hook to run only in linked worktrees so that `yarn install` runs automatically when a new linked worktree is created or when checking out a branch within a linked worktree, but is skipped in the main working tree. ([#1142](https://github.com/reapit-global/gbl-ds-elements/pull/1142), [`f28b29b`](https://github.com/reapit-global/gbl-ds-elements/commit/f28b29b87ce31e13138f8e147a47f95bbdf6d4e3), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Fix release workflow failing to create git tag and GitHub release after publishing to npm. ([#1147](https://github.com/reapit-global/gbl-ds-elements/pull/1147), [`90b464a`](https://github.com/reapit-global/gbl-ds-elements/commit/90b464aa9a1c65366802c8ec2ef3b0de7dca387b), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Update browserslist db ([#1145](https://github.com/reapit-global/gbl-ds-elements/pull/1145), [`6830293`](https://github.com/reapit-global/gbl-ds-elements/commit/6830293ad91420f325ac5daabb83aeee74232cc2), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

## 5.0.0-beta.77

### Major Changes

- **[Changed]** `useDrawerContext` now returns `DrawerContext.Value | null` instead of throwing when called outside a `Drawer`. ([#1141](https://github.com/reapit-global/gbl-ds-elements/pull/1141), [`4e6232e`](https://github.com/reapit-global/gbl-ds-elements/commit/4e6232e01e39a8aed463bd6a6a811ea2130d48d2), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** Remove `DeprecatedIcon` component and associated icon assets. ([#1119](https://github.com/reapit-global/gbl-ds-elements/pull/1119), [`f538546`](https://github.com/reapit-global/gbl-ds-elements/commit/f5385461de5bb02d8108ef1522b516dc65b6def7), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

  **Breaking changes**

  - Removed the `DeprecatedIcon` component (`src/deprecated/icon`). Use icon components from `src/icons` instead (e.g. `SearchIcon`, `CloseIcon`, `InfoIcon`).
  - Removed the `DeprecatedIcons` constants (`src/deprecated/icons`).
  - Removed legacy icon SVG assets from `assets/icons/` and placeholder images from `assets/placeholder-images/`.

  Use the `upgrade-deprecated-icon` codemod to migrate usages automatically.

- **[Removed]** Removed `DeprecatedButton`, `DeprecatedButtonGroup`, and `DeprecatedFloatingButton` and all associated types and styles. Run the `upgrade-deprecated-button` codemod to migrate `DeprecatedButton` usages to the `Button` API before upgrading. Run the `upgrade-deprecated-button-group` codemod to migrate `DeprecatedButtonGroup` usages. `DeprecatedFloatingButton` usages must be migrated manually. ([#1126](https://github.com/reapit-global/gbl-ds-elements/pull/1126), [`b99b895`](https://github.com/reapit-global/gbl-ds-elements/commit/b99b89573123684c3808ec54ae89340a85c04de8), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Removed]** Remove the deprecated `useMediaQuery` hook and related exports. ([#1131](https://github.com/reapit-global/gbl-ds-elements/pull/1131), [`1480122`](https://github.com/reapit-global/gbl-ds-elements/commit/148012285540b1c2482c328284dceae3443e9c34), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

  **Breaking changes**

  - Removed `useMediaQuery`, `MediaType`, `MediaStateContext`, `MediaStateProvider`, `MOBILE_BREAKPOINT`, `TABLET_BREAKPOINT`, `DESKTOP_BREAKPOINT`, `WIDESCREEN_BREAKPOINT`, and `SUPER_WIDESCREEN_BREAKPOINT` from `src/deprecated/use-media-query`.

  Use the `upgrade-deprecated-use-media-query` codemod to migrate usages automatically.

- **[Removed]** `DeprecatedSplitButton`, `DeprecatedActionButton`, and `DeprecatedMenuButton`. Use the `upgrade-deprecated-split-button` codemod to migrate to the new `SplitButton` API. ([#1124](https://github.com/reapit-global/gbl-ds-elements/pull/1124), [`e82bba3`](https://github.com/reapit-global/gbl-ds-elements/commit/e82bba3de72891517520b5379a30f4255fb8b468), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Minor Changes

- **[Added]** Add `autoFlow` and `justifyContent` props to `ButtonGroup`. ([#1135](https://github.com/reapit-global/gbl-ds-elements/pull/1135), [`47edd34`](https://github.com/reapit-global/gbl-ds-elements/commit/47edd348b87aeadcea483d7a6b80859b92ee19c4), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

  `ButtonGroup` now uses `display: grid` internally. Two new props control the grid layout:

  - `autoFlow?: 'row' | 'column'` — maps to the CSS `grid-auto-flow` property.
  - `justifyContent?: 'start' | 'end' | 'center' | 'stretch'` — maps to the CSS `justify-content` property.

  The default grid layout (`grid-auto-flow: column`) preserves the existing horizontal button arrangement.

- **[Added]** `upgrade-deprecated-badge` codemod to migrate from `DeprecatedBadge` to the new `Badge`, mapping `intent` to `colour` and replacing `DeprecatedBadgeGroup` with an equivalent `div` layout. ([#1123](https://github.com/reapit-global/gbl-ds-elements/pull/1123), [`e870e51`](https://github.com/reapit-global/gbl-ds-elements/commit/e870e510850adfab5ee5788bb9c34e324083dc03), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `upgrade-deprecated-button-group` codemod to migrate from `DeprecatedButtonGroup` to the new `ButtonGroup`, mapping `alignment` to `justifyContent` and wrapping static children in `<ButtonGroup.Item>`. ([#1136](https://github.com/reapit-global/gbl-ds-elements/pull/1136), [`16e7a55`](https://github.com/reapit-global/gbl-ds-elements/commit/16e7a5528da098169189e1cc20e76ee471b0bdb4), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Added]** `upgrade-deprecated-use-media-query` codemod to migrate deprecated `useMediaQuery` and related exports to individual `useMatchMedia` calls and breakpoint utilities ([#1120](https://github.com/reapit-global/gbl-ds-elements/pull/1120), [`60f7be8`](https://github.com/reapit-global/gbl-ds-elements/commit/60f7be82e94283d83551767b7fbd113dd3b68b96), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

### Patch Changes

- **[Fixed]** Add `upgrade-deprecated-tag` codemod to migrate `DeprecatedTag` and `DeprecatedTagGroup` imports and JSX usage to the new `Tag` and `TagGroup` components, removing `intent` props and rewriting `DeprecatedTagProps` type references to `Tag.Props`. ([#1138](https://github.com/reapit-global/gbl-ds-elements/pull/1138), [`cf0eb9a`](https://github.com/reapit-global/gbl-ds-elements/commit/cf0eb9a880b631cec37c9388d2557cfe395a7905), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Internal]** Add custom Keep a Changelog-inspired formatter for changesets. Each entry is tagged with a category derived from a prefix in the summary (e.g. `Fixed:`, `Added:`) or inferred from the semver bump type. Entries include GitHub PR, commit, and author links. ([#1140](https://github.com/reapit-global/gbl-ds-elements/pull/1140), [`a551e87`](https://github.com/reapit-global/gbl-ds-elements/commit/a551e8795416f11fad890370c2ee1e60371cd212), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** Fix icon spacing in deprecated `Snack` and `TableCell` components after `DeprecatedIcon` removal ([#1128](https://github.com/reapit-global/gbl-ds-elements/pull/1128), [`78374fc`](https://github.com/reapit-global/gbl-ds-elements/commit/78374fc626661ff982884bca6cc15a7fe21d8d91), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

- **[Fixed]** Fix `upgrade-deprecated-button` codemod incorrectly rewriting facade package import paths to subpaths ([#1125](https://github.com/reapit-global/gbl-ds-elements/pull/1125), [`f084c71`](https://github.com/reapit-global/gbl-ds-elements/commit/f084c71af390fcdc6af24a847b60c8cde4d80006), [@kdoherty_Reapit](https://github.com/kdoherty_Reapit))

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
