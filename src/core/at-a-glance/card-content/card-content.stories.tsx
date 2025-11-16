import { AtAGlanceCardContent } from './card-content'
import { SproutIcon } from '#src/icons/sprout'
import { Text } from '#src/core/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AtAGlanceCardContent> = {
  title: 'Core/AtAGlance/CardContent',
  component: AtAGlanceCardContent,
  argTypes: {
    description: {
      control: 'text',
    },
    icon: {
      control: 'radio',
      options: ['None', 'Sprout'],
      mapping: {
        None: undefined,
        Sprout: <SproutIcon />,
      },
    },
    label: {
      control: 'text',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'compact'],
    },
    value: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default layout is vertical.
 */
export const Example: Story = {
  args: {
    icon: 'Sprout',
    description: 'Crunchy and Juicy',
    label: 'Apple',
    layout: 'vertical',
    value: '32',
  },
  decorators: [
    (Story: any) => (
      <div style={{ border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * The component supports three layouts: `vertical`, `compact`, and `horizontal`.
 * Each layout arranges the icon, label, description, and value differently to accommodate
 * different space requirements and design needs.
 */
export const Variants: Story = {
  args: {
    ...Example.args,
  },
  argTypes: {
    layout: {
      control: false,
    },
  },
  decorators: [
    (Story, { args }) => (
      <div style={{ color: '#FA00FF', display: 'flex', flexFlow: 'row nowrap', gap: 'var(--spacing-6)' }}>
        <div style={{ flexGrow: 1, height: 'min-content' }}>
          <Text>Vertical</Text>
          <div style={{ border: '1px solid #FA00FF' }}>
            <Story args={{ ...args, layout: 'vertical' }} />
          </div>
        </div>
        <div style={{ flexGrow: 1, height: 'min-content' }}>
          <Text>Compact</Text>
          <div style={{ border: '1px solid #FA00FF' }}>
            <Story args={{ ...args, layout: 'compact' }} />
          </div>
        </div>
        <div style={{ flexGrow: 1, height: 'min-content' }}>
          <Text>Horizontal</Text>
          <div style={{ border: '1px solid #FA00FF' }}>
            <Story args={{ ...args, layout: 'horizontal' }} />
          </div>
        </div>
      </div>
    ),
  ],
}

/**
 * Icons are optional in all layouts.
 */
export const NoIcon: Story = {
  args: {
    ...Example.args,
    icon: 'None',
  },
  argTypes: {
    layout: {
      control: false,
    },
  },
  decorators: Variants.decorators,
}

/**
 * Descriptions are optional in all layouts.
 */
export const NoDescription: Story = {
  args: {
    ...Example.args,
    description: undefined,
  },
  argTypes: {
    layout: {
      control: false,
    },
  },
  decorators: Variants.decorators,
}

/**
 * The label and description will naturally wrap, increasing the height of the content.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    description:
      'Crunchy and juicy. Some are red, others are green. Some can even be yellow, pink or dark purple. I’ve ran out of copy ideas.',
    label: 'Apple, apfel, pomme, mela, maçã or măr',
    layout: 'vertical',
  },
  argTypes: {
    description: {
      control: false,
    },
    layout: {
      control: false,
    },
  },
  decorators: [
    (Story: any) => {
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
              max={410}
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

/**
 * With vertical and compact layouts, the value is always aligned to the bottom of the card. When
 * multiple cards are displayed in a row using a flex or grid layout, they will automatically stretch
 * to match the height of the tallest card. This ensures all values align with each other at the bottom,
 * even when cards contain different amounts of label and description content.
 */
export const Alignment: Story = {
  args: {
    ...Example.args,
    layout: 'vertical',
  },
  argTypes: {
    description: {
      control: false,
    },
    layout: {
      control: false,
    },
  },
  decorators: [
    (Story: any) => (
      <div
        style={{
          display: 'grid',
          grid: 'auto-flow / 1fr 1fr 1fr',
          gap: 'var(--spacing-6)',
          border: '1px solid #FA00FF',
          width: '800px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <AtAGlanceCardContent {...args} />
      <AtAGlanceCardContent
        {...args}
        description="Crunchy and juicy. Some are red, others are green. Some can even be yellow, pink or dark purple. I’ve ran out of copy ideas."
      />
      <AtAGlanceCardContent
        {...args}
        label="Apple, apfel, pomme, mela, maçã or măr"
        description="They all mean the same thing"
      />
    </>
  ),
}
