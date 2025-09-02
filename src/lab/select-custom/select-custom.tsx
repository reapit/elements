import React, { useState } from 'react'
import { useSelectKeyboardNavigation } from './use-select-keyboard-navigation'
import { CloseIcon } from '#src/icons/close'
import { Button } from '#src/core/button'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { LabelText } from '#src/core/label-text'
import { ChipGroup } from '#src/core/chip-group'
import { elPopover, Popover } from '#src/utils/popover'
import { Divider } from '#src/core/divider'

import { ElSelectCustom, elInputField, ElContent, ElOption } from './styles'

interface BaseOption {
  label: string
  value: string
  selected?: boolean
}
interface GroupOption {
  label?: string
  options: BaseOption[]
}

type OptionType = BaseOption | GroupOption

export interface SelectCustomProps {
  id: string
  label?: string
  options: OptionType[]
  helperText?: string
  defaultValue?: string[]
  multiple?: boolean
  clearable?: boolean
  isRequired?: boolean
}

// --------------------
// Helpers
// --------------------
const flattenOptions = (options: OptionType[]): BaseOption[] => {
  const result: BaseOption[] = []
  options.forEach((opt) => {
    if ('options' in opt) {
      result.push(...opt.options)
    } else {
      result.push(opt)
    }
  })
  return result
}

const getInitialSelected = (options: OptionType[], defaultValue: string[]): string[] => {
  if (defaultValue.length > 0) return defaultValue

  const values: string[] = []
  options.forEach((opt) => {
    if ('options' in opt) {
      opt.options.forEach((o) => {
        if (o.selected) values.push(o.value)
      })
    } else {
      if (opt.selected) values.push(opt.value)
    }
  })
  return values
}

export const SelectCustom: React.FC<SelectCustomProps> = ({
  id,
  label,
  options,
  helperText,
  defaultValue = [],
  multiple = false,
  clearable = false,
  isRequired,
}) => {
  const flatOptions = flattenOptions(options)
  const [selectedValues, setSelectedValues] = useState<string[]>(getInitialSelected(options, defaultValue))

  const popoverId = `select-popover-${id.replace(/\s+/g, '-').toLowerCase()}`
  const triggerId = `select-input-${id.replace(/\s+/g, '-').toLowerCase()}`

  const closePopover = () => {
    const popover = document.getElementById(popoverId) as HTMLElement & { hidePopover?: () => void }
    popover?.hidePopover?.()
  }

  const { focusedOptionIndex, onSelectKeyDown } = useSelectKeyboardNavigation({
    selectOptions: flatOptions,
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
      closePopover()
    }
  }

  const clearSelection = () => setSelectedValues([])

  const displayValue = multiple
    ? selectedValues.map((value) => flatOptions.find((o) => o.value === value)?.label).join(', ')
    : flatOptions.find((o) => o.value === selectedValues[0])?.label || ''

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
      <button
        {...triggerProps}
        type="button"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false"
        onKeyDown={onSelectKeyDown}
        className={elInputField}
      >
        <ElContent size="small">{displayValue || 'Select an option'}</ElContent>
        {clearable && selectedValues.length > 0 ? (
          <Button
            iconLeft={<CloseIcon color="primary" />}
            size="small"
            variant="tertiary"
            onClick={(event) => {
              event.stopPropagation()
              clearSelection()
            }}
          />
        ) : (
          <ChevronDownIcon size="sm" color="primary" />
        )}
      </button>
      <Popover
        id={popoverId}
        anchorId={triggerId}
        placement="bottom-start"
        popover="auto"
        className={elPopover}
        maxWidth="auto"
      >
        <ul role="listbox">
          {options.map((opt, i) => {
            if ('options' in opt) {
              // Group
              return (
                <li key={`group-${i}`}>
                  {opt.label && (
                    <LabelText size="small" className="el-group-title">
                      {opt.label}
                    </LabelText>
                  )}
                  <ul>
                    {opt.options.map((option) => {
                      const globalIndex = flatOptions.findIndex((o) => o.value === option.value)
                      return (
                        <ElOption
                          key={option.value}
                          role="option"
                          aria-selected={selectedValues.includes(option.value)}
                          focused={focusedOptionIndex === globalIndex}
                          selected={selectedValues.includes(option.value)}
                          onClick={() => handleSelect(option.value)}
                        >
                          <LabelText size="small" className="el-option-label">
                            {option.label}
                          </LabelText>
                        </ElOption>
                      )
                    })}
                  </ul>
                  {i < options.length - 1 && <Divider />}
                </li>
              )
            }

            // Single option
            const globalIndex = flatOptions.findIndex((o) => o.value === opt.value)
            return (
              <ElOption
                key={opt.value}
                role="option"
                aria-selected={selectedValues.includes(opt.value)}
                focused={focusedOptionIndex === globalIndex}
                selected={selectedValues.includes(opt.value)}
                onClick={() => handleSelect(opt.value)}
              >
                <LabelText size="small" className="el-option-label">
                  {opt.label}
                </LabelText>
              </ElOption>
            )
          })}
        </ul>
      </Popover>
      {helperText && <LabelText size="small">{helperText}</LabelText>}
      {multiple && (
        <ChipGroup>
          {selectedValues.map((value) => (
            <ChipGroup.Item key={value} variant="filter" onClick={() => handleSelect(value)}>
              {flatOptions.find((o) => o.value === value)?.label}
            </ChipGroup.Item>
          ))}
        </ChipGroup>
      )}
    </ElSelectCustom>
  )
}
