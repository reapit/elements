import preview from '#.storybook/preview'
import { TopBar } from '../top-bar'

const href = '#'

const meta = preview.meta({
  component: TopBar.AvatarAnchor,
  title: 'Core/TopBar/AvatarAnchor',
})

export const Example = meta.story({
  args: {
    'aria-label': 'View profile',
    children: 'KD',
    href,
  },
})
