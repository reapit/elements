import { Button } from '#src/core/button'
import { ChipGroup } from '#src/core/chip-group'
import * as ChipStories from '#src/core/chip/chip.stories'
import { FilterBarAppliedFilters } from './applied-filters'
import { MatchMedia } from '#src/utils/match-media'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { isWidthAtOrAbove, isWidthBelow } from '#src/utils/index'

const meta = {
  title: 'Core/FilterBar/AppliedFilters',
  component: FilterBarAppliedFilters,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Some Filters', 'Many Filters', 'Mixed States'],
      mapping: {
        'Some Filters': (
          <ChipGroup overflow="wrap">
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <Button size="small" variant="tertiary">
              Clear all
            </Button>
          </ChipGroup>
        ),
        'Many Filters': (
          <ChipGroup overflow="wrap">
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <ChipGroup.Item {...ChipStories.FilterChip.args} />
            <Button size="small" variant="tertiary">
              Clear all
            </Button>
          </ChipGroup>
        ),
      },
    },
    action: {
      control: 'radio',
      options: ['None', 'Save Filters'],
      mapping: {
        None: undefined,
        'Save Filters': (
          <Button size="small" variant="tertiary" useLinkStyle>
            Save filters
          </Button>
        ),
      },
    },
  },
} satisfies Meta<typeof FilterBarAppliedFilters>

export default meta
type Story = StoryObj<typeof meta>

/**
 * By default, applied filters are displayed as a group of filter chips without any action buttons.
 */
export const Example: Story = {
  args: {
    action: 'None',
    children: 'Some Filters',
  },
}

/**
 * An optional action element can be provided. Typically, this will be a "Save filters" action.
 */
export const Action: Story = {
  args: {
    ...Example.args,
    action: 'Save Filters',
  },
}

/**
 * When many filters are applied, the chip group will wrap to multiple lines by default.
 */
export const Overflow: Story = {
  args: {
    children: 'Many Filters',
  },
}

/**
 * When a chip group is configured to scroll any overflowing chips, the filter bar's action, if present,
 * will remain visible.
 */
export const Scrolling: Story = {
  args: {
    ...Action.args,
    children: (
      <ChipGroup overflow="scroll">
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <ChipGroup.Item {...ChipStories.FilterChip.args} />
        <Button size="small" variant="tertiary">
          Clear all
        </Button>
      </ChipGroup>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}

/**
 * When multiple filters are active on the XS breakpoint, a single chip should be displayed that
 * summarises the number of applied filters, and allows them all to be removed. **This responsive
 * behaviour is up to consumers to implement.**
 *
 * This example demonstrates how to achieve this using [MatchMedia](?path=/docs/utils-matchmedia--docs)
 * and the [breakpoints](?path=/docs/utils-breakpoints--docs) utilities. Switch to the canvas view for
 * this story to see the behaviour at different viewport sizes.
 */
export const Breakpoints: Story = {
  args: {
    ...Action.args,
    children: (
      <ChipGroup>
        <MatchMedia condition={isWidthAtOrAbove('SM')}>
          <ChipGroup.Item {...ChipStories.FilterChip.args} />
          <ChipGroup.Item {...ChipStories.FilterChip.args} />
          <ChipGroup.Item {...ChipStories.FilterChip.args} />
          <ChipGroup.Item {...ChipStories.FilterChip.args} />
          <Button size="small" variant="tertiary">
            Clear all
          </Button>
        </MatchMedia>
        <MatchMedia condition={isWidthBelow('SM')}>
          <ChipGroup.Item {...ChipStories.FilterChip.args}>4 filters applied</ChipGroup.Item>
        </MatchMedia>
      </ChipGroup>
    ),
  },
  globals: {
    viewport: {
      value: 'mobile',
    },
  },
}
