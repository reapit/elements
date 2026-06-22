import preview from '#.storybook/preview'
import { TopBar } from '../top-bar'

const meta = preview.meta({
  title: 'Navigation/TopBar/NavSearchIconItem',
  component: TopBar.NavSearchIconItem,
  argTypes: {
    onClick: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    onClick: () => void 0,
  },
})
