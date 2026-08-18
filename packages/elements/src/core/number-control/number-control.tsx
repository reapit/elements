import { forwardRef, useId } from "react";
import type { ReactNode } from "react";

import { FormControl } from "#src/core/form-control";
import { NumberInput } from "#src/core/number-input";

export namespace NumberControl {
  export interface Props extends NumberInput.Props {
    /** Optional error text that communicates why the input's value is invalid. */
    errorText?: ReactNode;
    /** Optional help text that provides more context about the input. */
    helpText?: ReactNode;
    /** The maximum width of the form control. */
    maxWidth?: string;
    /**
     * The visual label for the input. If no visual label is provided, an accessible
     * label should be provided via `aria-label`.
     */
    label?: ReactNode;
  }
}

/**
 * A pre-baked `NumberInput` + `FormControl`. Used when you need a label, help text, and/or
 * error message for a numeric input.
 */
export const NumberControl = forwardRef<HTMLInputElement, NumberControl.Props>(
  function NumberControl(
    { errorText, helpText, id, label, maxWidth, required, showValidity, size = "medium", ...rest },
    ref,
  ) {
    const fallbackInputId = useId();
    const inputId = id ?? fallbackInputId;
    const helpTextId = useId();
    const errorTextId = useId();

    return (
      <FormControl as="div" size={size} maxWidth={maxWidth}>
        {label && (
          <FormControl.Label htmlFor={inputId} isRequired={required}>
            {label}
          </FormControl.Label>
        )}
        <NumberInput
          {...rest}
          aria-describedby={helpText && !errorText ? helpTextId : undefined}
          aria-errormessage={errorText ? errorTextId : undefined}
          aria-invalid={errorText ? true : undefined}
          id={inputId}
          ref={ref}
          required={required}
          showValidity={showValidity ?? !!errorText}
          size={size}
        />
        {errorText ? (
          <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
        ) : (
          helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
        )}
      </FormControl>
    );
  },
);
