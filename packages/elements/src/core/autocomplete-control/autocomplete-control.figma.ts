// url=<AUTOCOMPLETE_MULTI_SELECT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/autocomplete-control/autocomplete-control.tsx
// component=AutocompleteControl

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Default: { text: undefined },
  Disabled: { text: undefined },
  Error: (function () {
    const nestedLayer64 = figma.selectedInstance.findInstance("FormControl ErrorText");
    return {
      text: nestedLayer64.type !== "ERROR" ? nestedLayer64.getString("Error text") : undefined,
    };
  })(),
  Focused: { text: undefined },
});
const helpText = figma.selectedInstance.getBoolean("Show helper", {
  true: (function () {
    const nestedLayer65 = figma.selectedInstance.findInstance("FormControl HelpText");
    return {
      text: nestedLayer65.type !== "ERROR" ? nestedLayer65.getString("Helper text") : undefined,
    };
  })(),
  false: { text: undefined },
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer66 = figma.selectedInstance.findInstance("FormControl Label");
    return {
      text: nestedLayer66.type !== "ERROR" ? nestedLayer66.getString("Label") : undefined,
      required: nestedLayer66.type !== "ERROR" ? nestedLayer66.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
export default {
  id: "AutocompleteControl",
  imports: ['import { AutocompleteControl } from "@reapit/elements/core/autocomplete-control";'],
  example: figma.code`<AutocompleteControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText?.text)}${figma.helpers.react.renderProp(
    "helpText",
    helpText.text,
  )}${figma.helpers.react.renderProp(
    "label",
    label.text,
  )} multiple${figma.helpers.react.renderProp("required", label.required)}>
      <AutocompleteControl.Button />
      <AutocompleteControl.Popup search={<AutocompleteControl.SearchInput aria-label="<REPLACE ME>"/>}>
        <AutocompleteControl.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement list items */}
        </AutocompleteControl.Listbox>
      </AutocompleteControl.Popup>
    </AutocompleteControl>`,
  metadata: { nestable: true },
};
