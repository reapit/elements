import { fireEvent, render, screen } from '@testing-library/react'
import { handleArrowNavigation } from '../handle-arrow-navigation'

test('navigates through default elements when arrow keys are pressed', async () => {
  render(<TestList />)

  const list = screen.getByTestId('test-list')
  const firstItem = screen.getByRole('link', { name: 'Item 1' })
  const secondItem = screen.getByRole('button', { name: 'Item 2' })
  const fourthItem = screen.getByRole('link', { name: 'Item 4' })

  // Focus the first item
  firstItem.focus()
  expect(firstItem).toHaveFocus()

  // Navigate down to the second item
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(secondItem).toHaveFocus()

  // Navigate down to the fourth item (third item should be skipped because its <details> is closed)
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(fourthItem).toHaveFocus()

  // Attempt to navigate down again (should not move focus because its the last item)
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(fourthItem).toHaveFocus()

  // Navigate up to the second item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(secondItem).toHaveFocus()

  // Navigate up to the first item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(firstItem).toHaveFocus()

  // Attempt to navigate up again (should not move focus)
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(firstItem).toHaveFocus()
})

test('navigates through specified elements when arrow keys are pressed', async () => {
  render(<TestList selectors='a, button, [role="button"]' />)

  const list = screen.getByTestId('test-list')
  const firstItem = screen.getByRole('link', { name: 'Item 1' })
  const secondItem = screen.getByRole('button', { name: 'Item 2' })
  const thirdItem = screen.getByRole('button', { name: 'Item 3' })
  const fourthItem = screen.getByRole('link', { name: 'Item 4' })

  // Focus the first item
  firstItem.focus()
  expect(firstItem).toHaveFocus()

  // Navigate down to the second item
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(secondItem).toHaveFocus()

  // Navigate down to the third item
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(thirdItem).toHaveFocus()

  // Navigate down to the fourth item (third item should be skipped because its <details> is closed)
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(fourthItem).toHaveFocus()

  // Attempt to navigate down again (should not move focus)
  fireEvent.keyDown(list, { key: 'ArrowDown', code: 'ArrowDown' })
  expect(fourthItem).toHaveFocus()

  // Navigate up to the third item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(thirdItem).toHaveFocus()

  // Navigate up to the second item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(secondItem).toHaveFocus()

  // Navigate up to the first item
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(firstItem).toHaveFocus()

  // Attempt to navigate up again (should not move focus)
  fireEvent.keyDown(list, { key: 'ArrowUp', code: 'ArrowUp' })
  expect(firstItem).toHaveFocus()
})

interface TestListProps {
  selectors?: string
}

function TestList({ selectors }: TestListProps) {
  return (
    <div data-testid="test-list" onKeyDown={(event) => handleArrowNavigation(event, { selectors })}>
      <a href="/">Item 1</a>
      <button>Item 2</button>
      <div role="button" tabIndex={0}>
        Item 3
      </div>
      <a href="/">Item 4</a>
    </div>
  )
}
