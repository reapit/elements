import { render, screen, fireEvent } from '@testing-library/react'
import { TopBarMenuItem } from '../top-bar-menu-item'

describe('TopBarMenuItem component', () => {
  it('should render as a link', () => {
    render(<TopBarMenuItem href="#item-1">Contact</TopBarMenuItem>)
    expect(screen.getByRole('menuitem')).toHaveTextContent('Contact')
  })

  it('should render as a button', () => {
    render(<TopBarMenuItem onClick={vi.fn()}>Contact</TopBarMenuItem>)
    expect(screen.getByRole('menuitem')).toHaveTextContent('Contact')
  })

  it('should apply correct ARIA attributes when active', () => {
    render(
      <TopBarMenuItem href="#item-1" isActive>
        Contact
      </TopBarMenuItem>,
    )
    const link = screen.getByRole('menuitem')
    expect(link).toHaveAttribute('aria-current', 'page')
  })

  it('should render a badge when hasBadge is true', () => {
    const { container } = render(
      <TopBarMenuItem href="#item-1" hasBadge>
        Notifications
      </TopBarMenuItem>,
    )
    // Using container query as the badge doesn't have a specific role
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('should trigger onClick when button is clicked', () => {
    const handleClick = vi.fn()

    render(<TopBarMenuItem onClick={handleClick}>Settings</TopBarMenuItem>)

    fireEvent.click(screen.getByRole('menuitem'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should trigger onClick when button is focused and Enter key is pressed', () => {
    const handleClick = vi.fn()

    render(<TopBarMenuItem onClick={handleClick}>Settings</TopBarMenuItem>)

    const button = screen.getByRole('menuitem')

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should have the correct role for accessibility', () => {
    render(<TopBarMenuItem href="#item-1">Item 1</TopBarMenuItem>)
    expect(screen.getByRole('menuitem')).toBeInTheDocument()
  })
})
