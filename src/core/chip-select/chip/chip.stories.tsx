import preview from '#.storybook/preview'
import { ChipSelectChip } from './chip'
import { SproutIcon } from '#src/icons/sprout'
import { StarIcon } from '#src/icons/star'

const meta = preview.meta({
  title: 'Core/ChipSelect/Chip',
  component: ChipSelectChip,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: ['None', 'Star', 'Sprout'],
      mapping: {
        None: undefined,
        Star: <StarIcon />,
        Sprout: <SproutIcon />,
      },
    },
    disabled: {
      control: 'boolean',
    },
    maxWidth: {
      control: 'text',
      table: { type: { summary: '--size-*' } },
    },
    onChange: {
      control: false,
    },
    overflow: {
      control: 'text',
      table: { type: { summary: '"truncate"' } },
    },
    value: {
      control: 'text',
    },
  },
})

/**
 * In their simplest form, chips consist of a visual label. Importantly, all chips within a `ChipSelect`
 * should have the same visual style.
 */
export const Example = meta.story({
  args: {
    'aria-label': undefined,
    checked: undefined,
    children: 'Label',
    disabled: false,
    form: undefined,
    icon: 'None',
    maxWidth: undefined,
    name: 'foo',
    onChange: undefined,
    overflow: undefined,
    readOnly: false,
    size: 'small',
    value: 'abc-123',
  },
})

/**
 * Icons can be placed in front of the chip's label. Again, if one chip in the `ChipSelect` has an icon,
 * all chips should have an icon.
 */
export const Icons = Example.extend({
  args: {
    icon: 'Sprout',
  },
})

/**
 * When no visual label is provided, an icon and accessible label should both be considered mandatory.
 * Again, if one chip in the `ChipSelect` uses an icon-only style, all other chips should also use
 * an icon-only style.
 */
export const IconOnly = Example.extend({
  name: 'Icon-only',
  args: {
    'aria-label': 'Label',
    children: undefined,
    icon: 'Sprout',
  },
})

/**
 * There are three sizes available for chips. Like labels and icons, all chips within a `ChipSelect`
 * should have the same size.
 */
export const Sizes = Icons.extend({
  argTypes: {
    size: {
      control: false,
    },
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <>
      <ChipSelectChip {...args} size="small" />
      <ChipSelectChip {...args} size="medium" />
      <ChipSelectChip {...args} size="large" />
    </>
  ),
})

/**
 * When a chip is selected, it's checked state will be true. This can either be controlled, just like
 * any native checkbox input, or uncontrolled. This example takes an uncontrolled approach, defaulting
 * the checked state to `true` using `defaultChecked`.
 */
export const Selected = Example.extend({
  args: {
    defaultChecked: true,
  },
})

/**
 * Chips can be read-only. When they are, they will still be focusable and, if checked, will participate
 * in form submission, but their checked state will not be changed when clicked or activated.
 */
export const ReadOnly = Example.extend({
  name: 'Read-only',
  args: {
    readOnly: true,
  },
})

/**
 * Chips can also be disabled. While they look the same as readonly chips, disabled chips do not
 * participate in form submission.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Long labels will truncate when there is not enough space available.
 */
export const Truncation = Example.extend({
  args: {
    children: 'Truncation can be applied when necessary',
    overflow: 'truncate',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * In some cases, it may be necessary to limit the width of an option directly, rather than rely on
 * its parent container. This is achieved using the `maxWidth` prop.
 */
export const MaxWidth = Example.extend({
  name: 'Max-width',
  args: {
    children: 'This chip option has its own maximum width constraint',
    maxWidth: '--size-80',
  },
})
