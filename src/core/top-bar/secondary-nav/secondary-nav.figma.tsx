import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.SecondaryNav, '<TOP_BAR_SECONDARY_NAV_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <TopBar.SecondaryNav>{props.children}</TopBar.SecondaryNav>,
})
