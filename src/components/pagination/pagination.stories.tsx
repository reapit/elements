import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Pagination } from './pagination'
import { useState } from 'react'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    onPageChange: action('onPageChange'),
    currentPage: 1,
    pageCount: 5,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The pagination component is used to navigate between pages
 * It displays the current page and the total number of pages available
 */
export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(1)
    return <Pagination {...args} onPageChange={setPage} currentPage={page} />
  },
}
