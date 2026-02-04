---
name: writing-unit-tests
description: Write unit tests following Reapit Elements testing guidelines using Vitest and React Testing Library. Use when writing new tests, updating existing tests, or reviewing test code.
---

# Writing Unit Tests

## When to Use This Skill

Invoke this skill when:

- Writing tests for a new component or utility function
- Adding test coverage for existing code
- Updating tests after refactoring
- Reviewing PR with test changes
- Fixing failing tests

## General Principles

**Key guidelines:**

- Write flat test structures (avoid nested `describe` unless grouping clarifies structure)
- Use `test()` not `it()`
- Test one concept per test
- Write descriptive names that state what you test
- Query elements semantically (prefer `getByRole` over test IDs)

## File Organisation

### Import Pattern

Vitest globals are available without imports. Do not import `test`, `expect`, `describe`, `vi`, or `afterEach` from `vitest`.

**Checklist:**

- [ ] Import component/function under test
- [ ] Import testing utilities (`render`, `screen`, etc.)
- [ ] No Vitest global imports

**Example:**

```typescript
// ✅ Correct
import { Component } from '../component'
import { render, screen } from '@testing-library/react'

// ❌ Wrong - don't import Vitest globals
import { test, expect } from 'vitest'
```

### File Structure

**Standard order:**

1. Imports
2. Setup/cleanup (only when manually manipulating DOM)
3. Tests
4. Helpers

**Example:**

```typescript
// 1. Imports
import { Component } from '../component'
import { render, screen } from '@testing-library/react'

// 2. Setup/cleanup (only if needed)
afterEach(() => {
  document.body.innerHTML = ''
})

// 3. Tests
test('descriptive test name', () => {
  // test implementation
})

// 4. Helpers
function createTestElement() {
  // helper implementation
}
```

## Testing React Components

### Rendering and Visibility

**Checklist:**

- [ ] Use `render()` from `@testing-library/react`
- [ ] Query elements with `screen.getByRole()` or semantic queries
- [ ] Assert visibility with `toBeVisible()`

**Example:**

```typescript
test('renders a button element', () => {
  render(<Button size="medium" variant="primary">Button</Button>)
  expect(screen.getByRole('button')).toBeVisible()
})
```

### User Interactions

**Use `fireEvent` for simple events:**

- Single events (click, change, submit)
- No focus management needed
- No related events required

**Use `@testing-library/user-event` for complex interactions:**

- Typing (requires focus)
- Keyboard navigation
- Multiple related events

**Checklist for `fireEvent`:**

- [ ] Import `fireEvent` from `@testing-library/react`
- [ ] Call `fireEvent.[eventName]()` directly
- [ ] Never call DOM methods directly (e.g., `element.click()`)

**Example with `fireEvent`:**

```typescript
import { fireEvent, render, screen } from '@testing-library/react'

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click me</Button>)

  fireEvent.click(screen.getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})
```

**Checklist for `user-event`:**

