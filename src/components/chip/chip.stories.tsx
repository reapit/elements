import { Chip } from './chip'
import { Tooltip } from '../tooltip'
import { useTooltip } from '../tooltip/use-tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    children: {
      control: 'text',
    },
    isDisabled: {
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

/**
 * The filter chip variant is primarily used in a filter bar to indicate what
 * filters have been applied to a table
 */
export const FilterChip: Story = {
  args: {
    children: 'Label',
    isDisabled: false,
    willTruncateLabel: false,
    variant: 'filter',
  },
}

/**
 * The selection chip variant is used in select controls and other similar
 * components to display what selections have been made
 */
export const SelectionChip: Story = {
  args: {
    ...FilterChip.args,
    variant: 'selection',
  },
}

/**
 * Chips can be disabled in order to prevent their removal. Disabled chips should
 * remain focusable in order to keep them in the accessibility tree. If it is
 * important to communicate why the chip is disabled, a tooltip can be provided.
 */
export const Disabled: Story = {
  args: {
    ...FilterChip.args,
    isDisabled: true,
  },
  render: function DisabledChipStory(args) {
    const tooltip = useTooltip()
    return (
      <>
        <Chip {...args} {...tooltip.getTriggerProps()} />
        <Tooltip description="Because reasons" position="top" {...tooltip.getTooltipProps()} />
      </>
    )
  },
}

/** By default, long labels will wrap if there is not enough space is available. */
export const Wrapping: Story = {
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
