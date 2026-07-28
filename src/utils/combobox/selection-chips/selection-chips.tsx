import { cx } from "@linaria/core";
import type { ReactNode } from "react";

import { ChipGroup } from "#src/core/chip-group";

import { useComboboxDefaultOptionsContext } from "../default-options-context";
import { useComboboxSelectedOptions } from "../use-selected-options";
import { ComboboxSelectionChipsContext } from "./context";
import { ComboboxSelectionChip } from "./selection-chip";
import { elComboboxSelectionChips } from "./styles";

type AttributesToOmit = "children" | "variant";
type Option = useComboboxSelectedOptions.Option;

export namespace ComboboxSelectionChips {
  export interface ItemProps extends ComboboxSelectionChip.Props {}

  export interface Props extends Omit<ChipGroup.Props, AttributesToOmit> {
    /** Render-prop function to customise selection chip rendering. */
    children?: (options: readonly [Option, ...Option[]]) => ReactNode;
    /** Selected options to be displayed on first render. */
    defaultOptions?: readonly Option[];
    /** Whether the selection chips are disabled. */
    disabled?: boolean;
    /** ID of the combobox listbox */
    listboxId: string;
  }
}

/**
 * Renders selection chips for each selected options in a combobox listbox. Clicking a chip deselects
 * the corresponding option. Renders nothing when no options are selected.
 *
 * **Only intended for use in multi-select combobox experiences.**
 */
export function ComboboxSelectionChips({
  children,
  className,
  defaultOptions: defaultOptionsProp,
  listboxId,
  ...rest
}: ComboboxSelectionChips.Props) {
  const defaultOptions = useComboboxDefaultOptionsContext();
  const options = useComboboxSelectedOptions(listboxId, defaultOptionsProp ?? defaultOptions);

  if (!hasOptions(options)) return null;

  const chips =
    children?.(options) ??
    options.map((option) => (
      <ComboboxSelectionChip key={option.value} value={option.value}>
        {option.label}
      </ComboboxSelectionChip>
    ));

  return (
    <ChipGroup {...rest} className={cx(elComboboxSelectionChips, className)} variant="selection">
      <ComboboxSelectionChipsContext.Provider value={{ listboxId }}>
        {chips}
      </ComboboxSelectionChipsContext.Provider>
    </ChipGroup>
  );
}

/** Validates the given options array has at least one option. */
function hasOptions(options: readonly Option[]): options is [Option, ...Option[]] {
  return options.length > 0;
}

ComboboxSelectionChips.Item = ComboboxSelectionChip;
