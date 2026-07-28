import figma from "@figma/code-connect";

import { OfficeSwitcher } from "./office-switcher";

figma.connect(OfficeSwitcher.Select, "<OFFICE_SWITCHER_SELECT_XS_URL>", {
  example: () => (
    <OfficeSwitcher.Select>
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup variant="drawer">
        <OfficeSwitcher.Listbox>
          {/* TODO: Add OfficeSwitcher.Option components */}
        </OfficeSwitcher.Listbox>
      </OfficeSwitcher.Popup>
    </OfficeSwitcher.Select>
  ),
});
