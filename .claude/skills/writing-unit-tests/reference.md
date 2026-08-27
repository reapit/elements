# Writing Unit Tests — Reference

## Props and Attributes

Use `toHaveAttribute()` for HTML attributes and `toHaveClass()` for CSS classes. Test data
attributes with `data-testid` when semantic queries won't work, and verify prop forwarding.

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

## Conditional Rendering

Use `container.querySelector()` for elements that might not exist, assert `null` with
`toBeNull()`, and use `queryBy*` queries for elements that shouldn't exist.

```typescript
test('does not render supplementary info container when supplementaryInfo is not provided', () => {
  const { container } = render(<ComboboxOption value="test">Text</ComboboxOption>)
  const supplementaryContainer = container.querySelector('.el-combobox-option-supplementary-info-container')
  expect(supplementaryContainer).toBeNull()
})
```

## Namespace Properties

Test each static property is defined with a simple `toBeDefined()` assertion.

```typescript
test("exposes Table.Body", () => {
  expect(Table.Body).toBeDefined();
});

test("exposes Table.HeaderCell", () => {
  expect(Table.HeaderCell).toBeDefined();
});
```

## Context-Dependent Components

**Use the `wrapper` option** when most tests share the same context configuration, setup is
complex/verbose, or tests only vary context values slightly. Define a wrapper accepting
`children` and variation props, pass it to `render()`, and override its props per test.

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

**Use inline providers** when each test needs different context values, setup is simple, or
you're testing error handling (missing context). Wrap the component in the provider directly,
vary values per test, and test error cases without a provider.

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

Test expected output for given input, edge cases (null, undefined, empty, boundary values), and
error cases, with descriptive test names.

```typescript
test("returns null when pattern does not match pathname", () => {
  const result = matchPath("/a", "/b");
  expect(result).toBeNull();
});

test("extracts single path parameter", () => {
  const result = matchPath("/a/:b", "/a/abc123");
  expect(result).toEqual({
    params: { b: "abc123" },
    pathname: "/a/abc123",
    pattern: "/a/:b",
  });
});
```

### Type Safety

Import `expectTypeOf` when testing types, use `expectTypeOf().toEqualTypeOf<ExpectedType>()`, and
test union/discriminated union types.

```typescript
test("returns match object with correct types", () => {
  const result = matchPath("/users/:userId", "/users/123");
  expectTypeOf(result).toEqualTypeOf<{
    params: { userId: string };
    pathname: string;
    pattern: string;
  } | null>();
});
```

## Testing Hooks

Import `renderHook` from `@testing-library/react`, use `rerender()` to test hook updates, and
`unmount()` to test cleanup.

```typescript
import { renderHook } from "@testing-library/react";

test("can use the Reapit theme", () => {
  renderHook(() => useTheme("reapit"));
  expect(globalThis.document.documentElement).toHaveAttribute("data-theme", "reapit");
});

test("can change themes", () => {
  const { rerender } = renderHook((theme: Theme) => useTheme(theme), { initialProps: "reapit" });
  rerender("payprop");
  expect(globalThis.document.documentElement).toHaveAttribute("data-theme", "payprop");
});
```

## Mocking

### Vitest Automocking

Use `vi.mock('module-path')` without an implementation, import the mocked module normally, and
configure behaviour with `vi.mocked()`. Don't write manual mock implementations.

```typescript
import { showPopup } from '../../popup'

vi.mock('../../popup')

test('calls showPopup with correct arguments', () => {
  render(<Component />)
  fireEvent.click(screen.getByRole('button'))
  expect(showPopup).toHaveBeenCalledWith('expected-value')
})
```

**Global return values** (all tests need the same behaviour):

```typescript
import { getUser } from '../../services'

vi.mock('../../services')
vi.mocked(getUser).mockReturnValue({ id: '123', name: 'Test User' })

test('displays user name', () => {
  render(<UserProfile />)
  expect(screen.getByText('Test User')).toBeVisible()
})
```

**Test-specific return values:**

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

Use `test.each()` for multiple similar cases; define the test cases array with descriptive names
and use template literals in the test name for readability.

```typescript
const testCases = fontSizes.flatMap((size) => fontWeights.map((weight) => [size, weight] as const));

test.each(testCases)("font(%s, %s) returns correct CSS", (size, weight) => {
  expect(font(size, weight)).toMatchSnapshot();
});
```

## DOM Manipulation

React Testing Library handles cleanup automatically for components rendered with `render()`. Add
`afterEach` cleanup only when manually creating DOM elements with `document.createElement`.

```typescript
afterEach(() => {
  document.body.innerHTML = "";
});

test("returns true when scrollWidth exceeds clientWidth", () => {
  const scrollWidth = 150;
  const clientWidth = 100;
  createElementWithDimensions("test-element", scrollWidth, clientWidth);

  const result = isTooltipNeeded("test-element");
  expect(result).toBe(true);
});

function createElementWithDimensions(
  id: string,
  scrollWidth: number,
  clientWidth: number,
): HTMLElement {
  const element = document.createElement("div");
  element.id = id;

  Object.defineProperty(element, "scrollWidth", {
    configurable: true,
    value: scrollWidth,
  });
  Object.defineProperty(element, "clientWidth", {
    configurable: true,
    value: clientWidth,
  });

  document.body.appendChild(element);
  return element;
}
```

## Async Testing

Import `waitFor` from `@testing-library/react`, wrap assertions in `waitFor()` for async updates,
and use `await` with `async` test functions.

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

Use snapshots sparingly — prefer explicit assertions when they keep tests clear. Use snapshots for
complex rendered output, update with `yarn test -u` when changes are intentional, and review
snapshot diffs carefully in PRs.

```typescript
test('renders correctly with specified props', () => {
  const { asFragment } = render(
    <Avatar shape="square" size="small" colour="primary">Square Avatar</Avatar>
  )
  expect(asFragment()).toMatchSnapshot()
})

// Prefer explicit assertions when clear
test('applies correct variant', () => {
  render(<Button variant="primary">Click</Button>)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'primary')
})
```

## Edge Cases

Test default values, boundary conditions, error states, both positive and negative cases, and
missing/null/undefined inputs.

```typescript
test("returns true when no truncationTargetId is provided", () => {
  const result = isTooltipNeeded();
  expect(result).toBe(true);
});

test("returns true when element with given ID does not exist", () => {
  const result = isTooltipNeeded("non-existent-element");
  expect(result).toBe(true);
});
```
