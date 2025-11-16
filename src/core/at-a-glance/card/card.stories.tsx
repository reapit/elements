import { AtAGlanceCard } from './card'
import { AtAGlanceCardContent } from '../card-content'
import { AtAGlanceCardLink } from '../card-link'
import { SproutIcon } from '#src/icons/sprout'
import { Text } from '#src/core/text'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AtAGlanceCard> = {
  title: 'Core/AtAGlance/Card',
  component: AtAGlanceCard,
  argTypes: {
    children: {
      control: false,
      options: ['Simple', 'Link', 'Selectable', 'Compact', 'Horizontal'],
      mapping: {
        Simple: (
          <AtAGlanceCardContent
            description="Crunchy and Juicy"
            icon={<SproutIcon />}
            label="Apple"
            layout="vertical"
            value="32"
          />
        ),
        Link: (
          <AtAGlanceCardContent
            description="Crunchy and Juicy"
            icon={<SproutIcon />}
            label="Apple"
            layout="vertical"
            value={<AtAGlanceCardLink href="#">32</AtAGlanceCardLink>}
          />
        ),
        Selectable: (
          <AtAGlanceCardContent
            description="Crunchy and Juicy"
            icon={<SproutIcon />}
            label="Apple"
            layout="vertical"
            value={<AtAGlanceCardLink href="#">32</AtAGlanceCardLink>}
          />
        ),
        Compact: (
          <AtAGlanceCardContent
            description="Crunchy and Juicy"
            icon={<SproutIcon />}
            label="Apple"
            layout="compact"
            value="32"
          />
        ),
        Horizontal: (
          <AtAGlanceCardContent
            description="Crunchy and Juicy"
            icon={<SproutIcon />}
            label="Apple"
            layout="horizontal"
            value="32"
          />
        ),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <AtAGlanceCardContent
        description="Crunchy and Juicy"
        icon={<SproutIcon />}
        label="Apple"
        layout="vertical"
        value="32"
      />
    ),
  },
}

/**
 * When the card has a descendant `AtAGlance.CardLink`, it will appear interactive.
 */
export const Link: Story = {
  args: {
    children: (
      <AtAGlanceCardContent
        description="Crunchy and Juicy"
        icon={<SproutIcon />}
        label="Apple"
        layout="vertical"
        value={<AtAGlanceCardLink href="#">32</AtAGlanceCardLink>}
      />
    ),
  },
}

/**
 * The card works with all three layouts of `AtAGlance.CardContent`:
 * `vertical`, `compact`, and `horizontal`.
 */
export const Layouts: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story, { args }) => (
      <div style={{ color: '#FA00FF', display: 'flex', flexFlow: 'row nowrap', gap: 'var(--spacing-6)' }}>
        <div style={{ flexGrow: 1, height: 'min-content' }}>
          <Text>Vertical</Text>
          <Story args={{ ...args, children: meta.argTypes?.children?.mapping?.Simple }} />
        </div>
        <div style={{ flexGrow: 1, height: 'min-content' }}>
          <Text>Compact</Text>
          <Story args={{ ...args, children: meta.argTypes?.children?.mapping?.Compact }} />
        </div>
        <div style={{ flexGrow: 1, height: 'min-content' }}>
          <Text>Horizontal</Text>
          <Story args={{ ...args, children: meta.argTypes?.children?.mapping?.Horizontal }} />
        </div>
      </div>
    ),
  ],
}

/**
 * By default, the card content will be stretched to fill the card's available space. This allows,
 * for example, the values within each card to be vertically aligned.
 */
export const Alignment: Story = {
  args: {
    ...Example.args,
  },
  argTypes: {
    children: {
      control: false,
    },
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
      <AtAGlanceCard {...args}>
        <AtAGlanceCardContent
          description="Crunchy and Juicy"
          icon={<SproutIcon />}
          label="Apple"
          layout="compact"
          value="32"
        />
      </AtAGlanceCard>
      <AtAGlanceCard {...args}>
        <AtAGlanceCardContent
          description="Crunchy and juicy. Some are red, others are green. Some can even be yellow, pink or dark purple. I’ve ran out of copy ideas."
          icon={<SproutIcon />}
          label="Apple"
          layout="compact"
          value="32"
        />
      </AtAGlanceCard>
      <AtAGlanceCard {...args}>
        <AtAGlanceCardContent
          description="They all mean the same thing"
          icon={<SproutIcon />}
          label="Apple, apfel, pomme, mela, maçã or măr"
          layout="compact"
          value="32"
        />
      </AtAGlanceCard>
    </>
  ),
}
