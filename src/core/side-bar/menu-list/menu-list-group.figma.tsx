import figma from '@figma/code-connect'
import { SideBar } from '../side-bar'

figma.connect(SideBar.MenuGroup, '<SIDE_BAR_MENU_ITEM_URL>', {
  variant: { Type: 'Expandable' },
  props: {
    ariaCurrent: figma.enum('Selected', {
      true: 'page',
      false: false,
    }),
    children: figma.children('Submenu'),
    expanded: figma.boolean('Expanded'),
    summary: figma.nestedProps('Main item', {
      label: figma.string('Label'),
      icon: figma.instance('Icon'),
    }),
  },
  example: (props) => (
    <SideBar.MenuGroup
      open={props.expanded}
      summary={<SideBar.MenuGroupSummary icon={props.summary.icon}>{props.summary.label}</SideBar.MenuGroupSummary>}
    >
      {props.children}
    </SideBar.MenuGroup>
  ),
})
