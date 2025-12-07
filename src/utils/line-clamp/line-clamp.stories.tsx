import { LineClamp } from './line-clamp'
import { Text } from '#src/core/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof LineClamp> = {
  title: 'Utils/LineClamp',
  component: LineClamp,
  argTypes: {
    children: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    clampTo: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * The disclosure button will show and hide dynamically if a change in the element's size, content
 * or `clampTo` prop causes the content to overflow.
 */
export const Dynamic: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => {
      const [width, setWidth] = useState(640)
      return (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              marginBlockEnd: 'var(--spacing-2)',
            }}
          >
            <input
              aria-label="Container width"
              id="width"
              min={340}
              max={940}
              onChange={(event) => setWidth(Number(event.currentTarget.value))}
              step={10}
              type="range"
              value={width}
            />
            <output htmlFor="width">
              <Text colour="secondary" font="text-sm/regular">
                {width}px
              </Text>
            </output>
          </div>
          <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: `${width}px` }}>
            <Story />
          </div>
        </>
      )
    },
  ],
}
