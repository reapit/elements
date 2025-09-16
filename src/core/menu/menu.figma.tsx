import figma from '@figma/code-connect'
import { Menu } from './menu'

figma.connect(Menu, '<MENU_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => (
    <Menu aria-labelledby="trigger-id" id="menu-id" placement="top">
      {props.children}
    </Menu>
  ),
})
