import { useId } from "react";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  MouseEventHandler,
} from "react";

import { useListboxContext } from "../context";
import { useListboxRenderContext } from "../render-context";
import { updateOptionSelection } from "./update-option-selection";

export namespace ListboxOption {
  export interface BaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Option value used in form submission and selection tracking */
    value: string;
  }

  export type Props<C extends ElementType = "button"> = BaseProps &
    Omit<ComponentPropsWithoutRef<C>, keyof BaseProps> & {
      /**
       * Element type to render for the option. Must be button-based.
       * Forward all props to the underlying `<button>` element for proper accessibility
       * and functionality.
       */
      as?: C;
    };
}

/**
 * A polymorphic component for options within a Listbox.
 *
 * Provides dual-rendering capability:
 * - In "display" context, renders as a custom button element (specified by `as`)
 * - In "native" context, renders as a native `<option>` element for the hidden select
 *
 * Manages selection state automatically based on the parent listbox, updating ARIA
 * attributes and handling click interactions.
 *
 * **Selection State Indication:**
 * - Multi-select listboxes: Uses `aria-checked="true"` for selected options
 * - Single-select listboxes: Uses `aria-selected="true"` for selected options
 *
 * Follows the ARIA listbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/listbox
 *
 * **Important:** The `as` element type must be button-based and forward all props to the
 * underlying button for proper functionality.
 */
export function ListboxOption<C extends ElementType = "button">({
  as,
  children,
  disabled,
  id,
  onClick,
  value: optionValue,
  ...rest
}: ListboxOption.Props<C>) {
  const Element = as || "button";
  const context = useListboxContext();
  const renderContext = useListboxRenderContext();

  // Called unconditionally before any early returns per rules of hooks.
  // Provides a stable ID for aria-activedescendant targeting when no id prop is supplied.
  const generatedId = useId();

  const isSelected =
    context.selectValue.includes(optionValue) ||
    (optionValue === "" && context.selectValue.length === 0);

  // In native context, renders only unselected options. ListboxSelect renders selected
  // options automatically, preventing duplicates.
  if (renderContext === "native") {
    return isSelected ? null : <option value={optionValue}>{children}</option>;
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Call consumer's onClick handler first
    onClick?.(event);

    updateOptionSelection(event);
  };

  return (
    <Element
      {...rest}
      // Multi-select uses aria-checked; single-select uses aria-selected to indicate selection state.
      // See https://www.w3.org/WAI/ARIA/apg/patterns/listbox for details.
      aria-checked={context.multiple ? isSelected : undefined}
      aria-selected={context.multiple ? undefined : isSelected}
      // Relates each option to the listbox via a data attribute, allowing event handlers
      // to locate and manipulate the select element's state.
      data-listbox-id={context.listboxId}
      // Determines click behavior: toggle or select.
      data-select-action={context.selectAction}
      // If the listbox is disabled, all options will also be disabled. Options can be
      // independently disabled.
      disabled={context.disabled || disabled}
      id={id ?? generatedId}
      onClick={handleClick}
      role={context.role === "tree" ? "treeitem" : "option"}
      // tabIndex={-1} keeps options out of the tab sequence and prevents them receiving DOM
      // focus; keyboard navigation is driven by aria-activedescendant on the listbox
      // container/owner instead.
      tabIndex={-1}
      // Options are always plain buttons, never submit or reset buttons.
      type="button"
      value={optionValue}
    >
      {children}
    </Element>
  );
}

ListboxOption.displayName = "Listbox.Option";
