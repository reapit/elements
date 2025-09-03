import { FC, useState, ReactNode, createContext } from 'react'
import { Option } from './item'
import { Group } from './group'
import { LabelText } from '#src/core/label-text'
import { Button } from '#src/core/button'
import { CloseIcon } from '#src/icons/close'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { ChipGroup } from '#src/core/chip-group'
// import { Divider } from '#src/core/divider'
import { Popover, elPopover } from '#src/utils/popover'
import { useSelectKeyboardNavigation } from './use-select-keyboard-navigation'
import { ElSelectCustom, elInputField, ElContent, ElPlaceholder } from './styles'

export interface SelectedItem {
  value: string
  label: string
}

export const SelectContext = createContext<{
  selectedValues: SelectedItem[]
  onSelect: (item: SelectedItem) => void
  multiple: boolean
}>({
  selectedValues: [],
  onSelect: () => {},
  multiple: false,
})

/** Extract initial selected values from children Option components */
const getInitialSelected = (children: ReactNode, multiple: boolean): SelectedItem[] => {
  const selected: SelectedItem[] = []

  const traverse = (nodes: ReactNode) => {
    if (!nodes) return
    if (Array.isArray(nodes)) {
      nodes.forEach(traverse)
    } else if (typeof nodes === 'object' && 'props' in (nodes as any)) {
      const props: any = (nodes as any).props
      if ((nodes as any).type === Option && props.selected) {
        selected.push({ value: props.value, label: props.label })
      }
      // recursively traverse groups
      if ((nodes as any).type === Group) traverse(props.children)
    }
  }

  traverse(children)

  if (!multiple && selected.length > 1) {
    return [selected[0]]
  }

  return selected
}

export interface SelectCustomProps {
  id: string
  label?: string
  helperText?: string
  children: ReactNode
  multiple?: boolean
  clearable?: boolean
  isRequired?: boolean
}

export const SelectCustom: FC<SelectCustomProps> & {
  Group: typeof Group
  Option: typeof Option
} = ({ id, label, children, helperText, multiple = false, clearable = false, isRequired = false }) => {
  const [selectedValues, setSelectedValues] = useState(() => getInitialSelected(children, multiple))

  const popoverId = `select-popover-${id.replace(/\s+/g, '-').toLowerCase()}`
  const triggerId = `select-input-${id.replace(/\s+/g, '-').toLowerCase()}`

  const listRef = useSelectKeyboardNavigation(popoverId)

  const closePopover = () => {
    const popover = document.getElementById(popoverId) as HTMLElement & { hidePopover?: () => void }
    popover?.hidePopover?.()
  }

  const handleSelect = (item: SelectedItem) => {
    setSelectedValues((prev) => {
      if (!multiple) return [item]
      return prev.find((s) => s.value === item.value) ? prev.filter((s) => s.value !== item.value) : [...prev, item]
    })

    if (!multiple) closePopover()
  }

  const clearSelection = () => setSelectedValues([])

  const displayValue = multiple ? '' : selectedValues[0]?.label || ''

  const triggerProps = Popover.getTriggerProps({
    id: triggerId,
    popoverTarget: popoverId,
    popoverTargetAction: 'toggle',
  })

  return (
    <ElSelectCustom id={id}>
      {label && (
        <LabelText size="small" isRequired={isRequired}>
          {label}
        </LabelText>
      )}

      <Button
        variant="secondary"
        size="small"
        {...triggerProps}
        type="button"
        role="combobox"
        aria-expanded="false"
        className={elInputField}
      >
        {displayValue ? (
          <ElContent size="small">{displayValue}</ElContent>
        ) : (
          <ElPlaceholder size="small">Select an option</ElPlaceholder>
        )}
        {clearable && selectedValues.length > 0 ? (
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

      <Popover id={popoverId} anchorId={triggerId} placement="bottom-start" popover="auto" className={elPopover}>
        <SelectContext.Provider value={{ selectedValues, onSelect: handleSelect, multiple }}>
          <ul role="listbox" ref={listRef}>
            {children}
          </ul>
        </SelectContext.Provider>
      </Popover>

      {helperText && <LabelText size="small">{helperText}</LabelText>}

      {multiple && selectedValues.length > 0 && (
        <ChipGroup>
          {selectedValues.map((item, index) => (
            <ChipGroup.Item key={`${item.value}-${index}`} variant="filter" onClick={() => handleSelect(item)}>
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
