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
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    colour: {
      control: 'select',
      options: textColours,
      table: {
        type: { summary: 'union' },
      },
    },
    size: {
      control: 'select',
      options: fontSizes,
      table: {
        type: { summary: 'union' },
      },
    },
    weight: {
      control: 'select',
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
    children: 'A semantically meaningful portion of text',
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
 * The `size` prop controls the font size.
 */
export const Size: Story = {
  args: {
    ...Example.args,
    size: 'xs',
  },
}

/**
 * The `weight` prop controls the font weight.
 */
export const Weight: Story = {
  args: {
    ...Example.args,
    as: 'strong',
    weight: 'bold',
  },
}

/**
 * Usage of Text can be nested within other Text components. This can be useful when you need to prototype spans
 * of differently coloured text within a larger block of text.
 *
 * **Important:** The size and weight of the nested text do **NOT** inherit from the parent.
 */
export const Nesting: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => (
    <Text {...args}>
      This is a span of text that includes a{' '}
      <Text as="strong" colour="action">
        nested span of text.
      </Text>
    </Text>
  ),
}
