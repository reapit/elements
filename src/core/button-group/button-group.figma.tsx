import { ButtonGroup } from './button-group'
import figma from '@figma/code-connect'

figma.connect(ButtonGroup, '<BUTTON_GROUP_URL>', {
  props: {
    children: figma.slot('Content slot'),
    orientation: figma.enum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
  },
  example: (props) => (
    <ButtonGroup orientation={props.orientation}>
      {/* TODO: Use ButtonGroup.Item instead of Button */}
      {props.children}
    </ButtonGroup>
  ),
})

//
// Deprecated Figma component support.
//

figma.connect(ButtonGroup, '<BUTTON_GROUP_URL_DEPRECATED>', {
  props: {
    children: figma.children('*'),
    size: figma.enum('Button size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: (props) => (
    <ButtonGroup size={props.size}>
      {/* TODO: Use ButtonGroup.Item instead of Button */}
      {props.children}
    </ButtonGroup>
  ),
})
