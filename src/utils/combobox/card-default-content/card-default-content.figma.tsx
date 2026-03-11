import { ComboboxCardDefaultContent } from './card-default-content'
import figma from '@figma/code-connect'

figma.connect(ComboboxCardDefaultContent, '<COMBOBOX_CARD_DEFAULT_CONTENT_URL>', {
  props: {
    additionalInfo: figma.children('Supplementary info *'),
    label: figma.string('Selected item label'),
  },
  example: (props) => (
    // Use CardDefaultContent via Autocomplete or Select instead of Combobox.
    <ComboboxCardDefaultContent additionalInfo={props.additionalInfo}>{props.label}</ComboboxCardDefaultContent>
  ),
})
