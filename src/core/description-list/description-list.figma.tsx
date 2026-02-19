import { DescriptionList } from './description-list'
import figma from '@figma/code-connect'

figma.connect(DescriptionList, '<DESCRIPTION_LIST_URL>', {
  props: {
    children: figma.children('*'),
    grid: figma.enum('No of columns', {
      '1': 'auto-flow / 1fr',
      '2': 'auto-flow / 1fr 1fr',
      '3': 'auto-flow / 1fr 1fr 1fr',
    }),
    item1: figma.nestedProps('Item 1', {
      size: figma.enum('Size', {
        base: 'base',
        sm: 'sm',
      }),
    }),
    layout: figma.enum('Item type', {
      'In-line': figma.nestedProps('List item', {
        value: figma.enum('Label type', {
          Hug: 'inline',
          Fill: 'tabular',
        }),
      }),
      Stacked: {
        value: 'stacked',
      } as const,
    }),
  },
  example: (props) => (
    <DescriptionList grid={props.grid} layout={props.layout.value} size={props.item1.size}>
      {props.children}
    </DescriptionList>
  ),
})
