import { Badge } from './badge'
import { badgeColours } from './styles'
import { ChevronLeftIcon } from '#src/icons/chevron-left'
import { ChevronRightIcon } from '#src/icons/chevron-right'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Badge> = {
  title: 'Core/Badge',
  component: Badge,
  argTypes: {
    children: {
      control: 'text',
    },
    colour: {
      control: 'select',
      options: badgeColours,
      table: {
        type: {
          summary: 'union',
        },
      },
    },
    iconLeft: {
      control: 'radio',
      options: ['None', 'ChevronLeft', 'Star'],
      mapping: {
        None: null,
        ChevronLeft: <ChevronLeftIcon />,
        Star: <StarIcon />,
      },
    },
    iconRight: {
      control: 'radio',
      options: ['None', 'ChevronRight', 'Star'],
      mapping: {
        None: null,
        ChevronRight: <ChevronRightIcon />,
        Star: <StarIcon />,
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'reversed'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-label': '',
    children: 'Label',
    colour: 'neutral',
    iconLeft: 'None',
    iconRight: 'None',
    variant: 'default',
  },
}

/**
 * There are two variants of the badge: `default` and `reversed`.
 */
export const Variants: Story = {
  args: {
    ...Example.args,
    variant: 'reversed',
  },
  argTypes: {
    iconLeft: {
      control: false,
    },
    iconRight: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <Badge {...args} variant="default" />
      <Badge {...args} variant="reversed" />
    </>
  ),
}

/**
 * Icons can be placed on the left or right side of the badge, regardless of the badge's variant.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    iconLeft: 'ChevronLeft',
    iconRight: 'ChevronRight',
  },
  decorators: [
    (Story: any) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <Badge {...args} iconRight={null} />
      <Badge {...args} iconLeft={null} />
      <Badge {...args} />
    </>
  ),
}

/**
 * When there is not enough space available, an ARIA label can be provided in place of the visual label. In this case,
 * the ARIA label will also be used as a tooltip for visual users. Either a left or right icon can be provided, but
 * not both.
 */
export const IconOnly: Story = {
  name: 'Icon-only',
  args: {
    ...Example.args,
    'aria-label': 'Label',
    children: null,
    iconLeft: 'Star',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <Badge {...args} variant="default" />
      <Badge {...args} variant="reversed" />
    </>
  ),
}

/**
 * A number of semantic colours are available for the badge. The colour can be changed by setting the `colour` prop.
 */
export const Colours: Story = {
  args: {
    ...Example.args,
    colour: 'danger',
    iconLeft: 'Star',
  },
}
