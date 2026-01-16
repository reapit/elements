import figma from '@figma/code-connect'
import { OfficeSwitcher } from './office-switcher'

figma.connect(OfficeSwitcher, '<OFFICE_SWITCHER_URL>', {
  variant: { Variant: 'Simple' },
  props: {
    children: figma.string('Office name'),
  },
  example: (props) => <OfficeSwitcher>{props.children}</OfficeSwitcher>,
})

figma.connect(OfficeSwitcher, '<OFFICE_SWITCHER_URL>', {
  variant: { Variant: 'With selector' },
  props: {
    popup: figma.children('Office switcher popover'),
  },
  example: (props) => (
    <OfficeSwitcher>
      <OfficeSwitcher.Select>
        <OfficeSwitcher.Button />
        {props.popup}
      </OfficeSwitcher.Select>
    </OfficeSwitcher>
  ),
})
