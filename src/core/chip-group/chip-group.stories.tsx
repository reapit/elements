import { ChipGroup } from './chip-group'
import * as ChipStories from '../chip/chip.stories'

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/ChipGroup',
  component: ChipGroup,
  argTypes: {
    children: {
      control: 'radio',
      defaultValue: 'Filter Chips',
      options: ['Filter Chips', 'Selection Chips'],
      mapping: {
        'Filter Chips': [
          <ChipGroup.Item key="1" {...ChipStories.FilterChip.args}>
            Apples
          </ChipGroup.Item>,
          <ChipGroup.Item key="2" {...ChipStories.FilterChip.args}>
            Bananas
          </ChipGroup.Item>,
          <ChipGroup.Item key="3" {...ChipStories.FilterChip.args}>
            Oranges
          </ChipGroup.Item>,
          <ChipGroup.Item key="4" {...ChipStories.FilterChip.args}>
            Peanuts
          </ChipGroup.Item>,
          <ChipGroup.Item key="5" {...ChipStories.FilterChip.args}>
            Strawberries
          </ChipGroup.Item>,
          <ChipGroup.Item key="6" {...ChipStories.FilterChip.args}>
            Watermelons
          </ChipGroup.Item>,
        ],
        'Selection Chips': [
          <ChipGroup.Item key="1" {...ChipStories.SelectionChip.args}>
            Red
          </ChipGroup.Item>,
          <ChipGroup.Item key="2" {...ChipStories.SelectionChip.args}>
            Blue
          </ChipGroup.Item>,
          <ChipGroup.Item key="3" {...ChipStories.SelectionChip.args}>
            Yellow
          </ChipGroup.Item>,
          <ChipGroup.Item key="4" {...ChipStories.SelectionChip.args}>
            Pink
          </ChipGroup.Item>,
          <ChipGroup.Item key="5" {...ChipStories.SelectionChip.args}>
            Black
          </ChipGroup.Item>,
          <ChipGroup.Item key="6" {...ChipStories.SelectionChip.args}>
            White
          </ChipGroup.Item>,
        ],
      },
    },
    overflow: {
      control: 'radio',
    },
  },
} satisfies Meta<typeof ChipGroup>

export default meta

type Story = StoryObj<typeof meta>

const useNarrowParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ border: '1px solid #FA00FF', width: '397px' }}>
      <Story />
    </div>
  )
}

/**
 * By default, a chip group will grow to whatever width it's parent allows.
 */
export const Example: Story = {
  args: {
    children: 'Filter Chips',
    flow: 'wrap',
    overflow: 'visible',
  },
}

/**
 * By default, chips will wrap to other lines if there is insufficient space.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useNarrowParentDecorator],
}

/**
 * The default wrapping behaviour can be overridden using `flow="nowrap"`. This can be useful at
 * small breakpoints where the chip group should not occupy too much vertical space.
 */
export const NoWrapping: Story = {
  args: {
    ...Example.args,
    flow: 'nowrap',
  },
  decorators: [useNarrowParentDecorator],
}

/**
 * When wrapping is disabled, it will often be useful to allow the chip group to scroll horizontally.
 */
export const Overflow: Story = {
  args: {
    ...NoWrapping.args,
    overflow: 'auto',
  },
  decorators: [useNarrowParentDecorator],
}

/**
 * Whether wrapping or scrolling is used, chips will size themselves appropriately based on the
 * length of their label.
 */
export const ChipSizing: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: [
      <ChipGroup.Item key="1" {...ChipStories.FilterChip.args}>
        Chip 1
      </ChipGroup.Item>,
      <ChipGroup.Item key="2" {...ChipStories.Disabled.args}>
        Chip 2
      </ChipGroup.Item>,
      <ChipGroup.Item key="3" {...ChipStories.FilterChip.args}>
        Chip 3
      </ChipGroup.Item>,
      <ChipGroup.Item key="4" {...ChipStories.FilterChip.args}>
        Chip 4
      </ChipGroup.Item>,
      <ChipGroup.Item key="5" {...ChipStories.Truncation.args}>
        Truncation can be applied to ensure a long chip label does not wrap to a second line
      </ChipGroup.Item>,
      <ChipGroup.Item key="6" {...ChipStories.Disabled.args}>
        Chip 5
      </ChipGroup.Item>,
      <ChipGroup.Item key="7" {...ChipStories.FilterChip.args}>
        Chip 6
      </ChipGroup.Item>,
      <ChipGroup.Item key="8" {...ChipStories.Wrapping.args}>
        Or, you can avoid truncation and allow a long chip label to wrap to multiple lines
      </ChipGroup.Item>,
      <ChipGroup.Item key="9" {...ChipStories.LongWords.args} />,
    ],
    flow: 'wrap',
  },
  decorators: [useNarrowParentDecorator],
}
