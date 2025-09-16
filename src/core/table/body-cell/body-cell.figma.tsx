import figma from '@figma/code-connect'
import { Skeleton } from '../../skeleton'
import { Table } from '../table'

figma.connect(Table.BodyCell, '<TABLE_SINGLE_LINE_CELL_URL>', {
  props: {
    children: figma.enum('Data', {
      Address: figma.textContent('Value'),
      Alphanumeric: figma.textContent('Value'),
      Badge: figma.children('Badge'),
      'Data not available': 'Not available',
      'Date and time': figma.textContent('Content'),
      Features: figma.children('Features'),
      Icon: figma.children('Icon'),
      'Icon and value': figma.children('*'),
      'Status indicator': figma.children('Status indicator'),
      Tags: figma.children('Tag group'),
      'Value and icon': figma.children('*'),
    }),
  },
  example: (props) => <Table.BodyCell>{props.children}</Table.BodyCell>,
})

figma.connect(Table.BodyCell, '<TABLE_SINGLE_LINE_CELL_URL>', {
  variant: { Skeleton: true },
  example: () => (
    <Table.BodyCell>
      <Skeleton width="100px" />
    </Table.BodyCell>
  ),
})

figma.connect(Table.BodyCell, '<TABLE_DOUBLE_LINE_CELL_URL>', {
  variant: { Data: 'Address' },
  props: {
    line1: figma.children('Row 1'),
    line2: figma.textContent('Row 2'),
    thumbnail: figma.children('Avatar rectangle'),
  },
  example: (props) => (
    <Table.BodyCell>
      <Table.DoubleLineLayout mediaItem={props.thumbnail} supplementaryData={props.line2}>
        {props.line1}
      </Table.DoubleLineLayout>
    </Table.BodyCell>
  ),
})

figma.connect(Table.BodyCell, '<TABLE_DOUBLE_LINE_CELL_URL>', {
  variant: { Data: 'Avatar' },
  props: {
    avatar: figma.children('Avatar circle'),
    line1: figma.children('Row 1'),
    line2: figma.textContent('Row 2'),
  },
  example: (props) => (
    <Table.BodyCell>
      <Table.DoubleLineLayout mediaItem={props.avatar} supplementaryData={props.line2}>
        {props.line1}
      </Table.DoubleLineLayout>
    </Table.BodyCell>
  ),
})

figma.connect(Table.BodyCell, '<TABLE_DOUBLE_LINE_CELL_URL>', {
  variant: { Data: 'Mixed data' },
  props: {
    line1: figma.children('First row data'),
    line2: figma.children('Second row data'),
  },
  example: (props) => (
    <Table.BodyCell>
      <Table.DoubleLineLayout supplementaryData={props.line2}>{props.line1}</Table.DoubleLineLayout>
    </Table.BodyCell>
  ),
})

figma.connect(Table.BodyCell, '<TABLE_DOUBLE_LINE_CELL_URL>', {
  variant: { Skeleton: true },
  props: {
    justifySelf: figma.enum('Alignment', { Left: 'start', Center: 'center', Right: 'end' }),
    mediaItem: figma.enum('Data', {
      Address: <Skeleton width="48px" height="40px" />,
      Avatar: <Skeleton borderRadius="100%" width="36px" height="36px" />,
      'Mixed data': undefined,
    }),
  },
  example: (props) => (
    <Table.BodyCell justifySelf={props.justifySelf}>
      <Table.DoubleLineLayout mediaItem={props.mediaItem} supplementaryData={<Skeleton width="124px" />}>
        <Skeleton width="148px" />
      </Table.DoubleLineLayout>
    </Table.BodyCell>
  ),
})
