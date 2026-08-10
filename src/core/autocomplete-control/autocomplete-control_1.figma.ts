// url=<AUTOCOMPLETE_SINGLE_SELECT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/autocomplete-control/autocomplete-control.tsx
// component=AutocompleteControl

import figma from "figma";

const children = figma.selectedInstance.getBoolean("Selection as card", {
  true: figma.helpers.react.function(
    "() => (\n        // TODO: implement card content component\n        <AutocompleteControl.CardDefaultContent>\n          Replace me with label text\n        </AutocompleteControl.CardDefaultContent>\n      )",
  ),
  false: undefined,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Default: { text: undefined },
  Disabled: { text: undefined },
  Error: (function () {
    const nestedLayer67 = figma.selectedInstance.findInstance("FormControl ErrorText");
    return {
      text: nestedLayer67.type !== "ERROR" ? nestedLayer67.getString("Error text") : undefined,
    };
  })(),
  Focused: { text: undefined },
});
const helpText = figma.selectedInstance.getBoolean("Show helper", {
  true: (function () {
    const nestedLayer68 = figma.selectedInstance.findInstance("FormControl HelpText");
    return {
      text: nestedLayer68.type !== "ERROR" ? nestedLayer68.getString("Helper text") : undefined,
    };
  })(),
  false: { text: undefined },
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer69 = figma.selectedInstance.findInstance("FormControl Label");
    return {
      text: nestedLayer69.type !== "ERROR" ? nestedLayer69.getString("Label") : undefined,
      required: nestedLayer69.type !== "ERROR" ? nestedLayer69.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
const selectionStyle = figma.selectedInstance.getBoolean("Selection as card", {
  true: "card",
  false: "default",
});
export default {
  id: "AutocompleteControl",
  imports: ['import { AutocompleteControl } from "@reapit/elements/core/autocomplete-control";'],
  example: figma.code`<AutocompleteControl${figma.helpers.react.renderProp(
    "errorText",
    errorText?.text,
  )}${figma.helpers.react.renderProp("helpText", helpText.text)}${figma.helpers.react.renderProp(
    "label",
    label.text,
  )}${figma.helpers.react.renderProp("required", label.required)}>
      <AutocompleteControl.Button${figma.helpers.react.renderProp(
        "selectionStyle",
        selectionStyle,
      )}>
        ${figma.helpers.react.renderChildren(children)}
      </AutocompleteControl.Button>
      <AutocompleteControl.Popup search={<AutocompleteControl.SearchInput aria-label="<REPLACE ME>"/>}>
        <AutocompleteControl.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement list items */}
        </AutocompleteControl.Listbox>
      </AutocompleteControl.Popup>
    </AutocompleteControl>`,
  metadata: { nestable: true },
};
