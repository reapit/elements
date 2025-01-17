import { Meta } from '@storybook/react'
import { SplitButton } from './split-button'
import { Menu } from '../menu'

const meta: Meta<typeof SplitButton> = {
  title: 'Components/Split Button',
  component: SplitButton,
  argTypes: {
    'data-variant': {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Defines the split button style variant.',
    },
    'data-size': {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Defines the split button size.',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for split button',
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
  },
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action>{props.children}</SplitButton.Action>
      <SplitButton.Menu />
    </SplitButton>
  ),
}

export const SplitButtonWithMenu = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action onClick={console.log}>{props.children}</SplitButton.Action>
      <Menu>
        <Menu.Trigger>{({ getTriggerProps }) => <SplitButton.Menu {...getTriggerProps()} />}</Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Item onClick={console.log}>Save & Download</Menu.Item>
            <Menu.Item disabled>Save & Send</Menu.Item>
          </Menu.List>
        </Menu.Popover>
      </Menu>
    </SplitButton>
  ),
}

export const SplitButtonVariants = {
  args: {
    children: 'Button',
    'data-variant': 'secondary',
  },
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action>{props.children}</SplitButton.Action>
      <SplitButton.Menu />
    </SplitButton>
  ),
}

export const SplitButtonDisabled = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action disabled>{props.children}</SplitButton.Action>
      <SplitButton.Menu />
    </SplitButton>
  ),
}

export const SplitButtonSize = {
  args: {
    children: 'Button',
    'data-size': 'large',
  },
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action>{props.children}</SplitButton.Action>
      <SplitButton.Menu />
    </SplitButton>
  ),
}
