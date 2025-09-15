import { ChipSelect } from './chip-select'
import figma from '@figma/code-connect'

figma.connect(ChipSelect, '<CHIP_SELECT_URL>', {
  props: {
    // TODO: Will not currently capture all options, as some are named as "Interactive chip"
    children: figma.children('Chip*'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: (props) => (
    <ChipSelect name="change-me" size={props.size}>
      {props.children}
    </ChipSelect>
  ),
})
