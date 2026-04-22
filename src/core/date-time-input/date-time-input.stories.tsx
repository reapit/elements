import preview from '#.storybook/preview'
import { DateTimeInput } from './date-time-input'

const meta = preview.meta({
  title: 'Core/DateTimeInput',
  component: DateTimeInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['date', 'datetime-local', 'time'],
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
})

export const Example = meta.story({
  args: {
    'aria-label': 'My input',
    defaultValue: '',
    disabled: false,
    name: 'myInput',
    max: undefined,
    min: undefined,
    pattern: undefined,
    readOnly: false,
    required: false,
    showValidity: false,
    size: 'medium',
    step: undefined,
    type: 'date',
  },
})

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  args: {
    defaultValue: '2025-10-13',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <DateTimeInput {...args} size="small" />
      <DateTimeInput {...args} size="medium" />
      <DateTimeInput {...args} size="large" />
    </>
  ),
})

/**
 * Date inputs allows users to enter a date. The value is always formatted `YYYY-MM-DD`, while the displayed
 * value will be formatted according to the user's locale.
 */
export const Date = Example.extend({
  args: {
    type: 'date',
  },
})

/**
 * Time inputs allow users to enter a specific time (hours and minutes, and optionally, seconds). The value
 * of the time is always in 24-hour format that includes leading zeros: `HH:mm`, regardless of the input
 * format, which is likely to be selected based on the user's locale (or by the user agent).
 *
 * If the time includes seconds (because, for example, `step` is set to 1 second), the format is `HH:mm:ss`.
 */
export const Time = Example.extend({
  args: {
    type: 'time',
  },
})

/**
 * Datetime inputs allows users to enter a date and time. The value represents a local date and time,
 * not necessarily the user's local date and time. In other words, the input allows any valid combination
 * of year, month, day, hour, and minute—even if such a combination is invalid in the user's local time
 * zone (such as the one hour within a daylight saving time spring-forward transition gap).
 *
 * The value is always formatted `YYYY-MM-DDTHH:mm`, while the displayed value will be formatted according
 * to the user's locale.
 */
export const Datetime = Example.extend({
  args: {
    type: 'datetime-local',
  },
})

/**
 * Date/time inputs can be disabled. A disable input will not receive the `click` event, and are not submitted
 * with the form they're associated with. Further, the "Show picker" button will also be disabled.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Date/time inputs can be marked as read-only. When they are, the "Show picker" button will be hidden.
 * Unlike disabled inputs, read-only inputs participate in form submission.
 */
export const Readonly = Example.extend({
  args: {
    readOnly: true,
  },
})

/**
 * Date/time inputs can be marked as busy. This is particularly useful when asynchronous validation is being
 * performed on the input's value.
 */
export const Busy = Example.extend({
  args: {
    isBusy: true,
    value: '2025-10-01',
  },
})

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid = Example.extend({
  args: {
    required: true,
    showValidity: true,
  },
})

/**
 * The input also displays in an invalid state when `aria-invalid="true"` and `showValidity` is true.
 * This supports usage where the element is not natively invalid — for example, via custom logic
 * that does not use the browser's constraint validation API.
 */
export const AriaInvalid = Example.extend({
  name: 'Aria Invalid',
  args: {
    'aria-invalid': true,
    showValidity: true,
  },
})

/**
 * By default, date/time inputs will fill their parent's width. This can be constrained by providing
 * a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: 'Max-width',
  args: {
    maxWidth: 'var(--size-64)',
  },
})
