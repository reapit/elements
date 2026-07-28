import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { CheckboxIcon } from "#src/icons/checkbox";
import { CheckboxIndeterminateIcon } from "#src/icons/checkbox-indeterminate";
import { CheckboxSelectedIcon } from "#src/icons/checkbox-selected";

import { ElCheckboxInput, ElCheckboxInputContainer, elCheckboxInputIcon } from "./styles";

export namespace CheckboxInput {
  export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * Whether the control's validity should be visually communicated or not. Typically, validity will only be shown
     * when the control has been touched (i.e. the user has interacted with it).
     */
    showValidity?: boolean;
    /** The type of input. If supplied, it must be "checkbox". */
    type?: "checkbox";
  }
}

/** @deprecated use InputCheckbox.Props instead */
export type CheckboxInputProps = CheckboxInput.Props;

/**
 * A basic `<input type="checkbox">` component. Like all input components, the label, help text and error
 * messages are BYO.
 */
export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInput.Props>(
  ({ className, showValidity, style, type = "checkbox", ...rest }, ref) => {
    return (
      // Consumer-supplied class names and inline styles are applied to the root "container" element,
      // not the input. This is because we don't want consumers to _easily_ override the input's styles
      // as they're specific to the correct functioning of the component.
      <ElCheckboxInputContainer className={className} style={style}>
        <ElCheckboxInput {...rest} data-show-validity={!!showValidity} ref={ref} type={type} />
        <CheckboxIndeterminateIcon
          aria-hidden
          className={elCheckboxInputIcon}
          data-show-when="indeterminate"
        />
        <CheckboxSelectedIcon
          aria-hidden
          className={elCheckboxInputIcon}
          data-show-when="checked"
        />
        <CheckboxIcon aria-hidden className={elCheckboxInputIcon} data-show-when="unchecked" />
      </ElCheckboxInputContainer>
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";
