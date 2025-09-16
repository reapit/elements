import { AppSwitcher } from '../app-switcher'
import figma from '@figma/code-connect'
import { TopBar } from './top-bar'

figma.connect(TopBar, '<TOP_BAR_URL>', {
  props: {
    appSwitcher: figma.boolean('App switcher', {
      true: <AppSwitcher>TODO: add app switcher menu content</AppSwitcher>,
      false: undefined,
    }),
    avatarButton: figma.children('Avatar button'),
    brandLogo: figma.children('Brand logo'),
    mainNav: figma.children('Main nav'),
    search: figma.boolean('Search', {
      // NOTE: We do this instead of using figma.children because the search icon button in
      // Figma is just a nav icon item and we can't differentiate it from the other nav icon
      // item present as an instance layer in the top bar's XS breakpoint variant.
      true: (
        <TopBar.NavSearch
          button={<TopBar.NavSearchButton onClick={() => {}} />}
          iconItem={<TopBar.NavSearchIconItem aria-label="Search" onClick={() => {}} />}
        />
      ),
      false: undefined,
    }),
    secondaryNav: figma.children('Secondary nav'),
  },
  example: (props) => (
    <TopBar
      appSwitcher={props.appSwitcher}
      avatar={props.avatarButton}
      logo={props.brandLogo}
      mainNav={props.mainNav}
      search={props.search}
      secondaryNav={props.secondaryNav}
    />
  ),
})
