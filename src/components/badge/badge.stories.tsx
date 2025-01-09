import { Meta } from '@storybook/react'
import { Badge } from './badge'
import { Icon, IconNames } from '../icon'
import { render } from '@testing-library/react'

const ICON_OPTIONS: IconNames[] = ['star', 'add', 'chevronDown', 'chevronLeft', 'chevronRight']

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'pending', 'warning', 'danger', 'inactive', 'accent_1', 'accent_2'],
      description: 'Defines the badge style variant.',
    },
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'The icon displayed on the left side of the badge.',
      mapping: ICON_OPTIONS.reduce((acc, iconName) => {
        acc[iconName] = <Icon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'The icon displayed on the right side of the badge.',
      mapping: ICON_OPTIONS.reduce((acc, iconName) => {
        acc[iconName] = <Icon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
    reversed: { control: 'boolean', description: 'Reverse the badge if set to true.' },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for badge',
    },
    className: {
      control: 'text',
      description: 'CSS class for additional styling',
    },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Badge',
  },
}

export const BadgeReversed = {
  render: ({}) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
      <Badge aria-label="label" reversed>Label</Badge>
      <Badge
        iconLeft={<Icon icon="chevronLeft" fontSize="1rem" />}
        aria-label="label"
        reversed
      >
        Label
      </Badge>
      <Badge
        iconRight={<Icon icon="chevronRight" fontSize="1rem" />}
        aria-label="label"
        reversed
      >
        Label
      </Badge>
      <Badge
        iconLeft={<Icon icon="chevronLeft" fontSize="1rem" />}
        iconRight={<Icon icon="chevronRight" fontSize="1rem" />}
        aria-label="label"
        reversed
      >
        Label
      </Badge>
      <Badge
        iconLeft={<Icon icon="star" fontSize="1rem" />}
        aria-label="label"
        reversed
      >
      </Badge>
    </div>
  ),
}

export const BadgeWithLabel = {
  render: ({}) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
      <Badge iconLeft={<Icon icon="chevronLeft" fontSize="1rem" />}>Label</Badge>
      <Badge iconLeft={<Icon icon="chevronLeft" fontSize="1rem" />} reversed>Label</Badge>
      <Badge iconRight={<Icon icon="chevronRight" fontSize="1rem" />}>Label</Badge>
      <Badge iconRight={<Icon icon="chevronRight" fontSize="1rem" />} reversed>Label</Badge>
      <Badge
        iconLeft={<Icon icon="chevronLeft" fontSize="1rem" />}
        iconRight={<Icon icon="chevronRight" fontSize="1rem" />}
      >
        Label
      </Badge>
      <Badge
        iconLeft={<Icon icon="chevronLeft" fontSize="1rem" />}
        iconRight={<Icon icon="chevronRight" fontSize="1rem" />}
        reversed
      >
        Label
      </Badge>
    </div>
  ),
}

export const BadgeWithoutLabel = {
  render: ({}) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
      <Badge
        iconLeft={<Icon icon="star" fontSize="1rem" />}
        aria-label="label"
      >
      </Badge>
      <Badge
        iconLeft={<Icon icon="star" fontSize="1rem" />}
        aria-label="label"
        reversed
      >
      </Badge>
    </div>
  ),
}

export const BadgeWithVariant = {
  render: ({}) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="neutral"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="neutral"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="neutral"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="neutral"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="success"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="success"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="success"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="success"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="pending"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="pending"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="pending"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="pending"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="warning"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="warning"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="warning"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="warning"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="danger"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="danger"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="danger"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="danger"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="inactive"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="inactive"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="inactive"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="inactive"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="accent_1"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="accent_1"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="accent_1"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="accent_1"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="accent_2"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
          >
            Label
          </Badge>
          <Badge
            variant="accent_2"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
          >
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <Badge
            variant="accent_2"
            iconLeft={<Icon icon="add" fontSize="1rem" />}
            iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
            reversed
          >
            Label
          </Badge>
          <Badge
            variant="accent_2"
            iconLeft={<Icon icon="star" fontSize="1rem" />}
            aria-label="label"
            reversed
          >
          </Badge>
        </div>
      </div>
    </div>
  ),
}
