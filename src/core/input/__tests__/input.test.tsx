import { Input } from '../input'
import { render, screen } from '@testing-library/react'

test('can render a checkbox element', () => {
  render(<Input type="checkbox" />)
  expect(screen.getByRole('checkbox')).toBeVisible()
})
