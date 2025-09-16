import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.NavIconItem, '<TOP_BAR_NAV_ICON_ITEM_URL>', {
  props: {
    ariaCurrent: figma.enum('State', {
      Default: false,
      Focus: false,
      Hover: false,
      Select: 'page',
    }),
    tooltip: figma.nestedProps('Tooltip', {
      description: figma.string('Description'),
    }),
    hasBadge: figma.boolean('Badge'),
    icon: figma.instance('Icon'),
  },
  example: (props) => (
    <TopBar.NavIconItem
      aria-current={props.ariaCurrent}
      aria-label={props.tooltip.description}
      hasBadge={props.hasBadge}
      href="#replace-me"
      icon={props.icon}
    />
  ),
})
