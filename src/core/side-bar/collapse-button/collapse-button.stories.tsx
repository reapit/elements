import preview from '#.storybook/preview'
import { SideBar } from '../side-bar'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

const meta = preview.meta({
  title: 'Navigation/SideBar/CollapseButton',
  component: SideBar.CollapseButton,
  // NOTE: decorators are applied in array order, inside-out. That is, useSideBarWidthDecorator wraps the story first,
  // then useSideBarContextDecorator wraps the result of that.
  decorators: [useSideBarWidthDecorator, useSideBarContextDecorator],
})

export const Example = meta.story()

/**
 * When there is not enough space to display the full label, it will be truncated with an ellipsis. That said, the
 * side bar's default sizing when expanded will typically allow enough space to display the full label. Importantly,
 * when the `SideBar` is collapsed, the menu item's label will be available in the accessibility tree despite not
 * being fully visible.
 */
export const Truncated = meta.story({
  parameters: {
    sideBar: { width: '100px' },
  },
})

/**
 * When the `SideBar` is collapsed, the collapse button's label will be completely hidden. Importantly though, its
 * label will still be available in the accessibility tree and will be "Expand", not "Collapse".
 */
export const Collapsed = Example.extend({
  parameters: {
    sideBar: { state: 'collapsed' },
  },
})
