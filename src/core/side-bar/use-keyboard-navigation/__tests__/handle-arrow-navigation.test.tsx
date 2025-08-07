import { fireEvent, render, screen } from '@testing-library/react'
import { SideBar } from '../../side-bar'
import { determineSideBarStateFromViewport } from '../../use-side-bar-match-media-effect'

// NOTE: we need to mock `determineSideBarStateFromViewport` so that our side bar is expanded
// otherwise it will be collapsed by default because we don't have a real viewport for our
// media query to correctly match against.
vi.mock('../../use-side-bar-match-media-effect')
vi.mocked(determineSideBarStateFromViewport).mockReturnValue('expanded')

beforeEach(() => {
  // NOTE: Unclear why, but without this, we see a test runtime error from the blur event listener added
  // by `use-menu-group-controller.ts` about `hidePopover` not existing
  // not existing on the tooltipElement. Suspect its a bug in Happy DOM w.r.t to event handling.
  HTMLElement.prototype.hidePopover = () => void 0
})

test('navigates through list items when arrow keys are pressed', async () => {
  render(<TestSideBar />)

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

function TestSideBar() {
  return (
    <SideBar footer="Footer">
      <SideBar.MenuList data-testid="test-list">
        <SideBar.MenuItem aria-current={false} href="/" icon="Icon">
          Item 1
        </SideBar.MenuItem>
        {/* Closed menu group */}
        <SideBar.MenuGroup summary={<SideBar.MenuGroupSummary icon="Icon">Item 2</SideBar.MenuGroupSummary>}>
          <SideBar.Submenu>
            <SideBar.SubmenuItem aria-current={false} href="/">
              Item 3
            </SideBar.SubmenuItem>
          </SideBar.Submenu>
        </SideBar.MenuGroup>
        {/* Open menu group (because Item 5 is the current page) */}
        <SideBar.MenuGroup summary={<SideBar.MenuGroupSummary icon="Icon">Item 4</SideBar.MenuGroupSummary>}>
          <SideBar.Submenu>
            <SideBar.SubmenuItem aria-current="page" href="/">
              Item 5
            </SideBar.SubmenuItem>
          </SideBar.Submenu>
        </SideBar.MenuGroup>
      </SideBar.MenuList>
    </SideBar>
  )
}
