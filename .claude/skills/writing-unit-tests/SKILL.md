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

- Write flat test structures (avoid nested `describe` unless grouping clarifies structure)
- Use `test()` not `it()`
- Test one concept per test
- Write descriptive names that state what you test
- Query elements semantically (prefer `getByRole` over test IDs)

## File Organisation

Vitest globals are available without imports: do not import `test`, `expect`, `describe`, `vi`,
or `afterEach` from `vitest`.

**Standard file order:** imports → setup/cleanup (only when manually manipulating DOM) → tests → helpers.

```typescript
// ✅ Correct
import { Component } from "../component";
import { render, screen } from "@testing-library/react";

afterEach(() => {
  document.body.innerHTML = ""; // only needed if a test manually creates DOM elements
});

test("descriptive test name", () => {
  // test implementation
});

function createTestElement() {
  // helper implementation
}

// ❌ Wrong - don't import Vitest globals
import { test, expect } from "vitest";
```

## Testing React Components

### Rendering and Visibility

Use `render()` from `@testing-library/react`, query with `screen.getByRole()` or another semantic
query, and assert visibility with `toBeVisible()`.

```typescript
test('renders a button element', () => {
  render(<Button size="medium" variant="primary">Button</Button>)
  expect(screen.getByRole('button')).toBeVisible()
})
```

### User Interactions

**Use `fireEvent`** for single events with no focus management or related events (click, change,
submit): call `fireEvent.[eventName]()` directly, never a DOM method like `element.click()`.

**Use `@testing-library/user-event`** for typing, keyboard navigation, or multiple related events: call `userEvent.setup()` at the start and `await` every method.

```typescript
import { fireEvent, render, screen } from '@testing-library/react'

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click me</Button>)
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
})
```

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

Query by role, label, or text, not test IDs. Test accessible names with `{ name: 'label text' }`
and accessible descriptions with `toHaveAccessibleDescription()`.

```typescript
test('the switch is labelled by the label text', () => {
  render(<Switch label="My switch" />)
  expect(screen.getByRole('switch', { name: 'My switch' })).toBeVisible()
})
```

For props/attributes, conditional rendering, namespace properties, context-dependent components,
utility function and hook testing, mocking, parameterised tests, DOM manipulation, async testing,
snapshots, and edge cases, see [reference.md](reference.md).

## Common Mistakes

- **Nested `describe` blocks**: write flat structures; use `describe` only when grouping clarifies organisation
- **Generic test names**: `test("works correctly")` instead of `test("renders a button element")`
- **Testing implementation details**: test behaviour and public API, not internals
- **Multiple unrelated assertions in one test**: split into separate tests
- **Snapshots where an explicit assertion would be clearer**: prefer `toHaveAttribute()`/`toHaveClass()` etc. (see [reference.md](reference.md#snapshot-testing))

## Reference

See [reference.md](reference.md) for the full pattern catalogue, and `guidelines/unit-tests.md`
for additional examples, advanced patterns, and complete testing guidelines.
