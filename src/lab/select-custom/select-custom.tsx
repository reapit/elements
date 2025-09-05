import { FC, useState, ReactNode, createContext, useEffect } from 'react'
import { Option } from './option'
import { Group } from './group'
import { LabelText } from '#src/core/label-text'
import { Text } from '#src/core/text'
import { Button } from '#src/core/button'
import { CloseIcon } from '#src/icons/close'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { ChipGroup } from '#src/core/chip-group'
import { Popover, elPopover, PopoverPlacement } from '#src/utils/popover'
import { useSelectKeyboardNavigation } from './use-select-keyboard-navigation'
import { getInitialSelected, getTotalOptions } from './helper'
import { ElSelectCustom, elInputField, ElContent, ElPlaceholder } from './styles'

/**
 * Represents an item that can be selected in the custom select component.
 */
export interface SelectedItem {
  /** The value of the selected item */
  value: string
  /** The label displayed for the selected item */
  label: string
}

/**
 * Context provided to `Option` and `Group` components within `SelectCustom`.
 */
export const SelectContext = createContext<{
  /** Currently selected items */
  selectedValues: SelectedItem[]
  /** Function to select or deselect an item */
  onSelect: (item: SelectedItem) => void
  /** Determines if multiple selections are allowed */
  isMultiple: boolean
}>({
  selectedValues: [],
  onSelect: () => {},
  isMultiple: false,
})

/**
 * Props for the `SelectCustom` component.
 */
export interface SelectCustomProps {
  /** Unique identifier for the select component */
  id: string
  /** Size of the select component. @default "medium" */
  size?: 'small' | 'medium' | 'large'
  /** Label displayed above the select input */
  label?: string
  /** Helper text displayed below the select input */
  helperText?: string
  /** Error message displayed below the select input */
  errorMessage?: string
  /** Option and Group components as children */
  children: ReactNode
  /** Whether multiple selections are allowed */
  isMultiple?: boolean
  /** Whether the selection can be cleared */
  isClearable?: boolean
  /** Whether the field is required */
  isRequired?: boolean
  /** Whether the select is disabled */
  isDisabled?: boolean
  /** Maximum height for the popover */
  popoverMaxHeight?: string
  /** Placement of the popover relative to the trigger */
  popoverPlacement?: PopoverPlacement
}

/**
 * Custom select component with support for single/multiple selection,
 * keyboard navigation, popover, and clearable selection.
 */
