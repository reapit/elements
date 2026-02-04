# Unit Tests

> **Note:** When writing or reviewing tests, use the `writing-unit-tests` skill (`.opencode/skills/writing-unit-tests.md`). This guideline serves as comprehensive reference documentation.

## General Principles

- **Write flat test structures** - Use individual `test()` calls. Group tests with `describe` blocks only when the grouping clarifies the structure.
- **Use `test()` not `it()`** - Vitest uses `test()` as its standard.
- **Test one concept per test** - Each test verifies a single behavior.
- **Write descriptive names** - State what you test: "renders a button element", "applies correct variant based on the `variant` prop".

## File Organization

Vitest globals (`test`, `expect`, `describe`, `vi`, `afterEach`, etc.) are available without imports. Do not import them from `vitest`.

```typescript
// 1. Imports (Vitest globals are available without imports)
import { Component } from '../component'
import { render, screen } from '@testing-library/react'

// 2. Setup/cleanup (only when manually manipulating the DOM)
// React Testing Library cleans up automatically after render()
// Add afterEach cleanup only when using document.createElement or similar APIs
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

## Mocking

Vitest automocks all exports from a module. Use this feature instead of writing manual mock implementations.

```typescript
// Prefer automocking
vi.mock('../../popup')

// Skip manual implementations
vi.mock('../../popup', () => ({
  showPopup: vi.fn(),
}))
```

Customize mock behavior by importing the mocked module and configuring it:

```typescript
import { showPopup } from '../../popup'

vi.mock('../../popup')

test('calls showPopup with correct arguments', () => {
  render(<Component />)
  screen.getByRole('button').click()
  expect(showPopup).toHaveBeenCalledWith('expected-value')
})
```

Vitest clears all mocks before each test with the `clearMocks` configuration option. Manual reset between tests is unnecessary.

### Mock Return Values

Configure return values globally when all tests need the same behavior:

```typescript
import { getUser } from '../../services'

vi.mock('../../services')
vi.mocked(getUser).mockReturnValue({ id: '123', name: 'Test User' })

test('displays user name', () => {
  render(<UserProfile />)
  expect(screen.getByText('Test User')).toBeVisible()
})

test('displays user id', () => {
  render(<UserProfile />)
  expect(screen.getByText('123')).toBeVisible()
})
```

Configure return values locally when tests need different behavior:

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

## Testing React Components

### Rendering and Visibility

```typescript
test('renders a button element', () => {
  render(<Button size="medium" variant="primary">Button</Button>)
  expect(screen.getByRole('button')).toBeVisible()
})
```

### User Interactions

Use `fireEvent` for simple event triggering. Use `@testing-library/user-event` when you need focus management or other related events.

```typescript
import { fireEvent, render, screen } from '@testing-library/react'

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click me</Button>)

  fireEvent.click(screen.getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})
```

Use `user-event` for realistic user interactions that require focus, keyboard navigation, or multiple related events:

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

Call `fireEvent` or `user-event` methods. Direct DOM method calls (e.g., `element.click()`) bypass the testing library's event simulation.

### Accessibility

Query elements semantically. Prioritize `getByRole`, `getByLabelText`, `getByText` over test IDs.

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

```typescript
test('applies correct data attributes', () => {
  render(<Badge colour="success" variant="reversed" data-testid="badge">Test</Badge>)
  const badge = screen.getByTestId('badge')
  expect(badge).toHaveAttribute('data-colour', 'success')
  expect(badge).toHaveAttribute('data-variant', 'reversed')
})

test('forwards additional props to the underlying element', () => {
  render(<Badge colour="neutral" data-testid="my-badge" className="custom-class">Test</Badge>)
  expect(screen.getByTestId('my-badge')).toBeVisible()
  expect(screen.getByTestId('my-badge')).toHaveClass('custom-class')
})
```

### Conditional Rendering

```typescript
test('does not render supplementary info container when supplementaryInfo is not provided', () => {
  const { container } = render(<ComboboxOption value="test">Text</ComboboxOption>)
  const supplementaryContainer = container.querySelector('.el-combobox-option-supplementary-info-container')
  expect(supplementaryContainer).toBeNull()
})
```

### Namespace Properties

```typescript
test('exposes Table.Body', () => {
  expect(Table.Body).toBeDefined()
})

test('exposes Table.HeaderCell', () => {
  expect(Table.HeaderCell).toBeDefined()
})
```

### Context-Dependent Components

Components that require React Context can be tested using either the `wrapper` option or inline providers. Choose based on how many tests share the same context setup.

#### Using the `wrapper` Option

Use the `wrapper` option when most tests share the same context configuration. Define the wrapper as a helper component.

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

#### Inlining Context Providers

Inline providers when tests need different context values or when context setup is simple.

```typescript
test('applies "default" variant when popup variant is "popover"', () => {
  const { container } = render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'popover' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'default')
})

test('applies "borderless" variant when popup variant is "drawer"', () => {
  const { container } = render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'drawer' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'borderless')
})

test('throws error when rendered outside context', () => {
  expect(() => {
    render(<ComponentRequiringContext />)
  }).toThrow('useComponentContext requires a Component ancestor')
})
```

#### Choosing Between Patterns

**Use `wrapper` option when:**

- Most tests share the same context configuration
- Context setup is complex or verbose
- Tests only vary context values slightly

**Inline providers when:**

- Each test needs different context values
- Context setup is simple
- Testing error handling (missing context)
- Clarity benefits from seeing the full setup in each test

## Testing Utility Functions

### Pure Functions

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

## Parameterized Tests

Use `test.each` to test multiple similar cases:

```typescript
const testCases = fontSizes.flatMap((size) => fontWeights.map((weight) => [size, weight] as const))

test.each(testCases)('font(%s, %s) returns correct CSS', (size, weight) => {
  expect(font(size, weight)).toMatchSnapshot()
})
```

## DOM Manipulation

When manually creating DOM elements with `document.createElement` and similar APIs, add cleanup to remove them after each test. React Testing Library handles cleanup automatically for components rendered with `render()`.

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

Use snapshots sparingly. Prefer explicit assertions when they keep the test clear.

```typescript
test('renders correctly with specified props', () => {
  const { asFragment } = render(
    <Avatar shape="square" size="small" colour="primary">Square Avatar</Avatar>
  )
  expect(asFragment()).toMatchSnapshot()
})
```

## Edge Cases

Test defaults, boundary conditions, error states, and both positive and negative cases.

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

**Nested `describe` blocks**
Write flat structures. Use `describe` only when grouping clarifies organization.

**Generic test names**
Bad: "works correctly", "should work"
Good: "renders a button element", "calls onClick when clicked"

**Testing implementation details**
Test behavior and public API, not internal implementation.

**Multiple unrelated assertions**
Each test verifies one concept. Split unrelated assertions into separate tests.

**Snapshots instead of explicit assertions**
Use snapshots when they simplify the test. Otherwise, write explicit assertions that clarify intent.
