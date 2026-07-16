import preview from '#.storybook/preview'
import { fontSizes, fontWeights } from '#src/utils/font'
import { textColours } from '#src/utils/text'
import { Heading } from './heading'
import { myCustomHeadingStyles } from './__story__/styles'

import type { FontStyle } from './types'

// 'md' has no corresponding design token and isn't documented, so it's excluded from Storybook controls.
const documentedFontSizes = fontSizes.filter((size) => size !== 'md')

const fontStyles = [
  'inherit',
  ...fontWeights.flatMap((weight) => documentedFontSizes.map((size) => `text-${size}/${weight}` as const)),
] satisfies FontStyle[]

const meta = preview.meta({
  title: 'Utils/Heading',
  component: Heading,
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The HTML heading element to render.',
      table: {
        type: { summary: 'union' },
        defaultValue: { summary: 'h2' },
      },
    },
    children: {
      control: 'text',
      description: 'The heading content.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'select',
      options: ['None', 'Custom'],
      mapping: {
        None: undefined,
        Custom: myCustomHeadingStyles,
      },
      description: 'Custom CSS class for additional styling.',
    },
    colour: {
      control: 'select',
      description: 'The heading text colour.',
      options: textColours,
      table: {
        type: { summary: 'union' },
        defaultValue: { summary: 'inherit' },
      },
    },
    font: {
      control: 'select',
      description: 'The font style (size and weight combination).',
      options: fontStyles,
      table: {
        type: { summary: 'union' },
        defaultValue: { summary: 'inherit' },
      },
    },
  },
})

export const Example = meta.story({
  args: {
    as: 'h2',
    children: 'A styled heading',
    className: 'None',
    colour: 'inherit',
    font: 'inherit',
  },
})

/**
 * The `as` prop allows you to render different heading levels (h1 through h6).
 * By default, the component renders an h2 element.
 */
export const Element = Example.extend({
  args: {
    as: 'h1',
    children: 'This is a level 1 heading',
  },
})

/**
 * The `colour` prop controls the text colour. The available values are defined by the design
 * system with the exception of `inherit`, which allows the heading to inherit the colour of its parent.
 */
export const Colour = Example.extend({
  args: {
    colour: 'primary',
    children: 'A heading with primary colour',
  },
})

/**
 * The `font` prop controls the font size and weight.
 */
export const Font = Example.extend({
  args: {
    font: 'text-3xl/bold',
    children: 'A large, bold heading',
  },
})

/**
 * Additional styling can be provided via a custom class. For example, Heading resets the margin
 * applied by user-agents on heading elements to `0`. By providing a custom class, you can apply
 * any necessary spacing, borders, or other styles.
 *
 * Inline styles can also be used.
 */
export const CustomClass = Example.extend({
  args: {
    as: 'h3',
    children: 'Custom styled heading',
    className: 'Custom',
  },
})

/**
 * All six heading levels (h1-h6) are supported for complete semantic coverage.
 */
export const AllLevels = meta.story({
  render: () => (
    <div>
      <Heading as="h1" font="text-3xl/bold">
        Heading Level 1
      </Heading>
      <Heading as="h2" font="text-2xl/bold">
        Heading Level 2
      </Heading>
      <Heading as="h3" font="text-xl/bold">
        Heading Level 3
      </Heading>
      <Heading as="h4" font="text-lg/bold">
        Heading Level 4
      </Heading>
      <Heading as="h5" font="text-base/bold">
        Heading Level 5
      </Heading>
      <Heading as="h6" font="text-sm/bold">
        Heading Level 6
      </Heading>
    </div>
  ),
})
