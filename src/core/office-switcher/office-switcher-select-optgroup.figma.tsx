import figma from '@figma/code-connect'
import { OfficeSwitcher } from './office-switcher'

figma.connect(OfficeSwitcher.Optgroup, '<OFFICE_SWITCHER_OFFICE_GROUP_URL>', {
  variant: { Variant: 'Office group' },
  props: {
    group: figma.nestedProps('Office group header', {
      label: figma.string('Office group name'),
    }),
    children: figma.boolean('Expanded', {
      true: figma.children('Office item *'),
      false: 'TODO: Add options',
    }),
  },
  example: (props) => <OfficeSwitcher.Optgroup label={props.group.label}>{props.children}</OfficeSwitcher.Optgroup>,
})
