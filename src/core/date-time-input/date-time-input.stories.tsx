import { DateTimeInput } from './date-time-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/DateTimeInput',
  component: DateTimeInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['date', 'datetime-local', 'month', 'time', 'week'],
    },
    value: {
      control: 'text',
      table: {
        type: {
          summary: 'string | number | readonly string[] | undefined',
        },
      },
    },
  },
} satisfies Meta<typeof DateTimeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-label': 'My input',
    defaultValue: '',
    disabled: false,
    isTouched: false,
    name: 'myInput',
    readOnly: false,
    required: false,
    max: undefined,
    min: undefined,
    pattern: undefined,
    size: 'medium',
    step: undefined,
    type: 'date',
  },
}

/**
 * Date inputs allows users to enter a date. The value is always formatted `YYYY-MM-DD`, while the displayed
 * value will be formatted according to the user's locale.
 */
export const Date: Story = {
  args: {
    ...Example.args,
    type: 'date',
  },
}

/**
 * Time inputs allow users to enter a specific time (hours and minutes, and optionally, seconds). The value
 * of the time is always in 24-hour format that includes leading zeros: `HH:mm`, regardless of the input
 * format, which is likely to be selected based on the user's locale (or by the user agent).
 *
 * If the time includes seconds (because, for example, `step` is set to 1 second), the format is `HH:mm:ss`.
 */
export const Time: Story = {
  args: {
    ...Example.args,
    type: 'time',
  },
}

/**
 * Datetime inputs allows users to enter a date and time. The value represents a local date and time,
 * not necessarily the user's local date and time. In other words, the input allows any valid combination
 * of year, month, day, hour, and minute—even if such a combination is invalid in the user's local time
 * zone (such as the one hour within a daylight saving time spring-forward transition gap).
 *
 * The value is always formatted `YYYY-MM-DDTHH:mm`, while the displayed value will be formatted according
 * to the user's locale.
 */
export const Datetime: Story = {
  args: {
    ...Example.args,
    type: 'datetime-local',
  },
}

/**
 * Date/time inputs can be disabled. A disable input will not receive the `click` event, and are not submitted
 * with the form they're associated with. Further, the "Show picker" button will also be disabled.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

/**
 * Date/time inputs can be marked as read-only. When they are, the "Show picker" button will be hidden.
 * Unlike disabled inputs, read-only inputs participate in form submission.
 */
export const Readonly: Story = {
  args: {
    ...Example.args,
    readOnly: true,
  },
}

/**
 * Date/time inputs can be marked as busy. This is particularly useful when asynchronous validation is being
 * performed on the input's value.
 */
export const Busy: Story = {
  args: {
    ...Example.args,
    isBusy: true,
    value: '2025-10-01',
  },
}

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it has been "touched", meaning the control has been focused then blurred.
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    isTouched: true,
    required: true,
  },
}

/**
 * By default, date/time inputs will fill their parent's width. This can be constrained by providing
 * a `maxWidth`.
 */
export const MaxWidth: Story = {
  args: {
    ...Example.args,
    maxWidth: 'var(--size-64)',
  },
}
