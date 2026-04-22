import { render, screen } from '@testing-library/react'
import { StarIcon } from '#src/icons/star'
import { TopBarNavIconItemButton } from '../nav-icon-item-button'

test('renders as a button', () => {
  render(<TopBarNavIconItemButton hasBadge={false} icon={<StarIcon />} onClick={() => void 0} aria-label="My Item" />)
  expect(screen.getByRole('button', { name: 'My Item' })).toBeVisible()
})
