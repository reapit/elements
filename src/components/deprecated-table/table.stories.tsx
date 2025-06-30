import { useState } from 'react'
import { DeprecatedTable } from './index'
import {
  DeprecatedTableHeadersRow,
  DeprecatedTableHeader,
  DeprecatedTableRow,
  DeprecatedTableCell,
  TableExpandableRowTriggerCell,
  TableExpandableRow,
  DeprecatedTableRowContainer,
  TableCtaTriggerCell,
  TableCellSplit,
} from './molecules'
import { DeprecatedIcon } from '../deprecated-icon'
import { elSpan2, elSpan3 } from '../grid'
import { InputGroup } from '../input-group'
import { Button, DeprecatedButtonGroup } from '../button'
import { DeprecatedStatusIndicator } from '../deprecated-status-indicator'
import { elMlAuto } from '../../styles/spacing'
import { FormLayout, InputWrap } from '../form-layout'
import { elIsActive } from '../../styles/states'
import { DeprecatedAvatar } from '../deprecated-avatar'
import { Input } from '../input'
import { TextBase } from '../typography'

export default {
  title: 'Deprecated/DeprecatedTable',
  component: DeprecatedTable,
}

export const BasicUsage = {
  render: ({}) => (
    <DeprecatedTable>
      <DeprecatedTableHeadersRow>
        <DeprecatedTableHeader>Checkbox Header</DeprecatedTableHeader>
        <DeprecatedTableHeader>First Header</DeprecatedTableHeader>
        <DeprecatedTableHeader>Image Header</DeprecatedTableHeader>
        <DeprecatedTableHeader>Second Header</DeprecatedTableHeader>
        <DeprecatedTableHeader>Third Header</DeprecatedTableHeader>
      </DeprecatedTableHeadersRow>
      <DeprecatedTableRowContainer>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell>First Column</DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Image">
            <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
          </DeprecatedTableCell>
          <DeprecatedTableCell>Second Column</DeprecatedTableCell>
          <DeprecatedTableCell>
            <TableCellSplit data="Third Data" subData="Some Longer Sub Data" />
          </DeprecatedTableCell>
        </DeprecatedTableRow>
      </DeprecatedTableRowContainer>
      <DeprecatedTableRowContainer>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell>First Column</DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Image">
            <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
          </DeprecatedTableCell>
          <DeprecatedTableCell>Second Column</DeprecatedTableCell>
          <DeprecatedTableCell>
            <TableCellSplit data="Third Data" subData="Some Longer Sub Data" />
          </DeprecatedTableCell>
        </DeprecatedTableRow>
      </DeprecatedTableRowContainer>
    </DeprecatedTable>
  ),
}

export const ColumnWidths = {
  render: ({}) => (
    <DeprecatedTable data-num-columns-excl-action-col="8">
      <DeprecatedTableHeadersRow>
        <DeprecatedTableHeader>Checkbox Header</DeprecatedTableHeader>
        <DeprecatedTableHeader>First Header</DeprecatedTableHeader>
        <DeprecatedTableHeader>Image Header</DeprecatedTableHeader>
        <DeprecatedTableHeader className={elSpan2}>Second Header</DeprecatedTableHeader>
        <DeprecatedTableHeader className={elSpan3}>Third Header</DeprecatedTableHeader>
      </DeprecatedTableHeadersRow>
      <DeprecatedTableRowContainer>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell>First Column</DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Image">
            <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
          </DeprecatedTableCell>
          <DeprecatedTableCell className={elSpan2}>Second Column with more data</DeprecatedTableCell>
          <DeprecatedTableCell className={elSpan3}>
            <TableCellSplit data="Third Data" subData="Some much much much Longer Sub Data" />
          </DeprecatedTableCell>
        </DeprecatedTableRow>
      </DeprecatedTableRowContainer>
      <DeprecatedTableRowContainer>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell>First Column</DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Image">
            <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
          </DeprecatedTableCell>
          <DeprecatedTableCell className={elSpan2}>Second Column with more data</DeprecatedTableCell>
          <DeprecatedTableCell className={elSpan3}>
            <TableCellSplit data="Third Data" subData="Some much much much Longer Sub Data" />
          </DeprecatedTableCell>
        </DeprecatedTableRow>
      </DeprecatedTableRowContainer>
    </DeprecatedTable>
  ),
  name: 'Column widths',
}

export const BasicCustomisationTableCells = {
  render: ({}) => (
    <DeprecatedTable>
      <DeprecatedTableHeadersRow>
        <DeprecatedTableHeader>Selected</DeprecatedTableHeader>
        <DeprecatedTableHeader>Property Image</DeprecatedTableHeader>
        <DeprecatedTableHeader>Property</DeprecatedTableHeader>
        <DeprecatedTableHeader>Customer</DeprecatedTableHeader>
        <DeprecatedTableHeader>Description</DeprecatedTableHeader>
        <DeprecatedTableHeader>Request Date</DeprecatedTableHeader>
        <DeprecatedTableHeader>Amount</DeprecatedTableHeader>
        <DeprecatedTableHeader>Payment Status</DeprecatedTableHeader>
      </DeprecatedTableHeadersRow>
      <DeprecatedTableRowContainer>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Selected">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Image">
            <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
          </DeprecatedTableCell>
          <DeprecatedTableCell darkText narrowIsFullWidth>
            1 King Road, London, UK, S1 1AA
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Type">
            <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Request Date">19 Apr 2021</DeprecatedTableCell>
          <DeprecatedTableCell darkText narrowLabel="Amount">
            £50.00
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Status">
            <DeprecatedStatusIndicator intent="pending" />
            Pending
          </DeprecatedTableCell>
        </DeprecatedTableRow>
      </DeprecatedTableRowContainer>
    </DeprecatedTable>
  ),
  name: 'Basic Customisation - DeprecatedTable Cells',
}

