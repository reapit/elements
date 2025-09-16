import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.NavItem, '<TOP_BAR_NAV_ITEM_URL>', {
  props: {
    ariaCurrent: figma.enum('State', {
      Default: false,
      Focus: false,
      Hover: false,
      Select: 'page',
    }),
    label: figma.string('Label'),
  },
  example: (props) => (
    <TopBar.NavItem aria-current={props.ariaCurrent} href="#replace-me">
      {props.label}
    </TopBar.NavItem>
  ),
})
