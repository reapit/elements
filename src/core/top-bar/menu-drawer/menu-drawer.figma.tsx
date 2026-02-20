import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar, '<TOP_BAR_MENU_URL>', {
  variant: { Variant: 'Main level' },
  props: {
    mainNav: figma.nestedProps('Main nav', {
      children: figma.children('*'),
    }),
    secondaryNav: figma.boolean('Show secondary nav', {
      true: figma.nestedProps('Secondary nav', {
        children: figma.children('*'),
      }),
      false: { children: undefined },
    }),
    profileNav: figma.boolean('Show user menu', {
      true: figma.nestedProps('User menu', {
        children: figma.children('*'),
      }),
      false: { children: undefined },
    }),
  },
  example: (props) => (
    <TopBar.Menu>
      <TopBar.MenuContent>
        <TopBar.MenuMainNav>{props.mainNav.children}</TopBar.MenuMainNav>
        <TopBar.MenuSecondaryNav>{props.secondaryNav.children}</TopBar.MenuSecondaryNav>
        <TopBar.MenuProfileNav>{props.profileNav.children}</TopBar.MenuProfileNav>
      </TopBar.MenuContent>
    </TopBar.Menu>
  ),
})
