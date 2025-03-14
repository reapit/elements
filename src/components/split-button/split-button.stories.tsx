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

export const SplitButtonBusy = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton {...props}>
      <SplitButton.Action isBusy>{props.children}</SplitButton.Action>
      <SplitButton.Menu isBusy />
    </SplitButton>
  ),
}

export const SplitButtonDisabled = {
  args: {
    children: 'Button',
    'data-variant': 'primary',
  },
  // Adding decorator into the story to display multiple components.
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
      <SplitButton {...props}>
        <SplitButton.Action disabled>{props.children}</SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>
      <SplitButton {...props} data-variant="secondary">
        <SplitButton.Action disabled>{props.children}</SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>
    </>
  ),
  // Adding the parameters to display only one component in the source
  parameters: {
    docs: {
      source: {
        code: `
<SplitButton>
  <SplitButton.Action disabled={true}>Button</SplitButton.Action>
  <SplitButton.Menu />
</SplitButton>
        `,
      },
    },
  },
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
