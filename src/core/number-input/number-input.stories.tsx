import preview from '#.storybook/preview'
import { CheckIcon } from '#src/icons/check'
import { LocationIcon } from '#src/icons/location'
import { NumberInput } from './number-input'

const meta = preview.meta({
  title: 'Input and selection/NumberInput',
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
 * and other formatting behaviour. Setting `useGrouping: false` disables the thousands separator.
 */
export const FormatOptions = Example.extend({
  args: {
    defaultValue: '1234567.89',
  },
  argTypes: {
    formatOptions: { control: false },
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
      <NumberInput
        {...args}
        aria-label="Fixed decimal places"
        formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      />
      <NumberInput {...args} aria-label="No grouping" formatOptions={{ useGrouping: false }} />
    </>
  ),
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
 * When `formatOptions.style` is `'currency'`, `'percent'`, or `'unit'`, the localised affix
 * (currency symbol, percent sign, or unit label) is derived automatically and placed as a
 * prefix or suffix according to the locale. The affix is never typed into the value — the
 * input value remains a plain numeric string — and it is omitted from the formatted overlay
 * so the symbol never appears twice.
 *
 * For `style: 'percent'`, values are edited and stored as model-space decimals (e.g. `0.255`
 * displays as `25.5%`). The default entry cap is 2 model-space fraction digits; pass an
 * explicit `maximumFractionDigits` (in display-space) to allow more decimal precision.
 */
export const FormattingStyles = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <NumberInput
        {...args}
        aria-label="Currency"
        defaultValue="1500"
        locale="en-GB"
        formatOptions={{ style: 'currency', currency: 'GBP' }}
      />
      <NumberInput {...args} aria-label="Percent" defaultValue="0.255" formatOptions={{ style: 'percent' }} />
      <NumberInput
        {...args}
        aria-label="Unit"
        defaultValue="1500"
        formatOptions={{ style: 'unit', unit: 'kilogram' }}
      />
    </>
  ),
})

/**
 * Supplying any affix prop (`prefix`, `suffix`, `leadingIcon`, or `trailingIcon`) provides an
 * arbitrary affix that is not tied to a formatting style — for example, a unit such as `kg` or a
 * billing period such as `/month`. An explicit affix takes precedence over the automatic
 * derivation from `formatOptions.style`.
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
      <NumberInput {...args} prefix={undefined} suffix="/month" />
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
