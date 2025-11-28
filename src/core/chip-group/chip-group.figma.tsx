import { ChipGroup } from './chip-group'
import figma from '@figma/code-connect'

figma.connect(ChipGroup, '<CHIP_GROUP_URL>', {
  props: {
    children: figma.children('*'),
    firstChip: figma.nestedProps('Chip', {
      variant: figma.enum('Variant', {
        Filter: 'filter',
        Selection: 'selection',
      }),
    }),
    flow: figma.enum('Overflow', {
      Scroll: 'nowrap',
    }),
    overflow: figma.enum('Overflow', {
      Scroll: 'auto',
    }),
  },
  example: ({ children, firstChip, flow, overflow }) => (
    <ChipGroup flow={flow} overflow={overflow} variant={firstChip.variant}>
      {/* NOTE: use ChipGroup.Item instead of Chip.
       * ChipGroup.Item's do not need a variant specified */}
      {children}
    </ChipGroup>
  ),
})
