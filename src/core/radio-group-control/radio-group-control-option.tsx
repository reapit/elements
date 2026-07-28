import { forwardRef } from "react";

import { RadioButton } from "#src/core/radio-group-control/radio-button/index";

import { useRadioGroupContext } from "./context";

export namespace RadioGroupControlOption {
  export interface Props extends RadioButton.Props {}
}

/**
 * A thin wrapper around `RadioButton` that respects the `disabled`, `form`, `name`, `required`,
 * and `showValidity` props supplied to the `RadioGroup`. Props passed directly to
 * an option will override those set on the group.
 */
export const RadioGroupControlOption = forwardRef<HTMLInputElement, RadioGroupControlOption.Props>(
  ({ disabled, form, name, required, showValidity, ...rest }, ref) => {
    const context = useRadioGroupContext();
    return (
      <RadioButton
        {...rest}
        disabled={disabled ?? context.disabled}
        form={form ?? context.form}
        name={name ?? context.name}
        ref={ref}
        required={required ?? context.required}
        showValidity={showValidity ?? context.showValidity}
      />
    );
  },
);

RadioGroupControlOption.displayName = "RadioGroup.Option";
