import { ComboboxOptionSupplementaryInfo } from './option-supplementary-info'
import figma from '@figma/code-connect'

figma.connect(ComboboxOptionSupplementaryInfo, '<COMBOBOX_OPTION_SUPPLEMENTARY_INFO_URL>', {
  props: {
    badge: figma.boolean('Show badge', {
      true: figma.children('Badge'),
      false: undefined,
    }),
    icon: figma.boolean('Show icon', {
      true: figma.instance('Icon'),
      false: undefined,
    }),
    label: figma.string('Optional info'),
  },
  example: (props) => (
    <ComboboxOptionSupplementaryInfo badge={props.badge} icon={props.icon}>
      {props.label}
    </ComboboxOptionSupplementaryInfo>
  ),
})
