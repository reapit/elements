import { Meta } from '@storybook/react'
import { TableBody } from './table-body'

const meta: Meta<typeof TableBody> = {
  title: 'Components/TableBody',
  component: TableBody,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableBody>
      <thead>
        <tr>
          <th>Test th</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Test td</td>
        </tr>
      </tbody>
    </TableBody>
  ),
}
