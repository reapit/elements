import { Button, ButtonGroup, FloatingButton } from './index'
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

export const Group = {
  render: ({}) => (
    <ButtonGroup>
      <Button intent="primary">Primary</Button>
      <Button intent="neutral">Default</Button>
      <Button intent="danger">Danger</Button>
    </ButtonGroup>
  ),

  name: 'Button Group',
}

export const ButtonSize = {
  render: ({}) => (
    <ButtonGroup>
      <Button buttonSize="small">Small Button</Button>
      <Button buttonSize="medium">Medium Button</Button>
      <Button buttonSize="large">Large Button</Button>
    </ButtonGroup>
  ),
}

export const ButtonIcons = {
  render: ({}) => (
    <ButtonGroup>
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
    </ButtonGroup>
  ),
}

export const Floating = {
  render: ({}) => <FloatingButton intent="primary" icon="add" />,
  name: 'Floating Button',
  component: FloatingButton,
}
