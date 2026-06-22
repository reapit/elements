import preview from '#.storybook/preview'
import { Chip } from './chip'
import { Tooltip } from '#src/core/tooltip'

import { useId } from 'react'

const meta = preview.meta({
  title: 'Indicators and status/Chip',
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
    overflow: {
      control: 'radio',
      options: ['undefined', 'truncate'],
      mapping: {
        undefined: undefined,
        truncate: 'truncate',
      },
    },
    variant: {
      control: 'radio',
      options: ['filter', 'selection'],
    },
  },
})

export const Example = meta.story({
  args: {
    'aria-disabled': false,
    children: 'Label',
    disabled: false,
    maxWidth: undefined,
    overflow: undefined,
    variant: 'filter',
  },
})

/**
 * The filter chip variant is primarily used in a filter bar to indicate what
 * filters have been applied to a table
 */
export const FilterChip = Example.extend({
  args: {
    variant: 'filter',
  },
})

/**
 * The selection chip variant is used in select controls and other similar
 * components to display what selections have been made
 */
export const SelectionChip = Example.extend({
  args: {
    variant: 'selection',
  },
})

/**
 * Chips can be disabled using `aria-disabled` or `disabled`. In both cases,
 * click events will be ignored, however, `aria-disabled` allows the chip to
 * still be focusable, which, for example, allows tooltips to still be displayed.
 * A `disabled` chip is also `aria-disabled`, regardless of the value of
 * `aria-disabled`.
 */
export const Disabled = FilterChip.extend({
  args: {
    'aria-disabled': true,
  },
  render: function DisabledChipStory(args) {
    const chipId = useId()
    return (
      <>
        <Chip
          {...args}
          {...Tooltip.getTriggerProps({ id: chipId, tooltipId: 'tooltip', tooltipPurpose: 'describe' })}
        />
        <Tooltip id="tooltip" triggerId={chipId}>
          Because reasons
        </Tooltip>
      </>
    )
  },
})

/**
 * By default, long labels will wrap if there is not enough space is available.
 */
export const Wrapping = FilterChip.extend({
  args: {
    children: "This very long label will wrap because it's parent is not wide enough",
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
 * Line breaks within an otherwise unbreakable string are also permitted to prevent text
 * from overflowing the chip.
 */
export const LongWords = Wrapping.extend({
  args: {
    children: 'Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu, NZ',
  },
  decorators: Wrapping.input.decorators,
})

/**
 * Truncation is an optional behaviour that can be enabled to prevent the label from
 * wrapping on multiple lines
 */
export const Truncation = FilterChip.extend({
  args: {
    children: 'Truncation can be applied when necessary',
    overflow: 'truncate',
  },
  decorators: Wrapping.input.decorators,
})

/**
 * In some cases, it may be necessary to limit the width of a chip directly, rather than
 * relying on its parent container.
 */
export const MaxWidth = FilterChip.extend({
  name: 'Max-width',
  args: {
    children: 'This chip has its own maximum width constraint',
    maxWidth: '--size-80',
  },
})
