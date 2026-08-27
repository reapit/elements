import preview from "#.storybook/preview";

import { CurrencyInput } from "./currency-input";

const meta = preview.meta({
  title: "Input and selection/CurrencyInput",
  component: CurrencyInput,
  argTypes: {
    currency: {
      control: "select",
      options: ["GBP", "USD", "EUR", "SEK", "JPY", "AUD", "CHF"],
    },
    locale: {
      control: "select",
      options: ["en-AU", "en-GB", "en-US", "de-DE", "fr-FR", "ja-JP", "sv-SE"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    value: {
      control: "text",
      table: {
        type: {
          summary: "string | number | readonly string[] | undefined",
        },
      },
    },
  },
});

export const Example = meta.story({
  args: {
    "aria-label": "Amount",
    currency: "GBP",
    defaultValue: "1234.5",
    disabled: false,
    locale: "en-GB",
    name: "amount",
    placeholder: "",
    readOnly: false,
    required: false,
    showValidity: false,
    size: "medium",
  },
});

/**
 * The currency symbol is placed automatically as a prefix or suffix based on the locale. The
 * same currency can appear in different positions depending on the reader's locale: for
 * example, EUR precedes the number in some locales and follows it in others.
 *
 * The fraction-digit precision (e.g. 2 for GBP/USD/EUR, 0 for JPY) is an intrinsic property
 * of the currency and is applied automatically.
 */
export const Currencies = Example.extend({
  argTypes: {
    currency: { control: false },
    locale: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "var(--spacing-6)" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <CurrencyInput {...args} aria-label="GBP" currency="GBP" locale="en-GB" />
      <CurrencyInput {...args} aria-label="USD" currency="USD" locale="en-US" />
      <CurrencyInput {...args} aria-label="EUR" currency="EUR" locale="de-DE" />
      <CurrencyInput {...args} aria-label="SEK" currency="SEK" locale="sv-SE" />
      <CurrencyInput {...args} aria-label="JPY" currency="JPY" locale="ja-JP" defaultValue="1234" />
    </>
  ),
});

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  argTypes: {
    size: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexFlow: "row nowrap", gap: "var(--spacing-6)" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <CurrencyInput {...args} size="small" />
      <CurrencyInput {...args} size="medium" />
      <CurrencyInput {...args} size="large" />
    </>
  ),
});

/**
 * Currency inputs can be disabled. A disabled input will not receive the `click` event, and is
 * not submitted with the form it is associated with.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});

/**
 * Currency inputs can be marked as read-only. Unlike disabled inputs, read-only inputs
 * participate in form submission.
 */
export const Readonly = Example.extend({
  name: "Read-only",
  args: {
    readOnly: true,
  },
});
