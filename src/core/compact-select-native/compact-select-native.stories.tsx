import preview from '#.storybook/preview'
import { CompactSelectNative } from './compact-select-native'

const meta = preview.meta({
  title: 'Core/CompactSelectNative',
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
})

export const Example = meta.story({
  args: {
    'aria-label': 'Portfolio',
    children: 'Simple',
    size: 'small',
  },
})

/**
 * Options for the select can be grouped using the native `optgroup` element.
 */
export const OptionGroups = Example.extend({
  args: {
    children: 'With Groups',
  },
})

/**
 * The compact select supports three sizes: `small`, `medium`, and `large`.
 */
export const Sizes = Example.extend({
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
})

/**
 * The initial value of the select, when it's value is not controlled, can be provided using `defaultValue`.
 */
export const DefaultValue = Example.extend({
  name: 'Default value',
  args: {
    defaultValue: 'portfolio1',
  },
})

/**
 * The value of the select can be controlled by providing an explicit `value`. In this example, the select's value is
 * pinned to "Portfolio 1" and, because that controlled value is not updated when another option is selected, it does
 * not change.
 */
export const ControlledValue = Example.extend({
  name: 'Controlled value',
  args: {
    value: 'portfolio1',
  },
})

/**
 * When the selected option is too long for the available space, it will truncate.
 */
export const Overflow = Example.extend({
  args: {
    defaultValue: 'portfolio4',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #FA00FF', maxWidth: '150px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * The `maxWidth` prop can also be used to limit how wide the select will grow. This can be useful
 * when we don't want to allow the select to grow as wide as its container.
 */
export const MaxWidth = Overflow.extend({
  name: 'Max-width',
  args: {
    defaultValue: 'portfolio4',
    maxWidth: '100px',
  },
  decorators: Overflow.input.decorators,
})
