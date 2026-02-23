import { AtAGlanceHeader } from './header'
import { Button } from '#src/core/button'
import { SettingsAltIcon } from '#src/icons/settings-alt'
import { Switch } from '#src/core/switch'
import { Text } from '#src/utils/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AtAGlance/Header',
  component: AtAGlanceHeader,
  argTypes: {
    accessory: {
      control: 'radio',
      options: ['None', 'Button', 'Switch'],
      mapping: {
        None: null,
        Button: (
          <Button
            aria-label="View settings"
            hasNoPadding
            iconRight={<SettingsAltIcon />}
            size="large"
            variant="tertiary"
          />
        ),
        Switch: <Switch label="Automation" />,
      },
    },
  },
} satisfies Meta<typeof AtAGlanceHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    accessory: 'None',
    children: 'At a glance',
  },
}

/**
 * A header with an accessory button. The accessory can be a button, a selector, a switch or another
 * suitable component.
 */
export const Accessory: Story = {
  args: {
    ...Example.args,
    accessory: 'Button',
  },
}

/**
 * An accessory can be displayed without a title.
 */
export const NoTitle: Story = {
  args: {
    accessory: 'Switch',
  },
}

/**
 * The header text will wrap to additional lines when there is not enough space.
 */
export const Wrapping: Story = {
  args: {
    ...Accessory.args,
    children: 'A very long title that demonstrates how the header component handles text wrapping',
  },
  decorators: [
    (Story: any) => {
      const [width, setWidth] = useState(500)
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
              max={800}
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
          <div style={{ border: '1px solid #FA00FF', width }}>
            <Story />
          </div>
        </>
      )
    },
  ],
}
