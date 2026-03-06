import { Autocomplete } from '#src/core/autocomplete'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace AutocompleteControl {
  export interface ButtonProps extends Autocomplete.ButtonProps {}
  export interface CardDefaultContentProps extends Autocomplete.CardDefaultContentProps {}
  export interface DividerProps extends Autocomplete.DividerProps {}
  export interface ListboxProps extends Autocomplete.ListboxProps {}
  export interface OptgroupProps extends Autocomplete.OptgroupProps {}
  export interface OptionProps extends Autocomplete.OptionProps {}
  export interface OptionAdditionalInfoProps extends Autocomplete.OptionAdditionalInfoProps {}
  export interface PopupProps extends Autocomplete.PopupProps {}
  export interface SearchInputProps extends Autocomplete.SearchInputProps {}
  export interface SelectionChipsItemProps extends Autocomplete.SelectionChipsItemProps {}

  export interface Props extends Autocomplete.Props {
    defaultOptions?: Autocomplete.DefaultOptionsContextValue
    /** Optional error text that communicates why the autocomplete's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the autocomplete. */
    helpText?: ReactNode
    /**
     * The visual label for the autocomplete. If no visual label is provided, an accessible
     * label should be provided via `aria-label`.
     */
    label?: ReactNode
    /** The maximum width of the form control. */
    maxWidth?: string
    /** Render-prop allowing custom rendering of selection chips. */
    renderChips?: Autocomplete.SelectionChipsProps['children']
  }
}

/**
 * A pre-baked `Autocomplete` + `FormControl`. Used when you need a label, help text, and/or error message
 * for an autocomplete.
 */
export function AutocompleteControl({
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
}: AutocompleteControl.Props) {
  const fallbackAutocompleteId = useId()
  const autocompleteId = id ?? fallbackAutocompleteId
  const labelId = useId()
  const helpTextId = useId()
  const errorTextId = useId()

  return (
    <FormControl as="div" size={size} maxWidth={maxWidth}>
      <Autocomplete.DefaultOptionsContext.Provider value={defaultOptions ?? []}>
        {label && (
          <FormControl.Label htmlFor={autocompleteId} id={labelId} isRequired={required}>
            {label}
          </FormControl.Label>
        )}
        <Autocomplete
          {...rest}
          aria-describedby={helpText && !errorText ? helpTextId : undefined}
          aria-errormessage={errorText ? errorTextId : undefined}
          aria-invalid={errorText ? true : undefined}
          aria-labelledby={label ? labelId : undefined}
          disabled={disabled}
          id={autocompleteId}
          multiple={multiple}
          required={required}
          showValidity={showValidity ?? !!errorText}
          size={size}
        >
          {children}
        </Autocomplete>
        {errorText ? (
          <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
        ) : (
          helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
        )}
        {multiple && (
          <Autocomplete.SelectionChips disabled={disabled} listboxId={Autocomplete.getListboxId(autocompleteId)}>
            {renderChips}
          </Autocomplete.SelectionChips>
        )}
      </Autocomplete.DefaultOptionsContext.Provider>
    </FormControl>
  )
}

AutocompleteControl.getValue = Autocomplete.getValue
AutocompleteControl.Button = Autocomplete.Button
AutocompleteControl.CardDefaultContent = Autocomplete.CardDefaultContent
AutocompleteControl.Divider = Autocomplete.Divider
AutocompleteControl.Listbox = Autocomplete.Listbox
AutocompleteControl.Option = Autocomplete.Option
AutocompleteControl.OptionAdditionalInfo = Autocomplete.OptionAdditionalInfo
AutocompleteControl.Optgroup = Autocomplete.Optgroup
AutocompleteControl.Placeholder = Autocomplete.Placeholder
AutocompleteControl.Popup = Autocomplete.Popup
AutocompleteControl.SearchInput = Autocomplete.SearchInput
AutocompleteControl.SelectionChipsItem = Autocomplete.SelectionChipsItem
AutocompleteControl.useState = Autocomplete.useState
