import { ChipSelectChip } from './chip'
import { SproutIcon } from '#src/icons/sprout'
import { StarIcon } from '#src/icons/star'
import { useArgs } from 'storybook/preview-api'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
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
} satisfies Meta<typeof ChipSelectChip>

export default meta

type Story = StoryObj<typeof meta>

/**
 * In their simplest form, chips consist of a visual label. Importantly, all chips within a `ChipSelect`
 * should have the same visual style.
 */
export const Example: Story = {
  args: {
    'aria-label': undefined,
    checked: undefined,
    children: 'Label',
    disabled: false,
    form: undefined,
    icon: 'None',
    isExclusive: false,
    maxWidth: undefined,
    name: 'foo',
    onChange: undefined,
    overflow: undefined,
    size: 'small',
    value: 'abc-123',
  },
}

/**
 * Icons can be placed in front of the chip's label. Again, if one chip in the `ChipSelect` has an icon,
 * all chips should have an icon.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    icon: 'Sprout',
  },
}

/**
 * When no visual label is provided, an icon and accessible label should both be considered mandatory.
 * Again, if one chip in the `ChipSelect` uses an icon-only style, all other chips should also use
 * an icon-only style.
 */
export const IconOnly: Story = {
  name: 'Icon-only',
  args: {
    ...Example.args,
    'aria-label': 'Label',
    children: undefined,
    icon: 'Sprout',
  },
}

/**
 * There are three sizes available for chips. Like labels and icons, all chips within a `ChipSelect`
 * should have the same size.
 */
export const Sizes: Story = {
  args: {
    ...Icons.args,
  },
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
}

/**
 * When a chip is selected, it's checked state will be true. This can either be controlled, just like
 * any native checkbox input, or uncontrolled. This example takes an uncontrolled approach, defaulting
 * the checked state to `true` using `defaultChecked`.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    defaultChecked: true,
  },
}

/**
 * Chips can also be disabled. Importantly, disabled chips do not participate in form submission.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

/**
 * Long labels will truncate when there is not enough space available.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
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
}

/**
 * In some cases, it may be necessary to limit the width of an option directly, rather than rely on
 * its parent container. This is achieved using the `maxWidth` prop.
 */
export const MaxWidth: Story = {
  name: 'Max-width',
  args: {
    ...Example.args,
    children: 'This chip option has its own maximum width constraint',
    maxWidth: '--size-80',
  },
}

/**
 * When multiple chips with the same name and associated with the same form are marked as "exclusive",
 * they will ensure all other related chips are unchecked when they themselves are checked. This results
 * in radio-group-like behaviour, only individual chips can still be unchecked.
 *
 * Importantly, this behaviour works out-of-the-box when the checked state of each chip is uncontrolled.
 * In cases where the checked state is controlled, it is the consumer's responsibility to facilitate
 * this behaviour.
 */
export const SingleSelect: Story = {
  name: 'Single-select',
  args: {
    ...IconOnly.args,
    isExclusive: true,
  },
  argTypes: {
    value: {
      control: false,
    },
  },
  render: (args) => {
    return (
      <form style={{ display: 'inline-flex', gap: 'var(--spacing-2)' }}>
        <ChipSelectChip {...args} defaultChecked value="1" />
        <ChipSelectChip {...args} value="2" />
      </form>
    )
  },
}

/**
 * In contrast, when chips are NOT marked as exclusive, they behave like a normal checkbox group, where
 * multiple chips can be checked at the same time.
 */
export const MultiSelect: Story = {
  name: 'Multi-select',
  args: {
    ...IconOnly.args,
    isExclusive: false,
  },
  argTypes: SingleSelect.argTypes,
  render: SingleSelect.render,
}

/**
 * Since chips are native checkbox elements (`<input type="checkbox">`). As such, their checked state
 * can be controlled in the same manner as any other checkbox. However, when controlling the checked
 * state of an option, consumers become responsible for any side effects that may need to occur, such as
 * unchecking other options in the `ChipSelect`.
 */
export const Controlled: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    return <ChipSelectChip {...args} onChange={(event) => setArgs({ checked: event.currentTarget.checked })} />
  },
}
