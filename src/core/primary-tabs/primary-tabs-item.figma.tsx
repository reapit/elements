import figma from '@figma/code-connect'
import { PrimaryTabs } from './primary-tabs'

figma.connect(PrimaryTabs.Item, '<PRIMARY_TAB_URL>', {
  props: {
    children: figma.string('Tab name'),
  },
  example: (props) => (
    <PrimaryTabs.Item aria-current={false} href="#replace-me">
      {props.children}
    </PrimaryTabs.Item>
  ),
})
