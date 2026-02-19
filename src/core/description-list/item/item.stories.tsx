import { DescriptionList } from '../description-list'
import { Features } from '../../features'
import { LineClamp } from '#src/utils/line-clamp'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof DescriptionList.Item> = {
  title: 'Core/DescriptionList/Item',
  component: DescriptionList.Item,
  argTypes: {
    area: {
      control: 'text',
    },
    children: {
      control: 'select',
      options: ['Short', 'Features', 'Multi-line', 'Multi-line disclosure'],
      mapping: {
        Short: 'An exceptional four-bedroom house.',
        Features: (
          <>
            <Features size="base">
              <Features.Bedrooms value={4} />
              <Features.Bathrooms value={2} />
              <Features.CarSpaces value={2} />
              <Features.LandSize value="375 sq. m" />
            </Features>
          </>
        ),
        'Multi-line': (
          <>
            This exceptional four-bedroom house, situated in the desirable MK17 0QL area, presents an attractive
            opportunity for a discerning buyer seeking a comfortable and spacious home. With its impressive layout, the
            property boasts four well-appointed bedrooms, ideal for families or professionals, and two modern bathrooms,
            ensuring ample storage and convenience.
          </>
        ),
        'Multi-line disclosure': (
          <LineClamp as="span" clampTo={2}>
            This exceptional four-bedroom house, situated in the desirable MK17 0QL area, presents an attractive
            opportunity for a discerning buyer seeking a comfortable and spacious home. With its impressive layout, the
            property boasts four well-appointed bedrooms, ideal for families or professionals, and two modern bathrooms,
            ensuring ample storage and convenience.
          </LineClamp>
        ),
      },
    },
    label: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['base', 'sm'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * A basic description list item with a label and description. By default, the label
 * and description will be stacked.
 */
export const Example: Story = {
  args: {
    area: undefined,
    children: 'Short',
    label: 'Description',
  },
  decorators: [
    (Story) => (
      <DescriptionList>
        <Story />
      </DescriptionList>
    ),
  ],
}

/**
 * The item's label and description can be displayed inline.
 */
export const Inline: Story = {
  args: {
    ...Example.args,
    layout: 'inline',
  },
  decorators: [
    (Story) => (
      <DescriptionList>
        <Story />
      </DescriptionList>
    ),
  ],
}

/**
 * A tabular layout can also be achieved. In this case, the item will align to their ancestor's grid.
 * The item's label will occupy the first column, and the description will span the remaining columns.
 */
export const Tabular: Story = {
  args: {
    ...Example.args,
    children: 'Multi-line',
    layout: 'tabular',
  },
  decorators: [
    (Story) => (
      <DescriptionList grid="auto-flow / var(--size-60) 1fr">
        <Story />
      </DescriptionList>
    ),
  ],
}

/**
 * Two sizes are supported: `base` and `sm`.
 */
export const Size: Story = {
  args: {
    ...Example.args,
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <DescriptionList>
        <Story />
      </DescriptionList>
    ),
  ],
}

/**
 * The description can contain content like tag groups, supplementary information lists and any other
 * [flow content](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#flow_content).
 */
export const Content: Story = {
  args: {
    ...Example.args,
    children: 'Features',
    label: 'Property features',
  },
  decorators: [
    (Story) => (
      <DescriptionList>
        <Story />
      </DescriptionList>
    ),
  ],
}

/**
 * Like the description, the label content can wrap if it does not have sufficient space.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    children: 'Multi-line',
    label: 'Property description',
    layout: 'tabular',
  },
  decorators: [
    (Story) => (
      <DescriptionList grid="auto-flow / var(--size-24) 1fr">
        <Story />
      </DescriptionList>
    ),
  ],
}

/**
 * An item can also be configured to span multiple columns in the description list's grid.
 * In this example, the item spans two of the grid's three columns. See MDN's documentation on the
 * [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column) property for details
 * on the syntax.
 */
export const SpanningColumns: Story = {
  name: 'Spanning columns',
  args: {
    ...Example.args,
    area: 'auto / span 2',
    children: 'Multi-line',
    label: 'Property description',
  },
  decorators: [
    (Story) => (
      <DescriptionList grid="auto-flow / 1fr 1fr 1fr">
        <Story />
      </DescriptionList>
    ),
  ],
}
