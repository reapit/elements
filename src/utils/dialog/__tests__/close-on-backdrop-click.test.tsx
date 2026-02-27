import { fireEvent, render, screen } from '@testing-library/react'
import { maybeCloseOnBackdropClick } from '#src/utils/dialog'

describe('maybeCloseOnBackdropClick', () => {
  describe('when dialog does not have closedby="any"', () => {
    beforeEach(() => {
      // Ensure closedBy is not defined to simulate Safari
      // @ts-expect-error - Deleting property to simulate Safari
      delete HTMLDialogElement.prototype.closedBy
    })

    test('does not close the dialog when clicking backdrop', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy="closerequest" />)

      const dialog = screen.getByRole('dialog')
      fireEvent.click(dialog)

      expect(closeSpy).not.toHaveBeenCalled()
    })

    test('does not close the dialog when closedby is "none"', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy="none" />)

      const dialog = screen.getByRole('dialog')
      fireEvent.click(dialog)

      expect(closeSpy).not.toHaveBeenCalled()
    })

    test('does not close the dialog when closedby attribute is missing', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy={undefined} />)

      const dialog = screen.getByRole('dialog')
      fireEvent.click(dialog)

      expect(closeSpy).not.toHaveBeenCalled()
    })
  })

  describe('when closedBy is supported', () => {
    beforeEach(() => {
      Object.defineProperty(HTMLDialogElement.prototype, 'closedBy', {
        value: 'any',
        writable: true,
        configurable: true,
      })
    })

    afterEach(() => {
      // @ts-expect-error - Deleting property for test cleanup
      delete HTMLDialogElement.prototype.closedBy
    })

    test('does not close the dialog when clicking backdrop', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy="any" />)

      const dialog = screen.getByRole('dialog')
      fireEvent.click(dialog)

      expect(closeSpy).not.toHaveBeenCalled()
    })

    test('does not close the dialog when clicking child content', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy="any" />)

      const content = screen.getByText('Dialog Content')
      fireEvent.click(content)

      expect(closeSpy).not.toHaveBeenCalled()
    })
  })

  describe('when closedBy is not supported (Safari)', () => {
    beforeEach(() => {
      // Ensure closedBy is not defined to simulate Safari
      // @ts-expect-error - Deleting property to simulate Safari
      delete HTMLDialogElement.prototype.closedBy
    })

    test('closes the dialog when clicking backdrop', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy="any" />)

      const dialog = screen.getByRole('dialog')
      fireEvent.click(dialog)

      expect(closeSpy).toHaveBeenCalledTimes(1)
    })

    test('does not close the dialog when clicking child content', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy="any" />)

      const content = screen.getByText('Dialog Content')
      fireEvent.click(content)

      expect(closeSpy).not.toHaveBeenCalled()
    })

    test('does not close when event target does not match currentTarget', () => {
      const closeSpy = vi.fn()
      render(<TestComponent closeSpy={closeSpy} closedBy="any" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(closeSpy).not.toHaveBeenCalled()
    })
  })
})

interface TestComponentProps {
  closedBy?: 'any' | 'closerequest' | 'none'
  closeSpy: () => void
}

function TestComponent({ closedBy, closeSpy }: TestComponentProps) {
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    maybeCloseOnBackdropClick(event)
  }

  return (
    <dialog
      /* oxlint-disable-next-line react/no-unknown-property */
      {...(closedBy !== undefined && { closedby: closedBy })}
      open
      onClick={handleClick}
      ref={(dialog) => {
        if (dialog) {
          dialog.close = closeSpy
        }
      }}
    >
      <div>
        Dialog Content
        <button>Close</button>
      </div>
    </dialog>
  )
}
