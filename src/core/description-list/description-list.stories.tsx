import preview from '#.storybook/preview'
import { DescriptionList } from './description-list'
import { Features } from '#src/core/features'
import { LineClamp } from '#src/utils/line-clamp'
import { Text } from '#src/utils/text'

const meta = preview.meta({
  title: 'Content display/DescriptionList',
  component: DescriptionList,
  argTypes: {
    children: {
      control: false,
    },
  },
})

/**
 * By default, items will stack vertically in a one-column grid.
 */
export const Example = meta.story({
  args: {
    children: [
      <DescriptionList.Item key="Property style" label="Property style">
        Detached
      </DescriptionList.Item>,
      <DescriptionList.Item key="Property type" label="Property type">
        House
      </DescriptionList.Item>,
      <DescriptionList.Item key="Age" label="Age">
        Modern
      </DescriptionList.Item>,
      <DescriptionList.Item key="Property features" label="Property features">
        <Features size="base">
          <Features.Bedrooms value={4} />
          <Features.Bathrooms value={3} />
          <Features.CarSpaces value={2} />
          <Features.LandSize value="800 sq. m" />
        </Features>
      </DescriptionList.Item>,
      <DescriptionList.Item key="Description" label="Description">
        <LineClamp as="div" clampTo={4}>
          <Text as="p" style={{ marginBlockEnd: 'var(--spacing-2)' }}>
            This exceptional four-bedroom house, situated in the desirable MK17 0QL area, presents an attractive
            opportunity for a discerning buyer seeking a comfortable and spacious home. With its impressive layout, the
            property boasts four well-appointed bedrooms, ideal for families or professionals, and two modern bathrooms,
            ensuring ample storage and convenience. The property&apos;s exterior features two allocated parking spaces,
            providing secure and convenient parking for residents and visitors alike. As an investment opportunity, this
            house offers a solid foundation for long-term ownership, with potential for future growth and development.
          </Text>
          <Text as="p">
            Inside, the property&apos;s neutral décor provides a blank canvas for buyers to put their own stamp,
            allowing for easy personalisation and customisation. With its central location, the property is
            well-connected to local amenities, schools, and transport links, making it an ideal choice for those seeking
            a convenient and hassle-free lifestyle.
          </Text>
        </LineClamp>
      </DescriptionList.Item>,
    ],
    gap: undefined,
    grid: undefined,
    layout: 'stacked',
  },
})

/**
 * Any valid CSS grid layout can be used to control how items are placed in the description list.
 * Here, we flow items over three columns for as many rows as needed. See
 * [MDN's grid documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid)
 * for details on expected syntax.
 */
export const Grid = Example.extend({
  args: {
    grid: 'auto-flow / 1fr 1fr 1fr',
  },
})

/**
 * The gap between items in the grid can be adjusted using the `gap` props. It accepts any valid
 * CSS length value. By default, the gap is `var(--spacing-6)`.
 */
export const Gap = Grid.extend({
  args: {
    gap: 'var(--spacing-40)',
  },
})

/**
 * In a tabular layout, each item's label and description is aligned to the description list's grid.
 * The label will occupy the first column, while the description will span the remaining columns.
 */
export const Tabular = Example.extend({
  args: {
    grid: 'auto-flow / var(--size-36) 1fr',
    layout: 'tabular',
  },
})

/**
 * In an inline layout, each item's label and description are displayed inline with each other.
 */
export const Inline = Example.extend({
  args: {
    grid: 'auto-flow / 1fr',
    layout: 'inline',
  },
})

/**
 * An item can also be configured to span multiple columns in the description list's grid.
 * In this example, Description item spans all three grid columns. See MDN's documentation on the
 * [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column) property for details
 * on the syntax.
 */
export const SpanningColumns = Grid.extend({
  name: 'Spanning columns',
  args: {
    children: [
      <DescriptionList.Item key="Property style" label="Property style">
        Detached
      </DescriptionList.Item>,
      <DescriptionList.Item key="Property type" label="Property type">
        House
      </DescriptionList.Item>,
      <DescriptionList.Item key="Age" label="Age">
        Modern
      </DescriptionList.Item>,
      <DescriptionList.Item key="Property features" label="Property features">
        <Features size="base">
          <Features.Bedrooms value={4} />
          <Features.Bathrooms value={3} />
          <Features.CarSpaces value={2} />
          <Features.LandSize value="800 sq. m" />
        </Features>
      </DescriptionList.Item>,
      <DescriptionList.Item key="Description" area="auto / span 3" label="Description">
        <LineClamp as="div" clampTo={4}>
          <Text as="p" style={{ marginBlockEnd: 'var(--spacing-2)' }}>
            This exceptional four-bedroom house, situated in the desirable MK17 0QL area, presents an attractive
            opportunity for a discerning buyer seeking a comfortable and spacious home. With its impressive layout, the
            property boasts four well-appointed bedrooms, ideal for families or professionals, and two modern bathrooms,
            ensuring ample storage and convenience. The property&apos;s exterior features two allocated parking spaces,
            providing secure and convenient parking for residents and visitors alike. As an investment opportunity, this
            house offers a solid foundation for long-term ownership, with potential for future growth and development.
          </Text>
          <Text as="p">
            Inside, the property&apos;s neutral décor provides a blank canvas for buyers to put their own stamp,
            allowing for easy personalisation and customisation. With its central location, the property is
            well-connected to local amenities, schools, and transport links, making it an ideal choice for those seeking
            a convenient and hassle-free lifestyle.
          </Text>
        </LineClamp>
      </DescriptionList.Item>,
    ],
  },
})
