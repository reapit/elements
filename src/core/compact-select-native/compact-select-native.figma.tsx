import { CompactSelectNative } from './compact-select-native'
import figma from '@figma/code-connect'

figma.connect(CompactSelectNative, '<COMPACT_SELECT_NAVTIVE_URL>', {
  props: {
    // These props were automatically mapped based on your linked code:
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    selectionLabel: figma.string('Selection label'),
  },
  example: (props) => (
    <CompactSelectNative aria-label="change me" size={props.size}>
      <option>{props.selectionLabel}</option>
      {/* TODO: add remaining options */}
    </CompactSelectNative>
  ),
})
