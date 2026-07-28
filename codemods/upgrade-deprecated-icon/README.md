---
description: Upgrades DeprecatedIcon to individual v5 icon components
---

# Upgrade Deprecated Icon Codemod

Automates upgrading from `DeprecatedIcon` to individual icon components introduced in Reapit Elements v5. This codemod transforms imports, JSX elements, and props to use the new icon component architecture.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-deprecated-icon

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-icon src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-icon src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-icon src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-icon src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - etc.
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-icon src/ --facade-package @company/design-system
```

**Example with facade package:**

```tsx
// Before (with facade package @habio/design-system)
import { DeprecatedIcon } from "@habio/design-system/elements";

// After running with --facade-package @habio/design-system
import { ChevronRightIcon } from "@habio/design-system/icons/chevron-right";
```

## Background

Reapit Elements v5 introduced individual icon components to replace the single `DeprecatedIcon` component. Each icon is now a standalone component with better tree-shaking, improved type safety, and clearer intent.

**Target audience**: Projects currently using `DeprecatedIcon` that are ready to migrate to the new icon component architecture.

**Version context**: Individual icon components were introduced in v5.0.0-beta.31. The `DeprecatedIcon` component is marked for removal in v6.0.0.

**Migration strategy**: This codemod automates the migration for static icon names. Dynamic icon usage (variables, ternaries) and removed icons require manual migration.

## Transformations

### Import Transformations

Imports are rewritten to use individual icon components from dedicated import paths:

| Before                                                     | After                                                                                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `import { DeprecatedIcon } from '@reapit/elements'`        | `import { ChevronRightIcon } from '@reapit/elements/icons/chevron-right'`                                                |
| `import { DeprecatedIcon, Input } from '@reapit/elements'` | `import { Input } from '@reapit/elements'`<br/>`import { ChevronRightIcon } from '@reapit/elements/icons/chevron-right'` |

**Note**: The DeprecatedIcon import is automatically removed if all static icon usages are successfully migrated.

### Icon Name Mappings

Icon names are transformed from camelCase to kebab-case and converted to component names:

#### Direct Mappings

Most icons follow a standard camelCase → kebab-case conversion:

| DeprecatedIcon Name | v5 Component       | Import Path                            |
| ------------------- | ------------------ | -------------------------------------- |
| `chevronRight`      | `ChevronRightIcon` | `@reapit/elements/icons/chevron-right` |
| `homeSystem`        | `HomeSystemIcon`   | `@reapit/elements/icons/home-system`   |
| `addSystem`         | `AddSystemIcon`    | `@reapit/elements/icons/add-system`    |
| `check`             | `CheckIcon`        | `@reapit/elements/icons/check`         |

#### Special Mappings

Some icons have custom name mappings:

| DeprecatedIcon Name | v5 Component | Import Path                     | Notes                       |
| ------------------- | ------------ | ------------------------------- | --------------------------- |
| `exportIcon`        | `ExportIcon` | `@reapit/elements/icons/export` | Removes "Icon" suffix       |
| `elipsis`           | `MoreIcon`   | `@reapit/elements/icons/more`   | Corrected spelling and name |

#### Removed Icons

The following icons have been removed with no replacement:

- `drawClose`
- `placeholderLarge`
- `placeholderSmall`
- `reapitLogo`
- `reapitLogoSmall`

**Action required**: The codemod preserves these usages unchanged and adds a TODO comment for manual migration.

### Props Transformations

#### fontSize → size

The `fontSize` prop is transformed to the `size` prop with token-based values:

| fontSize Value | size Value | Notes                   |
| -------------- | ---------- | ----------------------- |
| `12px`         | `xs`       | Maps to extra small     |
| `0.75rem`      | `xs`       | Maps to extra small     |
| `16px`         | `sm`       | Maps to small (default) |
| `1rem`         | `sm`       | Maps to small (default) |
| `20px`         | `md`       | Maps to medium          |
| `1.25rem`      | `md`       | Maps to medium          |
| `24px`         | `lg`       | Maps to large           |
| `1.5rem`       | `lg`       | Maps to large           |

**Unmapped values**: If `fontSize` has a value not in the mapping table, it's added to the `style` prop with a TODO comment.

#### intent → color

The `intent` prop is transformed to the `color` prop with updated colour names:

| intent Value | color Value | Notes                  |
| ------------ | ----------- | ---------------------- |
| `critical`   | `secondary` | Semantic mapping       |
| `danger`     | `error`     | Renamed for clarity    |
| `default`    | `secondary` | Default colour mapping |
| `low`        | `secondary` | Low priority mapping   |
| `neutral`    | `info`      | Neutral state mapping  |
| `pending`    | `pending`   | Preserved              |
| `success`    | `success`   | Preserved              |
| `primary`    | `action`    | Renamed to action      |
| `secondary`  | `secondary` | Preserved              |
| `warning`    | `warning`   | Preserved              |

**Unmapped values**: If `intent` has a value not in the mapping table, it defaults to `inherit`.

#### width/height → size or style

Dimension props are handled based on whether they're square and mappable:

**Square dimensions (width === height):**

- If the dimension matches a `fontSize` mapping → transformed to `size` prop
- If the dimension doesn't match → added to `style` prop with TODO comment

**Non-square dimensions (width !== height):**

- Always added to `style` prop with TODO comment for manual review

### Style Merging

When unmapped dimensions or fontSize values need to be added to the `style` prop:

**No existing style prop:**

```tsx
// Before
<DeprecatedIcon icon="home" width="32px" height="32px" />;

