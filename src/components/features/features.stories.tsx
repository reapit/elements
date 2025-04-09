import type { Meta, StoryObj } from '@storybook/react'

import { Features } from './features'
import { Icon } from '../icon'
import { ElTooltip } from '../tooltip'
import { ElFeaturesItem, ElFeaturesItemIcon } from './styles'

const meta = {
  title: 'Components/Features',
  component: Features,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof Features>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({}) => (
    <Features>
      <Features.Item aria-label="Bedrooms" icon={<Icon icon="bed" />}>
        1
      </Features.Item>
      <Features.Item aria-label="Bathooms" icon={<Icon icon="bath" />}>
        2
      </Features.Item>
      <Features.Item aria-label="Cars" icon={<Icon icon="car" />}>
        5
      </Features.Item>
      <Features.Item aria-label="Areas" icon={<Icon icon="appSwitcher" />}>
        850 sqm
      </Features.Item>
    </Features>
  ),
}

// NOTE: using `ElTooltip` instead of `Tooltip` is to provide an example of visually hidden content only to this story
export const DisplayTooltip = {
  render: ({}) => {
    return (
      <Features>
        <ElFeaturesItem aria-label="Bathrooms">
          <ElTooltip
            role="tooltip"
            data-position="top"
            style={{ transform: 'translate(-40%, -120%)', maxWidth: '400px' }}
            aria-live="assertive"
          >
            Bathrooms
          </ElTooltip>
          <ElFeaturesItemIcon>
            <Icon icon="bed" />
          </ElFeaturesItemIcon>
          1
        </ElFeaturesItem>
      </Features>
    )
  },
}
