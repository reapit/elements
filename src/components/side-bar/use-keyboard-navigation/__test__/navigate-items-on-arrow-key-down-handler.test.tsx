import { elSideBarMenuItem } from '../../menu-item'
import { elSideBarMenuGroup } from '../../menu-group'
import { elSideBarSubmenuItem } from '../../submenu-item'
import { navigateItemsOnArrowKeyDownHandler } from '../navigate-items-on-arrow-key-down-handler'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

test('navigates through list items when arrow keys are pressed', async () => {
  render(<TestList />)

  const list = screen.getByTestId('test-list')
  const firstItem = screen.getByRole('link', { name: 'Item 1' })
  const secondItem = screen.getByRole('group', { name: 'Item 2' })
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

  // Attempt to navigate down again (should not move focus)
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

  // Attempt to navigate up again (should not move focus)
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(firstItem).toHaveFocus()
})

function TestList() {
  return (
    <div data-testid="test-list" onKeyDown={navigateItemsOnArrowKeyDownHandler}>
      <a className={elSideBarMenuItem} href="/">
        Item 1
      </a>
      <details aria-labelledby="1" className={elSideBarMenuGroup}>
        <summary className={elSideBarMenuItem} id="1">
          Item 2
        </summary>
        {/* NOTE: This item should NOT be navigated because its ancestral <details> is closed */}
        <a className={elSideBarSubmenuItem} href="/">
          Item 3
        </a>
      </details>
      <details aria-labelledby="2" className={elSideBarMenuGroup} open>
        <summary className={elSideBarMenuItem} id="2">
          Item 4
        </summary>
        {/* NOTE: This item should be navigated because its ancestral <details> is open */}
        <a className={elSideBarSubmenuItem} href="/">
          Item 5
        </a>
      </details>
    </div>
  )
}