// After
{
  /* TODO: Review unmapped dimensions for manual verification */
}
<HomeIcon style={{ width: "32px", height: "32px" }} />;
```

**Existing style prop:**

```tsx
// Before
<DeprecatedIcon icon="home" fontSize="14px" style={{ margin: 10 }} />;

// After
{
  /* TODO: Review merged style prop for manual verification */
}
<HomeIcon style={{ ...{ margin: 10 }, fontSize: "14px" }} />;
```

### JSX Element Transformations

Complete examples showing element transformation:

```tsx
// Before: Simple icon
<DeprecatedIcon icon="chevronRight" />

// After
<ChevronRightIcon />
```

```tsx
// Before: With fontSize mapping
<DeprecatedIcon icon="check" fontSize="24px" />

// After
<CheckIcon size="lg" />
```

```tsx
// Before: With intent mapping
<DeprecatedIcon icon="home" intent="danger" />

// After
<HomeIcon color="error" />
```

```tsx
// Before: With unmapped dimensions
<DeprecatedIcon icon="close" width="18px" height="18px" />;

// After
{
  /* TODO: Review unmapped dimensions for manual verification */
}
<CloseIcon style={{ width: "18px", height: "18px" }} />;
```

```tsx
// Before: With other props preserved
<DeprecatedIcon icon="search" className="search-icon" onClick={handleClick} />

// After
<SearchIcon className="search-icon" onClick={handleClick} />
```

## What This Codemod Does NOT Do

### Dynamic Icon Props

Icons set via variables, ternaries, or computed expressions are **not transformed**. A TODO comment is added for manual migration:

```tsx
// Before
const iconName = condition ? 'check' : 'close'
<DeprecatedIcon icon={iconName} />

// After (TODO comment added, no transformation)
{/* TODO: DeprecatedIcon with dynamic icon prop needs manual migration */}
<DeprecatedIcon icon={iconName} />
```

**Manual migration required:**

```tsx
// Manual approach
const Icon = condition ? CheckIcon : CloseIcon
<Icon />
```

### Removed Icons

Icons that have been removed in v5 are preserved with a TODO comment:

```tsx
// Before
<DeprecatedIcon icon="reapitLogo" />;

// After (TODO comment added, no transformation)
{
  /* TODO: Icon "reapitLogo" has been removed in v5 and has no replacement */
}
<DeprecatedIcon icon="reapitLogo" />;
```

**Manual migration required**: Replace with custom SVG or alternative icon.

### Complex Props

Props set via spread operators or computed at runtime are not transformed:

```tsx
// Not transformed (manual review needed)
const iconProps = { fontSize: '24px', intent: 'danger' }
<DeprecatedIcon icon="warning" {...iconProps} />
```

## Examples

### Example 1: Simple Icon Transformation

**Before:**

```tsx
import { DeprecatedIcon } from "@reapit/elements";

export const Navigation = () => {
  return (
    <button>
      <DeprecatedIcon icon="chevronRight" />
      Next
    </button>
  );
};
```

**After:**

```tsx
import { ChevronRightIcon } from "@reapit/elements/icons/chevron-right";

export const Navigation = () => {
  return (
    <button>
      <ChevronRightIcon />
      Next
    </button>
  );
};
```

### Example 2: With Props Transformation

**Before:**

```tsx
import { DeprecatedIcon } from "@reapit/elements";

export const StatusIcon = () => {
  return <DeprecatedIcon icon="check" fontSize="24px" intent="success" className="status-icon" />;
};
```

**After:**

```tsx
import { CheckIcon } from "@reapit/elements/icons/check";

export const StatusIcon = () => {
  return <CheckIcon size="lg" color="success" className="status-icon" />;
};
```

### Example 3: Multiple Icons

**Before:**

```tsx
import { DeprecatedIcon } from "@reapit/elements";

export const Toolbar = () => {
  return (
    <div>
      <DeprecatedIcon icon="addSystem" fontSize="20px" />
      <DeprecatedIcon icon="edit" fontSize="20px" />
      <DeprecatedIcon icon="delete" fontSize="20px" intent="danger" />
    </div>
  );
};
```

**After:**

```tsx
import { AddSystemIcon } from "@reapit/elements/icons/add-system";
import { DeleteIcon } from "@reapit/elements/icons/delete";
import { EditIcon } from "@reapit/elements/icons/edit";

export const Toolbar = () => {
  return (
    <div>
      <AddSystemIcon size="md" />
      <EditIcon size="md" />
      <DeleteIcon size="md" color="error" />
    </div>
  );
};
```

### Example 4: Dynamic Icon (Manual Migration Required)

**Before:**

```tsx
import { DeprecatedIcon } from "@reapit/elements";

