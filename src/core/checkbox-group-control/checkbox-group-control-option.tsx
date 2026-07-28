import { forwardRef } from "react";

import { Checkbox } from "#src/core/checkbox";

import { useCheckboxGroupControlContext } from "./context";

export namespace CheckboxGroupControlOption {
  export interface Props extends Checkbox.Props {}
}

/**
 * A thin wrapper around `Checkbox` that respects the `disabled`, `form`, `name`, `required`,
 * and `showValidity` props supplied to the `CheckboxGroupControl`. Props passed directly to
 * an option will override those set on the group.
 */
export const CheckboxGroupControlOption = forwardRef<
  HTMLInputElement,
  CheckboxGroupControlOption.Props
>(({ disabled, form, name, required, showValidity, ...rest }, ref) => {
  const context = useCheckboxGroupControlContext();
  return (
    <Checkbox
      {...rest}
      disabled={disabled ?? context.disabled}
      form={form ?? context.form}
      name={name ?? context.name}
      ref={ref}
      required={required ?? context.required}
      showValidity={showValidity ?? context.showValidity}
    />
  );
});

CheckboxGroupControlOption.displayName = "CheckboxGroupControl.Option";
