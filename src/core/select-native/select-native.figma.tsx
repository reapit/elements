import figma from '@figma/code-connect'
import { SelectNative } from './select-native'

figma.connect(SelectNative, '<SELECT_NATIVE_URL>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    selectionLabel: figma.string('Selection label'),
  },
  example: (props) => (
    <SelectNative disabled={props.disabled} size={props.size}>
      <option>{props.selectionLabel}</option>
      {/* TODO: add remaining options */}
    </SelectNative>
  ),
})
