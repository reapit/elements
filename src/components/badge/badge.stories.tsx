import { Meta } from '@storybook/react-vite'
import { Badge } from './badge'
import { Icon, IconNames } from '../icon'
import { DeprecatedToolTip } from './../deprecated-tool-tip' // To be updated to v5 tooltip once #235 is merged

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
    isReversed: { control: 'boolean', description: 'Reverse the badge if set to true.' },
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
  args: {
    children: 'Label',
    isReversed: true,
    iconLeft: <Icon icon="chevronLeft" fontSize="1rem" />,
    iconRight: <Icon icon="chevronRight" fontSize="1rem" />,
  },
}

export const BadgeWithLabel = {
  args: {
    children: 'Label',
    iconLeft: <Icon icon="chevronLeft" fontSize="1rem" />,
    iconRight: <Icon icon="chevronRight" fontSize="1rem" />,
  },
}

export const BadgeWithIcon = {
  args: {
    'aria-label': 'Label',
    iconLeft: <Icon icon="star" fontSize="1rem" />,
  },
  render: (props) => (
    <DeprecatedToolTip tip="Star">
      <Badge {...props}></Badge>
    </DeprecatedToolTip>
  ), // To be updated to v5 tooltip once #235 is merged
}

export const BadgeVariant = {
  args: {
    children: 'Label',
    iconLeft: <Icon icon="add" fontSize="1rem" />,
    iconRight: <Icon icon="chevronDown" fontSize="1rem" />,
  },
  // Adding decorator into the story to display multiple stories.
  decorators: [
    (Story: any) => (
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (props: any) => (
    <>
      <Badge {...props}>{props.children}</Badge>
      <Badge {...props} variant={props.variant ? props.variant : 'success'}>
        {props.children}
      </Badge>
      <Badge {...props} variant={props.variant ? props.variant : 'pending'}>
        {props.children}
      </Badge>
      <Badge {...props} variant={props.variant ? props.variant : 'warning'}>
        {props.children}
      </Badge>
      <Badge {...props} variant={props.variant ? props.variant : 'danger'}>
        {props.children}
      </Badge>
      <Badge {...props} variant={props.variant ? props.variant : 'inactive'}>
        {props.children}
      </Badge>
      <Badge {...props} variant={props.variant ? props.variant : 'accent_1'}>
        {props.children}
      </Badge>
      <Badge {...props} variant={props.variant ? props.variant : 'accent_2'}>
        {props.children}
      </Badge>
    </>
  ),
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
<Badge variant='success'>
  Label
</Badge>
        `,
      },
    },
  },
}
