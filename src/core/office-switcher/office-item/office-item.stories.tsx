import preview from '#.storybook/preview'
import { Badge } from '#src/core/badge'
import { OfficeItem } from './office-item'
import { Text } from '#src/utils/text'
import { useState } from 'react'

const meta = preview.meta({
  title: 'Core/OfficeSwitcher/OfficeItem',
  component: OfficeItem,
  argTypes: {
    'aria-selected': {
      control: 'boolean',
    },
    badge: {
      control: 'radio',
      options: ['None', 'Badge'],
      mapping: {
        None: undefined,
        Badge: <Badge colour="neutral">Badge</Badge>,
      },
    },
    children: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
})

export const Example = meta.story({
  args: {
    'aria-selected': undefined,
    badge: 'None',
    children: 'Office name',
    value: 'office-1',
  },
})

/**
 * Each office item manages its selection state internally. Office switchers use the
 * `aria-selected` attribute to mark selected offices.
 */
export const Selected = Example.extend({
  args: {
    'aria-selected': true,
  },
})

/**
 * Badges provide additional context. Place them after the office label.
 */
export const WithBadge = Example.extend({
  name: 'Badge',
  args: {
    badge: 'Badge',
  },
})

/**
 * When there is insufficient space, the office name will truncate.
 */
export const Truncation = Example.extend({
  args: {
    'aria-selected': true,
    children: 'A really long office name that will be truncated',
  },
  decorators: [
    (Story) => {
      const [width, setWidth] = useState(300)
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
              min={200}
              max={400}
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
