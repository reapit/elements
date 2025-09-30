import { CheckIcon } from '#src/icons/check'
import { LocationIcon } from '#src/icons/location'
import { TextInput } from './text-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TextInput',
  component: TextInput,
  argTypes: {
    leadingIcon: {
      control: 'select',
      option: ['None', 'Check', 'Location'],
      mapping: {
        None: undefined,
        Check: <CheckIcon />,
        Location: <LocationIcon />,
      },
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
      option: ['None', 'Check', 'Location'],
      mapping: {
        None: undefined,
        Check: <CheckIcon />,
        Location: <LocationIcon />,
      },
    },
    type: {
      control: 'select',
      options: [
        'checkbox',
        'email',
        'date',
        'datetime-local',
        'month',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
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
} satisfies Meta<typeof TextInput>

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
    maxLength: undefined,
    minLength: undefined,
    pattern: undefined,
    size: 'medium',
    type: 'text',
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
      <TextInput {...args} suffix={undefined} />
      <TextInput {...args} prefix={undefined} />
    </>
  ),
}

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it has been "touched", meaning the control has been focused then blurred.
 */
export const Invalid: Story = {
  args: {
    ...Icons.args,
    isTouched: true,
    required: true,
  },
}

/**
 * Text inputs can be disabled. A disable input will not receive the `click` event, and are not submitted
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
  args: {
    ...Icons.args,
    maxWidth: 'var(--size-64)',
  },
}
