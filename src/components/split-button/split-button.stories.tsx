import { Meta } from '@storybook/react'
import { SplitButton } from './split-button'
import { Menu } from '../menu'

const meta: Meta<typeof SplitButton> = {
  title: 'Components/Split Button',
  component: SplitButton,
}

export default meta

export const Default = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton>
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
    <SplitButton>
      <SplitButton.Action onClick={console.log}>{props.children}</SplitButton.Action>
      <Menu data-alignment="right">
        <Menu.Trigger>{({ getTriggerProps }) => <SplitButton.Menu {...getTriggerProps()} />}</Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Item onClick={console.log} label="Save & Download" />
            <Menu.Item disabled label="Save & Send" />
          </Menu.List>
        </Menu.Popover>
      </Menu>
    </SplitButton>
  ),
}

export const SplitButtonVariants = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton>
      <SplitButton.Action variant="primary">{props.children}</SplitButton.Action>
      <SplitButton.Menu variant="primary" />
    </SplitButton>
  ),
}

export const SplitButtonBusy = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton>
      <SplitButton.Action variant="busy">{props.children}</SplitButton.Action>
      <SplitButton.Menu variant="busy" />
    </SplitButton>
  ),
}

export const SplitButtonDisabled = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton>
      <SplitButton.Action isDisabled>{props.children}</SplitButton.Action>
      <SplitButton.Menu isDisabled />
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
    <SplitButton>
      <SplitButton.Action isDisabled onClick={console.log}>
        {props.children}
      </SplitButton.Action>
      <Menu data-alignment="right">
        <Menu.Trigger>{({ getTriggerProps }) => <SplitButton.Menu {...getTriggerProps()} />}</Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Item disabled onClick={console.log} label="Save & Download" />
            <Menu.Item disabled label="Save & Send" />
          </Menu.List>
        </Menu.Popover>
      </Menu>
    </SplitButton>
  ),
}

export const SplitButtonSize = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <SplitButton>
      <SplitButton.Action size="large">{props.children}</SplitButton.Action>
      <SplitButton.Menu size="large" />
    </SplitButton>
  ),
}
