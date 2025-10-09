import { FormControl } from '../form-control'
import { render, screen } from '@testing-library/react'

test('can label a form control when `as="label"`', () => {
  const { container } = render(<FormControl as="div">Child</FormControl>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('can label a fieldset when `as="legend"`', () => {
  render(<FormControl as="fieldset">Child</FormControl>)
  expect(screen.getByRole('group')).toBeVisible()
})

test('displays supplied children', () => {
  render(<FormControl as="fieldset">Child</FormControl>)
  expect(screen.getByText('Child')).toBeVisible()
})

test('has correct class name', () => {
  render(
    <FormControl as="fieldset" className="my-custom-class">
      Child
    </FormControl>,
  )
  expect(screen.getByRole('group')).toHaveClass('el-form-control my-custom-class')
})

test('forwards additional attributes to the div/fieldset element', () => {
  const { container } = render(
    <FormControl as="div" data-testid="test-id">
      Child
    </FormControl>,
  )
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})
