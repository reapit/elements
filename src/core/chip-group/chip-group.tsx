import { useMemo, type HTMLAttributes, type ReactNode } from "react";

import { ChipGroupItem } from "./chip-group-item";
import { ChipGroupContext, useChipGroupContext } from "./context";
import { ElChipGroupList } from "./styles";

export namespace ChipGroup {
  export interface ItemProps extends ChipGroupItem.Props {}

  export interface Props extends HTMLAttributes<HTMLUListElement> {
    /**
     * Whether the chips in the chip group are disabled. This can be used to make the chips appear disabled to
     * users, but still be focusable. ARIA disabled chips, whether they are button or anchor DOM elements, will
     * ignore click events. Using `aria-disabled` is preferred when the chip should still be focusable while
     * it's disabled; for example, to allow a tooltip to be displayed that explains why the chip is disabled.
     */
    "aria-disabled"?: boolean;
    /** The chip group items. */
    children: ReactNode;
    /** Whether the chips in the chip group are disabled. */
    disabled?: boolean;
    /** Whether the chip group should wrap or not. */
    flow?: "wrap" | "nowrap";
    /** What overflow behaviour the chip group should exhibit. */
    overflow?: "auto" | "visible";
    /** The variant of the chips in the chip group. */
    variant: "filter" | "selection";
  }
}

/**
 * Groups multiple chips together. Should only be used to group chips of the same variant. By default,
 * chips will wrap within the group, though horizontal scrolling can be permitted when required.
 */
export function ChipGroup({
  "aria-disabled": ariaDisabled,
  children,
  disabled,
  flow = "wrap",
  overflow = "visible",
  variant,
  ...rest
}: ChipGroup.Props) {
  const contextValue: ChipGroupContext.Value = useMemo(
    () => ({ ariaDisabled, disabled, variant }),
    [ariaDisabled, disabled, variant],
  );

  return (
    <ElChipGroupList {...rest} data-flow={flow} data-overflow={overflow}>
      <ChipGroupContext.Provider value={contextValue}>{children}</ChipGroupContext.Provider>
    </ElChipGroupList>
  );
}

ChipGroup.Context = ChipGroupContext;
ChipGroup.Item = ChipGroupItem;
ChipGroup.useContext = useChipGroupContext;
