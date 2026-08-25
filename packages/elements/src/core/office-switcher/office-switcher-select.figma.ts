// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=16466-61598&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/office-switcher/office-switcher.tsx
// component=OfficeSwitcher.Select

import figma from "figma";

export default {
  id: "OfficeSwitcher.Select",
  imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
  example: figma.code`<OfficeSwitcher.Select>
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup variant="drawer">
        <OfficeSwitcher.Listbox>
          {/* TODO: Add OfficeSwitcher.Option components */}
        </OfficeSwitcher.Listbox>
      </OfficeSwitcher.Popup>
    </OfficeSwitcher.Select>`,
};
