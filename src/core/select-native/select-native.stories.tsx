import { SelectNative } from './select-native'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/SelectNative',
  component: SelectNative,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Simple', 'With Groups'],
      mapping: {
        Simple: (
          <>
            <option value="">Select an option</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="other">Some other option with a long name</option>
          </>
        ),
        'With Groups': (
          <>
            <option value="">Select portfolio</option>
            <optgroup label="Preferred Portfolios">
              <option value="portfolio1">Portfolio 1</option>
              <option value="portfolio2">Portfolio 2</option>
            </optgroup>
            <optgroup label="Other Portfolios">
              <option value="portfolio3">Portfolio 3</option>
              <option value="portfolio4">Portfolio 4</option>
              <option value="portfolio5">Portfolio 5</option>
            </optgroup>
          </>
        ),
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof SelectNative>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    autoComplete: 'off',
    children: 'Simple',
    defaultValue: undefined,
    form: undefined,
    maxWidth: undefined,
    name: 'mySelect',
    required: false,
    size: 'small',
    value: undefined,
  },
}

/**
 * Options for the select can be grouped using the native `optgroup` element.
 */
export const OptionGroups: Story = {
  args: {
    ...Example.args,
    children: 'With Groups',
  },
}

/**
 * The compact select supports three sizes: `small`, `medium`, and `large`.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'start' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SelectNative {...args} size="small" />
      <SelectNative {...args} size="medium" />
      <SelectNative {...args} size="large" />
    </>
  ),
}

/**
 * Like all form controls, the native select will display in an invalid state when it's value
 * does not meet the validation constraints applied to it, such as being required, when it has
 * been "touched", meaning the control has been focused then blurred.
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    isTouched: true,
    required: true,
  },
}

/**
 * The initial value of the select, when it's value is not controlled, can be provided using `defaultValue`.
 */
export const DefaultValue: Story = {
  name: 'Default value',
  args: {
    ...Example.args,
    defaultValue: 'residential',
  },
}

/**
 * The value of the select can be controlled by providing an explicit `value`. In this example, the select's value is
 * pinned to "Commercial" and, because that controlled value is not updated when another option is selected, it does
 * not change.
 */
export const ControlledValue: Story = {
  name: 'Controlled value',
  args: {
    ...Example.args,
    value: 'commercial',
  },
}

/**
 * When the selected option is too long for the available space, it will truncate.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    defaultValue: 'other',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #FA00FF', maxWidth: '150px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * The `maxWidth` prop can also be used to limit how wide the select will grow. This can be useful
 * when we don't want to allow the select to grow as wide as its container.
 */
export const MaxWidth: Story = {
  args: {
    ...Overflow.args,
    defaultValue: 'other',
    maxWidth: '100px',
  },
  decorators: Overflow.decorators,
}
