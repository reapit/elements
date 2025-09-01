import { Pagination } from './pagination'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Pagination',
  component: Pagination,
  argTypes: {
    leftAction: {
      control: false,
    },
    rightAction: {
      control: false,
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The pagination actions can either be links or buttons. In either case, the left action should be
 * ARIA disabled if the first page is being displayed, while the right action should be ARIA disabled
 * if the last page is being displayed.
 *
 * The `Pagination.getLinkProps` helper can be used to assist configuring the `Pagination.Link` or
 * `Pagination.LinkButton` actions. It will ensure the correct `aria-disabled` and `aria-label`
 * attributes are set.
 */
export const Example: Story = {
  args: {
    leftAction: <Pagination.Link {...Pagination.getLinkProps('previous-page', 1, 10)} href={href} />,
    pageCount: 10,
    pageNumber: 1,
    rightAction: <Pagination.Link {...Pagination.getLinkProps('next-page', 1, 10)} href={href} />,
  },
}

/**
 * In some cases, it may be necessary to use button elements, rather than anchor elements, for the
 * pagination links. In this case, `Pagination.LinkButton` can be used in place of `Pagination.Link`.
 */
export const Buttons: Story = {
  args: {
    leftAction: <Pagination.LinkButton {...Pagination.getLinkProps('previous-page', 5, 10)} />,
    pageCount: 10,
    pageNumber: 5,
    rightAction: <Pagination.LinkButton {...Pagination.getLinkProps('next-page', 5, 10)} />,
  },
}
