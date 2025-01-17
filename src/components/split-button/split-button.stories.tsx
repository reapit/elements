import { Meta, StoryObj } from '@storybook/react'
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

type Story = StoryObj<typeof SplitButton>

const SplitButtonTemplate: Story = {
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action>{props.children}</SplitButton.Action>
      <SplitButton.Menu />
    </SplitButton>
  ),
}

export const Default = {
  ...SplitButtonTemplate,
  args: {
    children: 'Button',
  },
}

export const SplitButtonWithMenu = {
  args: {
    children: 'Button',
  },
  // Adding decorator into the story as the menu aligment is right and it's going beyound the pageview.
  decorators: [
    (Story: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action onClick={console.log}>{props.children}</SplitButton.Action>
      <Menu data-alignment="right">
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
  ...SplitButtonTemplate,
  args: {
    children: 'Button',
    'data-variant': 'secondary',
  },
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

export const SplitButtonDisabledWithMenu = {
  args: {
    children: 'Button',
  },
  // Adding decorator into the story as the menu aligment is right and it's going beyound the pageview.
  decorators: [
    (Story: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action disabled onClick={console.log}>
        {props.children}
      </SplitButton.Action>
      <Menu data-alignment="right">
        <Menu.Trigger>{({ getTriggerProps }) => <SplitButton.Menu {...getTriggerProps()} />}</Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Item disabled onClick={console.log}>
              Save & Download
            </Menu.Item>
            <Menu.Item disabled>Save & Send</Menu.Item>
          </Menu.List>
        </Menu.Popover>
      </Menu>
    </SplitButton>
  ),
}

export const SplitButtonSize = {
  ...SplitButtonTemplate,
  args: {
    children: 'Button',
    'data-size': 'large',
  },
}
