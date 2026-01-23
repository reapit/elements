import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { FocusedLayout } from '../focused-layout'
import { FocusedLayoutContent } from './content'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FocusedLayout/Content',
  component: FocusedLayoutContent,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <FocusedLayout>
        <Story />
      </FocusedLayout>
    ),
  ],
} satisfies Meta<typeof FocusedLayoutContent>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The content area is where the main page content is placed. It has responsive padding
 * that adjusts based on the container width:
 * - XS: 20px padding
 * - SM: 24px vertical, 32px horizontal
 * - MD+: 32px vertical, 40px horizontal
 */
export const Example: Story = {
  args: {
    children: <Pattern height="100px" />,
  },
}
