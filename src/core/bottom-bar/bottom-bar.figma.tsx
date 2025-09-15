import { BottomBar } from './bottom-bar'
import figma from '@figma/code-connect'

const ref = { current: null }

figma.connect(BottomBar, '<BOTTOM_BAR_URL>', {
  props: {
    children: figma.children('*'),
  },
  example: (props) => (
    <BottomBar scrollContainerRef={ref}>
      <BottomBar.MenuList>{props.children}</BottomBar.MenuList>
    </BottomBar>
  ),
})

figma.connect(BottomBar, '<BOTTOM_BAR_URL>', {
  variant: { Items: '6+' },
  props: {
    children: figma.children('Item*'),
    moreButton: figma.nestedProps('More button', {
      hasBadge: figma.boolean('Badge'),
      icon: figma.instance('Icon'),
      label: figma.string('Label'),
    }),
  },
  example: (props) => (
    <BottomBar scrollContainerRef={ref}>
      <BottomBar.MenuList>
        {props.children}
        <BottomBar.MenuItem
          hasBadge={props.moreButton.hasBadge}
          icon={props.moreButton.icon}
          label={props.moreButton.label}
        >
          TODO: Add menu items
        </BottomBar.MenuItem>
      </BottomBar.MenuList>
    </BottomBar>
  ),
})
