import preview from "#.storybook/preview";
import { CheckIcon } from "#src/icons/check";
import { LocationIcon } from "#src/icons/location";

import { NumberControl } from "./number-control";

const meta = preview.meta({
  title: "Input and selection/NumberControl",
  component: NumberControl,
  argTypes: {
    errorText: {
      control: "text",
    },
    helpText: {
      control: "text",
    },
    label: {
      control: "text",
    },
    leadingIcon: {
      control: "select",
      options: ["None", "Check", "Location"],
      mapping: {
        None: undefined,
        Check: <CheckIcon />,
        Location: <LocationIcon />,
      },
    },
    locale: {
      control: "select",
      options: ["en-GB", "en-US", "de-DE", "fr-FR", "ja-JP"],
    },
    placeholder: {
      control: "text",
    },
    prefix: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    suffix: {
      control: "text",
    },
    trailingIcon: {
      control: "select",
      options: ["None", "Check", "Location"],
      mapping: {
        None: undefined,
        Check: <CheckIcon />,
        Location: <LocationIcon />,
      },
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
    defaultValue: "1234567.89",
    disabled: false,
    errorText: "",
    helpText: "",
    label: "Amount",
    locale: "en-GB",
    name: "amount",
    leadingIcon: "None",
    placeholder: "",
    prefix: "",
    readOnly: false,
    required: false,
    showValidity: undefined,
    size: "medium",
    suffix: "",
    trailingIcon: "None",
    value: undefined,
  },
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
      <NumberControl {...args} size="small" />
      <NumberControl {...args} size="medium" />
      <NumberControl {...args} size="large" />
    </>
  ),
});

/**
 * Optional help text can be provided to give more context about the input.
 */
export const HelpText = Example.extend({
  args: {
    helpText: "Enter the transaction amount",
  },
});

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when its value does not meet the validation constraints applied to it.
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: "Amount is required",
    required: true,
    showValidity: true,
  },
});

/**
 * When `formatOptions.style` is `'currency'`, `'percent'`, or `'unit'`, the localised affix
 * (currency symbol, percent sign, or unit label) is derived automatically and placed as a
 * prefix or suffix according to the locale. The affix is never typed into the value, and it is
 * omitted from the formatted overlay so the symbol never appears twice.
 */
export const FormattingStyles = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "var(--spacing-6)" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <NumberControl
        {...args}
        label="Currency"
        defaultValue="1500"
        locale="en-GB"
        formatOptions={{ style: "currency", currency: "GBP" }}
      />
      <NumberControl
        {...args}
        label="Percent"
        defaultValue="25"
        formatOptions={{ style: "percent" }}
      />
      <NumberControl
        {...args}
        label="Unit"
        defaultValue="1500"
        formatOptions={{ style: "unit", unit: "kilogram" }}
      />
    </>
  ),
});

/**
 * Supplying any affix prop (`prefix`, `suffix`, `leadingIcon`, or `trailingIcon`) provides an
 * arbitrary affix that is not tied to a formatting style , such as a unit such as `kg` or a
 * billing period such as `/month`. An explicit affix takes precedence over the automatic
 * derivation from `formatOptions.style`.
 */
export const Affixes = Example.extend({
  args: {
    defaultValue: "1500",
    prefix: "\u00A3",
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
      <NumberControl {...args} />
      <NumberControl {...args} prefix={undefined} suffix="/month" />
    </>
  ),
});

/**
 * Number inputs can be disabled. A disabled input will not receive the `click` event, and is
 * not submitted with the form it is associated with.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});

/**
 * Number inputs can be marked as read-only. Unlike disabled inputs, read-only inputs
 * participate in form submission.
 */
export const Readonly = Example.extend({
  name: "Read-only",
  args: {
    readOnly: true,
  },
});

/**
 * `formatOptions` accepts any `Intl.NumberFormatOptions` to control decimal places, grouping,
 * and other formatting behaviour.
 */
export const FormatOptions = Example.extend({
  args: {
    defaultValue: "1234.5",
    formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  },
});

/**
 * By default, number controls will fill their parent's width. This can be constrained by
 * providing a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    maxWidth: "var(--size-64)",
  },
});
