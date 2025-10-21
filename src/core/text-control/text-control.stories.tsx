import { CheckIcon } from '#src/icons/check'
import { LocationIcon } from '#src/icons/location'
import { TextControl } from './text-control'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TextControl',
  component: TextControl,
  argTypes: {
    errorText: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    leadingIcon: {
      control: 'select',
      options: ['None', 'Check', 'Location'],
      mapping: {
        None: undefined,
        Check: <CheckIcon />,
        Location: <LocationIcon />,
      },
    },
    placeholder: {
      control: 'text',
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
    type: {
      control: 'select',
      options: ['email', 'password', 'search', 'tel', 'text', 'url'],
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
} satisfies Meta<typeof TextControl>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    defaultValue: '',
    disabled: false,
    errorText: '',
    helpText: '',
    label: 'Label',
    maxLength: undefined,
    minLength: undefined,
    name: 'myInput',
    leadingIcon: 'None',
    pattern: undefined,
    prefix: '',
    placeholder: '',
    readOnly: false,
    required: false,
    showValidity: false,
    size: 'medium',
    suffix: '',
    trailingIcon: 'None',
    type: 'text',
    value: undefined,
  },
}

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
    defaultValue: 'Text',
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
      <TextControl {...args} size="small" />
      <TextControl {...args} size="medium" />
      <TextControl {...args} size="large" />
    </>
  ),
}

/**
 * Optional help text can be provided to give more context about the text input.
 */
export const HelpText: Story = {
  args: {
    ...Example.args,
    helpText: 'Optional help text',
  },
}

/**
 * Icons can be provided at the start or end of the input.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    leadingIcon: <LocationIcon />,
    trailingIcon: <CheckIcon />,
  },
}

/**
 * Likewise, prefixes or suffixes can be provided. Compared to icons, these will typically be plain text
 * such as currency symbols or units of measurement. Importantly, affixes and icons are mutually exclusive;
 * if both are provided, only the affix will be rendered.
 */
export const Affixes: Story = {
  args: {
    ...Example.args,
    defaultValue: '50',
    prefix: '$',
    suffix: '%',
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
      <TextControl {...args} suffix={undefined} />
      <TextControl {...args} prefix={undefined} />
    </>
  ),
}

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid: Story = {
  args: {
    ...Icons.args,
    errorText: 'Error message',
    required: true,
    showValidity: true,
  },
}

/**
 * Text inputs can be disabled. A disabled input will not receive the `click` event, and are not submitted
 * with the form they're associated with.
 */
export const Disabled: Story = {
  args: {
    ...Icons.args,
    disabled: true,
  },
}

/**
 * Text inputs can be marked as read-only. Unlike disabled inputs, read-only inputs will participate
 * in form submission.
 */
export const Readonly: Story = {
  name: 'Read-only',
  args: {
    ...Icons.args,
    readOnly: true,
  },
}

/**
 * Text inputs can be marked as busy. This is particularly useful when asynchronous validation is being
 * performed on the input's value.
 */
export const Busy: Story = {
  args: {
    ...Icons.args,
    isBusy: true,
  },
}

/**
 * Placeholder text can be provided to help user's understand what the input is for. This is typically
 * used when the input has no visual label.
 */
export const Placeholder: Story = {
  args: {
    ...Example.args,
    placeholder: 'Placeholder',
  },
}

/**
 * By default, text inputs will fill their parent's width. This can be constrained by providing a `maxWidth`.
 */
export const MaxWidth: Story = {
  name: 'Max-width',
  args: {
    ...Icons.args,
    maxWidth: 'var(--size-64)',
  },
}

/**
 * The label, help text and error text will all wrap naturally when the form control does not have sufficient
 * space available for them.
 */
export const Wrapping: Story = {
  args: {
    ...MaxWidth.args,
    label: 'This is a long label that won’t fit on a single line',
    helpText: 'This is a long optional help text that won’t fit on a single line',
  },
}
