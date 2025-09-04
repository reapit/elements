import { render, screen, fireEvent } from '@testing-library/react'
import { Option } from '../option'
import { SelectContext, SelectedItem } from '../../select-custom'
import { Badge } from '#src/core/badge'
import { LabelText } from '#src/core/label-text'
import { StarIcon } from '#src/icons/star'

describe('Option', () => {
  const onSelect = vi.fn()

  const renderWithContext = (props = {}, selected: SelectedItem[] = []) => {
    return render(
      <SelectContext.Provider value={{ selectedValues: selected, onSelect, isMultiple: false }}>
        <Option value="option1" label="Option 1" {...props} />
      </SelectContext.Provider>,
    )
  }

  beforeEach(() => {
    onSelect.mockClear()
  })

  test('renders Option with label', () => {
    renderWithContext()
    expect(screen.getByText('Option 1')).toBeVisible()
  })

  test('renders badge when provided', () => {
    renderWithContext({ badge: 'New' })
    expect(screen.getByText('New')).toBeVisible()
  })

  test('renders additionalInfo1 and additionalInfo2 when provided', () => {
    const additionalInfo1 = (
      <>
        <StarIcon size="sm" color="primary" />
        <LabelText size="small">Additional Info 1</LabelText>
        <Badge colour="neutral">Badge</Badge>
      </>
    )

    const additionalInfo2 = (
      <>
        <StarIcon size="sm" color="primary" />
        <LabelText size="small">Additional Info 2</LabelText>
        <Badge colour="neutral">Badge</Badge>
      </>
    )

    renderWithContext({ additionalInfo1, additionalInfo2 })

    expect(screen.getByText('Additional Info 1')).toBeVisible()
    expect(screen.getByText('Additional Info 2')).toBeVisible()
    expect(screen.getAllByText('Badge').length).toBe(2)
  })

  test('calls onSelect when clicked', () => {
    renderWithContext()
    const option = screen.getByRole('option')
    fireEvent.click(option)
    expect(onSelect).toHaveBeenCalledWith({ value: 'option1', label: 'Option 1' })
  })

  test('shows aria-selected when selected', () => {
    renderWithContext({}, [{ value: 'option1', label: 'Option 1' }])
    const option = screen.getByRole('option')
    expect(option).toHaveAttribute('aria-selected', 'true')
  })

  test('does not show aria-selected when not selected', () => {
    renderWithContext()
    const option = screen.getByRole('option')
    expect(option).toHaveAttribute('aria-selected', 'false')
  })
})
