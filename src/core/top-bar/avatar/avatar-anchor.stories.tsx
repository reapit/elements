import preview from '#.storybook/preview'
import { TopBarAvatarAnchor } from './avatar-anchor'

const href = '#'

const meta = preview.meta({
  component: TopBarAvatarAnchor,
  title: 'Core/TopBar/AvatarAnchor',
})

export const Example = meta.story({
  args: {
    'aria-label': 'View profile',
    children: 'KD',
    href,
  },
})
