import { TopBarAvatarAnchor } from './avatar-anchor'
import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top!.location.href

const meta = {
  component: TopBarAvatarAnchor,
  title: 'Core/TopBar/AvatarAnchor',
} satisfies Meta<typeof TopBarAvatarAnchor>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-label': 'View profile',
    children: 'KD',
    href,
  },
}
