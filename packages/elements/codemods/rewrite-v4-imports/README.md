---
description: Rewrites imports to use deprecated component aliases for v4 to v5 migration
---

# Rewrite v4 Imports Codemod

Rewrites `@reapit/elements` imports to use the `Deprecated*` versions of components while aliasing them back to their original names. This allows v4 consumers to upgrade to v5 with minimal code changes.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info rewrite-v4-imports

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - @company/design-system/utils
# - etc.
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/ --facade-package @company/design-system
```

If you have multiple unrelated facade packages, run the codemod once for each package:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/ --facade-package @company/ui
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/ --facade-package @another/design-lib
```

**Example with facade package:**

```tsx
// Before (with facade package @habio/design-system)
import { Button, type ButtonProps } from "@habio/design-system/elements";

// After running with --facade-package @habio/design-system
import {
  DeprecatedButton as Button,
  type DeprecatedButtonProps as ButtonProps,
} from "@habio/design-system/elements";
```

## Background

Reapit Elements v5 introduced new component implementations while preserving the v4 components as `Deprecated*` versions. This allows v4 consumers to upgrade to v5 without immediately migrating to the new component APIs.

**Target audience**: Projects using Elements v4 that want to upgrade to v5 while deferring migration to the new component APIs.

**Version context**: The `Deprecated*` components were introduced in v5.0.0-beta.52.

**Migration strategy**: This codemod rewrites imports to use deprecated versions, allowing your existing code to continue working. You can then incrementally migrate to the new component APIs at your own pace.

## Transformations

### Component Imports

All component imports are rewritten to use the `Deprecated*` version while maintaining the original name via aliasing:

| Before                                           | After                                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `import { Button } from '@reapit/elements'`      | `import { DeprecatedButton as Button } from '@reapit/elements'`                       |
| `import { Badge, Chip } from '@reapit/elements'` | `import { DeprecatedBadge as Badge, DeprecatedChip as Chip } from '@reapit/elements'` |

### Type Imports

Type imports are also rewritten, with automatic detection of `Props` interfaces:

| Before                                                        | After                                                                                                      |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `import type { ButtonProps } from '@reapit/elements'`         | `import type { DeprecatedButtonProps as ButtonProps } from '@reapit/elements'`                             |
| `import { Button, type ButtonProps } from '@reapit/elements'` | `import { DeprecatedButton as Button, type DeprecatedButtonProps as ButtonProps } from '@reapit/elements'` |

### Custom Aliases

Custom aliases are preserved:

| Before                                                           | After                                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `import { Button as MyBtn } from '@reapit/elements'`             | `import { DeprecatedButton as MyBtn } from '@reapit/elements'`             |
| `import type { ButtonProps as MyProps } from '@reapit/elements'` | `import type { DeprecatedButtonProps as MyProps } from '@reapit/elements'` |

### Already Deprecated

Imports already using `Deprecated*` components are unchanged:

| Before                                                | After                                                             |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| `import { DeprecatedButton } from '@reapit/elements'` | `import { DeprecatedButton } from '@reapit/elements'` (no change) |

## Supported Components

This codemod transforms imports for the following components, as well as related styled components and CSS class exports, across the categories below:

### Main Components

- Accordion, Badge, BreadCrumb, Button, Chip, Drawer, Icon, Label, MainContainer, Menu, Nav, PageHeader, Pagination, Select, SplitButton, StatusIndicator, Table, Tag, ToolTip

### Sub-components

**Accordion (6)**

- AccordionContainer, AccordionContent, AccordionItem, AccordionTitle, AccordionTitleContent, AccordionTitleContentWrapper

**Button (2)**

- ButtonGroup, FloatingButton

**Drawer (7)**

- DrawerBg, DrawerBody, DrawerContainer, DrawerFooter, DrawerHeader, DrawerSubtitle, DrawerTitle

**Menu (7)**

