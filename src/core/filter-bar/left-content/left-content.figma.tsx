import figma from '@figma/code-connect'
import { FilterBar } from '../filter-bar'

figma.connect(FilterBar.LeftContent, '<FILTER_BAR_LEFT_CONTENT_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <FilterBar.LeftContent>{props.children}</FilterBar.LeftContent>,
})
