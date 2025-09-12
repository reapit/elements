import { ChipGroup } from './chip-group'
import figma from '@figma/code-connect'

figma.connect(ChipGroup, '<CHIP_GROUP_URL>', {
  props: {
    children: figma.children('*'),
    flow: figma.enum('Overflow', {
      Scroll: 'nowrap',
    }),
    overflow: figma.enum('Overflow', {
      Scroll: 'auto',
    }),
  },
  example: ({ children, flow, overflow }) => (
    <ChipGroup flow={flow} overflow={overflow}>
      {/* NOTE: use ChipGroup.Item instead of Chip */}
      {children}
    </ChipGroup>
  ),
})
