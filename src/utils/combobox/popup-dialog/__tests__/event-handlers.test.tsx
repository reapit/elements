import { closeDialog } from '#src/utils/dialog'
import { clearSearchInputOnClose, getOptionElement, maybeCloseOnSelection } from '../event-handlers'
import { maybeCloseOnBackdropClick } from '#src/utils/dialog/close-on-backdrop-click'
import { fireEvent, render, screen } from '@testing-library/react'

import type { MouseEvent, SyntheticEvent } from 'react'

vi.mock('#src/utils/dialog', async () => {
  const actual = await vi.importActual<typeof import('#src/utils/dialog')>('#src/utils/dialog')
  return {
    ...actual,
    closeDialog: vi.fn(),
  }
})

beforeEach(() => {
  if (!('isTrusted' in MouseEvent.prototype)) {
    Object.defineProperty(MouseEvent.prototype, 'isTrusted', { value: true })
  }
})

describe('maybeCloseOnSelection', () => {
  test('closes popup when option is clicked with closeOnSelection "always"', () => {
    render(<TestComponent closeOnSelection="always" />)

    const element = screen.getByRole('option', { name: 'Item 1' })
    fireEvent.click(element)

    expect(closeDialog).toHaveBeenCalled()
  })

  test('does not close popup when option is clicked with closeOnSelection "never"', () => {
    render(<TestComponent closeOnSelection="never" />)

    const element = screen.getByRole('option', { name: 'Item 1' })
    fireEvent.click(element)

    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('closes popup for single-select listbox with closeOnSelection "auto"', () => {
    render(<TestComponent closeOnSelection="auto" multiSelectable={false} />)

    const element = screen.getByRole('option', { name: 'Item 1' })
    fireEvent.click(element)

    expect(closeDialog).toHaveBeenCalled()
  })

  test('does not close popup for multi-select listbox with closeOnSelection "auto"', () => {
    render(<TestComponent closeOnSelection="auto" multiSelectable={true} />)

    const element = screen.getByRole('option', { name: 'Item 1' })
    fireEvent.click(element)

    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('closes popup on option descendant click with closeOnSelection "always"', () => {
    render(<TestComponent closeOnSelection="always" />)

    const element = screen.getByTestId('item-2-inner-span')
    fireEvent.click(element)

    expect(closeDialog).toHaveBeenCalled()
  })

  test('does not close popup on option descendant click with closeOnSelection "never"', () => {
    render(<TestComponent closeOnSelection="never" />)

    const element = screen.getByTestId('item-2-inner-span')
    fireEvent.click(element)

    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('closes popup on option descendant click for single-select listbox with closeOnSelection "auto"', () => {
    render(<TestComponent closeOnSelection="auto" multiSelectable={false} />)

    const element = screen.getByTestId('item-2-inner-span')
    fireEvent.click(element)

    expect(closeDialog).toHaveBeenCalled()
  })

  test('respects preventDefault from option click handler', () => {
    render(<TestComponent />)

    const element = screen.getByRole('option', { name: 'Item that prevents default' })
    fireEvent.click(element)

    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('ignores clicks on non-option elements', () => {
    render(<TestComponent />)

    const element = screen.getByTestId('non-option-element')
    fireEvent.click(element)

    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('does not close when listbox element is not found (auto mode)', () => {
    render(<TestComponent closeOnSelection="auto" includeListboxId={false} />)

    const element = screen.getByRole('option', { name: 'Item 1' })
    fireEvent.click(element)

    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('does not close when listboxId is missing from option dataset (auto mode)', () => {
    render(<TestComponent closeOnSelection="auto" multiSelectable={false} />)

    const element = screen.getByRole('option', { name: 'Item without listbox ID' })
    fireEvent.click(element)

    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('closes popup regardless of listbox element when closeOnSelection is "always"', () => {
    render(<TestComponent closeOnSelection="always" includeListboxId={false} />)

    const element = screen.getByRole('option', { name: 'Item 1' })
    fireEvent.click(element)

    expect(closeDialog).toHaveBeenCalled()
  })

  test('handles invalid closeOnSelection values gracefully', () => {
    // @ts-expect-error -- we're deliberately testing an invalid value
    render(<TestComponent closeOnSelection="invalid" />)

    const element = screen.getByRole('option', { name: 'Item 1' })
    fireEvent.click(element)

    // Should not close or throw error
    expect(closeDialog).not.toHaveBeenCalled()
  })
})

describe('getOptionElement', () => {
  test('returns option element when given an option', () => {
    render(<TestComponent />)
    const option = screen.getByRole('option', { name: 'Item 1' })

    expect(getOptionElement(option)).toBe(option)
  })

  test('returns option element when given a descendant of an option', () => {
    render(<TestComponent />)
    const descendant = screen.getByTestId('item-2-inner-span')
    const option = descendant.closest('[role="option"]')

    expect(getOptionElement(descendant)).toBe(option)
  })

  test('returns null when given a non-option element', () => {
    render(<TestComponent />)
    const nonOption = screen.getByTestId('non-option-element')

    expect(getOptionElement(nonOption)).toBeNull()
  })

  test('returns null when given null', () => {
    expect(getOptionElement(null)).toBeNull()
  })

  test('returns null when given undefined', () => {
    expect(getOptionElement(undefined)).toBeNull()
  })

  test('returns null when given a non-HTMLElement', () => {
    expect(getOptionElement('string')).toBeNull()
    expect(getOptionElement(123)).toBeNull()
    expect(getOptionElement({})).toBeNull()
  })
})

describe('clearSearchInputOnClose', () => {
  test('clears search input when preserveSearchOnClose is false', () => {
    render(<SearchTestComponent initialValue="search query" />)

    const dialog = screen.getByTestId('test-dialog')
    const input = screen.getByTestId('search-input')
    const event = { currentTarget: dialog } as SyntheticEvent<HTMLDialogElement>

    expect(input).toHaveValue('search query')

    clearSearchInputOnClose(event)

    expect(input).toHaveValue('')
  })

  test('preserves search input when preserveSearchOnClose is true', () => {
    render(<SearchTestComponent initialValue="search query" preserveSearchOnClose />)

    const dialog = screen.getByTestId('test-dialog')
    const input = screen.getByTestId('search-input')
    const event = { currentTarget: dialog } as SyntheticEvent<HTMLDialogElement>

    expect(input).toHaveValue('search query')

    clearSearchInputOnClose(event)

    expect(input).toHaveValue('search query')
  })

  test('does nothing when header element not found', () => {
    render(<SearchTestComponent initialValue="test" />)

    const dialog = screen.getByTestId('test-dialog')
    const event = { currentTarget: dialog } as SyntheticEvent<HTMLDialogElement>

    expect(() => clearSearchInputOnClose(event)).not.toThrow()
  })

  test('does nothing when search input not found in header', () => {
    render(<SearchTestComponent hasInput={false} />)

    const dialog = screen.getByTestId('test-dialog')
    const event = { currentTarget: dialog } as SyntheticEvent<HTMLDialogElement>

    expect(() => clearSearchInputOnClose(event)).not.toThrow()
  })
})

interface TestComponentProps {
  closeOnSelection?: 'always' | 'never' | 'auto'
  includeListboxId?: boolean
  multiSelectable?: boolean
}

function TestComponent({
  closeOnSelection = 'auto',
  includeListboxId = true,
  multiSelectable = false,
}: TestComponentProps) {
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    maybeCloseOnSelection(event)
    maybeCloseOnBackdropClick(event)
  }

  return (
    <dialog data-close-on-selection={closeOnSelection} data-testid="test-dialog" onClick={handleClick} open>
      <div aria-multiselectable={multiSelectable} data-testid="listbox" id="test-listbox" role="listbox">
        <div data-listbox-id={includeListboxId ? 'test-listbox' : undefined} role="option">
          Item 1
        </div>
        <div data-listbox-id={includeListboxId ? 'test-listbox' : undefined} role="option">
          <span data-testid="item-2-inner-span">Item 2</span>
        </div>
        <div
          data-listbox-id={includeListboxId ? 'test-listbox' : undefined}
          onClick={(event) => event.preventDefault()}
          role="option"
        >
          Item that prevents default
        </div>
        <div role="option">Item without listbox ID</div>
      </div>
      <div data-testid="non-option-element">Not an option</div>
    </dialog>
  )
}

interface SearchTestComponentProps {
  hasInput?: boolean
  initialValue?: string
  preserveSearchOnClose?: boolean
}

function SearchTestComponent({
  hasInput = true,
  initialValue = '',
  preserveSearchOnClose = false,
}: SearchTestComponentProps) {
  return (
    <dialog data-testid="test-dialog" data-preserve-search-on-close={preserveSearchOnClose} open>
      <div id="test-header">
        {hasInput && <input data-testid="search-input" defaultValue={initialValue} type="text" />}
      </div>
    </dialog>
  )
}