- [ ] Import `userEvent` from `@testing-library/user-event`
- [ ] Call `userEvent.setup()` at test start
- [ ] Await user event methods (they're async)
- [ ] Use for typing, keyboard navigation, complex interactions

**Example with `user-event`:**

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('updates input value when user types', async () => {
  const user = userEvent.setup()
  render(<Input label="Name" />)

  await user.type(screen.getByRole('textbox'), 'John')

  expect(screen.getByRole('textbox')).toHaveValue('John')
})
```

### Accessibility Testing

**Checklist:**

- [ ] Query by role, label, or text (not test IDs)
- [ ] Test accessible names with `{ name: 'label text' }`
- [ ] Test accessible descriptions with `toHaveAccessibleDescription()`
- [ ] Verify ARIA attributes when relevant

**Example:**

```typescript
test('the switch is labelled by the label text', () => {
  render(<Switch label="My switch" />)
  expect(screen.getByRole('switch', { name: 'My switch' })).toBeVisible()
})

test('is described by the supplementary info, when provided', () => {
  render(<Checkbox label="Label" supplementaryInfo="Description" />)
  expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Description')
})
```

### Props and Attributes

**Checklist:**

- [ ] Use `toHaveAttribute()` for HTML attributes
- [ ] Use `toHaveClass()` for CSS classes
- [ ] Test data attributes with `data-testid` when semantic queries won't work
- [ ] Verify prop forwarding

**Example:**

```typescript
test('applies correct data attributes', () => {
  render(<Badge colour="success" variant="reversed" data-testid="badge">Test</Badge>)
  const badge = screen.getByTestId('badge')
  expect(badge).toHaveAttribute('data-colour', 'success')
  expect(badge).toHaveAttribute('data-variant', 'reversed')
})

test('forwards additional props to the underlying element', () => {
  render(<Badge colour="neutral" data-testid="my-badge" className="custom-class">Test</Badge>)
  expect(screen.getByTestId('my-badge')).toHaveClass('custom-class')
})
```

### Conditional Rendering

**Checklist:**

- [ ] Use `container.querySelector()` for elements that might not exist
- [ ] Assert `null` with `toBeNull()` for missing elements
- [ ] Use `queryBy*` queries for elements that shouldn't exist

**Example:**

```typescript
test('does not render supplementary info container when supplementaryInfo is not provided', () => {
  const { container } = render(<ComboboxOption value="test">Text</ComboboxOption>)
  const supplementaryContainer = container.querySelector('.el-combobox-option-supplementary-info-container')
  expect(supplementaryContainer).toBeNull()
})
```

### Namespace Properties

**Checklist:**

- [ ] Test each static property is defined
- [ ] Use simple `toBeDefined()` assertion

**Example:**

```typescript
test('exposes Table.Body', () => {
  expect(Table.Body).toBeDefined()
})

test('exposes Table.HeaderCell', () => {
  expect(Table.HeaderCell).toBeDefined()
})
```

### Context-Dependent Components

Choose between wrapper option or inline providers based on test needs.

**Use `wrapper` option when:**

- Most tests share same context configuration
- Context setup is complex/verbose
- Tests vary context values slightly

**Checklist for wrapper:**

- [ ] Define wrapper component accepting `children` and variation props
- [ ] Pass wrapper to `render()` options
- [ ] Override wrapper props for specific tests

**Example:**

```typescript
import { SplitButtonContext } from '../context'
import type { ReactNode } from 'react'

test('applies size and variant from context', () => {
  render(<SplitButtonActionBase as="button" />, { wrapper: Wrapper })
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('data-size', 'medium')
  expect(button).toHaveAttribute('data-variant', 'primary')
})

test('is ARIA disabled when context has busy="action"', () => {
  render(<SplitButtonActionBase as="button" />, {
    wrapper: (props) => <Wrapper {...props} busy="action" />,
  })
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
})

interface WrapperProps {
  children: ReactNode
  busy?: SplitButtonContext.Value['busy']
}

function Wrapper({ children, busy }: WrapperProps) {
  return (
    <SplitButtonContext.Provider value={{ busy, size: 'medium', variant: 'primary' }}>
      {children}
    </SplitButtonContext.Provider>
  )
}
```

**Use inline providers when:**

- Each test needs different context values
- Context setup is simple
- Testing error handling (missing context)

**Checklist for inline providers:**

- [ ] Wrap component in context provider directly
- [ ] Vary provider values per test
- [ ] Test error cases without provider

**Example:**

```typescript
test('applies "default" variant when popup variant is "popover"', () => {
  const { container } = render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'popover' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'default')
})

test('throws error when rendered outside context', () => {
  expect(() => {
    render(<ComponentRequiringContext />)
  }).toThrow('useComponentContext requires a Component ancestor')
})
```

## Testing Utility Functions

### Pure Functions

**Checklist:**

- [ ] Test expected output for given input
- [ ] Test edge cases (null, undefined, empty, boundary values)
- [ ] Test error cases
- [ ] Use descriptive test names

**Example:**

```typescript
test('returns null when pattern does not match pathname', () => {
  const result = matchPath('/a', '/b')
  expect(result).toBeNull()
})

test('extracts single path parameter', () => {
  const result = matchPath('/a/:b', '/a/abc123')
  expect(result).toEqual({
    params: { b: 'abc123' },
    pathname: '/a/abc123',
    pattern: '/a/:b',
  })
})
```

### Type Safety

**Checklist:**

- [ ] Import `expectTypeOf` when testing types
- [ ] Use `expectTypeOf().toEqualTypeOf<ExpectedType>()`
- [ ] Test union types and discriminated unions

**Example:**

```typescript
test('returns match object with correct types', () => {
  const result = matchPath('/users/:userId', '/users/123')
  expectTypeOf(result).toEqualTypeOf<{
    params: { userId: string }
    pathname: string
    pattern: string
  } | null>()
})
```

## Testing Hooks

**Checklist:**

- [ ] Import `renderHook` from `@testing-library/react`
- [ ] Use `renderHook()` to test hooks
- [ ] Use `rerender()` to test hook updates
- [ ] Test cleanup with `unmount()`

**Example:**

```typescript
import { renderHook } from '@testing-library/react'

test('can use the Reapit theme', () => {
  renderHook(() => useTheme('reapit'))
  expect(globalThis.document.documentElement).toHaveAttribute('data-theme', 'reapit')
})

test('can change themes', () => {
  const { rerender } = renderHook((theme: Theme) => useTheme(theme), { initialProps: 'reapit' })
  rerender('payprop')
  expect(globalThis.document.documentElement).toHaveAttribute('data-theme', 'payprop')
})
```

## Mocking

### Vitest Automocking

**Checklist:**

- [ ] Use `vi.mock('module-path')` without implementation
- [ ] Import mocked module normally
- [ ] Configure mock behaviour with `vi.mocked()`
- [ ] Don't write manual mock implementations

**Example:**

```typescript
import { showPopup } from '../../popup'

vi.mock('../../popup')

test('calls showPopup with correct arguments', () => {
  render(<Component />)
  fireEvent.click(screen.getByRole('button'))
  expect(showPopup).toHaveBeenCalledWith('expected-value')
})
```

### Mock Return Values

**For global return values (all tests need same behaviour):**

```typescript
import { getUser } from '../../services'

