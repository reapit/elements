import { Meta } from '@storybook/react'
// import { figmaDesignUrls } from '../../storybook/figma'
import { TableContainer } from './tableContainer'

const meta: Meta<typeof TableContainer> = {
  title: 'Components/TableContainer',
  component: TableContainer,
}

export default meta

export const StylesOnlyUsage = {
  render: ({}) => <TableContainer>Atomic components to go here! TBC</TableContainer>,
}
