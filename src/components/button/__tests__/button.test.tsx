import { Button } from '../button'
import { render, screen } from '@testing-library/react'

test('renders a button element', () => {
  render(
    <Button size="medium" variant="primary">
      Button
    </Button>,
  )
  expect(screen.getByRole('button')).toBeVisible()
})
