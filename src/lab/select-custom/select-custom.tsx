import React, { useState } from 'react'
import { useSelectKeyboardNavigation } from './use-select-keyboard-navigation'
import { CloseIcon } from '#src/icons/close'
import { Button } from '#src/core/button'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { LabelText } from '#src/core/label-text'
import { ChipGroup } from '#src/core/chip-group'
import { Popover } from '#src/utils/popover'

import { ElSelectCustom, ElInputField, ElInput, ElOption } from './styles'

interface OptionType {
  value: string
  label: string
}

export interface SelectCustomProps {
  label: string
  options: OptionType[]
  helperText?: string
  defaultValue?: string[]
  multiple?: boolean
  clearable?: boolean
  isRequired?: boolean
}

export const SelectCustom: React.FC<SelectCustomProps> = ({
  label,
  options,
  helperText,
  defaultValue = [],
  multiple = false,
  clearable = false,
  isRequired,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue)

  const popoverId = `select-popover-${label.replace(/\s+/g, '-').toLowerCase()}`
  const triggerId = `select-input-${label.replace(/\s+/g, '-').toLowerCase()}`

  const closePopover = () => {
    // programmatically hide using triggerProps
    const trigger = document.getElementById(triggerId)
    if (trigger) {
      trigger.setAttribute('popovertargetaction', 'hide')
      trigger.click()
      trigger.setAttribute('popovertargetaction', 'toggle') // reset
    }
  }

  const { focusedOptionIndex, onSelectKeyDown } = useSelectKeyboardNavigation({
    selectOptions: options,
    onOptionSelect: (id) => handleSelect(id),
    onClose: () => {
      closePopover()
    },
  })

  const handleSelect = (id: string) => {
    if (multiple) {
      setSelectedValues((prev) => {
        return prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
      })
    } else {
      setSelectedValues([id])
      // hide popover after selecting
      closePopover()
    }
  }

  const clearSelection = () => setSelectedValues([])

  const displayValue = multiple
    ? selectedValues.map((value) => options.find((option) => option.value === value)?.label).join(', ')
    : options.find((option) => option.value === selectedValues[0])?.label || ''

  const triggerProps = Popover.getTriggerProps({
    id: triggerId,
    popoverTarget: popoverId,
    popoverTargetAction: 'toggle',
  })

  return (
    <ElSelectCustom>
      <LabelText size="small" isRequired={isRequired}>
        {label}
      </LabelText>
      <ElInputField
        {...triggerProps}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false" // updated by popover open state (optional: sync via state)
        onKeyDown={onSelectKeyDown}
      >
        <ElInput type="text" readOnly value={displayValue} tabIndex={-1} />
        <span>{displayValue || 'Select...'}</span>
        {clearable && selectedValues.length > 0 && (
          <Button
            iconLeft={<CloseIcon color="primary" />}
            size="small"
            variant="tertiary"
            onClick={(e) => {
              e.stopPropagation() // prevent toggling popover
              clearSelection()
            }}
          />
        )}
        {!clearable && selectedValues.length === 0 && <ChevronDownIcon size="sm" color="primary" />}
      </ElInputField>
      {helperText && <LabelText size="small">{helperText}</LabelText>}
      {multiple && (
        <ChipGroup>
          {selectedValues.map((value) => (
            <ChipGroup.Item key={value} variant="filter" onClick={() => handleSelect(value)}>
              {options.find((option) => option.value === value)?.label}
            </ChipGroup.Item>
          ))}
        </ChipGroup>
      )}
      <Popover id={popoverId} anchorId={triggerId} placement="bottom-start">
        <LabelText size="small" isRequired={isRequired}>
          {label}
        </LabelText>
        <ul role="listbox">
          {options.map((option, i) => (
            <ElOption
              key={option.value}
              role="option"
              aria-selected={selectedValues.includes(option.value)}
              focused={focusedOptionIndex === i}
              selected={selectedValues.includes(option.value)}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </ElOption>
          ))}
        </ul>
      </Popover>
    </ElSelectCustom>
  )
}
