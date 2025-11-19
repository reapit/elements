import { AtAGlanceButtonCard } from './button-card'
import { SproutIcon } from '#src/icons/sprout'
import { Text } from '#src/core/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AtAGlanceButtonCard> = {
  title: 'Core/AtAGlance/ButtonCard',
  component: AtAGlanceButtonCard,
  argTypes: {
    description: { control: 'text' },
    displayValue: { control: 'text' },
    icon: { control: false },
    label: { control: 'text' },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'compact'],
    },
    maxWidth: { control: 'text' },
    minWidth: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * A button card that triggers an action when clicked. The entire card is clickable
 * and triggers an onClick handler. The display value is shown in the action color
 * to indicate interactivity.
 *
 * Use this component when the card should trigger a standalone action rather than navigate.
 */
export const Example: Story = {
  args: {
    description: 'Crunchy and Juicy',
    displayValue: '32',
    icon: <SproutIcon />,
    label: 'Apple',
    layout: 'vertical',
    onClick: () => alert('Button clicked!'),
  },
}

/**
 * Button cards support three layout variants:
 * - `vertical`: Icon and content stacked vertically (default)
 * - `compact`: Icon on left, label/description stacked, value on far right
 * - `horizontal`: Icon on left, label/description stacked, value on right
 */
export const Layouts: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story, { args }) => (
      <div style={{ color: '#FA00FF', display: 'flex', gap: 'var(--spacing-6)' }}>
        <div style={{ flexGrow: 1 }}>
          <Text style={{ marginBlockEnd: 'var(--spacing-2)' }}>Vertical</Text>
          <Story args={{ ...args, layout: 'vertical' }} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Text style={{ marginBlockEnd: 'var(--spacing-2)' }}>Compact</Text>
          <Story args={{ ...args, layout: 'compact' }} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Text style={{ marginBlockEnd: 'var(--spacing-2)' }}>Horizontal</Text>
          <Story args={{ ...args, layout: 'horizontal' }} />
        </div>
      </div>
    ),
  ],
}

/**
 * The icon prop is optional.
 */
export const NoIcon: Story = {
  args: {
    ...Example.args,
    icon: null,
  },
}

/**
 * The description prop is optional.
 */
export const NoDescription: Story = {
  args: {
    ...Example.args,
    description: null,
  },
}

/**
 * The minimum and maximum width of the card can be specified. This is useful
 * in the context of grid and carousel layouts.
 */
export const Width: Story = {
  args: {
    displayValue: '32',
    label: 'Apple',
    layout: 'horizontal',
    maxWidth: '200px',
    onClick: () => alert('Clicked!'),
  },
}

/**
 * Button card content is stretched to fill available space, allowing values within
 * each card to be vertically aligned when displayed in a grid.
 */
export const Alignment: Story = {
  args: {
    ...Example.args,
  },
  argTypes: {
    label: { control: false },
    description: { control: false },
    displayValue: { control: false },
  },
  decorators: [
    (Story: any) => {
      const [width, setWidth] = useState(900)
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
              min={800}
              max={1200}
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
          <div
            style={{
              border: '1px solid #FA00FF',
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: '1fr',
              gap: 'var(--spacing-6)',
              width,
            }}
          >
            <Story />
          </div>
        </>
      )
    },
  ],
  render: (args) => (
    <>
      <AtAGlanceButtonCard
        {...args}
        description="Crunchy and Juicy"
        displayValue="32"
        icon={<SproutIcon />}
        label="Apple"
      />
      <AtAGlanceButtonCard
        {...args}
        description="Crunchy and juicy. Some are red, others are green. Some can even be yellow, pink or dark purple. I've ran out of copy ideas."
        displayValue="32"
        icon={<SproutIcon />}
        label="Apple"
      />
      <AtAGlanceButtonCard
        {...args}
        description="They all mean the same thing"
        displayValue="32"
        icon={<SproutIcon />}
        label="Apple, apfel, pomme, mela, maçã or măr"
      />
    </>
  ),
}
