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

| Legacy variable                | v5 replacement         |
| ------------------------------ | ---------------------- |
| `var(--font-sans-serif)`       | `var(--font-family)`   |
| `var(--font-size-heading)`     | `var(--font-size-2xl)` |
| `var(--font-size-subheading)`  | `var(--font-size-xl)`  |
| `var(--font-size-small-subheading)` | `var(--font-size-lg)` |
| `var(--font-size-default)`     | `var(--font-size-base)` |
| `var(--font-size-small)`       | `var(--font-size-sm)`  |
| `var(--font-size-smallest)`    | `var(--font-size-xs)`  |
| `var(--font-weight-default)`   | `var(--font-weight-regular)` |
| `var(--font-weight-medium)`    | `var(--font-weight-medium)` |
| `var(--font-weight-bold)`      | `var(--font-weight-semibold)` |
| `var(--layout-size-base)`      | `var(--spacing-4)`     |
| `var(--layout-size-molecule)`  | `var(--spacing-5)`     |
| `var(--layout-size-atom)`      | `var(--spacing-3)`     |
| `var(--layout-size-1_2)`       | `var(--spacing-2)`     |
| `var(--layout-size-1_4)`       | `var(--spacing-1)`     |
| `var(--layout-size-3_4)`       | `var(--spacing-3)`     |
| `var(--layout-size-2)`         | `var(--spacing-8)`     |
| `var(--layout-size-3)`         | `var(--spacing-12)`    |

> **Note on spacing scale**: The v4 spacing tokens used `rem` values while the v5 tokens use `px`. The mappings above are based on the closest equivalent values (e.g. `1rem` → `--spacing-4` which is `16px`).

### Best-effort mappings

These variables are replaced with the most likely v5 equivalent, but an inline `TODO` comment is added to flag them for manual review. The correct v5 token may depend on context (e.g. whether the variable is used for `fill`, `text`, `border`, or `icon` colouring).

**Example output:**

```css
/* Before */
color: var(--intent-primary);

/* After */
color: var(--colour-fill-action-dark) /* TODO: --intent-primary has no direct v5 equivalent — verify this replacement is correct for your context */;
```

Best-effort categories:

- **Intent colours**: `--intent-primary`, `--intent-neutral`, `--intent-success`, `--intent-pending`, `--intent-warning`, `--intent-danger`, `--intent-default` (and their `-light`, `-lightest`, `-dark` variants)
- **Deprecated intent aliases**: `--intent-secondary`, `--intent-critical`, `--intent-low`, `--blue-light`, `--blue-dark`, etc.
- **Neutral aliases**: `--white`, `--black`, `--neutral-darkest`, `--neutral-dark`, `--neutral-medium`, `--neutral-light`, `--neutral-lightest`
- **Draft `--color-*` palette variables**: `--color-grey-*`, `--color-purple-*`, `--color-blue-*`, `--color-green-*`, `--color-yellow-*`, `--color-orange-*`, `--color-red-*`

### Unmapped variables

The following variable families have no reliable v5 equivalent and are left unchanged:

- `--component-input-*` — component-specific input tokens
- `--nav-menu-*` — navigation component tokens
- `--page-header-*` — page header tokens
- `--util-*` — utility layout tokens
- `--z-index-*` — z-index layering tokens
- `--default-border-radius` — no direct v5 equivalent
- `--font-monospace` — no direct v5 equivalent

## Fallback values

Existing fallback values inside `var()` are always preserved unchanged. This codemod never adds new fallback values.

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

4. **Handle unmapped variables**: For variables that were not changed (see _Unmapped variables_ above), decide on the appropriate v5 replacement or refactor to remove the dependency.
