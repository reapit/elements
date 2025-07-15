import { Meta } from '@storybook/react-vite'
import { DeprecatedButton } from './button'
import { ButtonGroup } from '../../components/button-group'
import { action } from 'storybook/actions'
import { DeprecatedIcon, IconNames } from '../icon'

const ICON_OPTIONS: IconNames[] = ['star', 'check', 'add', 'chevronDown', 'email']

const meta: Meta<typeof DeprecatedButton> = {
  title: 'Deprecated/DeprecatedButton',
  component: DeprecatedButton,
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
        acc[iconName] = <DeprecatedIcon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
    iconRight: {
      control: 'select', // Changed to select control
      options: ICON_OPTIONS,
      description: 'The icon displayed on the right side of the button.',
      mapping: ICON_OPTIONS.reduce((acc, iconName) => {
        acc[iconName] = <DeprecatedIcon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Sets the button size.',
    },
    isDisabled: { control: 'boolean', description: 'Disables the button if set to true.' },
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
    hasNoPadding: {
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
      <DeprecatedButton
        variant="primary"
        iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />}
        iconRight={<DeprecatedIcon icon="star" fontSize="1rem" />}
      >
        Button
      </DeprecatedButton>
      <DeprecatedButton
        variant="secondary"
        iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />}
        iconRight={<DeprecatedIcon icon="star" fontSize="1rem" />}
      >
        Button
      </DeprecatedButton>
      <DeprecatedButton
        variant="tertiary"
        iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />}
        iconRight={<DeprecatedIcon icon="star" fontSize="1rem" />}
      >
        Button
      </DeprecatedButton>
      <DeprecatedButton
        variant="destructive"
        iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />}
        iconRight={<DeprecatedIcon icon="star" fontSize="1rem" />}
      >
        Button
      </DeprecatedButton>
    </ButtonGroup>
  ),
}

export const ButtonBusy = {
  render: ({}) => (
    <ButtonGroup>
      <DeprecatedButton variant="busy">Submit</DeprecatedButton>
      <DeprecatedButton variant="busy" />
    </ButtonGroup>
  ),
}

export const ButtonWithIcon = {
  render: ({}) => (
    <ButtonGroup>
      <DeprecatedButton
        iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />}
        iconRight={<DeprecatedIcon icon="star" fontSize="1rem" />}
      >
        Button
      </DeprecatedButton>
      <DeprecatedButton iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />} />
    </ButtonGroup>
  ),
}

export const ButtonSize = {
  render: ({}) => (
    <DeprecatedButton
      size="large"
      iconLeft={<DeprecatedIcon icon="star" fontSize="1.25rem" />}
      iconRight={<DeprecatedIcon icon="star" fontSize="1.25rem" />}
    >
      Button
    </DeprecatedButton>
  ),
}

export const ButtonDisabled = {
  args: {
    isDisabled: true,
    children: 'Button Text',
  },
}

export const ButtonWithHref = {
  render: ({}) => (
    <DeprecatedButton
      iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />}
      href="./?path=/story/components-button--button-with-href"
    >
      Add Item
    </DeprecatedButton>
  ),
}

export const ButtonWithHasNoPadding = {
  name: 'Button With HasNoPadding',
  args: {
    children: 'Button Text',
    variant: 'tertiary',
    hasNoPadding: true,
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
