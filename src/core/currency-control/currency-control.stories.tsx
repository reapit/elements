import preview from '#.storybook/preview'
import { CurrencyControl } from './currency-control'

const meta = preview.meta({
  title: 'Core/CurrencyControl',
  component: CurrencyControl,
  argTypes: {
    currency: {
      control: 'select',
      options: ['GBP', 'USD', 'EUR', 'SEK', 'JPY', 'AUD', 'CHF'],
    },
    errorText: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    locale: {
      control: 'select',
      options: ['en-AU', 'en-GB', 'en-US', 'de-DE', 'fr-FR', 'ja-JP', 'sv-SE'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
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
    currency: 'GBP',
    defaultValue: '1234.5',
    disabled: false,
    errorText: '',
    helpText: '',
    label: 'Amount',
    locale: 'en-GB',
    name: 'amount',
    placeholder: '',
    readOnly: false,
    required: false,
    showValidity: undefined,
    size: 'medium',
  },
})

/**
 * The currency symbol is placed automatically as a prefix or suffix based on the locale. The
 * fraction-digit precision is intrinsic to the currency (e.g. 2 for GBP/USD/EUR, 0 for JPY).
 */
export const Currencies = Example.extend({
  argTypes: {
    currency: { control: false },
    locale: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <CurrencyControl {...args} label="GBP" currency="GBP" locale="en-GB" />
      <CurrencyControl {...args} label="USD" currency="USD" locale="en-US" />
      <CurrencyControl {...args} label="EUR" currency="EUR" locale="de-DE" />
      <CurrencyControl {...args} label="SEK" currency="SEK" locale="sv-SE" />
      <CurrencyControl {...args} label="JPY" currency="JPY" locale="ja-JP" defaultValue="1234" />
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
      <CurrencyControl {...args} size="small" />
      <CurrencyControl {...args} size="medium" />
      <CurrencyControl {...args} size="large" />
    </>
  ),
})

/**
 * Optional help text can be provided to give more context about the input.
 */
export const HelpText = Example.extend({
  args: {
    helpText: 'Enter the transaction amount',
  },
})

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when its value does not meet the validation constraints applied to it.
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the
 * presence of `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: 'Amount is required',
    required: true,
    showValidity: true,
  },
})

/**
 * Currency controls can be disabled. A disabled input will not receive the `click` event, and is
 * not submitted with the form it is associated with.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Currency controls can be marked as read-only. Unlike disabled inputs, read-only inputs
 * participate in form submission.
 */
export const Readonly = Example.extend({
  name: 'Read-only',
  args: {
    readOnly: true,
  },
})

/**
 * By default, currency controls fill their parent's width. This can be constrained by
 * providing a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: 'Max-width',
  args: {
    maxWidth: 'var(--size-64)',
  },
})
