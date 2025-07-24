import { fireEvent, render, screen } from '@testing-library/react'
import { DeprecatedMenuItemContainer, DeprecatedMenuItemGroup, DeprecatedMenuList } from '../menu.atoms'

describe('MenuItemGroup', () => {
  it('should render as expected', () => {
    render(
      <DeprecatedMenuItemGroup label="Group Title" maxHeight="--size-80">
        Group Content
      </DeprecatedMenuItemGroup>,
    )

    expect(screen.getByText('Group Title')).toBeInTheDocument()
    expect(screen.getByText('Group Content')).toBeInTheDocument()
    expect(screen.getByText('Group Content')).toHaveStyle({
      maxHeight: 'var(--size-80)',
    })
  })
})

describe('MenuItemContainer', () => {
  describe('as button', () => {
    it('should render as button when no href is provided', () => {
      render(<DeprecatedMenuItemContainer>Test Button</DeprecatedMenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveTextContent('Test Button')
    })

    it('should apply active state correctly', () => {
      render(<DeprecatedMenuItemContainer isActive>Active Button</DeprecatedMenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button).toHaveAttribute('aria-current', 'true')
    })

    it('should apply disabled state correctly', () => {
      render(<DeprecatedMenuItemContainer disabled>Disabled Button</DeprecatedMenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button).toHaveAttribute('disabled', 'true')
      expect(button).toHaveAttribute('data-close-menu', 'false')
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('tabIndex', '-1')
    })

    it('should call onClick handler when clicked', () => {
      const handleClick = vi.fn()

      render(<DeprecatedMenuItemContainer onClick={handleClick}>Clickable Button</DeprecatedMenuItemContainer>)

      const button = screen.getByRole('menuitem')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should set data-close-menu attribute correctly', () => {
      render(<DeprecatedMenuItemContainer closeMenu={false}>Non-closing Button</DeprecatedMenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button).toHaveAttribute('data-close-menu', 'false')
    })
  })

  describe('as anchor', () => {
    it('should render as anchor when href is provided', () => {
      render(<DeprecatedMenuItemContainer href="/test">Test Link</DeprecatedMenuItemContainer>)

      const link = screen.getByRole('menuitem')
      expect(link.tagName).toBe('A')
      expect(link).toHaveTextContent('Test Link')
      expect(link).toHaveAttribute('href', '/test')
    })

    it('should apply active state correctly', () => {
      render(
        <DeprecatedMenuItemContainer href="/test" isActive>
          Active Link
        </DeprecatedMenuItemContainer>,
      )

      const link = screen.getByRole('menuitem')
      expect(link).toHaveAttribute('aria-current', 'page')
    })

    it('should set data-close-menu attribute correctly', () => {
      render(
        <DeprecatedMenuItemContainer href="/test" closeMenu={false}>
          Non-closing Link
        </DeprecatedMenuItemContainer>,
      )

      const link = screen.getByRole('menuitem')
      expect(link).toHaveAttribute('data-close-menu', 'false')
    })
  })
})

describe('MenuList', () => {
  it('should render as expected', () => {
    render(
      <DeprecatedMenuList maxWidth="--size-80" maxHeight="--size-80">
        <div data-testid="menu-child">Menu Child</div>
      </DeprecatedMenuList>,
    )

    const menu = screen.getByRole('menu')
    expect(menu).toHaveStyle({
      maxWidth: 'var(--size-80)',
      maxHeight: 'var(--size-80)',
    })
    expect(screen.getByTestId('menu-child')).toBeInTheDocument()
    expect(screen.getByTestId('custom-menu-list')).toBeInTheDocument()
  })
})
