import { fireEvent, render, screen } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import { TopBarMenuItem } from '../../top-bar-menu-item'
import { TopBarMenuItemGroup } from '../top-bar-menu-item-group'

describe('TopBarMenuItemGroup', () => {
  it('should able to render an expandable group ', () => {
    render(
      <TopBarMenuItemGroup label="Report" aria-label="Options, opens a sub menu" hasBadge>
        <TopBarMenuItem label="Create" href="#create" />
        <TopBarMenuItem label="Report" onClick={vi.fn()} hasBadge />
        <TopBarMenuItem label="Archive" href="#archive" target="_blank" aria-label="Archive, opens in a new window" />
      </TopBarMenuItemGroup>,
    )

    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button')).toHaveAccessibleName('Options, opens a sub menu')
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')

    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'true')

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0])
    })

    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })
})
