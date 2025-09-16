import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.MainNav, '<TOP_BAR_MAIN_NAV_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <TopBar.MainNav>{props.children}</TopBar.MainNav>,
})
