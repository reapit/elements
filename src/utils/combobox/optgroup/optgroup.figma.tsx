import { ComboboxOptgroup } from './optgroup'
import figma from '@figma/code-connect'

figma.connect(ComboboxOptgroup, '<COMBOBOX_OPTGROUP_URL>', {
  props: {
    label: figma.string('Group title'),
    children: figma.children('List item *'),
  },
  example: (props) => (
    // Use Optgroup via Autocomplete, CompactSelect or Select instead of Combobox.
    <ComboboxOptgroup label={props.label}>{props.children}</ComboboxOptgroup>
  ),
})
