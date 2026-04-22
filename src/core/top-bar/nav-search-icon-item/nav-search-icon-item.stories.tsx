import preview from '#.storybook/preview'
import { TopBarNavSearchIconItem } from './nav-search-icon-item'

const meta = preview.meta({
  title: 'Core/TopBar/NavSearchIconItem',
  component: TopBarNavSearchIconItem,
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
