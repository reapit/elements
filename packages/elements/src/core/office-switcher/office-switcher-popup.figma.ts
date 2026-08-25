// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=14949-11078&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/office-switcher/office-switcher.tsx
// component=OfficeSwitcher.Popup

import figma from "figma";

const search = figma.selectedInstance.getBoolean("Show search", {
  true: figma.helpers.react.jsxElement(
    '<OfficeSwitcher.SearchInput aria-label="Search offices" />',
  ),
  false: undefined,
});
const options = figma.properties.children(["▶️ Popover item *"]);

export default {
  id: "OfficeSwitcher.Popup",
  imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
  example: figma.code`<OfficeSwitcher.Popup${figma.helpers.react.renderProp("search", search)}>
      <OfficeSwitcher.Listbox>${figma.helpers.react.renderChildren(
        options,
      )}</OfficeSwitcher.Listbox>
    </OfficeSwitcher.Popup>`,
  metadata: { nestable: true },
};
