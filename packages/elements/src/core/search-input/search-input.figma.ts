// url=<SEARCH_INPUT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/search-input/search-input.tsx
// component=SearchInput

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const placeholder = figma.selectedInstance.getString("Placeholder text");
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const variant = figma.selectedInstance.getEnum("Variant", {
  Default: "default",
  Borderless: "borderless",
});

export default {
  id: "SearchInput",
  imports: ['import { SearchInput } from "@reapit/elements/core/search-input";'],
  example: figma.code`<SearchInput${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("placeholder", placeholder)}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("variant", variant)}/>`,
  metadata: { nestable: true },
};
