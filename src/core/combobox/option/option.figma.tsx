import { ComboboxOption } from './option'
import figma from '@figma/code-connect'

figma.connect(ComboboxOption, '<COMBOBOX_OPTION_URL>', {
  props: {
    badge: figma.boolean('Show badge', {
      true: figma.boolean('Selected', {
        true: figma.children('Line 1 Badge'),
        false: figma.children('Badge'),
      }),
      false: undefined,
    }),
    label: figma.string('Label'),
    supplementaryInfo: figma.children('Additional info *'),
  },
  example: (props) => (
    <ComboboxOption badge={props.badge} supplementaryInfo={props.supplementaryInfo} value="REPLACE ME">
      {props.label}
    </ComboboxOption>
  ),
})
