import { closeMenuGroupOnEscapeKeyDownHandler } from '../close-menu-group-on-escape-key-down-handler'
import { render, screen, fireEvent } from '@testing-library/react'

test("focuses the <summary> of the key down event target's ancestral <details> element", () => {
  render(
    <div onKeyDown={closeMenuGroupOnEscapeKeyDownHandler}>
      <details open>
        <summary data-testid="summary">Menu Group</summary>
        <a href="/" />
      </details>
    </div>,
  )
  fireEvent.keyDown(screen.getByRole('link'), { key: 'Escape', code: 'Escape' })

  expect(screen.getByTestId('summary')).toHaveFocus()
})

test("closes the key down event target's ancestral <details> element if one of its descendants are not the current page", () => {
  render(
    <div onKeyDown={closeMenuGroupOnEscapeKeyDownHandler}>
      <details open>
        <summary>Menu Group</summary>
        <a href="/" />
      </details>
    </div>,
  )
  fireEvent.keyDown(screen.getByRole('link'), { key: 'Escape', code: 'Escape' })

  expect(screen.getByRole('group')).not.toBeVisible()
})

test("does NOT close the key down event target's ancestral <details> element if one of its descendants are the current page", () => {
  render(
    <div onKeyDown={closeMenuGroupOnEscapeKeyDownHandler}>
      <details open>
        <summary>Menu Group</summary>
        <a href="/" aria-current="page" />
      </details>
    </div>,
  )
  fireEvent.keyDown(screen.getByRole('link'), { key: 'Escape', code: 'Escape' })

  expect(screen.getByRole('group')).toBeVisible()
})
