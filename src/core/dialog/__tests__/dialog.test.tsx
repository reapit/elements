import { render } from '@testing-library/react'
import { Dialog } from '../dialog'

// NOTE: have to mock the `useToggleDialogVisibilityEffect` hook with a fallback values for temporary
// TODO: find a way to mock with the prototype of the `HTMLDialogElement` interface
vi.mock('../use-toggle-dialog-visibility-effect')

describe('Dialog', () => {
  it('should render with the correct structure', () => {
    expect(
      render(
        <Dialog isOpen>
          <Dialog.Header>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>Body</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>
        </Dialog>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
