import { DeprecatedChip as Chip, DeprecatedChipGroup as ChipGroup } from '.'

export default {
  title: 'DeprecatedChip',
  component: Chip,
}

export const BasicUsage = {
  render: ({}) => (
    <ChipGroup>
      <Chip>Content</Chip>
    </ChipGroup>
  ),
}

export const ChipGroupUsage = {
  render: ({}) => (
    <ChipGroup>
      <Chip>Content</Chip>
      <Chip>Content</Chip>
      <Chip>Content</Chip>
    </ChipGroup>
  ),
}
