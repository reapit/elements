import figma from '@figma/code-connect'
import { SideBar } from '../side-bar'

figma.connect(SideBar.MenuItem, '<SIDE_BAR_MENU_ITEM_URL>', {
  variant: { Type: 'Simple' },
  props: {
    ariaCurrent: figma.enum('Selected', {
      true: 'page',
      false: false,
    }),
    item: figma.nestedProps('Main item', {
      label: figma.string('Label'),
      icon: figma.instance('Icon'),
    }),
  },
  example: (props) => (
    <SideBar.MenuItem aria-current={props.ariaCurrent} href="#replace-me" icon={props.item.icon}>
      {props.item.label}
    </SideBar.MenuItem>
  ),
})
