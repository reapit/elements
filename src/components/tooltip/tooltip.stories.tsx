import { Meta } from '@storybook/react'
import { ToolTip } from './tooltip'
import { Button } from '../button'

const meta: Meta<typeof ToolTip> = {
  title: 'Components/ToolTip',
  component: ToolTip,
  argTypes: {
    tip: {
      control: 'text',
      description: 'Defines the tip of the tooltip.',
    },
    label: {
      control: 'text',
      description: 'Defines the label of the tooltip',
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  // This is to style the story, as the story parent container has overflow hidden.
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

export const BasicUsage = {
  args: {
    tip: 'Tooltip text',
    children: <Button variant="primary">Hover me</Button>,
  },
}
