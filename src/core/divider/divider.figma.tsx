import { Divider } from './divider'
import figma from '@figma/code-connect'

figma.connect(Divider, '<DIVIDER_URL>', {
  props: {
    ariaOrientation: figma.enum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
    variant: figma.enum('Style', {
      Solid: 'solid',
      Dashed: 'dashed',
    }),
  },
  example: (props) => <Divider aria-orientation={props.ariaOrientation} variant={props.variant} />,
})
