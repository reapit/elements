import { Meta } from '@storybook/react'
import { Button } from './button'
import { ButtonGroup } from '../button-group'
import { action } from '@storybook/addon-actions'
import { Icon, IconNames } from '../icon'

const ICON_OPTIONS: IconNames[] = ['star', 'check', 'add', 'chevronDown', 'email']

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'busy'],
      description: 'Defines the button style variant.',
    },
    iconLeft: {
      control: 'select', // Changed to select control
      options: ICON_OPTIONS,
      description: 'The icon displayed on the left side of the button.',
      mapping: ICON_OPTIONS.reduce((acc, iconName) => {
        acc[iconName] = <Icon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
    iconRight: {
      control: 'select', // Changed to select control
      options: ICON_OPTIONS,
      description: 'The icon displayed on the right side of the button.',
      mapping: ICON_OPTIONS.reduce((acc, iconName) => {
        acc[iconName] = <Icon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Sets the button size.',
    },
    disabled: { control: 'boolean', description: 'Disables the button if set to true.' },
    href: { control: 'text', description: 'Specifies the URL for anchor-style button' },
    onClick: {
      action: 'clicked',
      description: 'Click handler for button',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for button',
    },
    className: {
      control: 'text',
      description: 'CSS class for additional styling',
    },
    removePadding: {
      control: 'boolean',
      description:
        'Set this prop to true to remove the padding and height adjustments for the tertiary variant of the button. This will apply no padding and reset the height, giving a more compact button appearance. It is only applicable when the button variant is tertiary.',
    },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Button',
  },
}

export const ButtonVariants = {
  render: ({}) => (
    <ButtonGroup>
      <Button
        variant="primary"
        iconLeft={<Icon icon="star" fontSize="1rem" />}
        iconRight={<Icon icon="star" fontSize="1rem" />}
      >
        Button
      </Button>
      <Button
        variant="secondary"
        iconLeft={<Icon icon="star" fontSize="1rem" />}
        iconRight={<Icon icon="star" fontSize="1rem" />}
      >
        Button
      </Button>
      <Button
        variant="tertiary"
        iconLeft={<Icon icon="star" fontSize="1rem" />}
        iconRight={<Icon icon="star" fontSize="1rem" />}
      >
        Button
      </Button>
      <Button
        variant="destructive"
        iconLeft={<Icon icon="star" fontSize="1rem" />}
        iconRight={<Icon icon="star" fontSize="1rem" />}
      >
        Button
      </Button>
    </ButtonGroup>
  ),
}

export const ButtonBusy = {
  render: ({}) => (
    <ButtonGroup>
      <Button variant="busy">Submit</Button>
      <Button variant="busy" />
    </ButtonGroup>
  ),
}

export const ButtonWithIcon = {
  render: ({}) => (
    <ButtonGroup>
      <Button iconLeft={<Icon icon="star" fontSize="1rem" />} iconRight={<Icon icon="star" fontSize="1rem" />}>
        Button
      </Button>
      <Button iconLeft={<Icon icon="star" fontSize="1rem" />} />
    </ButtonGroup>
  ),
}

export const ButtonSize = {
  render: ({}) => (
    <Button
      size="large"
      iconLeft={<Icon icon="star" fontSize="1.25rem" />}
      iconRight={<Icon icon="star" fontSize="1.25rem" />}
    >
      Button
    </Button>
  ),
}

export const ButtonDisabled = {
  args: {
    disabled: true,
    children: 'Button Text',
  },
}

export const ButtonWithHref = {
  render: ({}) => (
    <Button iconLeft={<Icon icon="star" fontSize="1rem" />} href="./?path=/story/components-button--button-with-href">
      Add Item
    </Button>
  ),
}

export const ButtonWithRemovePadding = {
  name: 'Button With RemovePadding',
  args: {
    children: 'Button Text',
    variant: 'tertiary',
    removePadding: true,
  },
}

export const StandardAttributes = {
  name: 'Standard attributes',

  args: {
    onClick: action('Button was clicked'),
    type: 'submit',
    children: 'Button Text',
    'aria-label': 'Button aria label',
  },
}
