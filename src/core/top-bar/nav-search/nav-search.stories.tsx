import preview from '#.storybook/preview'
import { TopBar } from '../top-bar'

import type { Decorator } from '@storybook/react-vite'

const meta = preview.meta({
  title: 'Navigation/TopBar/NavSearch',
  component: TopBar.NavSearch,
  argTypes: {
    button: {
      control: false,
    },
    iconItem: {
      control: false,
    },
  },
})

/**
 * When the parent container is at least 150px wide, the provided button will be displayed.
 */
export const Example = meta.story({
  args: {
    button: <TopBar.NavSearch.Button onClick={() => void 0} />,
    iconItem: <TopBar.NavSearch.IconItem onClick={() => void 0} />,
  },
  decorators: [useConstrainedWidthDecorator('150px')],
})

/**
 * When the parent container is less than 150px wide, the provided icon item will be displayed.
 */
export const SmallWidth = Example.extend({
  decorators: [useConstrainedWidthDecorator('100px')],
})

function useConstrainedWidthDecorator(width: string): Decorator {
  return (Story) => (
    <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width }}>
      <Story />
    </div>
  )
}
