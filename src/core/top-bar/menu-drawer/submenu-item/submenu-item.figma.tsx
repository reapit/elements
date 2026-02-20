import figma from '@figma/code-connect'
import { TopBar } from '../../top-bar'

figma.connect(TopBar, '<TOP_BAR_MENU_SUBMENU_ITEM_URL>', {
  props: {
    hasBadge: figma.boolean('Notification badge'),
    label: figma.string('Label'),
  },
  example: (props) => (
    <TopBar.MenuSubmenuItem aria-current={false} hasBadge={props.hasBadge} href="<REPLACE_ME>">
      {props.label}
    </TopBar.MenuSubmenuItem>
  ),
})
