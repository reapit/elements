import { FormControl } from '#src/core/form-control'
import { Select } from '#src/core/select'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace SelectControl {
  export interface ButtonProps extends Select.ButtonProps {}
  export interface CardDefaultContentProps extends Select.CardDefaultContentProps {}
  export interface DividerProps extends Select.DividerProps {}
  export interface ListboxProps extends Select.ListboxProps {}
  export interface OptgroupProps extends Select.OptgroupProps {}
  export interface OptionProps extends Select.OptionProps {}
  export interface OptionAdditionalInfoProps extends Select.OptionAdditionalInfoProps {}
  export interface PopupProps extends Select.PopupProps {}
  export interface SelectionChipsItemProps extends Select.SelectionChipsItemProps {}

  export interface Props extends Select.Props {
    defaultOptions?: Select.DefaultOptionsContextValue
    /** Optional error text that communicates why the select's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the select. */
    helpText?: ReactNode
    /**
     * The visual label for the select. If no visual label is provided, an accessible
     * label should be provided via `aria-label`.
     */
    label?: ReactNode
    /** The maximum width of the form control. */
    maxWidth?: string
    /** Render-prop allowing custom rendering of selection chips. */
    renderChips?: Select.SelectionChipsProps['children']
  }
}

/**
 * A pre-baked `Select` + `FormControl`. Used when you need a label, help text, and/or error message
 * for a select.
 */
export function SelectControl({
  children,
  defaultOptions,
  disabled,
  errorText,
  helpText,
  id,
  label,
  maxWidth,
  multiple,
  renderChips,
  required,
  showValidity,
  size = 'medium',
  ...rest
}: SelectControl.Props) {
  const fallbackSelectId = useId()
  const selectId = id ?? fallbackSelectId
  const labelId = useId()
  const helpTextId = useId()
  const errorTextId = useId()

  return (
    <FormControl as="div" size={size} maxWidth={maxWidth}>
      <Select.DefaultOptionsContext.Provider value={defaultOptions ?? []}>
        {label && (
          <FormControl.Label htmlFor={selectId} id={labelId} isRequired={required}>
            {label}
          </FormControl.Label>
        )}
        <Select
          {...rest}
          aria-describedby={helpText && !errorText ? helpTextId : undefined}
          aria-errormessage={errorText ? errorTextId : undefined}
          aria-invalid={errorText ? true : undefined}
          aria-labelledby={label ? labelId : undefined}
          disabled={disabled}
          id={selectId}
          multiple={multiple}
          required={required}
          showValidity={showValidity ?? !!errorText}
          size={size}
        >
          {children}
        </Select>
        {errorText ? (
          <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
        ) : (
          helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
        )}
        {multiple && (
          <Select.SelectionChips disabled={disabled} listboxId={Select.getListboxId(selectId)}>
            {renderChips}
          </Select.SelectionChips>
        )}
      </Select.DefaultOptionsContext.Provider>
    </FormControl>
  )
}

SelectControl.getValue = Select.getValue
SelectControl.Button = Select.Button
SelectControl.CardDefaultContent = Select.CardDefaultContent
SelectControl.Divider = Select.Divider
SelectControl.Listbox = Select.Listbox
SelectControl.Option = Select.Option
SelectControl.OptionAdditionalInfo = Select.OptionAdditionalInfo
SelectControl.Optgroup = Select.Optgroup
SelectControl.Popup = Select.Popup
SelectControl.SelectionChipsItem = Select.SelectionChipsItem
SelectControl.useState = Select.useState
