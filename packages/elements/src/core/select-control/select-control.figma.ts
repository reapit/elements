// url=<SELECT_MULTI_SELECT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/select-control/select-control.tsx
// component=SelectControl

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Default: { text: undefined },
  Disabled: { text: undefined },
  Error: (function () {
    const nestedLayer27 = figma.selectedInstance.findInstance("FormControl ErrorText");
    return {
      text: nestedLayer27.type !== "ERROR" ? nestedLayer27.getString("Error text") : undefined,
    };
  })(),
  Focused: { text: undefined },
});
const helpText = figma.selectedInstance.getBoolean("Show helper", {
  true: (function () {
    const nestedLayer28 = figma.selectedInstance.findInstance("FormControl HelpText");
    return {
      text: nestedLayer28.type !== "ERROR" ? nestedLayer28.getString("Helper text") : undefined,
    };
  })(),
  false: { text: undefined },
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer29 = figma.selectedInstance.findInstance("FormControl Label");
    return {
      text: nestedLayer29.type !== "ERROR" ? nestedLayer29.getString("Label") : undefined,
      required: nestedLayer29.type !== "ERROR" ? nestedLayer29.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
export default {
  id: "SelectControl",
  imports: ['import { SelectControl } from "@reapit/elements/core/select-control";'],
  example: figma.code`<SelectControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText?.text)}${figma.helpers.react.renderProp(
    "helpText",
    helpText.text,
  )}${figma.helpers.react.renderProp(
    "label",
    label.text,
  )} multiple${figma.helpers.react.renderProp("required", label.required)}>
      <SelectControl.Button />
      <SelectControl.Popup>
        <SelectControl.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement options */}
        </SelectControl.Listbox>
      </SelectControl.Popup>
    </SelectControl>`,
  metadata: { nestable: true },
};
