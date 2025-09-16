import figma from '@figma/code-connect'
import { Table } from '../table'

figma.connect(Table.PrimaryData, '<TABLE_PRIMARY_DATA_URL>', {
  variant: { Data: 'Alphanumeric' },
  props: {
    iconLeft: figma.children('Icon L'),
    iconRight: figma.children('Icon R'),
    data: figma.nestedProps('Alphanumeric value', {
      children: figma.textContent('Value'),
    }),
  },
  example: (props) => (
    <Table.PrimaryData iconLeft={props.iconLeft} iconRight={props.iconRight}>
      {props.data.children}
    </Table.PrimaryData>
  ),
})

figma.connect(Table.PrimaryData, '<TABLE_PRIMARY_DATA_URL>', {
  variant: { Data: 'Date and Time' },
  props: {
    iconLeft: figma.children('Icon L'),
    iconRight: figma.children('Icon R'),
    date: figma.nestedProps('Date', {
      value: figma.textContent('Value'),
    }),
    comma: figma.nestedProps('Comma', {
      value: figma.textContent('Value'),
    }),
    time: figma.nestedProps('Time', {
      value: figma.textContent('Value'),
    }),
  },
  example: (props) => (
    <Table.PrimaryData iconLeft={props.iconLeft} iconRight={props.iconRight}>
      {props.date.value}
      {props.comma.value}
      {props.time.value}
    </Table.PrimaryData>
  ),
})
