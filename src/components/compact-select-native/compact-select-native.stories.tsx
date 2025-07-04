import { CompactSelectNative } from './compact-select-native'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/CompactSelectNative',
  component: CompactSelectNative,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Simple', 'With Groups'],
      mapping: {
        Simple: (
          <>
            <option value="">Select portfolio</option>
            <option value="portfolio1">Portfolio 1</option>
            <option value="portfolio2">Portfolio 2</option>
            <option value="portfolio3">Portfolio 3</option>
            <option value="portfolio4">Portfolio 4 with a long name</option>
          </>
        ),
        'With Groups': (
          <>
            <option value="">Select portfolio</option>
            <optgroup label="Preferred Portfolios">
              <option value="portfolio1">Portfolio 1</option>
              <option value="portfolio2">Portfolio 2</option>
            </optgroup>
            <optgroup aria-label="Other Portfolios">
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
} satisfies Meta<typeof CompactSelectNative>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-label': 'Portfolio',
    children: 'Simple',
    size: 'small',
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
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <CompactSelectNative {...args} size="small" />
      <CompactSelectNative {...args} size="medium" />
      <CompactSelectNative {...args} size="large" />
    </>
  ),
}

/**
 * If the select's options are potentially long, the `maxWidth` prop can be used to limit how wide
 * the select will grow when long options are selected.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    defaultValue: 'portfolio4',
    maxWidth: '100px',
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
 * The initial value of the select, when it's value is not controlled, can be provided using `defaultValue`.
 */
export const DefaultValue: Story = {
  name: 'Default value',
  args: {
    ...Example.args,
    defaultValue: 'portfolio1',
  },
}

/**
 * The value of the select can be controlled by providing an explicit `value`. In this example, the select's value is
 * pinned to "Portfolio 1" and, because that controlled value is not updated when another option is selected, it does
 * not change.
 */
export const ControlledValue: Story = {
  name: 'Controlled value',
  args: {
    ...Example.args,
    value: 'portfolio1',
  },
}
