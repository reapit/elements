import { useState, useEffect } from 'react'
import {
  ElExperimentalSelectCustomContainer,
  ElExperimentalSelectCustomInputField,
  ElExperimentalSelectCustomContent,
  ElExperimentalSelectCustomPlaceholder,
  elExperimentalSelectCustomPopover,
} from './styles'
import { ExperimentalSelectCustomOption } from './option'
import { ExperimentalSelectCustomOptionGroup } from './group'
import { SelectCustomContext } from './context'
import { LabelText } from '#src/core/label-text'
import { Text } from '#src/core/text'
import { CloseIcon } from '#src/icons/close'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { ChipGroup } from '#src/core/chip-group'
import { Popover, PopoverPlacement } from '#src/utils/popover'
import { useSelectKeyboardNavigation } from './use-select-keyboard-navigation'
import { getInitialSelected, getTotalOptions } from './helper'

import type { ReactNode } from 'react'
import type { SelectedItem } from './context'

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
export function SelectCustom({
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
}: SelectCustomProps) {
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
    <ElExperimentalSelectCustomContainer id={id}>
      {label && (
        <LabelText size={size === 'large' ? 'sm' : 'xs'} isRequired={isRequired}>
          {label}
        </LabelText>
      )}

      <ElExperimentalSelectCustomInputField
        variant="secondary"
        size={size}
        {...triggerProps}
        type="button"
        role="combobox"
        aria-expanded="false"
        aria-disabled={isDisabled || isAllSelected}
        aria-describedby={message ? descriptionId : undefined}
        aria-invalid={isError || false}
      >
        {displayValue ? (
          <ElExperimentalSelectCustomContent>
            <Text as="span" colour="primary" font="text-xs/regular" overflow="truncate">
              {displayValue}
            </Text>
          </ElExperimentalSelectCustomContent>
        ) : (
          <ElExperimentalSelectCustomPlaceholder>
            <Text as="span" colour="placeholder" font="text-xs/regular" overflow="truncate">
              Select an option
            </Text>
          </ElExperimentalSelectCustomPlaceholder>
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
      </ElExperimentalSelectCustomInputField>

      <Popover
        id={popoverId}
        anchorId={triggerId}
        placement={popoverPlacement || 'bottom-start'}
        popover="auto"
        className={elExperimentalSelectCustomPopover}
        maxHeight={popoverMaxHeight}
        style={{ minWidth: inputWidth }}
        gap="var(--spacing-1)"
      >
        <SelectCustomContext.Provider value={{ selectedValues, onSelect: handleSelect, isMultiple }}>
          <ul role="listbox" ref={listRef} tabIndex={-1}>
            {children}
          </ul>
        </SelectCustomContext.Provider>
      </Popover>

      {message && (
        <LabelText id={descriptionId} size="xs" data-error={isError ? true : false}>
          {message}
        </LabelText>
      )}

      {isMultiple && selectedValues.length > 0 && (
        <ChipGroup variant="selection">
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
    </ElExperimentalSelectCustomContainer>
  )
}

SelectCustom.Group = ExperimentalSelectCustomOptionGroup
SelectCustom.Option = ExperimentalSelectCustomOption
