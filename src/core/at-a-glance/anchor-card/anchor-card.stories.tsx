import preview from '#.storybook/preview'
import { AtAGlance } from '../at-a-glance'
import { SproutIcon } from '#src/icons/sprout'
import { Text } from '#src/utils/text'
import { useState } from 'react'

const meta = preview.meta({
  title: 'Core/AtAGlance/AnchorCard',
  component: AtAGlance.AnchorCard,
  argTypes: {
    'aria-current': {
      control: 'inline-radio',
      options: ['page', false],
    },
    description: { control: 'text' },
    displayValue: { control: 'text' },
    href: { control: 'text' },
    icon: { control: false },
    label: { control: 'text' },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'compact'],
    },
    maxWidth: { control: 'text' },
    minWidth: { control: 'text' },
  },
})

const href = '#'

/**
 * A navigable card that links to a URL. The entire card is clickable
 * and navigates to the specified URL. The display value is shown in the action color
 * to indicate interactivity.
 *
 * Use this component when the card should navigate to another page or section.
 */
export const Example = meta.story({
  args: {
    description: 'Crunchy and Juicy',
    displayValue: '32',
    href,
    icon: <SproutIcon />,
    label: 'Apple',
    layout: 'vertical',
  },
})

/**
 * Link cards support three layout variants:
 * - `vertical`: Icon and content stacked vertically (default)
 * - `compact`: Icon on left, label/description stacked, value on far right
 * - `horizontal`: Icon on left, label/description stacked, value on right
 */
export const Layouts = Example.extend({
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
})

/**
 * Use `aria-current="page"` to indicate the link represents the current page (i.e. it's "selected").
 * This applies special styling to highlight the current context.
 */
export const Selected = Example.extend({
  args: {
    'aria-current': 'page',
  },
})

/**
 * The icon prop is optional.
 */
export const NoIcon = Example.extend({
  args: {
    icon: null,
  },
})

/**
 * The description prop is optional.
 */
export const NoDescription = Example.extend({
  args: {
    description: null,
  },
})

/**
 * The minimum and maximum width of the card can be specified. This is useful
 * in the context of grid and carousel layouts.
 */
export const Width = meta.story({
  args: {
    displayValue: '32',
    href,
    label: 'Apple',
    layout: 'horizontal',
    maxWidth: '200px',
  },
})

/**
 * Link card content is stretched to fill available space, allowing values within
 * each card to be vertically aligned when displayed in a grid.
 */
export const Alignment = Example.extend({
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
      <AtAGlance.AnchorCard
        {...args}
        description="Crunchy and Juicy"
        displayValue="32"
        icon={<SproutIcon />}
        label="Apple"
      />
      <AtAGlance.AnchorCard
        {...args}
        description="Crunchy and juicy. Some are red, others are green. Some can even be yellow, pink or dark purple. I've ran out of copy ideas."
        displayValue="32"
        icon={<SproutIcon />}
        label="Apple"
      />
      <AtAGlance.AnchorCard
        {...args}
        description="They all mean the same thing"
        displayValue="32"
        icon={<SproutIcon />}
        label="Apple, apfel, pomme, mela, maçã or măr"
      />
    </>
  ),
})
