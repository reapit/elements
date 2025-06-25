import { iconColours, iconSizes } from '../make-icon/types'
import { StarIcon } from '../star'
import { Text } from '#src/components/text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Icons/Icon',
  component: StarIcon,
  argTypes: {
    colour: {
      control: 'select',
      options: iconColours,
      description: 'The colour of the icon.',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
      },
    },
    size: {
      control: 'select',
      options: iconSizes,
      description: 'The size of the icon.',
      table: {
        defaultValue: {
          summary: '100%',
        },
      },
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Icons are simple, visual elements that help with cognitive recognition.
 Each icon component accepts \`colour\` and \`size\` props and renders as an SVG element.`,
      },
    },
  },
} satisfies Meta<typeof StarIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    colour: 'primary',
    size: 'lg',
  },
}

/**
 * There are 12 colours available. The default is `inherit`, which enables the icon to be used in the context of another
 * component that controls the icon's colour.
 */
export const Colours: StoryObj = {
  args: {
    ...Example.args,
    size: 'lg',
  },
  argTypes: {
    colour: {
      control: false,
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          color: '#FA00FF',
          display: 'grid',
          fontSize: 'var(--font-size-sm)',
          alignItems: 'center',
          gridTemplateColumns: 'min-content min-content',
          gap: 'var(--spacing-6)',
        }}
      >
        {iconColours.map((colour) => [colour, <StarIcon key={colour} {...args} colour={colour} />])}
      </div>
    )
  },
}

/**
 * There are five sizes available. The default is `100%`, which is useful when you want the icons size to be determined
 * by its parent element. This is common in other Elements components that expect icons to be a specific size.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
    colour: 'primary',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          color: '#FA00FF',
          display: 'grid',
          fontSize: 'var(--font-size-sm)',
          alignItems: 'center',
          gridTemplateColumns: 'min-content var(--icon_size-l)',
          gap: 'var(--spacing-6)',
        }}
      >
        {iconSizes.map((size) => [size, <StarIcon key={size} {...args} size={size} />])}
      </div>
    )
  },
}
