import preview from '#.storybook/preview'
import { LineClamp } from './line-clamp'
import { Text } from '#src/utils/text'
import { useState } from 'react'

const meta = preview.meta({
  title: 'Utils/LineClamp',
  component: LineClamp,
  argTypes: {
    children: {
      control: 'text',
    },
  },
})

export const Example = meta.story({
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
})

/**
 * Use `whiteSpace="pre-wrap"` to preserve newlines, tabs, and runs of spaces in user-authored
 * content retrieved from an API. Here the text contains literal `\n` line breaks that are
 * preserved in the rendered text.
 */
export const WhiteSpace = meta.story({
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    clampTo: 2,
    whiteSpace: 'pre-wrap',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * The disclosure button will show and hide dynamically if a change in the element's size, content
 * or `clampTo` prop causes the content to overflow.
 */
export const Dynamic = Example.extend({
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
})
