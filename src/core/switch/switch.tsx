import { forwardRef } from "react";
import type { ReactNode } from "react";

import { SwitchInput } from "#src/core/switch-input";

import { ElSwitch, ElSwitchLabelText } from "./styles";

export namespace Switch {
  export interface Props extends SwitchInput.Props {
    /**
     * An accessible label for the switch. Should be considered mandatory if a visual label
     * is not provided.
     */
    "aria-label"?: string;
    /** The visual label for the switch. If not provided, an accessible label should be. */
    label?: ReactNode;
    /**
     * Determines the placement of the label relative to the switch. Only applies when a
     * visual label is provided.
     */
    labelPlacement?: "start" | "end";
  }
}

/**
 * A switch component with optional label. The switch input is rendered using the `SwitchInput` component,
 * wrapped in a `<label>` element for accessibility. Labels can be positioned before or after the switch.
 */
export const Switch = forwardRef<HTMLInputElement, Switch.Props>(
  ({ className, label, labelPlacement = "end", style, ...rest }, ref) => {
    return (
      <ElSwitch className={className} style={style}>
        {label && labelPlacement === "start" && <ElSwitchLabelText>{label}</ElSwitchLabelText>}
        <SwitchInput {...rest} ref={ref} />
        {label && labelPlacement === "end" && <ElSwitchLabelText>{label}</ElSwitchLabelText>}
      </ElSwitch>
    );
  },
);

Switch.displayName = "Switch";
