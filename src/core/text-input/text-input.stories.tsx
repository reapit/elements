import preview from '#.storybook/preview'
import { CheckIcon } from '#src/icons/check'
import { LocationIcon } from '#src/icons/location'
import { TextInput } from './text-input'

const meta = preview.meta({
  title: 'Core/TextInput',
  component: TextInput,
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
      options: ['checkbox', 'email', 'date', 'datetime-local', 'password', 'search', 'tel', 'text', 'time', 'url'],
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
    maxLength: undefined,
    minLength: undefined,
    name: 'myInput',
    pattern: undefined,
    placeholder: '',
    readOnly: false,
    required: false,
    showValidity: false,
    size: 'medium',
    type: 'text',
  },
})

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  args: {
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
      <TextInput {...args} size="small" />
      <TextInput {...args} size="medium" />
      <TextInput {...args} size="large" />
    </>
  ),
})

/**
 * Icons can be provided at the start or end of the input.
 */
export const Icons = Example.extend({
  args: {
    leadingIcon: <LocationIcon />,
    trailingIcon: <CheckIcon />,
  },
})

/**
 * Likewise, prefixes or suffixes can be provided. Compared to icons, these will typically be plain text
 * such as currency symbols or units of measurement. Importantly, affixes and icons are mutually exclusive;
 * if both are provided, only the affix will be rendered.
 */
export const Affixes = Example.extend({
  args: {
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
})

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid = Icons.extend({
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
export const AriaInvalid = Icons.extend({
  name: 'Aria Invalid',
  args: {
    'aria-invalid': true,
    showValidity: true,
  },
})

/**
 * Text inputs can be disabled. A disable input will not receive the `click` event, and are not submitted
 * with the form they're associated with.
 */
export const Disabled = Icons.extend({
  args: {
    disabled: true,
  },
})

/**
 * Text inputs can be marked as read-only. Unlike disabled inputs, read-only inputs will participate
 * in form submission.
 */
export const Readonly = Icons.extend({
  name: 'Read-only',
  args: {
    readOnly: true,
  },
})

/**
 * Text inputs can be marked as busy. This is particularly useful when asynchronous validation is being
 * performed on the input's value.
 */
export const Busy = Icons.extend({
  args: {
    isBusy: true,
  },
})

/**
 * Placeholder text can be provided to help user's understand what the input is for. This is typically
 * used when the input has no visual label.
 */
export const Placeholder = Example.extend({
  args: {
    placeholder: 'Placeholder',
  },
})

/**
 * By default, text inputs will fill their parent's width. This can be constrained by providing a `maxWidth`.
 */
export const MaxWidth = Icons.extend({
  name: 'Max-width',
  args: {
    maxWidth: 'var(--size-64)',
  },
})
