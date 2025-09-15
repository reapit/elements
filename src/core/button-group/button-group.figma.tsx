import { ButtonGroup } from './button-group'
import figma from '@figma/code-connect'

figma.connect(ButtonGroup, '<BUTTON_GROUP_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <ButtonGroup>{props.children}</ButtonGroup>,
})
