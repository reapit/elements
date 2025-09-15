import figma from '@figma/code-connect'
import { PrimaryTabs } from './primary-tabs'

figma.connect(PrimaryTabs, '<PRIMARY_TABS_URL>', {
  variant: { Variant: 'Default' },
  props: {
    children: figma.children('Tab item'),
  },
  example: (props) => <PrimaryTabs>{props.children}</PrimaryTabs>,
})
