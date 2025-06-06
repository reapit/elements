import { fireEvent, render, screen } from '@testing-library/react'
import { MenuItemContainer, MenuItemGroup, MenuList } from '../menu.atoms'

describe('MenuItemGroup', () => {
  it('should render as expected', () => {
    render(
      <MenuItemGroup label="Group Title" maxHeight="--size-80">
        Group Content
      </MenuItemGroup>,
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
      render(<MenuItemContainer>Test Button</MenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveTextContent('Test Button')
    })

    it('should apply active state correctly', () => {
      render(<MenuItemContainer isActive>Active Button</MenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button).toHaveAttribute('aria-current', 'true')
    })

    it('should apply disabled state correctly', () => {
      render(<MenuItemContainer disabled>Disabled Button</MenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button).toHaveAttribute('disabled', 'true')
      expect(button).toHaveAttribute('data-close-menu', 'false')
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('tabIndex', '-1')
    })

    it('should call onClick handler when clicked', () => {
      const handleClick = vi.fn()

      render(<MenuItemContainer onClick={handleClick}>Clickable Button</MenuItemContainer>)

      const button = screen.getByRole('menuitem')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should set data-close-menu attribute correctly', () => {
      render(<MenuItemContainer closeMenu={false}>Non-closing Button</MenuItemContainer>)

      const button = screen.getByRole('menuitem')
      expect(button).toHaveAttribute('data-close-menu', 'false')
    })
  })

  describe('as anchor', () => {
    it('should render as anchor when href is provided', () => {
      render(<MenuItemContainer href="/test">Test Link</MenuItemContainer>)

      const link = screen.getByRole('menuitem')
      expect(link.tagName).toBe('A')
      expect(link).toHaveTextContent('Test Link')
      expect(link).toHaveAttribute('href', '/test')
    })

    it('should apply active state correctly', () => {
      render(
        <MenuItemContainer href="/test" isActive>
          Active Link
        </MenuItemContainer>,
      )

      const link = screen.getByRole('menuitem')
      expect(link).toHaveAttribute('aria-current', 'page')
    })

    it('should set data-close-menu attribute correctly', () => {
      render(
        <MenuItemContainer href="/test" closeMenu={false}>
          Non-closing Link
        </MenuItemContainer>,
      )

      const link = screen.getByRole('menuitem')
      expect(link).toHaveAttribute('data-close-menu', 'false')
    })
  })
})

describe('MenuList', () => {
  it('should render as expected', () => {
    render(
      <MenuList maxWidth="--size-80" maxHeight="--size-80">
        <div data-testid="menu-child">Menu Child</div>
      </MenuList>,
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
