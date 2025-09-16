import figma from '@figma/code-connect'
import { SideBar } from './side-bar'

figma.connect(SideBar, '<SIDE_BAR_URL>', {
  props: {
    menuList: figma.children('Menu list'),
    collapseButton: figma.children('Collapse button'),
  },
  example: (props) => <SideBar footer={props.collapseButton}>{props.menuList}</SideBar>,
})
