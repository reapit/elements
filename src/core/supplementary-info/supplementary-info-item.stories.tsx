import preview from '#.storybook/preview'
import { SupplementaryInfoItem } from './supplementary-info-item'

import type { SupplementaryInfoColour } from './supplementary-info-item'

const meta = preview.meta({
  title: 'Content display/SupplementaryInfo/Item',
  component: SupplementaryInfoItem,
  argTypes: {
    colour: {
      control: { type: 'select' },
      options: [
        'inherit',
        'primary',
        'secondary',
        'neutral',
        'success',
        'pending',
        'warning',
        'danger',
        'accent_1',
        'accent_2',
      ] satisfies SupplementaryInfoColour[],
    },
    children: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <ul data-size="base" style={{ display: 'inline', listStyle: 'none' }}>
        <Story />
      </ul>
    ),
  ],
})

export const Example = meta.story({
  args: {
    colour: 'primary',
    children: 'Supplementary info',
  },
})

/**
 * Items can be coloured to convey certain messages or to draw users' attention to certain information.
 */
export const Style = Example.extend({
  args: {
    colour: 'danger',
  },
})

/**
 * Sibling items will automatically be separated by a dot.
 */
export const Separators = meta.story({
  args: {
    children: (
      <>
        <SupplementaryInfoItem>Supplementary info 1</SupplementaryInfoItem>
        <SupplementaryInfoItem>Supplementary info 2</SupplementaryInfoItem>
      </>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
})
