import figma from '@figma/code-connect'
import { Table } from '../table'

figma.connect(Table.HeaderRow, '<TABLE_HEADER_ROW_URL>', {
  props: {
    checkbox: figma.boolean('Selectable', {
      true: (
        <Table.HeaderCell aria-label="Select rows">
          <Table.Checkbox aria-label="Select all" />
        </Table.HeaderCell>
      ),
      false: undefined,
    }),
    moreActions: figma.boolean('More button', {
      true: <Table.HeaderCell aria-label="Actions" />,
      false: undefined,
    }),
    content: figma.nestedProps('Content', {
      cells: figma.children('Header cell'),
    }),
  },
  example: (props) => (
    <Table.HeaderRow>
      {props.checkbox}
      {props.content.cells}
      {props.moreActions}
    </Table.HeaderRow>
  ),
})
