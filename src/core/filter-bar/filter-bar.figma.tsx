import figma from '@figma/code-connect'
import { FilterBar } from './filter-bar'

figma.connect(FilterBar, '<FILTER_BAR_URL>', {
  props: {
    appliedFilters: figma.children('Applied filters'),
    leftContent: figma.children('Left content'),
    rightContent: figma.children('Right content'),
  },
  example: (props) => (
    <FilterBar
      appliedFilters={props.appliedFilters}
      leftContent={props.leftContent}
      rightContent={props.rightContent}
    />
  ),
})
