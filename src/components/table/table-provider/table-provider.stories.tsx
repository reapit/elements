import { TableProvider } from './table-provider'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TableProvider',
  component: TableProvider,
} satisfies Meta<typeof TableProvider>

export default meta

type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  args: {
    rows: [],
    idKey: 'id',
    children: <div>Table Provider Example</div>,
  },
  render: (args) => <TableProvider {...args} />,
}
