// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=16578-15383&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/select-control/select-control.tsx
// component=SelectControl

import figma from "figma";

const children = figma.selectedInstance.getBoolean("Selection as card", {
  true: figma.helpers.react.function(
    "() => (\n        // TODO: implement card content component\n        <SelectControl.CardDefaultContent>\n          Replace me with label text\n        </SelectControl.CardDefaultContent>\n      )",
  ),
  false: undefined,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Default: { text: undefined },
  Disabled: { text: undefined },
  Error: (function () {
    const nestedLayer30 = figma.selectedInstance.findInstance("FormControl ErrorText");
    return {
      text: nestedLayer30.type !== "ERROR" ? nestedLayer30.getString("Error text") : undefined,
    };
  })(),
  Focused: { text: undefined },
});
const helpText = figma.selectedInstance.getBoolean("Show helper", {
  true: (function () {
    const nestedLayer31 = figma.selectedInstance.findInstance("FormControl HelpText");
    return {
      text: nestedLayer31.type !== "ERROR" ? nestedLayer31.getString("Helper text") : undefined,
    };
  })(),
  false: { text: undefined },
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer32 = figma.selectedInstance.findInstance("FormControl Label");
    return {
      text: nestedLayer32.type !== "ERROR" ? nestedLayer32.getString("Label") : undefined,
      required: nestedLayer32.type !== "ERROR" ? nestedLayer32.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
const selectionStyle = figma.selectedInstance.getBoolean("Selection as card", {
  true: "card",
  false: "default",
});
export default {
  id: "SelectControl",
  imports: ['import { SelectControl } from "@reapit/elements/core/select-control";'],
  example: figma.code`<SelectControl${figma.helpers.react.renderProp(
    "errorText",
    errorText?.text,
  )}${figma.helpers.react.renderProp("helpText", helpText.text)}${figma.helpers.react.renderProp(
    "label",
    label.text,
  )}${figma.helpers.react.renderProp("required", label.required)}>
      <SelectControl.Button${figma.helpers.react.renderProp("selectionStyle", selectionStyle)}>
        ${figma.helpers.react.renderChildren(children)}
      </SelectControl.Button>
      <SelectControl.Popup>
        <SelectControl.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement list items */}
        </SelectControl.Listbox>
      </SelectControl.Popup>
    </SelectControl>`,
  metadata: { nestable: true },
};
