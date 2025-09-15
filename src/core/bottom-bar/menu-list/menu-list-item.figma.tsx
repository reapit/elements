import { BottomBar } from '../bottom-bar'
import figma from '@figma/code-connect'

figma.connect(BottomBar.MenuItem, '<BOTTOM_BAR_ITEM_URL>', {
  props: {
    children: figma.string('Label'),
    hasBadge: figma.boolean('Badge'),
    icon: figma.instance('Icon'),
  },
  example: (props) => (
    <BottomBar.Item aria-current={false} hasBadge={props.hasBadge} href="#replace-me" icon={props.icon}>
      {props.children}
    </BottomBar.Item>
  ),
})
