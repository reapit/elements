import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.NavMenuItem, '<TOP_BAR_NAV_DROPDOWN_BUTTON_URL>', {
  props: {
    ariaCurrent: figma.enum('State', {
      Default: false,
      Focus: false,
      Hover: false,
      Select: 'page',
    }),
    label: figma.textContent('Label'),
  },
  example: (props) => (
    <TopBar.NavMenuItem aria-current={props.ariaCurrent} label={props.label}>
      TODO: Add menu items
    </TopBar.NavMenuItem>
  ),
})
