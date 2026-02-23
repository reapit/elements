import { AlertBanner } from './alert-banner'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { ErrorIcon } from '#src/icons/error'
import { fn } from 'storybook/test'
import { InfoIcon } from '#src/icons/info'
import { StarIcon } from '#src/icons/star'
import { Text } from '#src/utils/text'
import { useState } from 'react'
import { WarningIcon } from '#src/icons/warning'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AlertBanner> = {
  title: 'Core/AlertBanner',
  component: AlertBanner,
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['error', 'warning', 'info'],
    },
    icon: {
      control: 'radio',
      options: ['None', 'Star', 'Info', 'Warning', 'Error'],
      mapping: {
        None: null,
        Star: <StarIcon />,
        Info: <InfoIcon />,
        Warning: <WarningIcon />,
        Error: <ErrorIcon />,
      },
    },
    onDismiss: {
      action: 'dismissed',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ containerType: 'inline-size' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    actions: undefined,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    icon: 'None',
    onDismiss: undefined,
    variant: 'info',
  },
}

/**
 * The icon is an optional element and can be turned off. The icons colour will automatically match
 * the variant's colour and should not be changed.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    icon: 'Info',
  },
}

/**
 * The warning variant is used to help users avoid errors and take the actions needed to avoid
 * potentially dangerous outcomes.
 */
export const Warning: Story = {
  args: {
    ...Example.args,
    children: 'Payment details needed. Add payment details by June 30 2025 to avoid any interruptions',
    icon: 'Warning',
    variant: 'warning',
  },
}

/**
 * The error variant is used when something destructive or critical has happened, or there are access
 * or connectivity issues.
 */
export const Error: Story = {
  args: {
    ...Example.args,
    children: 'Reapit PM is experiencing an incident. Check our status page for more details',
    icon: 'Error',
    variant: 'error',
  },
}

/**
 * The info variant is used to show a change in state or some non-critical information.
 */
export const Info: Story = {
  args: {
    ...Example.args,
    children: 'We’re making changes to our subscription plans. Check our billing page for more details',
    icon: 'Info',
    variant: 'info',
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
 * Actions can be provided to display interactive elements, such as buttons or links.
 * Will often be a group of tertiary buttons with `hasNoPadding`.
 */
export const Actions: Story = {
  args: {
    ...Example.args,
    actions: (
      <ButtonGroup>
        <Button variant="tertiary" size="large" hasNoPadding>
          Action 1
        </Button>
        <Button variant="tertiary" size="large" hasNoPadding>
          Action 2
        </Button>
      </ButtonGroup>
    ),
  },
}

/**
 * Alert banners are full-width and responsive. On smaller screens (below 768px), the actions
 * stack vertically below the description. On larger screens, they appear inline.
 */
export const Breakpoints: Story = {
  args: {
    ...Example.args,
    children:
      'We have released a major update to the platform. This update includes new features, performance improvements, and bug fixes.',
    icon: 'Info',
    actions: (
      <ButtonGroup>
        <Button variant="tertiary" size="large" hasNoPadding>
          Learn More
        </Button>
        <Button variant="tertiary" size="large" hasNoPadding>
          View Changes
        </Button>
      </ButtonGroup>
    ),
    onDismiss: fn(),
  },
  decorators: [
    (Story) => {
      const [width, setWidth] = useState(700)
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
              min={500}
              max={900}
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
          <div
            style={{
              // NOTE: this is critical for the alert banner's responsive behaviour. It mimics
              // what our page layout component puts in place.
              containerType: 'inline-size',
              boxSizing: 'content-box',
              border: '1px solid #FA00FF',
              width: `${width}px`,
            }}
          >
            <Story />
          </div>
        </>
      )
    },
  ],
}

/**
 * When showing an announcement dynamically, like in response to a system event, use the appropriate
 * ARIA role for the alert banner. For announcements present on page load, no role should be used.
 *
 * - **`role="alert"`** for urgent announcements that need immediate attention (system outages, critical warnings).
 * Announced immediately, interrupting current screen reader activity. Use for service disruptions,
 * security alerts, data loss warnings.
 * - **`role="status"`** for non-urgent updates (new releases, informational announcements). Announced politely when
 * the screen reader finishes its current task. Use for feature announcements, maintenance notices,
 * general information.
 *
 * ```tsx
 * // ❌ WRONG - Static announcement on page load with role
 * <AlertBanner
 *   role="status"  // Don't do this!
 *   variant="info"
 *   icon={<InfoIcon />}
 * >
 *   Welcome message
 * </AlertBanner>
 *
 * // ✅ CORRECT - Static announcement (no role)
 * <AlertBanner
 *   variant="info"
 *   icon={<InfoIcon />}
 * >
 *   Welcome message
 * </AlertBanner>
 *
 * // ✅ CORRECT - Dynamic critical announcement (use alert)
 * {outageMessage && (
 *   <AlertBanner
 *     role="alert"
 *     variant="error"
 *     icon={<ErrorIcon />}
 *   >
 *     {outageMessage}
 *   </AlertBanner>
 * )}
 *
 * // ✅ CORRECT - Dynamic informational announcement (use status)
 * {releaseMessage && (
 *   <AlertBanner
 *     role="status"
 *     variant="info"
 *     icon={<InfoIcon />}
 *   >
 *     {releaseMessage}
 *   </AlertBanner>
 * )}
 * ```
 */
export const DynamicLoading: Story = {
  args: {
    children: 'This is a dynamically loaded announcement that will be announced by screen readers.',
    variant: 'info',
    icon: 'Info',
    role: 'status',
  },
  argTypes: {
    ...meta.argTypes,
    role: {
      control: 'select',
      options: ['alert', 'status', undefined],
      description: 'ARIA role - use "alert" for errors/warnings, "status" for info',
    },
  },
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <div>
          <button onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Hide Announcement' : 'Show Announcement'}
          </button>
        </div>

        {isVisible && <AlertBanner {...args} onDismiss={() => setIsVisible(false)} />}
      </div>
    )
  },
}
