import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { ChipGroup } from '#src/core/chip-group'
import * as ChipStories from '#src/core/chip/chip.stories'
import { FilterBar } from './filter-bar'
import { FilterIcon } from '#src/icons/filter'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FilterBar',
  component: FilterBar,
  argTypes: {
    leftContent: {
      control: 'radio',
      options: ['None', 'Search', 'Filter Button', 'Both'],
      mapping: {
        None: null,
        Search: (
          <FilterBar.LeftContent>
            <input type="search" placeholder="Search" />
          </FilterBar.LeftContent>
        ),
        'Filter Button': (
          <FilterBar.LeftContent>
            <Button iconLeft={<FilterIcon />} size="small" variant="secondary">
              Filter
            </Button>
          </FilterBar.LeftContent>
        ),
        Both: (
          <FilterBar.LeftContent>
            <input type="search" placeholder="Search" />
            <ButtonGroup>
              <Button iconLeft={<FilterIcon />} size="small" variant="secondary">
                Filter
              </Button>
              <Button size="small" variant="secondary">
                View options
              </Button>
            </ButtonGroup>
          </FilterBar.LeftContent>
        ),
      },
    },
    rightContent: {
      control: 'radio',
      options: ['None', 'Buttons'],
      mapping: {
        None: null,
        Buttons: (
          <FilterBar.RightContent>
            <ButtonGroup>
              <Button size="small" variant="secondary">
                Button
              </Button>
            </ButtonGroup>
          </FilterBar.RightContent>
        ),
      },
    },
    appliedFilters: {
      control: 'radio',
      options: ['None', 'Some Filters', 'Many Filters', 'With Action'],
      mapping: {
        None: undefined,
        'Some Filters': (
          <FilterBar.AppliedFilters>
            <ChipGroup>
              <ChipGroup.Item {...ChipStories.FilterChip.args} />
              <ChipGroup.Item {...ChipStories.FilterChip.args} />
              <ChipGroup.Item {...ChipStories.FilterChip.args} />
              <Button size="small" variant="tertiary">
                Clear all
              </Button>
            </ChipGroup>
          </FilterBar.AppliedFilters>
        ),
        'Many Filters': (
          <FilterBar.AppliedFilters>
            <ChipGroup>
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
          </FilterBar.AppliedFilters>
        ),
        'With Action': (
          <FilterBar.AppliedFilters
            action={
              <Button size="small" variant="tertiary" useLinkStyle>
                Save filters
              </Button>
            }
          >
            <ChipGroup>
              <ChipGroup.Item {...ChipStories.FilterChip.args} />
              <ChipGroup.Item {...ChipStories.FilterChip.args} />
              <ChipGroup.Item {...ChipStories.FilterChip.args} />
              <Button size="small" variant="tertiary">
                Clear all
              </Button>
            </ChipGroup>
          </FilterBar.AppliedFilters>
        ),
      },
    },
  },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    leftContent: 'Filter Button',
    rightContent: 'Buttons',
    appliedFilters: 'Some Filters',
  },
}
