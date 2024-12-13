import { Meta } from '@storybook/react'
import { Tooltip } from './tooltip'
import { Button } from '../button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    description: {
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
    description: 'Tooltip text',
    children: <Button variant="primary">Hover me</Button>,
  },
}
