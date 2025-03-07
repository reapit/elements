import { Breadcrumbs } from './breadcrumbs'

import type { Meta, StoryObj } from '@storybook/react'
import { elBreadcrumbLink } from './styles'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

/**
 * `elBreadcrumbLink` className exported so it can be used to integrate with external component
 * i.e `React-router's` Link .etc
 */
export const Default: Story = {
  args: {
    children: 'Label',
  },
  render: () => {
    return (
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level one</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level two</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <a href="#" className={elBreadcrumbLink}>
            Level three (plain anchor)
          </a>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    )
  },
}

/**
 * in desktop screen when the width doesn't fit, the label will shorten using ellipsis
 * in mobile screen the label will not shorten, and the breadcrumb become scrollable
 */
export const WithManyItems: Story = {
  args: {
    children: 'Label',
  },
  render: () => {
    return (
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level one</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level two</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level three</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level four</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level five</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level six</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level seven</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level eight</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level nine</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level ten</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    )
  },
}
