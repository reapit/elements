import { fireEvent, render, screen } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import { TopBarMenuItem } from '../../top-bar-menu-item'
import { TopBarMenuItemGroup } from '../top-bar-menu-item-group'

describe('TopBarMenuItemGroup', () => {
  it('should render an expandable group', () => {
    render(
      <TopBarMenuItemGroup label="Report" aria-label="Options, opens a sub menu" hasBadge>
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
        <TopBarMenuItem onClick={vi.fn()}>Report</TopBarMenuItem>
        <TopBarMenuItem href="#archive" target="_blank" aria-label="Archive, opens in a new window">
          Archive
        </TopBarMenuItem>
      </TopBarMenuItemGroup>,
    )

    expect(screen.queryAllByRole('button')).toHaveLength(1)
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0)

    expect(screen.getByRole('button')).toHaveAccessibleName('Options, opens a sub menu')
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')

    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(screen.queryAllByRole('menuitem')).toHaveLength(3)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')

    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(screen.queryAllByRole('button')).toHaveLength(1)
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0)

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('should show badge when hasBadge is true', () => {
    const { container } = render(
      <TopBarMenuItemGroup label="Report" hasBadge>
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
      </TopBarMenuItemGroup>,
    )

    // Check for the badge element
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('should use label as aria-label when no aria-label is provided', () => {
    render(
      <TopBarMenuItemGroup label="Settings">
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
      </TopBarMenuItemGroup>,
    )

    expect(screen.getByRole('button')).toHaveAccessibleName('Settings')
  })

  it('should initialize as expanded when isActive is true', () => {
    render(
      <TopBarMenuItemGroup label="Reports" isActive>
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
      </TopBarMenuItemGroup>,
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    // Check that the menu list is visible
    expect(screen.getByText('Create')).toBeVisible()
  })

  it('should pass additional props to the button element', () => {
    render(
      <TopBarMenuItemGroup label="Reports" data-testid="menu-group" className="custom-class">
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
      </TopBarMenuItemGroup>,
    )

    expect(screen.getByRole('button')).toHaveClass('custom-class')
    expect(screen.getByTestId('menu-group')).toBeInTheDocument()
  })
})
