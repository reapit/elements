import figma from '@figma/code-connect'
import { Table } from '../table'

figma.connect(Table.HeaderCell, '<TABLE_HEADER_CELL_URL>', {
  variant: { Sortable: false },
  props: {
    children: figma.string('Value'),
    justifySelf: figma.enum('Alignment', {
      Center: 'center',
      Left: 'start',
      Right: 'end',
    }),
  },
  example: (props) => <Table.HeaderCell justifySelf={props.justifySelf}>{props.children}</Table.HeaderCell>,
})

figma.connect(Table.HeaderCell, '<TABLE_HEADER_CELL_URL>', {
  variant: { Sortable: true },
  props: {
    children: figma.string('Value'),
    direction: figma.enum('State', {
      Default: 'none',
      Hover: 'none',
      Focus: 'none',
      Sorted: 'descending',
      'n/a': 'none',
    }),
    justifySelf: figma.enum('Alignment', {
      Center: 'center',
      Left: 'start',
      Right: 'end',
    }),
  },
  example: (props) => (
    <Table.HeaderCell justifySelf={props.justifySelf}>
      <Table.SortButton name="replace-me" value={props.direction}>
        {props.children}
      </Table.SortButton>
    </Table.HeaderCell>
  ),
})
