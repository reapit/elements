import {
  clearListboxValue,
  getListboxSelectedOptions,
  getListboxValue,
  setListboxOptionSelectedState,
} from './dom-helpers'
import { Divider } from '#src/core/divider'
import { getListboxSelectId } from './get-select-id'
import { ListboxContext, useListboxContext } from './context'
import { ListboxOption } from './option'
import { ListboxOptgroup } from './optgroup'
import { ListboxRenderContext, useListboxRenderContext } from './render-context'
import { ListboxSelect } from './select'
import { useFocusManagement } from './use-focus-management'
import { useId, useMemo } from 'react'
import { useListboxSelectionObserver } from './use-selection-observer'
import { useListboxSelectState } from './use-select-state'
import { useListboxState } from './use-state'

import type {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ElementType,
  FocusEventHandler,
  HTMLAttributes,
  ReactNode,
} from 'react'

// NOTE: we omit...
// `onBlur`, `onChange`, and `onFocus`, because we accept the select element versions instead
type AttributesToOmit = 'onBlur' | 'onChange' | 'onFocus'

export namespace Listbox {
  export interface DividerProps extends Divider.Props {}
  export interface OptionProps extends ListboxOption.BaseProps {}
  export interface OptgroupProps extends ListboxOptgroup.BaseProps {}
  export interface SelectProps extends ListboxSelect.Props {}

  export interface BaseProps extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
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
    defaultValue?: string | readonly string[]
    /** The listbox element's ID. Generates automatically if omitted. */
    id?: string
    /** The form control name for form submission. */
    name?: string
    /** Blur handler for the underlying select element. Fires when focus leaves the listbox. */
    onBlur?: FocusEventHandler<HTMLSelectElement>
    /** Change handler for the underlying select element. Fires when selection changes. */
    onChange?: ChangeEventHandler<HTMLSelectElement>
    /** Focus handler for the underlying select element. Fires when focus enters the listbox. */
    onFocus?: FocusEventHandler<HTMLSelectElement>
    /**
     * Placeholder text for the default empty option.
     * Applies only to single-select listboxes (`aria-multiselectable` is `false`).
     * Defaults to `'Select an option'`.
     */
    placeholder?: string
    /**
     * Behavior when clicking an option.
     * - `'auto'`: Selects for single-selects, toggles for multi-selects
     * - `'select'`: Always selects the option (useful for single-select)
     * - `'toggle'`: Toggles the option's selected state (useful for multi-select)
     * Defaults to `'auto'`.
     */
    selectAction?: 'auto' | 'select' | 'toggle'
    /**
     * Whether selection follows focus during keyboard navigation.
     * When `true`, arrow key navigation automatically selects the focused option.
     * When `false`, press Enter/Space to select a focused option.
     * Defaults to `true` for single-select, `false` for multi-select.
     */
    selectionFollowsFocus?: boolean
    /**
     * Ref to the underlying HTMLSelectElement.
     *
     * We use `selectRef` instead of the standard `ref` prop to preserve TypeScript's type
     * inference for the polymorphic `as` prop. Combining `forwardRef` with generic type
     * parameters breaks this inference.
     */
    selectRef?: React.Ref<HTMLSelectElement>
    /**
     * Selected option values for controlled mode.
     * Always an array of strings, regardless of single- or multi-select mode.
     * For single-select, uses only the first value.
     */
    value?: string | readonly string[]
  }

  /**
   * Polymorphic props that merge BaseProps with any additional props from the `as` component.
   * When a component with required props is passed via `as`, those props become required.
   */
  export type Props<C extends ElementType = 'div'> = BaseProps &
    Omit<ComponentPropsWithoutRef<C>, keyof BaseProps> & {
      /** Element type for the listbox container. Defaults to `'div'`. */
      as?: C
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
 *
 * @example
 * // Integrate with React Hook Form
 * const { ref, ...field } = register('myField')
 * <Listbox selectRef={ref} {...field}>
 *   <Listbox.Option value="1">Option 1</Listbox.Option>
 *   <Listbox.Option value="2">Option 2</Listbox.Option>
 * </Listbox>
 */
export function Listbox<C extends ElementType = 'div'>({
  'aria-disabled': disabled = false,
  'aria-multiselectable': multiple = false,
  'aria-orientation': ariaOrientation = 'vertical',
  'aria-required': required = false,
  as,
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
  selectAction = 'auto',
  selectRef,
  selectionFollowsFocus = !multiple,
  style,
  value,
  ...rest
}: Listbox.Props<C>) {
  const Element = as ?? 'div'

  const fallbackListboxId = useId()
  const listboxId = id ?? fallbackListboxId

  const [selectValue, handleChange] = useListboxSelectState({ defaultValue, multiple, onChange, value })
  const focusHandlers = useFocusManagement({ onKeyDown })

  const contextValue = useMemo(
    () => ({ disabled, listboxId, multiple, selectAction, selectValue }),
    [disabled, listboxId, multiple, selectAction, selectValue],
  )

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
      <ListboxContext.Provider value={contextValue}>
        {/*
          The hidden select maintains form state and enables native form submission.
          It receives selectRef for form library integration (e.g., React Hook Form).
          Because the select is hidden, the listbox container above handles focus/blur events.
        */}
        <ListboxSelect
          disabled={disabled}
          id={getListboxSelectId(listboxId)}
          multiple={multiple}
          name={name}
          onBlur={onBlur}
          onChange={handleChange}
          onFocus={onFocus}
          placeholder={placeholder}
          ref={selectRef}
          required={required}
          value={selectValue}
        >
          {children}
        </ListboxSelect>
        <ListboxRenderContext.Provider value="custom">{children}</ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </Element>
  )
}

Listbox.Divider = Divider
Listbox.Option = ListboxOption
Listbox.Optgroup = ListboxOptgroup
Listbox.Select = ListboxSelect
Listbox.useSelectionObserver = useListboxSelectionObserver
Listbox.useState = useListboxState

Listbox.Context = ListboxContext
Listbox.RenderContext = ListboxRenderContext
Listbox.useContext = useListboxContext
Listbox.useRenderContext = useListboxRenderContext

Listbox.clearValue = clearListboxValue
Listbox.getSelectedOptions = getListboxSelectedOptions
Listbox.getValue = getListboxValue
Listbox.setOptionSelectedState = setListboxOptionSelectedState
