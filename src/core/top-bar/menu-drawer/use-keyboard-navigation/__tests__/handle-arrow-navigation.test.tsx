import { fireEvent, render, screen } from '@testing-library/react'
import { TopBarMenuDrawer } from '../../menu-drawer'

beforeEach(() => {
  // NOTE: Unclear why, but without this, we see a test runtime error from the blur event listener added
  // by `use-menu-group-controller.ts` about `hidePopover` not existing
  // not existing on the tooltipElement. Suspect its a bug in Happy DOM w.r.t to event handling.
  HTMLElement.prototype.hidePopover = () => void 0
})

test('navigates through list items when arrow keys are pressed', async () => {
  render(<TestTopBarMenuDrawer />)

  const list = screen.getByTestId('test-list')
  const firstItem = screen.getByRole('link', { name: 'Item 1' })
  const secondItem = screen.getByRole('group', { name: 'Item 2' })
  // NOTE: Item 3 is a submenu item inside the Item 2 menu group, which is closed.
  const fourthItem = screen.getByRole('group', { name: 'Item 4' })
  const fifthItem = screen.getByRole('link', { name: 'Item 5' })

  // Focus the first item
  firstItem.focus()
  expect(firstItem).toHaveFocus()

  // Navigate down to the second item
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(secondItem.firstChild).toHaveFocus()

  // Navigate down to the fourth item (third item should be skipped because its <details> is closed)
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(fourthItem.firstChild).toHaveFocus()

  // Navigate down to the fifth item
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(fifthItem).toHaveFocus()

  // Attempt to navigate down again (should not move focus because its the last item)
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(fifthItem).toHaveFocus()

  // Navigate up to the fourth item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(fourthItem.firstChild).toHaveFocus()

  // Navigate up to the second item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(secondItem.firstChild).toHaveFocus()

  // Navigate up to the first item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(firstItem).toHaveFocus()

  // Attempt to navigate up again (should not move focus because its the first item)
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(firstItem).toHaveFocus()
})

function TestTopBarMenuDrawer() {
  return (
    <TopBarMenuDrawer isOpen>
      <TopBarMenuDrawer.Content>
        <TopBarMenuDrawer.MenuList data-testid="test-list">
          <TopBarMenuDrawer.MenuItem aria-current={false} href="/">
            Item 1
          </TopBarMenuDrawer.MenuItem>
          {/* Closed menu group */}
          <TopBarMenuDrawer.MenuGroup
            summary={<TopBarMenuDrawer.MenuGroupSummary>Item 2</TopBarMenuDrawer.MenuGroupSummary>}
          >
            <TopBarMenuDrawer.Submenu>
              <TopBarMenuDrawer.SubmenuItem aria-current={false} href="/">
                Item 3
              </TopBarMenuDrawer.SubmenuItem>
            </TopBarMenuDrawer.Submenu>
          </TopBarMenuDrawer.MenuGroup>
          {/* Open menu group (because Item 5 is the current page) */}
          <TopBarMenuDrawer.MenuGroup
            summary={<TopBarMenuDrawer.MenuGroupSummary>Item 4</TopBarMenuDrawer.MenuGroupSummary>}
          >
            <TopBarMenuDrawer.Submenu>
              <TopBarMenuDrawer.SubmenuItem aria-current="page" href="/">
                Item 5
              </TopBarMenuDrawer.SubmenuItem>
            </TopBarMenuDrawer.Submenu>
          </TopBarMenuDrawer.MenuGroup>
        </TopBarMenuDrawer.MenuList>
      </TopBarMenuDrawer.Content>
    </TopBarMenuDrawer>
  )
}
