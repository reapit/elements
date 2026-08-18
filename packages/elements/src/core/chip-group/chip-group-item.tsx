import { Chip } from "../chip";
import { useChipGroupContext } from "./context";
import { ElChipGroupListItem } from "./styles";

// We omit `variant` because we make it optional
type AttributesToOmit = "variant";

export namespace ChipGroupItem {
  export interface Props extends Omit<Chip.Props, AttributesToOmit> {
    variant?: Chip.Props["variant"];
  }
}

/**
 * A thin wrapper around a chip to ensure it is rendered as a list item inside the chip group.
 */
export function ChipGroupItem({
  "aria-disabled": ariaDisabled,
  disabled,
  variant,
  ...rest
}: ChipGroupItem.Props) {
  const context = useChipGroupContext();
  return (
    <ElChipGroupListItem>
      <Chip
        {...rest}
        aria-disabled={ariaDisabled ?? context.ariaDisabled}
        disabled={disabled ?? context.disabled}
        variant={variant ?? context.variant}
      />
    </ElChipGroupListItem>
  );
}

ChipGroupItem.displayName = "ChipGroup.Item";
