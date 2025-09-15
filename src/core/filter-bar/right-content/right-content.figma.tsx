import figma from '@figma/code-connect'
import { FilterBar } from '../filter-bar'

figma.connect(FilterBar.RightContent, '<FILTER_BAR_RIGHT_CONTENT_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <FilterBar.RightContent>{props.children}</FilterBar.RightContent>,
})