export const SelectCustom: FC<SelectCustomProps> & {
  /** Exposes the `Group` component for nested option groups */
  Group: typeof Group
  /** Exposes the `Option` component for selectable items */
  Option: typeof Option
} = ({
  id,
  size = 'medium',
  label,
  children,
  helperText,
  errorMessage,
  isMultiple = false,
  isClearable = false,
  isRequired = false,
  isDisabled = false,
  popoverMaxHeight,
  popoverPlacement,
}) => {
  // State for selected items
  const [selectedValues, setSelectedValues] = useState(() => getInitialSelected(children, isMultiple))

  /**
   * Tracks the current width of the select input button in pixels.
   * This is used to make the Popover match the button's width.
   */
  const [inputWidth, setInputWidth] = useState<number>(0)

  // Generate IDs for accessibility
  const popoverId = `select-popover-${id.replace(/\s+/g, '-').toLowerCase()}`
  const triggerId = `select-input-${id.replace(/\s+/g, '-').toLowerCase()}`

  // Keyboard navigation for the select list
  const listRef = useSelectKeyboardNavigation(popoverId)

  /**
   * Closes the popover programmatically.
   */
  const closePopover = () => {
    const popover = document.getElementById(popoverId) as HTMLElement & { hidePopover?: () => void }
    popover?.hidePopover?.()
  }

  /**
   * Handles selecting or deselecting an item.
   * @param item - The item to select/deselect
   */
  const handleSelect = (item: SelectedItem) => {
    setSelectedValues((prev) => {
      if (!isMultiple) return [item]
      return prev.find((s) => s.value === item.value) ? prev.filter((s) => s.value !== item.value) : [...prev, item]
    })

    if (!isMultiple) closePopover()
  }

  /**
   * Clears all selected items.
   */
  const clearSelection = () => setSelectedValues([])

  const displayValue = isMultiple ? '' : selectedValues[0]?.label || ''

  const triggerProps = Popover.getTriggerProps({
    id: triggerId,
    popoverTarget: popoverId,
    popoverTargetAction: 'toggle',
  })

  const descriptionId = `${id}-description`
  const message = errorMessage || helperText
  const isError = Boolean(errorMessage)

  const totalOptions = getTotalOptions(children)
  const isAllSelected = isMultiple && selectedValues.length >= totalOptions

  useEffect(() => {
    if (isAllSelected) {
      closePopover()
    }
  }, [isAllSelected])

  /**
   * Measures the rendered width of the select input button and updates `inputWidth`.
   * Uses a ResizeObserver to automatically update if the button width changes (e.g., responsive layouts).
   */
  useEffect(() => {
    const buttonEl = document.getElementById(triggerId)
    if (!buttonEl) return

    /**
     * Update the state with the button's current width
     */
    const updateWidth = () => setInputWidth(buttonEl.offsetWidth)

    updateWidth() // initial width

    // Observe the button for width changes
    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(buttonEl)

    // Cleanup observer on unmount
    return () => resizeObserver.disconnect()
  }, [triggerId])

  return (
    <ElSelectCustom id={id}>
      {label && (
        <LabelText size={size === 'large' ? 'medium' : 'small'} isRequired={isRequired}>
          {label}
        </LabelText>
      )}

      <Button
        variant="secondary"
        size={size}
        {...triggerProps}
        type="button"
        role="combobox"
        aria-expanded="false"
        className={elInputField}
        aria-disabled={isDisabled || isAllSelected}
        aria-describedby={message ? descriptionId : undefined}
        aria-invalid={isError || false}
      >
        {displayValue ? (
          <ElContent>
            <Text as="span" colour="primary" font="text-xs/regular" overflow="truncate">
              {displayValue}
            </Text>
          </ElContent>
        ) : (
          <ElPlaceholder>
            <Text as="span" colour="placeholder" font="text-xs/regular" overflow="truncate">
              Select an option
            </Text>
          </ElPlaceholder>
        )}
        {isClearable && !isMultiple && selectedValues.length > 0 ? (
          <CloseIcon
            color="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              clearSelection()
            }}
          />
        ) : (
          <ChevronDownIcon size="sm" color="primary" />
        )}
      </Button>

      <Popover
        id={popoverId}
        anchorId={triggerId}
        placement={popoverPlacement || 'bottom-start'}
        popover="auto"
        className={elPopover}
        maxHeight={popoverMaxHeight}
        style={{ minWidth: inputWidth }}
        gap="var(--spacing-1)"
      >
        <SelectContext.Provider value={{ selectedValues, onSelect: handleSelect, isMultiple }}>
          <ul role="listbox" ref={listRef} tabIndex={-1}>
            {children}
          </ul>
        </SelectContext.Provider>
      </Popover>

      {message && (
        <LabelText id={descriptionId} size="small" data-error={isError ? true : false}>
          {message}
        </LabelText>
      )}

      {isMultiple && selectedValues.length > 0 && (
        <ChipGroup>
          {selectedValues.map((item, index) => (
            <ChipGroup.Item
              key={`${item.value}-${index}`}
              variant="filter"
              onClick={() => handleSelect(item)}
              aria-disabled={isDisabled}
            >
              {item.label}
            </ChipGroup.Item>
          ))}
        </ChipGroup>
      )}
    </ElSelectCustom>
  )
}

SelectCustom.Group = Group
SelectCustom.Option = Option
