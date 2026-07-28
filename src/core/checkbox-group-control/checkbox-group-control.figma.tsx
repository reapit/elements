import figma from "@figma/code-connect";

import { CheckboxGroupControl } from "./checkbox-group-control";

figma.connect(CheckboxGroupControl, "<CHECKBOX_GROUP_URL>", {
  props: {
    children: figma.enum("Orientation", {
      Horizontal: figma.slot("Horizontal content slot").connectedInstances,
      Vertical: figma.slot("Vertical content slot").connectedInstances,
    }),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    errorText: figma.enum("State", {
      Error: figma.string("Error message"),
    }),
    label: figma.boolean("Show group label", {
      true: figma.nestedProps("LabelText", {
        text: figma.string("Label text"),
      }),
      false: {
        text: undefined,
      },
    }),
    orientation: figma.enum("Orientation", {
      Horizontal: "horizontal",
      Vertical: "vertical",
    }),
  },
  example: ({ children, disabled, errorText, label, orientation }) => (
    <CheckboxGroupControl
      disabled={disabled}
      errorText={errorText}
      label={label.text}
      orientation={orientation}
    >
      {/* NOTE: use CheckboxGroupControl.Option instead of CheckboxGroupControl */}
      {children}
    </CheckboxGroupControl>
  ),
});

//
// Deprecated Figma component support.
//

figma.connect(CheckboxGroupControl, "<CHECKBOX_GROUP_URL_DEPRECATED>", {
  props: {
    children: figma.children("Checkbox *"),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    errorText: figma.enum("State", {
      Error: figma.string("Error message"),
    }),
    label: figma.boolean("Show group label", {
      true: figma.nestedProps("LabelText", {
        text: figma.string("Label text"),
      }),
      false: {
        text: undefined,
      },
    }),
    orientation: figma.enum("Orientation", {
      Horizontal: "horizontal",
      Vertical: "vertical",
    }),
  },
  example: ({ children, disabled, errorText, label, orientation }) => (
    <CheckboxGroupControl
      disabled={disabled}
      errorText={errorText}
      label={label.text}
      orientation={orientation}
    >
      {/* NOTE: use CheckboxGroupControl.Option instead of CheckboxGroupControl */}
      {children}
    </CheckboxGroupControl>
  ),
});
