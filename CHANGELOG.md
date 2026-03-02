# @reapit/elements

## 5.0.0-beta.76

### Major Changes

- [#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) Thanks [@kdoherty_Reapit](https://github.com/kdoherty_Reapit)! - Unreleased changes accumulated prior to changeset adoption (beta.76 development):

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

### Patch Changes

- [#1105](https://github.com/reapit-global/gbl-ds-elements/pull/1105) [`e78c4c8`](https://github.com/reapit-global/gbl-ds-elements/commit/e78c4c8234416385c2546464b2c5399bd6ace088) Thanks [@kdoherty_Reapit](https://github.com/kdoherty_Reapit)! - Migrate release process to changesets. Versioning, changelog generation, and npm publishing are now automated via `changesets/action`. Contributors add a changeset file per PR; the release workflow handles the rest.
