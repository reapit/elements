import figma from '@figma/code-connect'
import { Table } from '../table'

figma.connect(Table.BodyRow, '<TABLE_BODY_ROW_URL>', {
  props: {
    checkbox: figma.boolean('Selectable', {
      true: (
        <Table.BodyCell>
          <Table.Checkbox aria-label="Select all" />
        </Table.BodyCell>
      ),
      false: undefined,
    }),
    moreActions: figma.boolean('More button', {
      true: (
        <Table.BodyCell>
          <Table.MoreActions aria-label="Replace me">TODO: add menu items</Table.MoreActions>
        </Table.BodyCell>
      ),
      false: undefined,
    }),
    content: figma.nestedProps('Content', {
      cells: figma.children('*'),
    }),
  },
  example: (props) => (
    <Table.BodyRow>
      {props.checkbox}
      {props.content.cells}
      {props.moreActions}
    </Table.BodyRow>
  ),
})
