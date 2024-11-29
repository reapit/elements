import { Meta } from '@storybook/react'
import { Button } from './button'
import { ButtonGroup } from '../button-group'
import { action } from '@storybook/addon-actions'
import { Icon } from '../icon'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'busy'],
      description: 'Defines the button style variant.',
    },
    iconLeft: { control: 'text', description: 'The icon displayed on the left side of the button.' },
    iconRight: { control: 'text', description: 'The icon displayed on the right side of the button.' },
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
  },
}

export default meta

export const Default = {
  args: {
    children: 'Button',
    'aria-label': 'Button aria label',
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

export const StandardAttributes = {
  name: 'Standard attributes',

  args: {
    onClick: action('Button was clicked'),
    type: 'submit',
    children: 'Button Text',
    'aria-label': 'Button aria label',
  },
}
