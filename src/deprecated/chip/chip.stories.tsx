import preview from "#.storybook/preview";

import { DeprecatedChip as Chip, DeprecatedChipGroup as ChipGroup } from ".";

const meta = preview.meta({
  title: "Deprecated/DeprecatedChip",
  component: Chip,
});

export default meta;

export const BasicUsage = meta.story({
  render: () => (
    <ChipGroup>
      <Chip>Content</Chip>
    </ChipGroup>
  ),
});

export const ChipGroupUsage = meta.story({
  render: () => (
    <ChipGroup>
      <Chip>Content</Chip>
      <Chip>Content</Chip>
      <Chip>Content</Chip>
    </ChipGroup>
  ),
});
