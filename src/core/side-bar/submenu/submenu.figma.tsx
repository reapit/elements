import figma from '@figma/code-connect'
import { SideBar } from '../side-bar'

figma.connect(SideBar.Submenu, '<SIDE_BAR_SUBMENU_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <SideBar.Submenu>{props.children}</SideBar.Submenu>,
})
