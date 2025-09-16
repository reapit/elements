import figma from '@figma/code-connect'
import { TopBar } from '../top-bar'

figma.connect(TopBar.NavSearch, '<TOP_BAR_NAV_SEARCH_URL>', {
  example: () => (
    <TopBar.NavSearch
      button={<TopBar.NavSearchButton onClick={() => {}} />}
      iconItem={<TopBar.NavSearchIconItem aria-label="Search" onClick={() => {}} />}
    />
  ),
})
