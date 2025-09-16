import figma from '@figma/code-connect'
import { Menu } from '../menu'

figma.connect(Menu.Group, '<MENU_GROUP_URL>', {
  props: {
    children: figma.children('Menu item'),
    label: figma.string('Group title'),
  },
  example: (props) => <Menu.Group label={props.label}>{props.children}</Menu.Group>,
})
