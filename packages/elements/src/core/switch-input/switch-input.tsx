import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { ElSwitchInput } from "./styles";

export namespace SwitchInput {
  export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    /** The type of input. If supplied, it must be "checkbox". */
    type?: "checkbox";
  }
}

/**
 * A basic switch input component that renders as a styled `<input type="checkbox" role="switch">`.
 * Unlike a checkbox, switches do not support a visual indeterminate state, so they should only be
 * used for explicit binary on/off semantics.
 */
export const SwitchInput = forwardRef<HTMLInputElement, SwitchInput.Props>(
  ({ role = "switch", type = "checkbox", ...rest }, ref) => {
    return <ElSwitchInput {...rest} ref={ref} role={role} type={type} />;
  },
);

SwitchInput.displayName = "SwitchInput";
