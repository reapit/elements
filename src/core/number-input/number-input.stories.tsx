import preview from '#.storybook/preview'
import { CheckIcon } from '#src/icons/check'
import { LocationIcon } from '#src/icons/location'
import { NumberInput } from './number-input'

const meta = preview.meta({
  title: 'Core/NumberInput',
  component: NumberInput,
  argTypes: {
    leadingIcon: {
      control: 'select',
      options: ['None', 'Check', 'Location'],
      mapping: {
        None: undefined,
        Check: <CheckIcon />,
        Location: <LocationIcon />,
      },
    },
    locale: {
      control: 'select',
      options: ['en-AU', 'en-GB', 'en-US', 'de-DE', 'fr-FR', 'ja-JP'],
    },
    inputMode: {
      control: 'select',
      options: ['decimal', 'numeric'],
    },
    prefix: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    suffix: {
      control: 'text',
    },
    trailingIcon: {
      control: 'select',
      options: ['None', 'Check', 'Location'],
      mapping: {
        None: undefined,
        Check: <CheckIcon />,
        Location: <LocationIcon />,
      },
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
    'aria-label': 'Amount',
    defaultValue: '1234567.89',
    disabled: false,
    locale: 'en-GB',
    name: 'amount',
    placeholder: '',
    readOnly: false,
    required: false,
    showValidity: false,
    size: 'medium',
  },
})

/**
 * The underlying `input.value` always uses a `.` decimal — locale affects only the display.
 */
export const LocaleFormatting = Example.extend({
  argTypes: {
    locale: { control: false },
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
      <NumberInput {...args} locale="en-GB" />
      <NumberInput {...args} locale="de-DE" />
      <NumberInput {...args} locale="fr-FR" />
    </>
  ),
})

/**
 * `formatOptions` accepts any `Intl.NumberFormatOptions` to control decimal places, grouping,
 * and other formatting behaviour.
 */
export const FormatOptions = Example.extend({
  args: {
    defaultValue: '1234.5',
    formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  },
})

/**
 * Setting `inputMode="numeric"` restricts entry to integers: the decimal separator is rejected
 * as you type, and pasted decimals are truncated to their integer part (`12.99` becomes `12`).
 */
export const Numeric = Example.extend({
  args: {
    defaultValue: '1234',
    inputMode: 'numeric',
  },
})

/**
 * A prefix or suffix can provide visual context for the numeric value, such as a currency
 * symbol or unit of measurement.
 */
export const Affixes = Example.extend({
  args: {
    defaultValue: '1500',
    prefix: '\u00A3',
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
      <NumberInput {...args} />
      <NumberInput {...args} prefix={undefined} suffix="kg" />
    </>
  ),
})

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  argTypes: {
    size: { control: false },
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
      <NumberInput {...args} size="small" />
      <NumberInput {...args} size="medium" />
      <NumberInput {...args} size="large" />
    </>
  ),
})

/**
 * The minus sign is permitted by default. Setting `min` to zero or above blocks negative input.
 */
export const NegativeValues = Example.extend({
  args: {
    defaultValue: '-42',
  },
})

/**
 * Number inputs can be disabled.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Number inputs can be marked as read-only.
 */
export const Readonly = Example.extend({
  name: 'Read-only',
  args: {
    readOnly: true,
  },
})
