import { useState } from 'react'
import { Table } from './index'
import {
  TableHeadersRow,
  TableHeader,
  TableRow,
  TableCell,
  TableExpandableRowTriggerCell,
  TableExpandableRow,
  TableRowContainer,
  TableCtaTriggerCell,
  TableCellSplit,
} from './molecules'
import { Icon } from '../icon'
import { elSpan2, elSpan3 } from '../grid'
import { InputGroup } from '../input-group'
import { Button, DeprecatedButtonGroup } from '../button'
import { StatusIndicator } from '../status-indicator'
import { elMlAuto } from '../../styles/spacing'
import { FormLayout, InputWrap } from '../form-layout'
import { elIsActive } from '../../styles/states'
import { Avatar } from '../avatar'
import { Input } from '../input'
import { TextBase } from '../typography'

export default {
  title: 'Table',
  component: Table,
}

export const BasicUsage = {
  render: ({}) => (
    <Table>
      <TableHeadersRow>
        <TableHeader>Checkbox Header</TableHeader>
        <TableHeader>First Header</TableHeader>
        <TableHeader>Image Header</TableHeader>
        <TableHeader>Second Header</TableHeader>
        <TableHeader>Third Header</TableHeader>
      </TableHeadersRow>
      <TableRowContainer>
        <TableRow>
          <TableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </TableCell>
          <TableCell>First Column</TableCell>
          <TableCell narrowLabel="Image">
            <Avatar type="image" src="https://picsum.photos/200/300" />
          </TableCell>
          <TableCell>Second Column</TableCell>
          <TableCell>
            <TableCellSplit data="Third Data" subData="Some Longer Sub Data" />
          </TableCell>
        </TableRow>
      </TableRowContainer>
      <TableRowContainer>
        <TableRow>
          <TableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </TableCell>
          <TableCell>First Column</TableCell>
          <TableCell narrowLabel="Image">
            <Avatar type="image" src="https://picsum.photos/200/300" />
          </TableCell>
          <TableCell>Second Column</TableCell>
          <TableCell>
            <TableCellSplit data="Third Data" subData="Some Longer Sub Data" />
          </TableCell>
        </TableRow>
      </TableRowContainer>
    </Table>
  ),
}

export const ColumnWidths = {
  render: ({}) => (
    <Table data-num-columns-excl-action-col="8">
      <TableHeadersRow>
        <TableHeader>Checkbox Header</TableHeader>
        <TableHeader>First Header</TableHeader>
        <TableHeader>Image Header</TableHeader>
        <TableHeader className={elSpan2}>Second Header</TableHeader>
        <TableHeader className={elSpan3}>Third Header</TableHeader>
      </TableHeadersRow>
      <TableRowContainer>
        <TableRow>
          <TableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </TableCell>
          <TableCell>First Column</TableCell>
          <TableCell narrowLabel="Image">
            <Avatar type="image" src="https://picsum.photos/200/300" />
          </TableCell>
          <TableCell className={elSpan2}>Second Column with more data</TableCell>
          <TableCell className={elSpan3}>
            <TableCellSplit data="Third Data" subData="Some much much much Longer Sub Data" />
          </TableCell>
        </TableRow>
      </TableRowContainer>
      <TableRowContainer>
        <TableRow>
          <TableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </TableCell>
          <TableCell>First Column</TableCell>
          <TableCell narrowLabel="Image">
            <Avatar type="image" src="https://picsum.photos/200/300" />
          </TableCell>
          <TableCell className={elSpan2}>Second Column with more data</TableCell>
          <TableCell className={elSpan3}>
            <TableCellSplit data="Third Data" subData="Some much much much Longer Sub Data" />
          </TableCell>
        </TableRow>
      </TableRowContainer>
    </Table>
  ),
  name: 'Column widths',
}

export const BasicCustomisationTableCells = {
  render: ({}) => (
    <Table>
      <TableHeadersRow>
        <TableHeader>Selected</TableHeader>
        <TableHeader>Property Image</TableHeader>
        <TableHeader>Property</TableHeader>
        <TableHeader>Customer</TableHeader>
        <TableHeader>Description</TableHeader>
        <TableHeader>Request Date</TableHeader>
        <TableHeader>Amount</TableHeader>
        <TableHeader>Payment Status</TableHeader>
      </TableHeadersRow>
      <TableRowContainer>
        <TableRow>
          <TableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </TableCell>
          <TableCell narrowLabel="Image">
            <Avatar type="image" src="https://picsum.photos/200/300" />
          </TableCell>
          <TableCell darkText narrowIsFullWidth>
            1 King Road, London, UK, S1 1AA
          </TableCell>
          <TableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </TableCell>
          <TableCell narrowLabel="Type">
            <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />
          </TableCell>
          <TableCell narrowLabel="Request Date">19 Apr 2021</TableCell>
          <TableCell darkText narrowLabel="Amount">
            £50.00
          </TableCell>
          <TableCell narrowLabel="Status">
            <StatusIndicator intent="pending" />
            Pending
          </TableCell>
        </TableRow>
      </TableRowContainer>
    </Table>
  ),
  name: 'Basic Customisation - Table Cells',
}

