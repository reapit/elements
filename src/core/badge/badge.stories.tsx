import preview from '#.storybook/preview'
import { Badge } from './badge'
import { badgeColours } from './styles'
import { ChevronLeftIcon } from '#src/icons/chevron-left'
import { ChevronRightIcon } from '#src/icons/chevron-right'
import { StarIcon } from '#src/icons/star'

const meta = preview.meta({
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
})

export const Example = meta.story({
  args: {
    'aria-label': '',
    children: 'Label',
    colour: 'neutral',
    iconLeft: 'None',
    iconRight: 'None',
    variant: 'default',
  },
})

/**
 * There are two variants of the badge: `default` and `reversed`.
 */
export const Variants = Example.extend({
  args: {
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
})

/**
 * Icons can be placed on the left or right side of the badge, regardless of the badge's variant.
 */
export const Icons = Example.extend({
  args: {
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
})

/**
 * When there is not enough space available, an ARIA label can be provided in place of the visual label. In this case,
 * the ARIA label will also be used as a tooltip for visual users. Either a left or right icon can be provided, but
 * not both.
 */
export const IconOnly = Example.extend({
  name: 'Icon-only',
  args: {
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
})

/**
 * A number of semantic colours are available for the badge. The colour can be changed by setting the `colour` prop.
 */
export const Colours = Example.extend({
  args: {
    colour: 'danger',
    iconLeft: 'Star',
  },
})

/**
 * If there is insufficient space available for the badge's label to be fully displayed, it will
 * not wrap. It is up to the parent container to decide whether the overflow should be visible or not.
 */
export const Overflow = Example.extend({
  args: {
    children: 'A very long label that will overflow',
  },
  decorators: [
    (Story: any) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '100px' }}>
        <Story />
      </div>
    ),
  ],
})
