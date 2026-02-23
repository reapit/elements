---
description: Upgrades DeprecatedButton to the new Button component for v5 API adoption
---

# Upgrade Deprecated Button Codemod

Automates upgrading from `DeprecatedButton` to the new `Button` component introduced in Reapit Elements v5. This codemod transforms imports, type references, JSX elements, and props to use the new Button API.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-deprecated-button

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - etc.
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button src/ --facade-package @company/design-system
```

**Example with facade package:**

```tsx
// Before (with facade package @habio/design-system)
import { DeprecatedButton } from '@habio/design-system/elements'

// After running with --facade-package @habio/design-system
import { Button } from '@habio/design-system/core/button'
```

## Background

Reapit Elements v5 introduced a new Button component with improved API design and better accessibility features. The v4 `Button` component was preserved as `DeprecatedButton` to allow gradual migration.

**Target audience**: Projects currently using `DeprecatedButton` (either directly or via the `deprecated-import-rewrite` codemod) that are ready to migrate to the new Button API.

**Version context**: The new Button component was introduced in v5.0.0-beta.1. The `DeprecatedButton` component is marked for removal in v6.0.0.

**Migration strategy**: This codemod automates the bulk of the migration work by transforming imports, types, JSX elements, and prop names. Some manual adjustments may still be required for complex cases.

## Transformations

### Import Transformations

Imports are rewritten to use the new Button component from the new import path:

| Before                                                         | After                                                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `import { DeprecatedButton } from '@reapit/elements'`          | `import { Button } from '@reapit/elements/core/button'`                                                |
| `import { DeprecatedButton as MyBtn } from '@reapit/elements'` | `import { Button as MyBtn } from '@reapit/elements/core/button'`                                       |
| `import { type DeprecatedButton } from '@reapit/elements'`     | `import { type Button } from '@reapit/elements/core/button'`                                           |
| `import { DeprecatedButton, Input } from '@reapit/elements'`   | `import { Input } from '@reapit/elements'`<br/>`import { Button } from '@reapit/elements/core/button'` |

### Type Transformations

Type references are updated to use the new namespace pattern:

| Before                                            | After                                    |
| ------------------------------------------------- | ---------------------------------------- |
| `const props: DeprecatedButtonProps = {...}`      | `const props: Button.Props = {...}`      |
| `interface MyProps extends DeprecatedButtonProps` | `interface MyProps extends Button.Props` |
| `function foo(props: DeprecatedButtonProps)`      | `function foo(props: Button.Props)`      |
| `type MyType = Partial<DeprecatedButtonProps>`    | `type MyType = Partial<Button.Props>`    |

**Note**: `DeprecatedButtonProps` imports are automatically removed since the new Button uses a namespace pattern (`Button.Props`) instead of a separate type export.

### JSX Element Transformations

JSX elements are renamed and their props are transformed:

```tsx
// Before
<DeprecatedButton variant="destructive" isDisabled>
  Delete
</DeprecatedButton>

// After
<Button isDestructive={true} disabled>
  Delete
</Button>
```

### Props Transformations

The following prop transformations are applied automatically:

| Before                  | After                  | Notes                                        |
| ----------------------- | ---------------------- | -------------------------------------------- |
| `isDisabled`            | `disabled`             | For `<button>` elements                      |
| `isDisabled`            | `aria-disabled`        | For `<a>` elements (detected by `href` prop) |
| `isDisabled={false}`    | _removed_              | `false` is the default value                 |
| `variant="destructive"` | `isDestructive={true}` | Variant prop removed                         |
| `variant="busy"`        | `isBusy={true}`        | Variant prop removed                         |
| `variant="primary"`     | `variant="primary"`    | Standard variants preserved                  |
| `variant="secondary"`   | `variant="secondary"`  | Standard variants preserved                  |
| `variant="tertiary"`    | `variant="tertiary"`   | Standard variants preserved                  |

**Other props** (size, className, onClick, iconLeft, iconRight, hasNoPadding, useLinkStyle, etc.) are **preserved unchanged**.

### DeprecatedIcon Auto-import

If your code uses `<DeprecatedIcon>` within a DeprecatedButton component, the codemod automatically adds an import for `DeprecatedIcon` if not already present:

```tsx
// Before
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton iconLeft={<DeprecatedIcon icon="home" />}>Home</DeprecatedButton>
}

// After
import { DeprecatedIcon } from '@reapit/elements'
import { Button } from '@reapit/elements/core/button'

function MyComponent() {
  return <Button iconLeft={<DeprecatedIcon icon="home" />}>Home</Button>
}
```

## What This Codemod Does NOT Do

**Component Selection (Button vs AnchorButton)**: The codemod transforms all `DeprecatedButton` JSX elements to `<Button>`. The Button component is polymorphic and will render as either `<button>` or `<a>` based on the presence of an `href` prop at runtime. If you want to explicitly use `AnchorButton` for better type safety, you'll need to manually update those instances:

```tsx
// Codemod output (works correctly at runtime):
;<Button href="/home">Home</Button>

