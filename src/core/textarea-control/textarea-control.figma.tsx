import figma from "@figma/code-connect";

import { TextareaControl } from "./textarea-control";

figma.connect(TextareaControl, "<TEXTAREA_URL>", {
  props: {
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    errorText: figma.enum("State", {
      Error: figma.string("Error text"),
    }),
    fieldSizing: figma.boolean("Dynamic height", {
      true: "fixed",
      false: "content",
    }),
    helpText: figma.boolean("Show helper", {
      true: figma.string("Helper text"),
      false: undefined,
    }),
    label: figma.boolean("Show label", {
      true: figma.nestedProps("LabelText", {
        text: figma.string("Label text"),
        required: figma.boolean("Required"),
      }),
      false: {
        text: undefined,
        required: undefined,
      },
    }),
    placeholder: figma.string("Placeholder text"),
    showValidity: figma.enum("State", {
      Error: true,
    }),
    size: figma.enum("Size", {
      Small: "small",
      Medium: "medium",
      Large: "large",
    }),
  },
  example: ({
    disabled,
    errorText,
    fieldSizing,
    helpText,
    label,
    placeholder,
    showValidity,
    size,
  }) => (
    <TextareaControl
      disabled={disabled}
      errorText={errorText}
      fieldSizing={fieldSizing}
      helpText={helpText}
      label={label.text}
      placeholder={placeholder}
      required={label.required}
      showValidity={showValidity}
      size={size}
    />
  ),
});
