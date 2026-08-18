import { forwardRef, useId, useState } from "react";
import type { ChangeEventHandler, InputHTMLAttributes } from "react";

import { TextInput } from "#src/core/text-input";
import { SearchIcon } from "#src/icons/search";

import { SearchInputClearButton } from "./clear-button/clear-button";

// NOTE: we omit...
// - onInput, because we use it internally and don't want to expose it to consumers
// - size, because we want to use size for our own purposes
type AttributesToOmit = "onInput" | "size";

export namespace SearchInput {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
    /**
     * Whether the input's value is being asynchronously validated, and the validation takes long enough
     * to warrant visual feedback, the input can be marked as busy.
     */
    isBusy?: boolean;
    /** The maximum width of the input. */
    maxWidth?: string;
    /**
     * Whether the control's validity should be visually communicated or not. Typically, validity will only be shown
     * when the control has been touched (i.e. the user has interacted with it).
     */
    showValidity?: boolean;
    /** Size of input. */
    size?: "small" | "medium" | "large";
    /** Type of input. Default is "search". */
    type?: "search" | "text";
    /** The visual style of the input. */
    variant?: "default" | "borderless";
  }
}

/**
 * A native input element geared for search. Built on top of `TextInput`.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInput.Props>(
  (
    {
      defaultValue,
      disabled,
      id,
      onChange,
      readOnly,
      showValidity,
      size = "medium",
      type = "search",
      value,
      variant = "default",
      ...rest
    },
    ref,
  ) => {
    const uniqueId = useId();
    const inputId = id ?? uniqueId;

    const isControlled = value !== undefined;

    // On first render, if value or default value are truthy, the input has a value.
    const [hasValue, setHasValue] = useState(isControlled ? !!value : !!defaultValue);
    const showClearButton = !readOnly && !disabled && hasValue;

    // We only show the search icon if the input is readonly, or it's empty and not focused
    const [hasFocus, setHasFocus] = useState(false);
    const showLeadingIcon = readOnly || (!hasValue && !hasFocus);

    // When the search input is small, clear button is medium sized; for all other input sizes,
    // the clear button is large sized.
    const clearButtonSize = size === "small" ? "medium" : "large";

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event);
      setHasValue(!!event.currentTarget.value);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setHasFocus(true);
      rest.onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setHasFocus(false);
      rest.onBlur?.(event);
    };

    return (
      <TextInput
        {...rest}
        defaultValue={defaultValue}
        disabled={disabled}
        id={inputId}
        leadingIcon={showLeadingIcon && <SearchIcon />}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onInput={handleChange}
        readOnly={readOnly}
        ref={ref}
        showValidity={showValidity}
        size={size}
        trailingIcon={
          showClearButton && (
            <SearchInputClearButton aria-controls={inputId} size={clearButtonSize} />
          )
        }
        type={type}
        value={value}
        variant={variant}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";
