import figma from '@figma/code-connect'
import { TopBar } from '../../top-bar'

figma.connect(TopBar, '<TOP_BAR_MENU_ITEM_URL>', {
  variant: { Type: 'Expandable' },
  props: {
    summary: figma.nestedProps('Top item', {
      hasBadge: figma.boolean('Notification badge'),
      label: figma.string('Label'),
    }),
    submenu: figma.children('Submenu'),
  },
  example: (props) => (
    <TopBar.MenuGroup
      summary={
        <TopBar.MenuGroupSummary hasBadge={props.summary.hasBadge}>{props.summary.label}</TopBar.MenuGroupSummary>
      }
    >
      {props.submenu}
    </TopBar.MenuGroup>
  ),
})