export const ExpandingTableCellSpace = {
  render: ({}) => (
    <DeprecatedTable data-force-narrow-table="true">
      <DeprecatedTableHeadersRow>
        <DeprecatedTableHeader>Is Active</DeprecatedTableHeader>
        <DeprecatedTableHeader>Property</DeprecatedTableHeader>
        <DeprecatedTableHeader>Customer</DeprecatedTableHeader>
        <DeprecatedTableHeader>Description</DeprecatedTableHeader>
        <DeprecatedTableHeader>Request Date</DeprecatedTableHeader>
        <DeprecatedTableHeader>Amount</DeprecatedTableHeader>
        <DeprecatedTableHeader>Payment Status</DeprecatedTableHeader>
      </DeprecatedTableHeadersRow>
      <DeprecatedTableRowContainer>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Active">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell darkText>Mt Ash Jacket Brassey Road</DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Type">
            <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Request Date">19 Apr 2021</DeprecatedTableCell>
          <DeprecatedTableCell darkText narrowLabel="Amount">
            £50.00
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Status">
            <DeprecatedStatusIndicator intent="pending" />
            Pending
          </DeprecatedTableCell>
        </DeprecatedTableRow>
      </DeprecatedTableRowContainer>
    </DeprecatedTable>
  ),
}

export const ExpandableContent = {
  render: ({}) => (
    <DeprecatedTable data-num-columns-excl-action-col="7" data-has-expandable-action>
      <DeprecatedTableHeadersRow>
        <DeprecatedTableHeader>Is Active</DeprecatedTableHeader>
        <DeprecatedTableHeader>Property</DeprecatedTableHeader>
        <DeprecatedTableHeader>Customer</DeprecatedTableHeader>
        <DeprecatedTableHeader>Description</DeprecatedTableHeader>
        <DeprecatedTableHeader>Request Date</DeprecatedTableHeader>
        <DeprecatedTableHeader>Amount</DeprecatedTableHeader>
        <DeprecatedTableHeader>Payment Status</DeprecatedTableHeader>
        <DeprecatedTableHeader>
          <DeprecatedIcon icon="edit" intent="default" />
        </DeprecatedTableHeader>
      </DeprecatedTableHeadersRow>
      <DeprecatedTableRowContainer className={elIsActive}>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Active">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell darkText narrowIsFullWidth>
            Mt Ash Jacket Brassey Road
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Type">
            <TableCellSplit data="Some Data" subData="Some Longer Sub Data" />
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Request Date">19 Apr 2021</DeprecatedTableCell>
          <DeprecatedTableCell darkText narrowLabel="Amount">
            £50.00
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Status">
            <DeprecatedStatusIndicator intent="pending" />
            Pending
          </DeprecatedTableCell>
          <TableExpandableRowTriggerCell isOpen />
        </DeprecatedTableRow>
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
                <Button variant="primary">Send</Button>
              </DeprecatedButtonGroup>
            </InputWrap>
          </FormLayout>
        </TableExpandableRow>
      </DeprecatedTableRowContainer>
    </DeprecatedTable>
  ),
}

export const CallToActionContent = {
  render: ({}) => (
    <DeprecatedTable data-num-columns-excl-action-col="7" data-has-call-to-action>
      <DeprecatedTableHeadersRow>
        <DeprecatedTableHeader>Is Active</DeprecatedTableHeader>
        <DeprecatedTableHeader>Property</DeprecatedTableHeader>
        <DeprecatedTableHeader>Customer</DeprecatedTableHeader>
        <DeprecatedTableHeader>Description</DeprecatedTableHeader>
        <DeprecatedTableHeader>Request Date</DeprecatedTableHeader>
        <DeprecatedTableHeader>Amount</DeprecatedTableHeader>
        <DeprecatedTableHeader>Payment Status</DeprecatedTableHeader>
        <DeprecatedTableHeader>Download Content</DeprecatedTableHeader>
      </DeprecatedTableHeadersRow>
      <DeprecatedTableRowContainer>
        <DeprecatedTableRow>
          <DeprecatedTableCell narrowLabel="Active">
            <Input type="checkbox" />
          </DeprecatedTableCell>
          <DeprecatedTableCell darkText narrowIsFullWidth>
            Mt Ash Jacket Brassey Road
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Name Customer" icon="contact">
            Mr Johnny Corrigan
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Type">Tenant Payment Request</DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Request Date">19 Apr 2021</DeprecatedTableCell>
          <DeprecatedTableCell darkText narrowLabel="Amount">
            £50.00
          </DeprecatedTableCell>
          <DeprecatedTableCell narrowLabel="Status">
            <DeprecatedStatusIndicator intent="pending" />
            Pending
          </DeprecatedTableCell>
          <TableCtaTriggerCell icon="fileDownload" />
        </DeprecatedTableRow>
      </DeprecatedTableRowContainer>
    </DeprecatedTable>
  ),
}

export const ReactShorthandUsage = {
  render: ({ rows }) => <DeprecatedTable rows={rows} />,
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
            value: <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />,
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
            value: <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />,
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
                <DeprecatedStatusIndicator intent="pending" />
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
      <DeprecatedTable
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
                <DeprecatedStatusIndicator intent="pending" />
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