export const ExpandingTableCellSpace = {
  render: ({}) => (
    <Table data-force-narrow-table="true">
      <TableHeadersRow>
        <TableHeader>Is Active</TableHeader>
        <TableHeader>Property</TableHeader>
        <TableHeader>Customer</TableHeader>
        <TableHeader>Description</TableHeader>
        <TableHeader>Request Date</TableHeader>
        <TableHeader>Amount</TableHeader>
        <TableHeader>Payment Status</TableHeader>
      </TableHeadersRow>
      <TableRowContainer>
        <TableRow>
          <TableCell narrowLabel="Active">
            <Input type="checkbox" />
          </TableCell>
          <TableCell darkText>Mt Ash Jacket Brassey Road</TableCell>
          <TableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </TableCell>
          <TableCell narrowLabel="Type">
            <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />
          </TableCell>
          <TableCell narrowLabel="Request Date">19 Apr 2021</TableCell>
          <TableCell darkText narrowLabel="Amount">
            £50.00
          </TableCell>
          <TableCell narrowLabel="Status">
            <StatusIndicator intent="pending" />
            Pending
          </TableCell>
        </TableRow>
      </TableRowContainer>
    </Table>
  ),
}

export const ExpandableContent = {
  render: ({}) => (
    <Table data-num-columns-excl-action-col="7" data-has-expandable-action>
      <TableHeadersRow>
        <TableHeader>Is Active</TableHeader>
        <TableHeader>Property</TableHeader>
        <TableHeader>Customer</TableHeader>
        <TableHeader>Description</TableHeader>
        <TableHeader>Request Date</TableHeader>
        <TableHeader>Amount</TableHeader>
        <TableHeader>Payment Status</TableHeader>
        <TableHeader>
          <Icon icon="edit" intent="default" />
        </TableHeader>
      </TableHeadersRow>
      <TableRowContainer className={elIsActive}>
        <TableRow>
          <TableCell narrowLabel="Active">
            <Input type="checkbox" />
          </TableCell>
          <TableCell darkText narrowIsFullWidth>
            Mt Ash Jacket Brassey Road
          </TableCell>
          <TableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </TableCell>
          <TableCell narrowLabel="Type">
            <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />
          </TableCell>
          <TableCell narrowLabel="Request Date">19 Apr 2021</TableCell>
          <TableCell darkText narrowLabel="Amount">
            £50.00
          </TableCell>
          <TableCell narrowLabel="Status">
            <StatusIndicator intent="pending" />
            Pending
          </TableCell>
          <TableExpandableRowTriggerCell isOpen />
        </TableRow>
        <TableExpandableRow isOpen>
          <TextBase hasBoldText hasMargin>
            Form Example
          </TextBase>
          <FormLayout>
            <InputWrap>
              <InputGroup label="Please enter an address" type="text" />
            </InputWrap>
            <InputWrap>
              <InputGroup label="Please enter your email" type="text" />
            </InputWrap>
            <InputWrap />
            <InputWrap>
              <DeprecatedButtonGroup className={elMlAuto}>
                <Button intent="primary">Send</Button>
              </DeprecatedButtonGroup>
            </InputWrap>
          </FormLayout>
        </TableExpandableRow>
      </TableRowContainer>
    </Table>
  ),
}

