import { DescriptionList } from './description-list'
import figma from '@figma/code-connect'

figma.connect(DescriptionList, '<DESCRIPTION_LIST_URL>', {
  props: {
    children: figma.enum('Variant', {
      'Stacked list': figma.slot('Stacked content slot'),
      'In-line list': figma.slot('In-line content slot'),
      Grid: figma.slot('Grid content slot'),
    }),
    grid: figma.enum('Variant', {
      'Stacked list': 'auto-flow / 1fr',
      'In-line list': 'auto-flow / 1fr',
      Grid: 'auto-flow / var(--size-36) 1fr',
    }),
    layout: figma.enum('Variant', {
      'Stacked list': 'stacked',
      'In-line list': 'inline',
      Grid: 'tabular',
    }),
  },
  example: (props) => (
    <DescriptionList
      grid={props.grid}
      layout={props.layout}
      // TODO: Update size to match description list item size. Applying the size
      // here means you don't have to apply it to each individual item
      size="base"
    >
      {props.children}
    </DescriptionList>
  ),
})

//
// Deprecated Figma component support
//

figma.connect(DescriptionList, '<DESCRIPTION_LIST_URL_DEPRECATED>', {
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
