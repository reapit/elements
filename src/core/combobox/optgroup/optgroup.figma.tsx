import { ComboboxOptgroup } from './optgroup'
import figma from '@figma/code-connect'

figma.connect(ComboboxOptgroup, '<COMBOBOX_OPTGROUP_URL>', {
  props: {
    label: figma.string('Group title'),
    children: figma.children('List item *'),
  },
  example: (props) => <ComboboxOptgroup label={props.label}>{props.children}</ComboboxOptgroup>,
})
