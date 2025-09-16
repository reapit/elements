import figma from '@figma/code-connect'
import { Menu } from '../menu'

figma.connect(Menu.Item, '<MENU_ITEM_URL>', {
  props: {
    badge: figma.children('Badge'),
    children: figma.string('Item label'),
    iconLeft: figma.instance('Icon L'),
    iconRight: figma.instance('Icon R'),
    supplementaryInfo: figma.string('Supplementary info'),
  },
  example: (props) => (
    <Menu.Item
      badge={props.badge}
      iconLeft={props.iconLeft}
      iconRight={props.iconRight}
      supplementaryInfo={props.supplementaryInfo}
    >
      {props.children}
    </Menu.Item>
  ),
})