export const DynamicIcon = ({ isOpen }: { isOpen: boolean }) => {
  return <DeprecatedIcon icon={isOpen ? "chevronDown" : "chevronRight"} fontSize="16px" />;
};
```

**After (codemod output):**

```tsx
import { DeprecatedIcon } from '@reapit/elements'

export const DynamicIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    {/* TODO: DeprecatedIcon with dynamic icon prop needs manual migration */}
    <DeprecatedIcon
      icon={isOpen ? 'chevronDown' : 'chevronRight'}
      fontSize="16px"
    />
  )
}
```

**Manual refinement:**

```tsx
import { ChevronDownIcon } from "@reapit/elements/icons/chevron-down";
import { ChevronRightIcon } from "@reapit/elements/icons/chevron-right";

export const DynamicIcon = ({ isOpen }: { isOpen: boolean }) => {
  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;
  return <Icon size="sm" />;
};
```

### Example 5: Removed Icon (Manual Migration Required)

**Before:**

```tsx
import { DeprecatedIcon } from "@reapit/elements";

export const Logo = () => {
  return <DeprecatedIcon icon="reapitLogo" fontSize="48px" />;
};
```

**After (codemod output):**

```tsx
import { DeprecatedIcon } from '@reapit/elements'

export const Logo = () => {
  return (
    {/* TODO: Icon "reapitLogo" has been removed in v5 and has no replacement */}
    <DeprecatedIcon icon="reapitLogo" fontSize="48px" />
  )
}
```

**Manual refinement:**

```tsx
import { ReactComponent as ReapitLogo } from "./assets/reapit-logo.svg";

export const Logo = () => {
  return <ReapitLogo style={{ width: "48px", height: "48px" }} />;
};
```

## Limitations

1. **Dynamic icon names**: Icons set via variables, ternaries, or expressions require manual migration.

2. **Removed icons**: Icons removed in v5 (`reapitLogo`, `placeholderLarge`, etc.) require manual replacement.

3. **Complex prop expressions**: Props with complex expressions or spread operators may require manual review.

4. **Unmapped dimensions**: Non-standard `fontSize`, `width`, or `height` values are added to `style` with TODO comments for review.

5. **Style prop merging**: When styles are merged, manual verification is recommended to ensure correctness.

6. **Comments preservation**: While the codemod attempts to preserve comments, some formatting may change due to AST manipulation.

## Manual Migration Required

Search for TODO comments after running the codemod to find instances requiring manual attention:

```bash
# Search for TODO comments added by the codemod
grep -r "TODO.*DeprecatedIcon\|TODO.*Review.*style" src/
```

**Common scenarios requiring manual review:**

1. **Dynamic icon names** – Convert to conditional component rendering
2. **Removed icons** – Replace with custom SVG or alternative icon
3. **Merged styles** – Verify style object syntax and values
4. **Unmapped dimensions** – Consider using design tokens or custom sizing

## Next Steps After Running This Codemod

1. **Search for TODO comments**: Find all instances marked for manual review.

   ```bash
   grep -r "TODO.*DeprecatedIcon\|TODO.*Review.*style" src/
   ```

2. **Run tests**: Verify that your application still works correctly.

3. **Review dynamic icons**: Convert ternary/variable icon usage to component-based approach.

4. **Replace removed icons**: Find alternatives or use custom SVGs.

5. **Verify styles**: Check merged or added `style` props for correctness.

6. **Run linter**: Fix any formatting issues introduced by AST transformations.

7. **Commit changes**: Commit the migration as a single atomic change.

## Migration Checklist

- [ ] Run the codemod on your source directory
- [ ] Search for TODO comments added by the codemod
- [ ] Migrate dynamic icon usages manually
- [ ] Replace removed icons with alternatives
- [ ] Review merged style props
- [ ] Run your test suite
- [ ] Test icons visually in your application
- [ ] Run linter and fix formatting
- [ ] Commit changes

## Key API Differences

Understanding these differences helps with manual review:

| Aspect             | DeprecatedIcon               | v5 Individual Icons                  |
| ------------------ | ---------------------------- | ------------------------------------ |
| **Import path**    | `@reapit/elements`           | `@reapit/elements/icons/{icon-name}` |
| **Icon selection** | `icon` prop (string)         | Component name (type-safe)           |
| **Size prop**      | `fontSize` (px/rem)          | `size` (token: xs/sm/md/lg)          |
| **Colour prop**    | `intent`                     | `color`                              |
| **Dimensions**     | `width`/`height` (any value) | `size` (token) or `style`            |
| **Tree-shaking**   | Imports all icons            | Imports only used icons              |

## Support

For issues or questions:

- Check the [Elements documentation](https://elements.reapit.cloud)
- Review the [Icon components documentation](https://elements.reapit.cloud/?path=/docs/icons--docs)
- Open an issue on the [Elements GitHub repository](https://github.com/reapit/elements)