- MenuItem, MenuItemContainer, MenuItemGroup, MenuList, MenuPopover, MenuProvider, MenuTrigger

**Nav (5)**

- NavItem, NavResponsive, NavResponsiveAvatar, NavSubNav, NavSubNavItem

**PageHeader (4)**

- PageHeaderContainer, PageHeaderTitleContainer, PageHeaderWrap, PageHeaderWrapInner

**Pagination (4)**

- PaginationButton, PaginationInput, PaginationText, PaginationWrap

**Table (6)**

- TableCell, TableHeader, TableHeadersRow, TableRow, TableRowContainer, TableSortHeader

**Groups (3)**

- BadgeGroup, ChipGroup, TagGroup

**Other (2)**

- Avatar, ToolTipChild

### Type Auto-detection

The codemod automatically detects and transforms `Props` types for all supported components. For example:

- `ButtonProps` → `DeprecatedButtonProps as ButtonProps`
- `AccordionItemProps` → `DeprecatedAccordionItemProps as AccordionItemProps`
- `MenuItemGroupProps` → `DeprecatedMenuItemGroupProps as MenuItemGroupProps`

## What This Codemod Does NOT Do

**JSX/Usage Transformation**: This codemod only rewrites imports. Your component usage remains unchanged, which is the intended behaviour. The aliasing strategy ensures your existing JSX continues to work:

```tsx
// After codemod runs:
import { DeprecatedButton as Button } from "@reapit/elements";

// Your existing usage works without changes:
<Button variant="primary">Click me</Button>;
```

**Test Mock Updates**: Test mocks (Jest/Vitest) are not automatically updated. When tests fail after running this codemod, update your mocks to use the deprecated component names:

```typescript
// Before
jest.mock("@reapit/elements", () => ({
  Button: "Button",
}));

// After (manual update required)
jest.mock("@reapit/elements", () => ({
  DeprecatedButton: "DeprecatedButton",
}));
```

## Limitations

1. **Manual mock updates required**: Test mocks must be updated manually when tests fail.

2. **Unknown components**: Components not in the mapping (new v5 components or custom exports) are left unchanged.

3. **Side-effect imports**: CSS imports and other side-effect imports are unchanged:

   ```typescript
   import "@reapit/elements/styles.css"; // Unchanged
   ```

4. **Default/namespace imports**: Default and namespace imports are unchanged:
   ```typescript
   import Elements from "@reapit/elements"; // Unchanged
   import * as Elements from "@reapit/elements"; // Unchanged
   ```

## Next Steps After Running This Codemod

1. **Run tests**: Verify that your application still works correctly.

2. **Update mocks**: If tests fail, update Jest/Vitest mocks to use `Deprecated*` component names.

3. **Commit changes**: Commit the import rewrites as a single atomic change.

4. **Plan incremental migration**: Over time, migrate individual components from deprecated to new versions by updating both imports and usage.

## Example: Complete Before/After

**Before:**

```tsx
import { Button, Badge, type ButtonProps, type BadgeProps } from "@reapit/elements";
import { useState } from "react";

interface Props extends ButtonProps {
  onClick: () => void;
}

export const MyComponent: React.FC<Props> = (props) => {
  return (
    <div>
      <Button {...props}>Click me</Button>
      <Badge>New</Badge>
    </div>
  );
};
```

**After:**

```tsx
import {
  DeprecatedButton as Button,
  DeprecatedBadge as Badge,
  type DeprecatedButtonProps as ButtonProps,
  type DeprecatedBadgeProps as BadgeProps,
} from "@reapit/elements";
import { useState } from "react";

interface Props extends ButtonProps {
  onClick: () => void;
}

export const MyComponent: React.FC<Props> = (props) => {
  return (
    <div>
      <Button {...props}>Click me</Button>
      <Badge>New</Badge>
    </div>
  );
};
```

Notice that only the import statement changed. All usage remains identical.
