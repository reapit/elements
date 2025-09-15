import figma from '@figma/code-connect'
import { SecondaryTabs } from './secondary-tabs'

figma.connect(SecondaryTabs, '<SECONDARY_TABS_URL>', {
  variant: { Variant: 'Secondary' },
  props: {
    children: figma.children('Secondary tab item'),
  },
  example: (props) => <SecondaryTabs>{props.children}</SecondaryTabs>,
})
