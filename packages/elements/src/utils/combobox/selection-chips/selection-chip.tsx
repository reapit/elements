import { ChipGroup } from "#src/core/chip-group";
import { setListboxOptionSelectedState } from "#src/utils/listbox/dom-helpers";

import { useComboboxSelectionChipsContext } from "./context";

export namespace ComboboxSelectionChip {
  export interface Props extends Omit<ChipGroup.ItemProps, "variant"> {
    /** The label of the chip */
    children: string;
    /** The value of the combobox option this chip represents */
    value: string;
  }
}

/**
 * A selection chip that represents a selected option in a multi-select combobox.
 * Clicking the chip deselects the corresponding option.
 */
export function ComboboxSelectionChip({ children, value, ...rest }: ComboboxSelectionChip.Props) {
  const context = useComboboxSelectionChipsContext();
  return (
    <ChipGroup.Item
      {...rest}
      aria-controls={context.listboxId}
      aria-label={`Remove ${children}`}
      onClick={() => setListboxOptionSelectedState(context.listboxId, value, () => false)}
      value={value}
    >
      {children}
    </ChipGroup.Item>
  );
}
