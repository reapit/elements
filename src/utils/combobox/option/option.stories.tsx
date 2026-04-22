import preview from '#.storybook/preview'
import { Badge } from '#src/core/badge'
import { ComboboxOption } from './option'
import { StarIcon } from '#src/icons/star'
import { Text } from '#src/utils/text'
import { useState } from 'react'

const meta = preview.meta({
  title: 'Utils/Combobox/Option',
  component: ComboboxOption,
  argTypes: {
    'aria-checked': {
      control: 'boolean',
    },
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
      control: false,
    },
    additionalInfo: {
      control: 'radio',
      options: ['None', 'One line', 'Two lines'],
      mapping: {
        None: undefined,
        'One line': (
          <ComboboxOption.AdditionalInfo
            badge={<Badge colour="neutral">Badge</Badge>}
            icon={<StarIcon aria-label="Preferred" />}
          >
            Optional info
          </ComboboxOption.AdditionalInfo>
        ),
        'Two lines': [
          <ComboboxOption.AdditionalInfo
            key="1"
            badge={<Badge colour="neutral">Badge</Badge>}
            icon={<StarIcon aria-label="Preferred" />}
          >
            Optional info
          </ComboboxOption.AdditionalInfo>,
          <ComboboxOption.AdditionalInfo
            key="2"
            badge={<Badge colour="neutral">Badge</Badge>}
            icon={<StarIcon aria-label="Favourite" />}
          >
            Optional info
          </ComboboxOption.AdditionalInfo>,
        ],
      },
    },
    value: {
      control: 'text',
    },
  },
})

export const Example = meta.story({
  args: {
    'aria-checked': undefined,
    'aria-selected': undefined,
    badge: 'None',
    children: 'Label',
    additionalInfo: 'None',
    size: 'medium',
    value: 'option-1',
  },
})

/**
 *
 */
export const Sizes = Example.extend({
  argTypes: {
    size: { control: false },
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <>
      <ComboboxOption {...args} size="medium" />
      <ComboboxOption {...args} size="large" />
    </>
  ),
})

/**
 * Each option manages its selection state internally. Single-select comboboxes use the
 * `aria-selected` attribute to mark selected options.
 */
export const Selected = Example.extend({
  args: {
    'aria-selected': true,
  },
})

/**
 * Multi-select comboboxes use the `aria-checked` attribute to mark selected options.
 */
export const Checked = Example.extend({
  args: {
    'aria-checked': true,
  },
})

/**
 * Badges provide additional context. Place them after the option label or within supplementary info.
 */
export const Badges = Example.extend({
  args: {
    badge: 'Badge',
  },
})

/**
 * Supplementary information helps users choose the right option. Provide up to two lines, each with
 * icons, text, or badges.
 */
export const SupplementaryInfo = Example.extend({
  args: {
    additionalInfo: 'Two lines',
  },
})

/**
 * Keep labels and supplementary information concise. Text wraps to multiple lines when it exceeds
 * available space. Badges display inline or wrap to a new line as needed.
 */
export const Wrapping = Selected.extend({
  args: {
    badge: <Badge colour="neutral">Commercial</Badge>,
    children: '456B Heritage Boulevard, Upper Brookfield Heights, Brisbane QLD 4069',

    additionalInfo: [
      <ComboboxOption.AdditionalInfo key="1" badge={<Badge colour="inactive">Sales</Badge>}>
        John Smith
      </ComboboxOption.AdditionalInfo>,
      <ComboboxOption.AdditionalInfo key="2" badge={<Badge colour="inactive">Owner</Badge>}>
        Sarah Johnson
      </ComboboxOption.AdditionalInfo>,
    ],
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
