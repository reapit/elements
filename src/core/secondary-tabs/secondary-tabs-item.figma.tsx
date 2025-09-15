import figma from '@figma/code-connect'
import { SecondaryTabs } from './secondary-tabs'

figma.connect(SecondaryTabs.Item, '<SECONDARY_TAB_URL>', {
  props: {
    children: figma.string('Tab name'),
  },
  example: (props) => (
    <SecondaryTabs.Item aria-current={false} href="#replace-me">
      {props.children}
    </SecondaryTabs.Item>
  ),
})
