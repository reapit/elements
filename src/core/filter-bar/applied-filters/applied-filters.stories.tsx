import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { ChipGroup } from '#src/core/chip-group'
import { FilterBar } from '../filter-bar'
import { MatchMedia } from '#src/utils/match-media'

import { isWidthAtOrAbove, isWidthBelow } from '#src/utils/breakpoints'

const meta = preview.meta({
  title: 'Input and selection/FilterBar/AppliedFilters',
  component: FilterBar.AppliedFilters,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Some Filters', 'Many Filters'],
      mapping: {
        'Some Filters': (
          <ChipGroup variant="filter">
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <Button size="small" variant="tertiary">
              Clear all
            </Button>
          </ChipGroup>
        ),
        'Many Filters': (
          <ChipGroup variant="filter">
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
            <ChipGroup.Item>Label</ChipGroup.Item>
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
})

/**
 * By default, applied filters are displayed as a group of filter chips without any action buttons.
 */
export const Example = meta.story({
  args: {
    action: 'None',
    children: 'Some Filters',
  },
})

/**
 * An optional action element can be provided. Typically, this will be a "Save filters" action.
 */
export const Action = Example.extend({
  args: {
    action: 'Save Filters',
  },
})

/**
 * When many filters are applied, the chip group will wrap to multiple lines by default.
 */
export const Overflow = meta.story({
  args: {
    children: 'Many Filters',
  },
})

/**
 * When a chip group is configured to automatically scroll any overflowing chips, the filter bar's
 * action, if present, will remain visible.
 */
export const Scrolling = Action.extend({
  args: {
    children: (
      <ChipGroup overflow="auto" variant="selection">
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
        <ChipGroup.Item>Label</ChipGroup.Item>
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
})

/**
 * When multiple filters are active on the XS breakpoint, a single chip should be displayed that
 * summarises the number of applied filters, and allows them all to be removed. **This responsive
 * behaviour is up to consumers to implement.**
 *
 * This example demonstrates how to achieve this using [MatchMedia](?path=/docs/utils-matchmedia--docs)
 * and the [breakpoints](?path=/docs/utils-breakpoints--docs) utilities. Switch to the canvas view for
 * this story to see the behaviour at different viewport sizes.
 */
export const Breakpoints = Action.extend({
  args: {
    children: (
      <ChipGroup variant="filter">
        <MatchMedia condition={isWidthAtOrAbove('SM')}>
          <ChipGroup.Item>Label</ChipGroup.Item>
          <ChipGroup.Item>Label</ChipGroup.Item>
          <ChipGroup.Item>Label</ChipGroup.Item>
          <ChipGroup.Item>Label</ChipGroup.Item>
          <Button size="small" variant="tertiary">
            Clear all
          </Button>
        </MatchMedia>
        <MatchMedia condition={isWidthBelow('SM')}>
          <ChipGroup.Item>4 filters applied</ChipGroup.Item>
        </MatchMedia>
      </ChipGroup>
    ),
  },
  globals: {
    viewport: { value: 'XS' },
  },
})
