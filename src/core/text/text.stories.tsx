import { Text } from './text'
import { fontSizes, fontWeights, textColours } from './types'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Text',
  component: Text,
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'strong', 'em', 'mark', 'q', 's', 'time'],
      table: {
        type: { summary: 'union' },
      },
    },
    children: {
      control: 'text',
      description: 'The text content.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    colour: {
      control: 'select',
      description: 'The text colour.',
      options: textColours,
      table: {
        type: { summary: 'union' },
      },
    },
    overflow: {
      control: false,
      description: 'Determines what happens when text overflows its parent.',
      table: {
        type: { summary: "'truncate'" },
      },
    },
    size: {
      control: 'select',
      description: 'The font size of the text.',
      options: fontSizes,
      table: {
        type: { summary: 'union' },
      },
    },
    weight: {
      control: 'select',
      description: 'The font weight of the text.',
      options: fontWeights,
      table: {
        type: { summary: 'union' },
      },
    },
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof Text>

export const Example: Story = {
  args: {
    as: 'span',
    children: 'A styled span of text',
    colour: 'primary',
    size: 'base',
    weight: 'regular',
  },
}

/**
 * The `as` prop allows you to render the Text component as a different inline HTML element.
 */
export const Element: Story = {
  args: {
    ...Example.args,
    as: 'mark',
  },
}

/**
 * The `colour` prop controls the text color. The available values are defined by the design system with the exception
 * of `inherit`, which is a special value utility value that allows the text to inherit the colour of its parent.
 */
export const Colour: Story = {
  args: {
    ...Example.args,
    colour: 'action',
  },
}

/**
 * The `font` prop controls the font size and weight.
 */
export const FontStyle: Story = {
  args: {
    ...Example.args,
    font: 'text-2xl/bold',
  },
}

/**
 * Both `font` and `colour` accept "inherit" as values. This allows for nested Text usage, which is
 * useful when you need a child span to be styled differently from its parent while inheriting the
 * other properties. However, because our font styles are always size/weight pairs, it is not possible
 * to inherit the font size separate to it's weight.
 *
 * This example shows a smaller span of text inheriting the font size and weight of its parent while
 * colouring itself differently.
 */
export const Inheritance: Story = {
  args: {
    ...Example.args,
    font: 'text-xs/bold',
  },
  render: (args) => (
    <Text {...args}>
      This is a span of text that includes a{' '}
      <Text as="strong" colour="error" font="inherit">
        nested span of text.
      </Text>
    </Text>
  ),
}

/**
 * The `overflow` prop controls whether the text should be truncated with an ellipsis or remain
 * visible when it overflows. This behaviour is dependent on the layout mode of the parent. In this
 * example, the parent is a flex container, which ensures the text is sized to fit within the grid.
 * This means the text will overflow and truncate.
 */
export const Overflow: Story = {
  args: {
    ...Inheritance.args,
    overflow: 'truncate',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', display: 'flex', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Text {...args}>
      This is a span of text that includes a{' '}
      <Text as="strong" colour="error" font="inherit">
        nested span of text.
      </Text>
    </Text>
  ),
}
