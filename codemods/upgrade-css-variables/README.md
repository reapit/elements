---
description: Migrates legacy CSS custom properties to their v5 equivalents
---

# Upgrade CSS Variables Codemod

Replaces legacy CSS custom properties (`var(--old-name)`) with their v5 equivalents across all file types: `.tsx`, `.ts`, `.css`, `.scss`, `.less`, `.jsx`, `.js`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-css-variables

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-css-variables src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-css-variables src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-css-variables src/ --ext .tsx,.css,.scss
```

## Background

Reapit Elements v5 introduced a new design token system with semantic naming conventions (`--colour-fill-*`, `--colour-text-*`, `--spacing-*`, etc.). Earlier design systems used a different set of CSS custom properties that are no longer defined in v5. This codemod automates the bulk of the migration.

## Transformations

### Direct (1-to-1) mappings

These variables have clear v5 equivalents and are replaced silently:

| Legacy variable               | v5 replacement      |
| ----------------------------- | ------------------- |
| `var(--layout-size-base)`     | `var(--spacing-4)`  |
| `var(--layout-size-molecule)` | `var(--spacing-5)`  |
| `var(--layout-size-atom)`     | `var(--spacing-3)`  |
| `var(--layout-size-1_2)`      | `var(--spacing-2)`  |
| `var(--layout-size-1_4)`      | `var(--spacing-1)`  |
| `var(--layout-size-3_4)`      | `var(--spacing-3)`  |
| `var(--layout-size-2)`        | `var(--spacing-8)`  |
| `var(--layout-size-3)`        | `var(--spacing-12)` |

> **Note on spacing scale**: The v4 spacing tokens used `rem` values while the v5 tokens use `px`. The mappings above are based on the closest equivalent values (e.g. `1rem` → `--spacing-4` which is `16px`).

### Best-effort mappings

These variables are replaced with the most likely v5 equivalent, but an inline `TODO` comment is added to flag them for manual review. The correct v5 token may depend on context (e.g. whether the variable is used for `fill`, `text`, `border`, or `icon` colouring).

**Example output:**

```css
/* Before */
color: var(--intent-primary);

/* After */
color: var(--colour-fill-action-dark)
  /* TODO: --intent-primary has no direct v5 equivalent — verify this replacement is correct for your context */;
```

Best-effort categories:

- **Intent colours**: `--intent-primary`, `--intent-neutral`, `--intent-success`, `--intent-pending`, `--intent-warning`, `--intent-danger`, `--intent-default` (and their `-light`, `-lightest`, `-dark` variants)
- **Deprecated intent aliases**: `--intent-secondary`, `--intent-critical`, `--intent-low`, `--blue-light`, `--blue-dark`, etc.
- **Neutral aliases**: `--white`, `--black`, `--neutral-darkest`, `--neutral-dark`, `--neutral-medium`, `--neutral-light`, `--neutral-lightest`
- **Draft `--color-*` palette variables**: `--color-grey-*`, `--color-purple-*`, `--color-blue-*`, `--color-green-*`, `--color-yellow-*`, `--color-orange-*`, `--color-red-*`

### Inline mappings

These variables have no v5 equivalent, but their resolved concrete values are known and stable. The `var()` call is replaced with the concrete value and a `/* was var(--name) */` comment. Any existing fallback inside the `var()` is dropped.

**Example output:**

```css
/* Before */
background: var(--component-input-bg);

