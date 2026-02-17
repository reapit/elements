import { ButtonGroup } from './button-group'
import figma from '@figma/code-connect'

figma.connect(ButtonGroup, '<BUTTON_GROUP_URL>', {
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
