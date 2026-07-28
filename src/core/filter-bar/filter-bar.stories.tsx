import preview from "#.storybook/preview";
import { Button } from "#src/core/button";
import { ButtonGroup } from "#src/core/button-group";
import { ChipGroup } from "#src/core/chip-group";
import { SearchInput } from "#src/core/search-input";
import { FilterIcon } from "#src/icons/filter";

import { FilterBar } from "./filter-bar";

const meta = preview.meta({
  title: "Input and selection/FilterBar",
  component: FilterBar,
  argTypes: {
    leftContent: {
      control: "radio",
      options: ["None", "Search", "Filter Button", "Both"],
      mapping: {
        None: null,
        Search: (
          <FilterBar.LeftContent>
            <SearchInput
              aria-label="Search"
              maxWidth="var(--size-60)"
              placeholder="Search"
              size="small"
            />
          </FilterBar.LeftContent>
        ),
        "Filter Button": (
          <FilterBar.LeftContent>
            <Button iconLeft={<FilterIcon />} size="small" variant="secondary">
              Filter
            </Button>
          </FilterBar.LeftContent>
        ),
        Both: (
          <FilterBar.LeftContent>
            <SearchInput
              aria-label="Search"
              maxWidth="var(--size-60)"
              placeholder="Search"
              size="small"
            />
            <ButtonGroup>
              <Button iconLeft={<FilterIcon />} size="small" variant="secondary">
                Filter
              </Button>
            </ButtonGroup>
          </FilterBar.LeftContent>
        ),
      },
    },
    rightContent: {
      control: "radio",
      options: ["None", "Buttons"],
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
      control: "radio",
      options: ["None", "Some Filters", "Many Filters", "With Action"],
      mapping: {
        None: undefined,
        "Some Filters": (
          <FilterBar.AppliedFilters>
            <ChipGroup variant="filter">
              <ChipGroup.Item>Label</ChipGroup.Item>
              <ChipGroup.Item>Label</ChipGroup.Item>
              <ChipGroup.Item>Label</ChipGroup.Item>
              <Button size="small" variant="tertiary">
                Clear all
              </Button>
            </ChipGroup>
          </FilterBar.AppliedFilters>
        ),
        "Many Filters": (
          <FilterBar.AppliedFilters>
            <ChipGroup variant="filter">
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
          </FilterBar.AppliedFilters>
        ),
        "With Action": (
          <FilterBar.AppliedFilters
            action={
              <Button size="small" variant="tertiary" useLinkStyle>
                Save filters
              </Button>
            }
          >
            <ChipGroup variant="filter">
              <ChipGroup.Item>Label</ChipGroup.Item>
              <ChipGroup.Item>Label</ChipGroup.Item>
              <ChipGroup.Item>Label</ChipGroup.Item>
              <Button size="small" variant="tertiary">
                Clear all
              </Button>
            </ChipGroup>
          </FilterBar.AppliedFilters>
        ),
      },
    },
  },
});

export const Example = meta.story({
  args: {
    leftContent: "Both",
    rightContent: "Buttons",
    appliedFilters: "Some Filters",
  },
});
