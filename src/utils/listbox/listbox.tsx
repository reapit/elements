import {
  clearListboxValue,
  getListboxSelectedOptions,
  getListboxValue,
  setListboxOptionSelectedState,
} from './dom-helpers'
import { Divider } from '#src/core/divider'
import { ListboxContext, useListboxContext } from './context'
import { ListboxOption } from './option'
import { ListboxOptgroup } from './optgroup'
import { ListboxRenderContext, useListboxRenderContext } from './render-context'
import { ListboxSelect } from './select'
import { useFocusManagement } from './use-focus-management'
import { useId } from 'react'
import { useListboxSelectionObserver } from './use-listbox-selection-observer'
import { useListboxState } from './use-listbox-state'

import type { ChangeEventHandler, ElementType, HTMLAttributes, ReactNode } from 'react'

// NOTE: we omit...
// onChange, because we accept a select element's change event handler instead
type AttributesToOmit = 'onChange'

export namespace Listbox {
  export interface OptionProps extends ListboxOption.BaseProps {}
  export interface OptgroupProps extends ListboxOptgroup.BaseProps {}

  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
    /** Whether the listbox and its options are disabled. */
    'aria-disabled'?: boolean
    /**
     * Allows multiple option selection in the listbox.
     * When `true`, selects multiple options simultaneously.
     * When `false` (default), selects only one option at a time.
     */
    'aria-multiselectable'?: boolean
    /**
     * Defines the element's orientation as horizontal or vertical.
     * Defaults to `'vertical'`. Set to `'horizontal'` only when the
     * listbox renders its options horizontally.
     */
    'aria-orientation'?: 'horizontal' | 'vertical'
    /** Whether the listbox is required. */
    'aria-required'?: boolean
    /** Element type for the listbox container. Defaults to `'div'`. */
    as?: ElementType<HTMLAttributes<HTMLDivElement>>
    /**
     * Options and option groups to display. Use `Listbox.Option`, `Listbox.Optgroup`,
     * or `Listbox.Divider` components. The underlying select element renders selected
     * options automatically based on `value`.
     */
    children?: ReactNode
    /**
     * Initially selected option values for uncontrolled mode.
     * Always an array of strings, regardless of single- or multi-select mode.
     * For single-select, uses only the first value.
     */
    defaultValue?: readonly string[]
    /** The listbox element's ID. Generates automatically if omitted. */
    id?: string
    /** The form control name for form submission. */
    name?: string
    /** Change handler for the underlying select element. Fires when selection changes. */
    onChange?: ChangeEventHandler<HTMLSelectElement>
    /**
     * Placeholder text for the default empty option.
     * Applies only to single-select listboxes (`aria-multiselectable` is `false`).
     * Defaults to `'Select an option'`.
     */
    placeholder?: string
    /**
     * Behavior when clicking an option.
     * - `'toggle'`: Toggles the option's selected state (useful for multi-select)
     * - `'select'`: Always selects the option (useful for single-select)
     * Defaults to `'toggle'`.
     */
    selectAction?: 'select' | 'toggle'
    /**
     * Whether selection follows focus during keyboard navigation.
     * When `true`, arrow key navigation automatically selects the focused option.
     * When `false`, press Enter/Space to select a focused option.
     * Defaults to `true` for single-select, `false` for multi-select.
     */
    selectionFollowsFocus?: boolean
    /**
     * Selected option values for controlled mode.
     * Always an array of strings, regardless of single- or multi-select mode.
     * For single-select, uses only the first value.
     */
    value?: readonly string[]
  }
}

/**
 * Provides a foundation for a listbox of options. Built on a native select element,
 * it supports single- and multi-select behavior, keyboard navigation, and focus management
 * out of the box.
 *
 * This component renders all children twice: once as descendants of a native select element
 * and once in the custom listbox UI. Include only children that render to `<option>`,
 * `<optgroup>`, and `<hr>` elements within the native select.
 *
 * Use these subcomponents:
 * - `Listbox.Option` renders as `<option>` in the native select and as a custom button
 * in the listbox UI
 * - `Listbox.Optgroup` renders as `<optgroup>` in the native select and as a custom div
 * in the listbox UI
 * - `Listbox.Divider` always renders as `<hr>`
 */
export function Listbox({
  'aria-disabled': disabled = false,
  'aria-multiselectable': multiple = false,
  'aria-orientation': ariaOrientation = 'vertical',
  'aria-required': required = false,
  as: Element = 'div',
  children,
  className,
  defaultValue,
  id,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  placeholder,
  selectAction = 'toggle',
  selectionFollowsFocus = !multiple,
  style,
  value,
  ...rest
}: Listbox.Props) {
  const selectId = useId()
  const fallbackListboxId = useId()
  const listboxId = id ?? fallbackListboxId

  const [selectValue, handleChange] = useListboxState({ defaultValue, multiple, onChange, value })
  const focusHandlers = useFocusManagement({ onBlur, onFocus, onKeyDown })

  return (
    <Element
      {...rest}
      {...focusHandlers}
      aria-disabled={disabled}
      aria-multiselectable={multiple}
      aria-orientation={ariaOrientation}
      aria-required={required}
      // Whether options select automatically when focused.
      data-selection-follows-focus={selectionFollowsFocus}
      className={className}
      id={listboxId}
      role="listbox"
      style={style}
      // Makes the listbox focusable and initially part of the document's tab sequence.
      // NOTE: `useFocusManagement` changes the tab index in the DOM; this prop value serves
      // only as an initial value.
      tabIndex={0}
    >
      <ListboxContext.Provider value={{ disabled, listboxId, multiple, selectAction, selectValue }}>
        <ListboxSelect
          disabled={disabled}
          id={selectId}
          multiple={multiple}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          value={selectValue}
        >
          {children}
        </ListboxSelect>
        <ListboxRenderContext.Provider value="display">{children}</ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </Element>
  )
}

Listbox.Divider = Divider
Listbox.Option = ListboxOption
Listbox.Optgroup = ListboxOptgroup
Listbox.Select = ListboxSelect
Listbox.useSelectionObserver = useListboxSelectionObserver

Listbox.Context = ListboxContext
Listbox.RenderContext = ListboxRenderContext
Listbox.useContext = useListboxContext
Listbox.useRenderContext = useListboxRenderContext

Listbox.clearValue = clearListboxValue
Listbox.getSelectedOptions = getListboxSelectedOptions
Listbox.getValue = getListboxValue
Listbox.setOptionSelectedState = setListboxOptionSelectedState
