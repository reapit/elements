import { fireEvent, render } from '@testing-library/react'
import { TopBarMenu } from '../top-bar-menu'
import { TopBar } from '#src/components/top-bar/top-bar'

vi.mock('../../icon', () => ({
  Icon: () => <svg data-name="mocked" />,
}))
describe('TopbarMenu', () => {
  it('should match a snapshot when isOpen state is true', () => {
    expect(
      render(
        <TopBarMenu isOpen onClose={vi.fn()}>
          <TopBarMenu.Header />
          <TopBarMenu.Body>
            <TopBarMenu.List>
              <TopBarMenu.Group label="Main Nav Item 1" hasBadge>
                <TopBarMenu.Item label="Label" href="#item-1.1" />
                <TopBarMenu.Item label="Label" href="#item-1.2" />
              </TopBarMenu.Group>
              <TopBarMenu.Item label="Main Nav Item 2" href="#item-2" />
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Item label="User Item 1" href="#item-1.1" />
              <TopBarMenu.Item label="User Item 2" href="#item-1.1" />
            </TopBarMenu.List>
          </TopBarMenu.Body>
        </TopBarMenu>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should handle the keyboard navigation properly', () => {
    const mockOnButtonClick = vi.fn()
    const mockOnKeyDown = vi.fn()

    render(
      <TopBarMenu isOpen onKeyDown={mockOnKeyDown}>
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Group isActive={false} label="Main Nav Item 1">
              <TopBarMenu.Item label="Sub Nav Item 1" href="#item-1.1" />
              <TopBarMenu.Item label="Sub Nav Item 2" href="#item-1.2" />
            </TopBarMenu.Group>
            <TopBarMenu.Item label="Main Nav Item 2" onClick={mockOnButtonClick} />
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>,
    )

    const getItems = () =>
      document?.querySelectorAll(
        'ul:not([aria-hidden="true"]):not([aria-hidden="false"]) > li > a, ul[aria-hidden="false"] > li > a, button',
      ) as NodeListOf<HTMLElement>

    const initialItems = getItems()
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
    const expandedItems = getItems()
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
    expect(getItems()).toHaveLength(2)
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' })
    expect(getItems()).toHaveLength(4)
    fireEvent.keyDown(document.activeElement!, { key: ' ' })
    expect(getItems()).toHaveLength(2)
  })
})