// Manual refinement (better type safety):
import { AnchorButton } from '@reapit/elements/core/button'
;<AnchorButton href="/home">Home</AnchorButton>
```

**Dynamic Props**: Props set via spread operators or computed at runtime are not transformed:

```tsx
// Not transformed (manual review needed):
const buttonProps = { isDisabled: true }
<DeprecatedButton {...buttonProps}>Click</DeprecatedButton>
```

**Test Mocks**: Test mocks (Jest/Vitest) are not automatically updated:

```typescript
// Before
jest.mock('@reapit/elements', () => ({
  DeprecatedButton: 'DeprecatedButton',
}))

// After (manual update required)
jest.mock('@reapit/elements/core/button', () => ({
  Button: 'Button',
}))
```

## Limitations

1. **Manual mock updates required**: Test mocks must be updated manually when tests fail.

2. **Dynamic/spread props**: Props set via spread or computed values require manual review.

3. **Complex expressions**: Conditional props or props with complex expressions may require manual review:

   ```tsx
   <DeprecatedButton variant={condition ? 'destructive' : 'primary'}>
   ```

4. **Comments preservation**: While the codemod attempts to preserve comments, some formatting may change due to AST manipulation.

## Next Steps After Running This Codemod

1. **Run tests**: Verify that your application still works correctly.

2. **Update mocks**: If tests fail, update Jest/Vitest mocks to import from the new path.

3. **Review dynamic props**: Search for spread props (`{...buttonProps}`) and conditional logic to ensure correct behaviour.

4. **Consider AnchorButton**: For buttons with `href`, consider using `AnchorButton` explicitly for better type safety.

5. **Review accessibility**: The new Button has improved accessibility features. Review `aria-disabled` vs `disabled` usage for your use cases.

6. **Commit changes**: Commit the migration as a single atomic change.

## Example: Complete Before/After

**Before:**

```tsx
import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'
import { DeprecatedIcon } from '@reapit/elements'
import { useState } from 'react'

interface Props extends DeprecatedButtonProps {
  onConfirm: () => void
}

export const DeleteButton: React.FC<Props> = ({ onConfirm, ...rest }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    setIsDeleting(true)
    onConfirm()
  }

  return (
    <>
      <DeprecatedButton
        variant="destructive"
        isDisabled={isDeleting}
        onClick={handleClick}
        iconLeft={<DeprecatedIcon icon="trash" />}
        {...rest}
      >
        Delete Item
      </DeprecatedButton>
      <DeprecatedButton variant="busy" isDisabled={isDeleting}>
        Processing...
      </DeprecatedButton>
    </>
  )
}
```

**After:**

```tsx
import { DeprecatedIcon } from '@reapit/elements'
import { Button } from '@reapit/elements/core/button'
import { useState } from 'react'

interface Props extends Button.Props {
  onConfirm: () => void
}

export const DeleteButton: React.FC<Props> = ({ onConfirm, ...rest }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    setIsDeleting(true)
    onConfirm()
  }

  return (
    <>
      <Button
        isDestructive={true}
        disabled={isDeleting}
        onClick={handleClick}
        iconLeft={<DeprecatedIcon icon="trash" />}
        {...rest}
      >
        Delete Item
      </Button>
      <Button isBusy={true} disabled={isDeleting}>
        Processing...
      </Button>
    </>
  )
}
```

## Key API Differences

Understanding these differences helps with manual review:

| Aspect                 | DeprecatedButton             | New Button                                                                                                            |
| ---------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Import path**        | `@reapit/elements`           | `@reapit/elements/core/button`                                                                                        |
| **Type pattern**       | `DeprecatedButtonProps`      | `Button.Props` (namespace)                                                                                            |
| **Disabled prop**      | `isDisabled`                 | `disabled` (button) or `aria-disabled` (anchor)                                                                       |
| **Destructive state**  | `variant="destructive"`      | `isDestructive={true}`                                                                                                |
| **Busy state**         | `variant="busy"`             | `isBusy={true}`                                                                                                       |
| **Component variants** | Single polymorphic component | `Button` (for `<button>`) and `AnchorButton` (for `<a>`) - though both are supported through the polymorphic `Button` |

## Migration Checklist

- [ ] Run the codemod on your source directory
- [ ] Run your test suite
- [ ] Update test mocks if needed
- [ ] Review dynamic/spread props manually
- [ ] Consider using `AnchorButton` for link-styled buttons
- [ ] Review accessibility implications
- [ ] Test in your application
- [ ] Commit changes

## Support

For issues or questions:

- Check the [Elements documentation](https://elements.reapit.cloud)
- Review the [Button component documentation](https://elements.reapit.cloud/?path=/docs/core-button--docs)
- Open an issue on the [Elements GitHub repository](https://github.com/reapit/elements)
