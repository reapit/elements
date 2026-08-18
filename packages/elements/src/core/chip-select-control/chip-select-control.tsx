import { useId } from "react";
import type { ReactNode } from "react";

import { ChipSelect } from "#src/core/chip-select";
import { FormControl } from "#src/core/form-control";
import { LabelText } from "#src/core/label-text";

export namespace ChipSelectControl {
  export interface Props extends ChipSelect.Props {
    /** Optional error text that communicates why the chip select's value is invalid. */
    errorText?: ReactNode;
    /** Optional help text that provides additional context about the chip select. */
    helpText?: ReactNode;
    /** The label for the chip select. */
    label?: ReactNode;
    /** Whether at least one option in the chip select must remain selected. */
    required?: boolean;
    /** The size of the chip select. */
    size?: "small" | "medium" | "large";
  }
}

/**
 * A pre-baked `ChipSelect` + `FormControl`. Used when you need to display a label, help text,
 * and/or validation errors for a chip select.
 */
export function ChipSelectControl({
  children,
  errorText,
  helpText,
  label,
  required,
  size = "medium",
  ...rest
}: ChipSelectControl.Props) {
  const helpTextId = useId();
  const errorTextId = useId();

  return (
    <FormControl
      aria-describedby={helpText && !errorText ? helpTextId : undefined}
      aria-errormessage={errorText ? errorTextId : undefined}
      aria-invalid={errorText ? true : undefined}
      as="fieldset"
      size={size}
    >
      <FormControl.Label as="legend">
        <LabelText isRequired={required}>{label}</LabelText>
      </FormControl.Label>
      <ChipSelect {...rest} required={required} size={size}>
        {children}
      </ChipSelect>
      {errorText ? (
        <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  );
}

ChipSelectControl.Option = ChipSelect.Option;
ChipSelectControl.determineNextControlledState = ChipSelect.determineNextControlledState;

ChipSelectControl.Context = ChipSelect.Context;
ChipSelectControl.useContext = ChipSelect.useContext;