export const CallToActionContent = {
  render: ({}) => (
    <Table data-num-columns-excl-action-col="7" data-has-call-to-action>
      <TableHeadersRow>
        <TableHeader>Is Active</TableHeader>
        <TableHeader>Property</TableHeader>
        <TableHeader>Customer</TableHeader>
        <TableHeader>Description</TableHeader>
        <TableHeader>Request Date</TableHeader>
        <TableHeader>Amount</TableHeader>
        <TableHeader>Payment Status</TableHeader>
        <TableHeader>Download Content</TableHeader>
      </TableHeadersRow>
      <TableRowContainer>
        <TableRow>
          <TableCell narrowLabel="Active">
            <Input type="checkbox" />
          </TableCell>
          <TableCell darkText narrowIsFullWidth>
            Mt Ash Jacket Brassey Road
          </TableCell>
          <TableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </TableCell>
          <TableCell narrowLabel="Type">Tenant Payment Request</TableCell>
          <TableCell narrowLabel="Request Date">19 Apr 2021</TableCell>
          <TableCell darkText narrowLabel="Amount">
            £50.00
          </TableCell>
          <TableCell narrowLabel="Status">
            <StatusIndicator intent="pending" />
            Pending
          </TableCell>
          <TableCtaTriggerCell icon="fileDownload" />
        </TableRow>
      </TableRowContainer>
    </Table>
  ),
}

export const ReactShorthandUsage = {
  render: ({ rows }) => <Table rows={rows} />,
  args: {
    rows: [
      {
        cells: [
          {
            label: 'Is Active',
            value: <Input type="checkbox" />,
          },
          {
            label: 'Property Image',
            value: <Avatar type="image" src="https://picsum.photos/200/300" />,
          },
          {
            label: 'Property',
            value: 'Mt Ash Jacket, Brassey Road',
            icon: 'property',
            cellHasDarkText: true,

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Customer',
            value: 'Mr Johnny Corrigan',
            icon: 'contact',

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Description',
            value: <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />,
          },
          {
            label: 'Amount',
            value: '£50.00',
            cellHasDarkText: true,
          },
          {
            label: 'Payment Status',
            value: 'Not Requested',
            statusCircleIntent: 'danger',
          },
        ],

        expandableContent: {
          content: <p>I am the content that is only visible when expanded</p>,
        },
      },
      {
        cells: [
          {
            label: 'Is Active',
            value: <Input type="checkbox" />,
          },
          {
            label: 'Property Image',
            value: <Avatar type="image" src="https://picsum.photos/200/300" />,
          },
          {
            label: 'Property',
            value: 'Property Name, Road Name',
            icon: 'property',
            cellHasDarkText: true,

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Customer',
            value: 'Mrs Davina Corrigan',
            icon: 'contact',

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Description',
            value: <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />,
          },
          {
            label: 'Amount',
            value: '£665.21',
            cellHasDarkText: true,
          },
          {
            label: 'Payment Status',
            value: 'Pending',

            children: (
              <>
                <StatusIndicator intent="pending" />
                Pending
              </>
            ),
          },
        ],
        expandableContent: {
          content: <p>I am more content that is only visible when the 2nd row is expanded</p>,
        },
      },
    ],
  },
}

export const AdvancedCustomisationReact = {
  render: ({ rows }) => {
    const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(0)

    return (
      <Table
        numberColumns={9}
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
        rows={rows}
      />
    )
  },
  args: {
    rows: [
      {
        cells: [
          {
            label: 'Is Active',
            value: <Input type="checkbox" />,
          },
          {
            label: 'Property',
            value: 'Mt Ash Jacket, Brassey Road',
            className: elSpan2,
            icon: 'property',
            cellHasDarkText: true,

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Customer',
            value: 'Mr Johnny Corrigan',
            icon: 'contact',

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Description',
            value: <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />,
          },
          {
            label: 'Request Date',
            value: '19 Apr 2021',

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Amount',
            value: '£50.00',
            cellHasDarkText: true,
          },
          {
            label: 'Payment Status',
            value: 'Not Requested',
            statusCircleIntent: 'danger',
          },
        ],

        expandableContent: {
          content: <p>I am the content that is only visible when expanded</p>,
        },
      },
      {
        cells: [
          {
            label: 'Is Active',
            value: <Input type="checkbox" />,
          },
          {
            label: 'Property',
            value: 'Property Name, Road Name',
            className: elSpan2,
            icon: 'property',
            cellHasDarkText: true,

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Customer',
            value: 'Mrs Davina Corrigan',
            icon: 'contact',

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Description',
            value: <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />,
          },
          {
            label: 'Request Date',
            value: '23rd Apr 2021',

            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Amount',
            value: '£665.21',
            cellHasDarkText: true,
          },
          {
            label: 'Payment Status',
            value: 'Pending',

            children: (
              <>
                <StatusIndicator intent="pending" />
                Pending
              </>
            ),
          },
        ],

        expandableContent: {
          content: <p>I am more content that is only visible when the 2nd row is expanded</p>,
        },
      },
    ],
  },
}
