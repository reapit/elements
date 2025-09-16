import figma from '@figma/code-connect'
import { SideBar } from '../side-bar'

figma.connect(SideBar.MenuList, '<SIDE_BAR_MENU_LIST_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <SideBar.MenuList>{props.children}</SideBar.MenuList>,
})
