import { ChipSelectOption } from '../chip-select-option'
import { ChipSelectContextProvider } from '../context'
import { render, screen } from '@testing-library/react'

import type { ComponentProps, ReactNode } from 'react'

test('renders as checkbox element', () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ multiple: false, size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toBeVisible()
})

test('passes context `form` prop to ChipSelectChip', () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ form: 'test-form', multiple: false, size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('form', 'test-form')
})

test('passes context `name` prop to ChipSelectChip', () => {
  render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ multiple: false, name: 'test-name', size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'test-name')
})

test('passes context `size` prop to ChipSelectChip', () => {
  const { container } = render(<ChipSelectOption value="test-value">Test Option</ChipSelectOption>, {
    wrapper: createWrapper({ multiple: false, size: 'large' }),
  })
  expect(container.firstElementChild).toHaveAttribute('data-size', 'large')
})

test('`data-exclusive` is true when `multiple` is false', () => {
  render(<ChipSelectOption value="test-value">Option</ChipSelectOption>, {
    wrapper: createWrapper({ multiple: false, name: 'test', size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-exclusive', 'true')
})

test('`data-exclusive` is false when `multiple` is true', () => {
  render(<ChipSelectOption value="test-value">Option</ChipSelectOption>, {
    wrapper: createWrapper({ multiple: true, name: 'test', size: 'medium' }),
  })
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-exclusive', 'false')
})

test('forwards additional props to ChipSelectChip', () => {
  render(
    <ChipSelectOption data-testid="custom-option" value="test-value">
      Test Option
    </ChipSelectOption>,
    { wrapper: createWrapper({ multiple: false, size: 'medium' }) },
  )
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-testid', 'custom-option')
})

type CreateWrapperProps = Omit<ComponentProps<typeof ChipSelectContextProvider>, 'children'>

function createWrapper(contextProps: CreateWrapperProps) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ChipSelectContextProvider {...contextProps}>{children}</ChipSelectContextProvider>
  }
}
