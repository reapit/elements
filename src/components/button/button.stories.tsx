import { Button, DeprecatedButtonGroup, FloatingButton } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Button',
  component: Button,
}

export const DefaultUsage = {
  render: ({}) => <Button>Text within button</Button>,
}

export const Intent = {
  args: {
    intent: 'primary',
    children: 'Button Text',
  },
}

export const Loading = {
  args: {
    loading: true,
    children: 'Button Text',
  },
}

export const Disabled = {
  args: {
    disabled: true,
    children: 'Button Text',
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

/**
 *
 * @deprecated This ButtonGroup is deprecated. Use the new ButtonGroup component instead.
 *
 */
export const DeprecatedGroup = {
  render: ({}) => (
    <DeprecatedButtonGroup>
      <Button intent="primary">Primary</Button>
      <Button intent="neutral">Default</Button>
      <Button intent="danger">Danger</Button>
    </DeprecatedButtonGroup>
  ),

  name: 'Button Group',
}

export const ButtonSize = {
  render: ({}) => (
    <DeprecatedButtonGroup>
      <Button buttonSize="small">Small Button</Button>
      <Button buttonSize="medium">Medium Button</Button>
      <Button buttonSize="large">Large Button</Button>
    </DeprecatedButtonGroup>
  ),
}

export const ButtonIcons = {
  render: ({}) => (
    <DeprecatedButtonGroup>
      <Button
        intent="primary"
        buttonIcon={{
          icon: 'add',
          position: 'left',
        }}
      >
        Left Icon Primary
      </Button>
      <Button
        buttonIcon={{
          icon: 'add',
          position: 'right',
        }}
      >
        Right Icon Default
      </Button>
      <Button
        buttonIcon={{
          icon: 'add',
          position: 'only',
        }}
      >
        Only Icon
      </Button>
    </DeprecatedButtonGroup>
  ),
}

export const Floating = {
  render: ({}) => <FloatingButton intent="primary" icon="add" />,
  name: 'Floating Button',
  component: FloatingButton,
}
