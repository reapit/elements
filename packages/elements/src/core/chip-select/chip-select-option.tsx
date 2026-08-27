import { forwardRef, useCallback } from "react";
import type { ChangeEventHandler, ComponentProps } from "react";

import { ChipSelectChip } from "./chip";
import { useChipSelectContext } from "./context";
import { deselectOtherOptions } from "./deselect-other-options";
import { hasOtherCheckedOption } from "./has-other-checked-option";
import { syncGroupRequired } from "./sync-group-required";

type AttributesToOmit = "form" | "name" | "required" | "size";

export namespace ChipSelectOption {
  export interface Props extends Omit<ComponentProps<typeof ChipSelectChip>, AttributesToOmit> {}
}

/** @deprecated Use ChipSelectOption.Props instead */
export type ChipSelectOptionProps = ChipSelectOption.Props;

/**
 * A thin wrapper around `ChipSelectChip` that respects the `form`, `name`, `size` and selection mode
 * of the `ChipSelect`. Owns group-level coordination: deselecting other options when an exclusive
 * chip is checked, and preventing deselection of the last option in a required group.
 */
export const ChipSelectOption = forwardRef<HTMLInputElement, ChipSelectOption.Props>(
  ({ onChange, ...rest }, ref) => {
    const context = useChipSelectContext();

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        const { containerRef, multiple, required: groupRequired } = context;

        if (event.currentTarget.checked && !multiple) {
          const container = containerRef.current;
          if (container) deselectOtherOptions(container, event.currentTarget);
        }

        // When a chip is being unchecked in a required chip select, prevent the change if it
        // would leave no options selected.
        if (!event.currentTarget.checked && groupRequired) {
          const container = containerRef.current;
          if (!container || !hasOtherCheckedOption(container, event.currentTarget)) {
            event.currentTarget.checked = true;
            return;
          }
        }

        // Re-derive `required` across every chip in the group. When at least one chip is checked,
        // no chip carries `required` and native form validation passes. When none are checked,
        // every chip carries `required` so the form reports the group as invalid.
        const container = containerRef.current;
        if (container) syncGroupRequired(container, groupRequired ?? false);

        onChange?.(event);
      },
      [context, onChange],
    );

    return (
      <ChipSelectChip
        {...rest}
        data-exclusive={!context.multiple}
        form={context.form}
        name={context.name}
        onChange={handleChange}
        ref={ref}
        size={context.size}
      />
    );
  },
);

ChipSelectOption.displayName = "ChipSelect.Option";
