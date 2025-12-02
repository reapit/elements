import { SectionMessage } from './section-message'
import { InfoIcon } from '#src/icons/info'
import { WarningIcon } from '#src/icons/warning'
import { CheckIcon } from '#src/icons/check'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { Text } from '#src/core/text'
import { fn } from 'storybook/test'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof SectionMessage> = {
  title: 'Core/SectionMessage',
  component: SectionMessage,
  argTypes: {
    description: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success', 'neutral-light', 'neutral-dark'],
    },
    icon: {
      control: 'radio',
      options: ['None', 'Info', 'Warning', 'Check'],
      mapping: {
        None: null,
        Info: <InfoIcon />,
        Warning: <WarningIcon />,
        Check: <CheckIcon />,
      },
    },
    onDismiss: {
      action: 'dismissed',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    description: 'This is a section message that provides important information to the user.',
    title: 'Section Message Title',
    variant: 'info',
    icon: 'Info',
    onDismiss: undefined,
    actions: undefined,
  },
}

/**
 * Section messages support six variants: `error`, `warning`, `info`, `success`, `neutral-light`, and `neutral-dark`.
 * Each variant uses appropriate colors for the background, border, and icon.
 */
export const Variants: Story = {
  args: {
    ...Example.args,
  },
  argTypes: {
    variant: {
      control: false,
    },
    icon: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SectionMessage {...args} title="Error Section Message" variant="error" icon={<WarningIcon />} />
      <SectionMessage {...args} title="Warning Section Message" variant="warning" icon={<WarningIcon />} />
      <SectionMessage {...args} title="Info Section Message" variant="info" icon={<InfoIcon />} />
      <SectionMessage {...args} title="Success Section Message" variant="success" icon={<CheckIcon />} />
      <SectionMessage {...args} title="Neutral Light Section Message" variant="neutral-light" />
      <SectionMessage {...args} title="Neutral Dark Section Message" variant="neutral-dark" />
    </>
  ),
}

/**
 * The title is optional. When not provided, only the description is displayed.
 */
export const NoTitle: Story = {
  args: {
    ...Example.args,
    title: undefined,
  },
}

/**
 * Icons are optional and can be customized. When no icon is provided, the grid layout adjusts accordingly.
 */
export const NoIcon: Story = {
  args: {
    ...Example.args,
    icon: 'None',
  },
}

/**
 * A dismiss button appears when the `onDismiss` callback is provided. The consumer handles the actual dismissal logic.
 */
export const Dismissible: Story = {
  args: {
    ...Example.args,
    onDismiss: fn(),
  },
}

/**
 * Actions can be provided to display interactive elements at the bottom of the message, such as buttons or links.
 */
export const Actions: Story = {
  args: {
    ...Example.args,
    actions: (
      <ButtonGroup>
        <Button variant="tertiary" size="medium" hasNoPadding>
          Go to Profile
        </Button>
        <Button variant="tertiary" size="medium" hasNoPadding>
          Go to Settings
        </Button>
      </ButtonGroup>
    ),
  },
}

/**
 * All features can be combined: title, description, icon, actions, and dismiss button.
 */
export const Complete: Story = {
  args: {
    ...Example.args,
    title: 'Complete Example',
    description:
      'This section message includes all available features: a title, description, icon, actions, and dismiss button.',
    icon: 'Info',
    actions: (
      <>
        <Button variant="tertiary" size="medium" hasNoPadding>
          Learn More
        </Button>
      </>
    ),
    onDismiss: fn(),
  },
}

/**
 * Section messages adapt to their container width. Text wraps when space is constrained.
 * Use the slider to see how the component responds to different widths.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    title: 'This is a longer section message title that will wrap when space is constrained',
    description:
      'This is a longer description that demonstrates how the section message component handles text wrapping when placed in a width-constrained container.',
    icon: 'Info',
    onDismiss: fn(),
  },
  decorators: [
    (Story) => {
      const [width, setWidth] = useState(400)
      return (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              marginBlockEnd: 'var(--spacing-2)',
            }}
          >
            <input
              aria-label="Container width"
              id="width"
              min={200}
              max={600}
              onChange={(event) => setWidth(Number(event.currentTarget.value))}
              step={10}
              type="range"
              value={width}
            />
            <output htmlFor="width">
              <Text colour="secondary" font="text-sm/regular">
                {width}px
              </Text>
            </output>
          </div>
          <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: `${width}px` }}>
            <Story />
          </div>
        </>
      )
    },
  ],
}
