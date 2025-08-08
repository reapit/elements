import { Button } from '#src/core/button'
import { FilterBarRightContent } from './right-content'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FilterBar/RightContent',
  component: FilterBarRightContent,
  argTypes: {
    children: {
      control: 'radio',
      defaultValue: 'Few Filters',
      // TODO: Update to demo Chip Select and Switch when available.
      options: ['Button'],
      mapping: {
        Button: (
          <Button size="small" variant="secondary">
            Button
          </Button>
        ),
      },
    },
  },
} satisfies Meta<typeof FilterBarRightContent>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Button',
  },
}
