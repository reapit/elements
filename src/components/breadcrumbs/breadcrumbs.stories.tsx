import { Breadcrumbs } from './breadcrumbs'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    children: {
      control: 'radio',
      options: ['One', 'Some', 'Many'],
      mapping: {
        One: (
          <>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Properties</Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </>
        ),
        Some: (
          <>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Properties</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Residential</Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </>
        ),
        Many: (
          <>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Properties</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Residential</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Houses and Units</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Units and Other Stuff</Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </>
        ),
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Some',
  },
}

/**
 * Overflowing should be avoided as much as possible. On SM screen sizes and larger, or when `overflow="truncate"` is
 * specified, each item's text will shrink as space becomes limited, using ellipses to indicate truncation has
 * occurred, but the breadcrumb separators should remain fully visible. In general, it's best to avoid this situation
 * altogether by limiting the number of breadcrumbs in the trail.
 */
export const Overflow: Story = {
  args: {
    children: 'Many',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '343px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * On XS screen sizes (e.g. under 768px), or when `overflow="scroll"` is specified, the breadcrumbs will be
 * horizontally scrollable, albeit without any visible scrollbar. When scrolling occurs, the focus outlines will
 * be clipped; this is expected and considered acceptable.
 */
export const Scrolling: Story = {
  args: {
    children: 'Many',
    overflow: 'scroll',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '343px' }}>
        <Story />
      </div>
    ),
  ],
}
