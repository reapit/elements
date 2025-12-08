import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { CheckIcon } from '#src/icons/check'
import { ErrorIcon } from '#src/icons/error'
import { fn } from 'storybook/test'
import { InfoIcon } from '#src/icons/info'
import { SectionMessage } from './section-message'
import { Text } from '#src/core/text'
import { WarningIcon } from '#src/icons/warning'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof SectionMessage> = {
  title: 'Core/SectionMessage',
  component: SectionMessage,
  argTypes: {
    children: {
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
      options: ['None', 'Info', 'Warning', 'Check', 'Error'],
      mapping: {
        None: null,
        Info: <InfoIcon />,
        Warning: <WarningIcon />,
        Check: <CheckIcon />,
        Error: <ErrorIcon />,
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
    actions: undefined,
    children: 'This is a section message that provides important information to the user.',
    icon: 'Info',
    onDismiss: undefined,
    title: 'Section Message Title',
    variant: 'info',
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
      <SectionMessage {...args} title="Error Section Message" variant="error" icon={<ErrorIcon aria-label="Error" />} />
      <SectionMessage
        {...args}
        title="Warning Section Message"
        variant="warning"
        icon={<WarningIcon aria-label="Warning" />}
      />
      <SectionMessage {...args} title="Info Section Message" variant="info" icon={<InfoIcon aria-label="Note" />} />
      <SectionMessage
        {...args}
        title="Success Section Message"
        variant="success"
        icon={<CheckIcon aria-label="Success" />}
      />
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
    children:
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
    children:
      'This is a longer description that demonstrates how the section message component handles text wrapping when space is constrained.',
    icon: 'Info',
    onDismiss: fn(),
  },
  decorators: [
    (Story) => {
      const [width, setWidth] = useState(500)
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
              min={300}
              max={700}
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

/**
 * To help reduce space, `lineClamp` allows the description content to
 * be truncated after the specified number of lines.
 */
export const Clamping: Story = {
  args: {
    ...Wrapping.args,
    lineClamp: 1,
  },
  decorators: Wrapping.decorators,
}

/**
 * When showing a message dynamically, like in response to user interaction, use the appropriate
 * ARIA role for the section message. For messages present on page load, no role should be used.
 *
 * - **`role="alert"`** for urgent messages that need immediate attention (errors, warnings).
 * Announced immediately, interrupting current screen reader activity. Use for form validation
 * errors, critical warnings, session expiry notices
 * - **`role="status"`** for non-urgent updates (info, success messages). Announced politely when
 * the screen reader finishes its current task. Use for success confirmations, informational
 * updates, progress indicators.
 *
 * ```tsx
 * // ❌ WRONG - Static message on page load with role
 * <SectionMessage
 *   role="alert"  // Don't do this!
 *   variant="info"
 *   description="Welcome message"
 * />
 *
 * // ✅ CORRECT - Static message (no role)
 * <SectionMessage
 *   variant="info"
 *   description="Welcome message"
 * />
 *
 * // ✅ CORRECT - Dynamic error (use alert)
 * {errorMessage && (
 *   <SectionMessage
 *     role="alert"
 *     variant="error"
 *     description={errorMessage}
 *   />
 * )}
 *
 * // ✅ CORRECT - Dynamic success (use status)
 * {successMessage && (
 *   <SectionMessage
 *     role="status"
 *     variant="success"
 *     description={successMessage}
 *   />
 * )}
 * ```
 */
export const DynamicLoading: Story = {
  args: {
    children: 'This is a dynamically loaded message that will be announced by screen readers.',
    title: 'Dynamic Message',
    variant: 'info',
    icon: 'Info',
    role: 'status',
  },
  argTypes: {
    ...meta.argTypes,
    role: {
      control: 'select',
      options: ['alert', 'status', undefined],
      children: 'ARIA role - use "alert" for errors/warnings, "status" for info/success',
    },
  },
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <div>
          <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'Hide Message' : 'Show Message'}</button>
        </div>

        {isVisible && <SectionMessage {...args} onDismiss={() => setIsVisible(false)} />}
      </div>
    )
  },
}
