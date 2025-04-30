import { fireEvent, render, screen } from '@testing-library/react'
import { getTopBarMenuClickableItems, TopBarMenu } from '../top-bar-menu'

vi.mock('../../icon', () => ({
  Icon: () => <svg data-name="mocked" />,
}))

describe('TopBarMenu', () => {
  it('should match a snapshot when isOpen state is true', () => {
    expect(
      render(
        <TopBarMenu isOpen onClose={vi.fn()}>
          <TopBarMenu.Header />
          <TopBarMenu.Body>
            <TopBarMenu.List>
              <TopBarMenu.Group label="Main Nav Item 1" hasBadge>
                <TopBarMenu.Item href="#item-1.1">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.2">Label</TopBarMenu.Item>
              </TopBarMenu.Group>
              <TopBarMenu.Item href="#item-2">Main Nav Item 2</TopBarMenu.Item>
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Item href="#item-1.1">User Item 1</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.1">User Item 2</TopBarMenu.Item>
            </TopBarMenu.List>
          </TopBarMenu.Body>
        </TopBarMenu>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should not render dialog when isOpen is false', () => {
    const { container } = render(
      <TopBarMenu isOpen={false} onClose={vi.fn()}>
        <TopBarMenu.Header />
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item href="#item-1">Test Item</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    expect(container.querySelector('dialog[open]')).not.toBeInTheDocument()
  })

  it('should call onClose when the close button is clicked', () => {
    const onCloseMock = vi.fn()

    render(
      <TopBarMenu isOpen onClose={onCloseMock}>
        <TopBarMenu.Header />
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item href="#item-1">Test Item</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('should render badge indicators correctly', () => {
    render(
      <TopBarMenu isOpen onClose={vi.fn()}>
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item href="#item-1" hasBadge>
              Item with Badge
            </TopBarMenu.Item>
            <TopBarMenu.Item href="#item-2">Item without Badge</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    const itemWithBadge = screen.getByText('Item with Badge').closest('a')
    const itemWithoutBadge = screen.getByText('Item without Badge').closest('a')

    // Check for badge in DOM structure
    expect(itemWithBadge?.querySelector('span')).toBeInTheDocument()
    expect(itemWithoutBadge?.querySelector('span')).not.toBeInTheDocument()
  })

  it('should handle button items with onClick handlers', () => {
    const onClickMock = vi.fn()

    render(
      <TopBarMenu isOpen onClose={vi.fn()}>
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item onClick={onClickMock}>Button Item</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    const buttonItem = screen.getByText('Button Item')
    fireEvent.click(buttonItem)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should handle the keyboard navigation properly', () => {
    const mockOnButtonClick = vi.fn()
    const mockOnKeyDown = vi.fn()

    const { container } = render(
      <TopBarMenu isOpen onKeyDown={mockOnKeyDown}>
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Group isActive={false} label="Main Nav Item 1">
              <TopBarMenu.Item href="#item-1.1">Sub Nav Item 1</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.2">Sub Nav Item 2</TopBarMenu.Item>
            </TopBarMenu.Group>
            <TopBarMenu.Item onClick={mockOnButtonClick}>Main Nav Item 2</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    const initialItems = getTopBarMenuClickableItems(container)
    expect(initialItems).toHaveLength(2)

    initialItems[0].focus()

    // NOTE: proving the sub items are unaccessible while the parent item is collapsed
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(initialItems[1])
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(initialItems[0])
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' })
    expect(document.activeElement).toBe(initialItems[0])

    // NOTE: ensure the sub items are accessible while the parent item expanded
    const expandedItems = getTopBarMenuClickableItems(container)
    expect(expandedItems).toHaveLength(4)
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(expandedItems[1])
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(expandedItems[2])
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(expandedItems[3])

    // NOTE: move back to the first item
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(expandedItems[0])

    // NOTE: asserting the expand and collapse functionality with across key strokes
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowLeft' })
    expect(getTopBarMenuClickableItems(container)).toHaveLength(2)
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' })
    expect(getTopBarMenuClickableItems(container)).toHaveLength(4)
    fireEvent.keyDown(document.activeElement!, { key: ' ' })
    expect(getTopBarMenuClickableItems(container)).toHaveLength(2)
  })

  it('should correctly set active state on menu items', () => {
    render(
      <TopBarMenu isOpen onClose={vi.fn()}>
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item href="#item-1" isActive>
              Active Item
            </TopBarMenu.Item>
            <TopBarMenu.Item href="#item-2">Inactive Item</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    const activeItem = screen.getByText('Active Item').closest('a')
    const inactiveItem = screen.getByText('Inactive Item').closest('a')

    expect(activeItem).toHaveAttribute('aria-current', 'page')
    expect(inactiveItem).not.toHaveAttribute('aria-current')
  })

  it('should correctly set active state on button menu items', () => {
    render(
      <TopBarMenu isOpen onClose={vi.fn()}>
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item onClick={vi.fn()} isActive>
              Active Button
            </TopBarMenu.Item>
            <TopBarMenu.Item onClick={vi.fn()}>Inactive Button</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    const activeButton = screen.getByText('Active Button').closest('button')
    const inactiveButton = screen.getByText('Inactive Button').closest('button')

    expect(activeButton).toHaveAttribute('aria-current', 'true')
    expect(inactiveButton).not.toHaveAttribute('aria-current')
  })
})
