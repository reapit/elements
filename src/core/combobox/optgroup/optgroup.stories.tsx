import { Badge } from '#src/core/badge'
import { ComboboxOptgroup } from './optgroup'
import { ComboboxOption } from '../option'
import { Text } from '#src/utils/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox/Optgroup',
  component: ComboboxOptgroup,
  argTypes: {
    children: {
      control: 'select',
      options: ['Simple', 'Fancy'],
      mapping: {
        Simple: (
          <>
            <ComboboxOption value="option-1">Option 1</ComboboxOption>
            <ComboboxOption value="option-2">Option 2</ComboboxOption>
            <ComboboxOption value="option-3">Option 3</ComboboxOption>
          </>
        ),
        Fancy: (
          <>
            <ComboboxOption
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              additionalInfo={<ComboboxOption.AdditionalInfo>Supplementary info</ComboboxOption.AdditionalInfo>}
              value="option-1"
            >
              Option 1
            </ComboboxOption>
            <ComboboxOption
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              additionalInfo={<ComboboxOption.AdditionalInfo>Supplementary info</ComboboxOption.AdditionalInfo>}
              value="option-2"
            >
              Option 2
            </ComboboxOption>
            <ComboboxOption
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              additionalInfo={<ComboboxOption.AdditionalInfo>Supplementary info</ComboboxOption.AdditionalInfo>}
              value="option-3"
            >
              Option 3
            </ComboboxOption>
          </>
        ),
      },
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ComboboxOptgroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * An option group containing `Combobox.Option` components.
 */
export const Example: Story = {
  args: {
    children: 'Simple',
    label: 'Group label',
  },
}

/**
 * Option groups without visual labels require an accessible label via `aria-label`.
 */
export const NoLabel: Story = {
  args: {
    ...Example.args,
    'aria-label': 'Group label',
    label: undefined,
  },
}

/**
 * Keep group labels concise. Text wraps to multiple lines when it exceeds available space.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    label: "This is a long group title that won't fit on one line",
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
}

/**
 * Group labels stick to their position when the parent container scrolls.
 */
export const StickyPositioning: Story = {
  args: {
    ...Example.args,
    children: 'Fancy',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', maxHeight: '100px', overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
}
