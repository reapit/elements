import { AtAGlanceGrid } from './grid'
import figma from '@figma/code-connect'

figma.connect(AtAGlanceGrid, '<AT_A_GLANCE_GRID_URL>', {
  props: {
    children: figma.children('*'),
    templateColumns: figma.enum('Grid template', {
      '5x2': '1fr 1fr 1fr 1fr 1fr',
      '5x1': '1fr 1fr 1fr 1fr 1fr',
      '4x2': '1fr 1fr 1fr 1fr',
      '4x1': '1fr 1fr 1fr 1fr',
      '3x2': '1fr 1fr 1fr',
      '3x1': '1fr 1fr 1fr',
      '2x2': '1fr 1fr',
      '2x1': '1fr 1fr',
    }),
  },
  example: (props) => <AtAGlanceGrid templateColumns={props.templateColumns}>{props.children}</AtAGlanceGrid>,
})
