import figma from '@figma/code-connect'
import { SideBar } from '../side-bar'

figma.connect(SideBar.SubmenuItem, '<SIDE_BAR_SUBMENU_ITEM_URL>', {
  props: {
    ariaCurrent: figma.enum('State', {
      Default: false,
      Focus: false,
      Hover: false,
      Select: 'page',
    }),
    children: figma.string('Label'),
  },
  example: (props) => (
    <SideBar.SubmenuItem aria-current={props.ariaCurrent} href="#replace-me">
      {props.children}
    </SideBar.SubmenuItem>
  ),
})