vi.mock('../../services')
vi.mocked(getUser).mockReturnValue({ id: '123', name: 'Test User' })

test('displays user name', () => {
  render(<UserProfile />)
  expect(screen.getByText('Test User')).toBeVisible()
})
```

**For test-specific return values:**

```typescript
import { fetchItems } from '../../api'

vi.mock('../../api')

test('displays items when fetch succeeds', () => {
  vi.mocked(fetchItems).mockResolvedValue([{ id: 1, name: 'Item 1' }])
  render(<ItemList />)
  expect(screen.getByText('Item 1')).toBeVisible()
})

test('displays error when fetch fails', () => {
  vi.mocked(fetchItems).mockRejectedValue(new Error('Network error'))
  render(<ItemList />)
  expect(screen.getByText('Network error')).toBeVisible()
})
```

## Parameterised Tests

**Checklist:**

- [ ] Use `test.each()` for multiple similar cases
- [ ] Define test cases array with descriptive names
- [ ] Use template literals in test name for readability

**Example:**

```typescript
const testCases = fontSizes.flatMap((size) => fontWeights.map((weight) => [size, weight] as const))

test.each(testCases)('font(%s, %s) returns correct CSS', (size, weight) => {
  expect(font(size, weight)).toMatchSnapshot()
})
```

## DOM Manipulation

**Use `afterEach` cleanup only when manually creating DOM elements.**

React Testing Library handles cleanup automatically for components rendered with `render()`.

**Checklist:**

- [ ] Add `afterEach` cleanup when using `document.createElement`
- [ ] Clear `document.body.innerHTML` in afterEach
- [ ] Don't add cleanup for components rendered with `render()`

**Example:**

```typescript
afterEach(() => {
  document.body.innerHTML = ''
})

test('returns true when scrollWidth exceeds clientWidth', () => {
  const scrollWidth = 150
  const clientWidth = 100
  createElementWithDimensions('test-element', scrollWidth, clientWidth)

  const result = isTooltipNeeded('test-element')
  expect(result).toBe(true)
})

function createElementWithDimensions(id: string, scrollWidth: number, clientWidth: number): HTMLElement {
  const element = document.createElement('div')
  element.id = id

  Object.defineProperty(element, 'scrollWidth', {
    configurable: true,
    value: scrollWidth,
  })
  Object.defineProperty(element, 'clientWidth', {
    configurable: true,
    value: clientWidth,
  })

  document.body.appendChild(element)
  return element
}
```

## Async Testing

**Checklist:**

- [ ] Import `waitFor` from `@testing-library/react`
- [ ] Wrap assertions in `waitFor()` for async updates
- [ ] Use `await` with `waitFor()`
- [ ] Use `async` test functions

**Example:**

```typescript
test('returns "retracted" when scrolling down', async () => {
  render(<TestComponent />)

  fireEvent.scroll(screen.getByTestId('scroll-container'), { target: { scrollTop: 100 } })
  fireEvent.scroll(screen.getByTestId('scroll-container'), { target: { scrollTop: 150 } })

  await waitFor(() => {
    expect(screen.getByText('retracted')).toBeInTheDocument()
  })
})
```

## Snapshot Testing

**Use snapshots sparingly.** Prefer explicit assertions when they keep tests clear.

**Checklist:**

- [ ] Use for complex rendered output
- [ ] Update with `yarn test -u` when intentional changes occur
- [ ] Review snapshot diffs carefully in PRs

**Example:**

```typescript
test('renders correctly with specified props', () => {
  const { asFragment } = render(
    <Avatar shape="square" size="small" colour="primary">Square Avatar</Avatar>
  )
  expect(asFragment()).toMatchSnapshot()
})
```

## Edge Cases

**Checklist:**

- [ ] Test default values
- [ ] Test boundary conditions
- [ ] Test error states
- [ ] Test both positive and negative cases
- [ ] Test missing/null/undefined inputs

**Example:**

```typescript
test('returns true when no truncationTargetId is provided', () => {
  const result = isTooltipNeeded()
  expect(result).toBe(true)
})

test('returns true when element with given ID does not exist', () => {
  const result = isTooltipNeeded('non-existent-element')
  expect(result).toBe(true)
})
```

## Common Mistakes

### ❌ Nested `describe` Blocks

Write flat structures. Use `describe` only when grouping clarifies organisation.

### ❌ Generic Test Names

```typescript
// Wrong
test('works correctly', () => {})
test('should work', () => {})

// Correct
test('renders a button element', () => {})
test('calls onClick when clicked', () => {})
```

### ❌ Testing Implementation Details

Test behaviour and public API, not internal implementation.

### ❌ Multiple Unrelated Assertions

Each test verifies one concept. Split unrelated assertions into separate tests.

### ❌ Snapshots Instead of Explicit Assertions

```typescript
// Prefer explicit assertions when clear
test('applies correct variant', () => {
  render(<Button variant="primary">Click</Button>)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'primary')
})
```

## Reference

See `guidelines/unit-tests.md` for:

- Additional examples
- Advanced patterns
- More edge cases
- Complete testing guidelines
