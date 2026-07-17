import figma from '@figma/code-connect'
import { FilterBar } from './filter-bar'

figma.connect(FilterBar, '<FILTER_BAR_URL>', {
  props: {
    action: figma.instance('Button'),
    filterChips: figma.instance('Chip group'),
    leftContent: figma.slot('Main controls slot').connectedInstances,
    rightContent: figma.slot('Secondary controls slot').connectedInstances,
  },
  example: (props) => (
    <FilterBar
      appliedFilters={<FilterBar.AppliedFilters action={props.action}>{props.filterChips}</FilterBar.AppliedFilters>}
      leftContent={<FilterBar.LeftContent>{props.leftContent}</FilterBar.LeftContent>}
      rightContent={<FilterBar.RightContent>{props.rightContent}</FilterBar.RightContent>}
    />
  ),
})
