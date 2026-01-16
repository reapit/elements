import figma from '@figma/code-connect'
import { OfficeSwitcher } from './office-switcher'

figma.connect(OfficeSwitcher.Popup, '<OFFICE_SWITCHER_POPUP_URL>', {
  props: {
    search: figma.boolean('Show search', {
      true: <OfficeSwitcher.SearchInput aria-label="Search offices" />,
      false: undefined,
    }),
    options: figma.children('▶️ Popover item *'),
  },
  example: (props) => (
    <OfficeSwitcher.Popup search={props.search}>
      <OfficeSwitcher.Listbox>{props.options}</OfficeSwitcher.Listbox>
    </OfficeSwitcher.Popup>
  ),
})
