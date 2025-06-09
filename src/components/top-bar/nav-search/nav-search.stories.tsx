import { TopBarNavSearch } from './nav-search'

import type { Decorator, Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TopBar/NavSearch',
  component: TopBarNavSearch,
  argTypes: {
    button: {
      control: false,
    },
    iconItem: {
      control: false,
    },
  },
} satisfies Meta<typeof TopBarNavSearch>

export default meta

type Story = StoryObj<typeof meta>

/**
 * When the parent container is at least 150px wide, the provided button will be displayed.
 */
export const Example: Story = {
  args: {
    button: <TopBarNavSearch.Button onClick={() => void 0} />,
    iconItem: <TopBarNavSearch.IconItem onClick={() => void 0} />,
  },
  decorators: [useConstrainedWidthDecorator('150px')],
}

/**
 * When the parent container is less than 150px wide, the provided icon item will be displayed.
 */
export const SmallWidth: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useConstrainedWidthDecorator('100px')],
}

function useConstrainedWidthDecorator(width: string): Decorator {
  return (Story) => (
    <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width }}>
      <Story />
    </div>
  )
}
