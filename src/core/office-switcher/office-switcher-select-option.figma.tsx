import figma from '@figma/code-connect'
import { OfficeSwitcher } from './office-switcher'

figma.connect(OfficeSwitcher.Option, '<OFFICE_SWITCHER_OFFICE_ITEM_URL>', {
  props: {
    label: figma.string('Office label'),
    badge: figma.boolean('Show Badge', {
      true: figma.children('Badge'),
      false: undefined,
    }),
  },
  example: (props) => (
    <OfficeSwitcher.Option badge={props.badge} value="<REPLACE_ME>">
      {props.label}
    </OfficeSwitcher.Option>
  ),
})

// NOTE: The Figma component we use to connect to the option group includes a variant
// that represents a single option. So we connect our option component to that variant here.
figma.connect(OfficeSwitcher.Option, '<OFFICE_SWITCHER_OFFICE_GROUP_URL>', {
  variant: { Variant: 'Office' },
  props: {
    item: figma.nestedProps('Office item', {
      label: figma.string('Office label'),
      badge: figma.boolean('Show Badge', {
        true: figma.children('Badge'),
        false: undefined,
      }),
    }),
  },
  example: (props) => (
    <OfficeSwitcher.Option badge={props.item.badge} value="<REPLACE_ME>">
      {props.item.label}
    </OfficeSwitcher.Option>
  ),
})
