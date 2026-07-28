import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

import { ListboxRenderContext } from "../render-context";
import { ElListboxSelect } from "./styles";

export namespace ListboxSelect {
  export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    /** Placeholder text for the empty option in single-select mode */
    placeholder?: string;
    /** Selected option values */
    value: readonly string[];
  }
}

/**
 * Internal select element that maintains form state for the listbox.
 *
 * Visually hidden, this component provides native select functionality for form submission
 * and state management. It renders a native `<select>` element synchronized with the custom
 * listbox UI.
 *
 * Key behaviors:
 * - Adds a placeholder option as the first option in single-select listboxes
 * - Renders selected options to maintain state even when display options are filtered
 * - Wires both `onChange` and `onInput` handlers to catch manual input events
 * - Renders children twice: once as native `<option>` elements, once as custom display elements
 *
 * Uses a render context to control how children render. Children wrapped in this component
 * receive `value="native"` from ListboxRenderContext, rendering as native `<option>` or
 * `<optgroup>` elements.
 */
export const ListboxSelect = forwardRef<HTMLSelectElement, ListboxSelect.Props>(
  function ListboxSelect(
    {
      children,
      onChange,
      placeholder = "Select an option",
      multiple,
      value: selectedValues,
      ...rest
    },
    ref,
  ) {
    return (
      <ElListboxSelect
        {...rest}
        hidden
        multiple={multiple}
        onChange={onChange}
        // NOTE: Wires onChange to onInput to catch manual input events fired when
        // clicking the display options within the listbox.
        onInput={onChange}
        ref={ref}
        value={multiple ? selectedValues : (selectedValues[0] ?? "")}
      >
        {!multiple && (
          // In single-select mode, renders a placeholder option as the first option.
          // This mimics native select behavior: automatically selecting the first option
          // when no explicit value is specified.
          <option value="">{placeholder}</option>
        )}
        {selectedValues.map((optionValue) => (
          // Renders options for selected values automatically. Consumers may filter the options
          // in `children` based on user input. Without this, the native select would lose
          // <option> elements representing selected options, causing selection state loss.
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
        <ListboxRenderContext.Provider value="native">{children}</ListboxRenderContext.Provider>
      </ElListboxSelect>
    );
  },
);