/* After */
background: #ffffff /* was var(--component-input-bg) */;
```

Inline categories:

- **Font family**: `--font-sans-serif` → `'Inter', Helvetica, Arial, sans-serif`
- **Font monospace**: `--font-monospace` → `'Source Code Pro', monospace`
- **Font sizes**: `--font-size-heading` → `1.5rem`, `--font-size-subheading` → `1.25rem`, `--font-size-small-subheading` → `1.125rem`, `--font-size-default` → `0.9375rem`, `--font-size-small` → `0.875rem`, `--font-size-smallest` → `0.8125rem`
- **Font weights**: `--font-weight-default` → `400`, `--font-weight-medium` → `500`, `--font-weight-bold` → `600`
- **`--default-border-radius`** → `0.25rem`
- **Component input tokens**: `--component-input-bg`, `--component-input-focus-bg`, `--component-input-shadow`, `--component-input-border`, `--component-input-border-focus`, `--component-input-border-bottom`, `--component-input-border-bottom-focus`
- **Component tokens**: `--component-steps-gutter-width`, `--component-table-min-column-width`
- **Nav tokens**: `--nav-menu-background-dark`, `--nav-menu-background-accent`, `--nav-menu-text`, `--nav-menu-text-hover`, `--nav-menu-icon-primary-accent`, `--nav-menu-icon-secondary-accent`, `--nav-brand-height`
- **Page header tokens**: `--page-header-bg`, `--page-header-border`
- **Pagination tokens**: `--pagination-bg`
- **Utility tokens**: `--util-border-grey`, `--util-border-purple`, `--util-border-radius`, `--util-box-shadow`, `--util-screen-width`, `--util-screen-height`, `--util-0`, `--util-auto`, `--util-percentage-1` through `--util-percentage-12`, `--util-rems-1` through `--util-rems-12`
- **Fractional layout sizes**: `--layout-size-1_3`, `--layout-size-2_3`

### Unmapped variables

The following variables are left completely unchanged:

- `--z-index-*` — z-index layering tokens; these are still defined in v5 with identical names and values, so no transformation is needed

## Fallback values

For **direct** and **best-effort** mappings, existing fallback values inside `var()` are always preserved unchanged. This codemod never adds new fallback values.

For **inline** mappings, any existing fallback is dropped — it is redundant once the value is resolved to a concrete literal.

```css
/* Input */
color: var(--intent-primary, #4e56ea);

/* Output — fallback is preserved */
color: var(--colour-fill-action-dark, #4e56ea) /* TODO: ... */;
```

## Facade package support

The `--facade-package` flag is accepted but has no effect on this codemod. CSS custom properties are not scoped to any package, so all matching `var(--…)` references are transformed regardless of which package they originated from.

## After running this codemod

1. **Search for TODO comments**: Review all `/* TODO: ... */` comments added by the codemod and confirm the chosen v5 token is appropriate for the usage context. For colours used as `color:` (text) consider `--colour-text-*`; for `background-color:` consider `--colour-fill-*`; for `border-color:` consider `--colour-border-*`.

2. **Run your tests**: Verify the visual appearance and behaviour of your application.

3. **Remove TODO comments**: Once you have verified each replacement, remove the inline comments.

4. **Review inlined values**: Variables replaced with concrete values (see _Inline mappings_ above) are marked with `/* was var(--name) */` comments. Search for `/* was var(` to find them. Once you have confirmed the inlined value is appropriate, you may remove the comment.

## Legacy-reapit token mappings

The codemod also handles tokens from the legacy `src/tokens/legacy-reapit/tokens.css` file that was removed in v5.

### Semantic colour tokens

- `--text-*` → `--colour-text-*` (exact renames; e.g. `--text-primary` → `--colour-text-primary`)
- `--fill-*` → `--colour-fill-*` (exact renames; `--fill-default-*` → `--colour-fill-neutral-*` because the `default` category was renamed to `neutral` in v5)
- `--icon-*` → `--colour-icon-*` (exact renames; `--icon-checkbox-hover` and `--icon-radio_button-hover` are both consolidated into `--colour-icon-hover`)
- `--outline-*` → `--colour-border-*` (status tokens gain a `-default` suffix; e.g. `--outline-primary` → `--colour-border-action-default`)

A small number of component-specific tokens within each category changed value in v5 (e.g. reversed-button tokens). These are replaced with their legacy hex values and marked with `/* was --name */` comments.

### Raw neutral palette

`--neutral-050` through `--neutral-900` are mapped to the nearest semantic token with a `TODO` comment for manual review, since the correct replacement is context-dependent. A handful of shades (`--neutral-800`, `--neutral-600`, `--neutral-200`) were removed from the v5 palette entirely and are inlined with their legacy hex values.

### Corner radius

`--corner-*` → `--border-radius-*`, with tier name adjustments:

| Legacy             | v5                     |
| ------------------ | ---------------------- |
| `--corner-none`    | `--border-radius-none` |
| `--corner-sm`      | `--border-radius-s`    |
| `--corner-default` | `--border-radius-m`    |
| `--corner-lg`      | `--border-radius-l`    |
| `--corner-xl`      | `--border-radius-xl`   |
| `--corner-2xl`     | `--border-radius-2xl`  |
| `--corner-3xl`     | `--border-radius-3xl`  |

### Typography

`--font-size-*`, `--line-height-*`, and `--letter-spacing-*` map to the v5 composite token format `--font-{tier}-regular-{property}` (e.g. `--font-size-base` → `--font-base-regular-size`, `--line-height-2xs` → `--font-2xs-regular-line_height`). These are direct mappings using the `regular` weight variant as the baseline; weight-specific usages should be reviewed by hand.

`--font-family` and `--font-weight-*` have no standalone v5 token equivalents and are inlined with their concrete values (`Inter`, `400`, `600`).
