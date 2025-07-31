import { Chip } from './chip'
import { DeprecatedTooltip, useDeprecatedTooltip } from '#src/deprecated/tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Chip',
  component: Chip,
  argTypes: {
    'aria-disabled': {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: 'radio',
      options: ['filter', 'selection'],
    },
  },
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-disabled': false,
    children: 'Label',
    disabled: false,
    willTruncateLabel: false,
    variant: 'filter',
  },
}

/**
 * The filter chip variant is primarily used in a filter bar to indicate what
 * filters have been applied to a table
 */
export const FilterChip: Story = {
  args: {
    ...Example.args,
    variant: 'filter',
  },
}

/**
 * The selection chip variant is used in select controls and other similar
 * components to display what selections have been made
 */
export const SelectionChip: Story = {
  args: {
    ...Example.args,
    variant: 'selection',
  },
}

/**
 * Chips can be disabled using `aria-disabled` or `disabled`. In both cases, click events will be ignored, however,
 * `aria-disabled` allows the chip to still be focusable, which, for example, allows tooltips to still be displayed.
 * A `disabled` chip is also `aria-disabled`, regardless of the value of `aria-disabled`.
 */
export const Disabled: Story = {
  args: {
    ...FilterChip.args,
    'aria-disabled': true,
  },
  render: function DisabledChipStory(args) {
    const tooltip = useDeprecatedTooltip()
    return (
      <>
        <Chip {...args} {...tooltip.getTriggerProps()} />
        <DeprecatedTooltip description="Because reasons" position="top" {...tooltip.getTooltipProps()} />
      </>
    )
  },
}

/** By default, long labels will wrap if there is not enough space is available. */
export const Overflow: Story = {
  args: {
    ...FilterChip.args,
    children: "This very long label will wrap because it's parent is not wide enough",
    maxWidth: '--size-80',
  },
}

/** Line breaks within an otherwise unbreakable string are also permitted to prevent text from overflowing the chip. */
export const LongWords: Story = {
  args: {
    ...FilterChip.args,
    children: 'Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu, NZ',
    maxWidth: '--size-80',
  },
}

/**
 * Truncation is an optional behaviour that can be enabled to prevent the label from
 * wrapping on multiple lines
 */
export const Truncation: Story = {
  args: {
    ...FilterChip.args,
    children: 'Truncation can be applied when necessary',
    maxWidth: '--size-80',
    willTruncateLabel: true,
  },
}
