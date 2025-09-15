import figma from '@figma/code-connect'
import { FilterBar } from '../filter-bar'

figma.connect(FilterBar.AppliedFilters, '<FILTER_BAR_APPLIED_FILTERS_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => <FilterBar.AppliedFilters>{props.children}</FilterBar.AppliedFilters>,
})
