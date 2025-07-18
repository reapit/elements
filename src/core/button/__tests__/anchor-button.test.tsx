import { AnchorButton } from '../anchor-button'
import { render, screen } from '@testing-library/react'

test('renders a link element', () => {
  render(
    <AnchorButton href="https://www.google.com" size="medium" variant="primary">
      Button
    </AnchorButton>,
  )
  expect(screen.getByRole('link')).toBeVisible()
})
