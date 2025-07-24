import { Meta } from '@storybook/react-vite'
import { DeprecatedSplitButton } from './split-button'
import { DeprecatedMenu } from '#src/deprecated/menu'

const meta: Meta<typeof DeprecatedSplitButton> = {
  title: 'Deprecated/DeprecatedSplitButton',
  component: DeprecatedSplitButton,
}

export default meta

export const Default = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action>{props.children}</DeprecatedSplitButton.Action>
      <DeprecatedSplitButton.Menu />
    </DeprecatedSplitButton>
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
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action onClick={console.log}>{props.children}</DeprecatedSplitButton.Action>
      <DeprecatedMenu data-alignment="right">
        <DeprecatedMenu.Trigger>
          {({ getTriggerProps }) => <DeprecatedSplitButton.Menu {...getTriggerProps()} />}
        </DeprecatedMenu.Trigger>
        <DeprecatedMenu.Popover>
          <DeprecatedMenu.List>
            <DeprecatedMenu.Item onClick={console.log} label="Save & Download" />
            <DeprecatedMenu.Item disabled label="Save & Send" />
          </DeprecatedMenu.List>
        </DeprecatedMenu.Popover>
      </DeprecatedMenu>
    </DeprecatedSplitButton>
  ),
}

export const SplitButtonVariants = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action variant="primary">{props.children}</DeprecatedSplitButton.Action>
      <DeprecatedSplitButton.Menu variant="primary" />
    </DeprecatedSplitButton>
  ),
}

export const SplitButtonBusy = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action variant="busy">{props.children}</DeprecatedSplitButton.Action>
      <DeprecatedSplitButton.Menu variant="busy" />
    </DeprecatedSplitButton>
  ),
}

export const SplitButtonDisabled = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action isDisabled>{props.children}</DeprecatedSplitButton.Action>
      <DeprecatedSplitButton.Menu isDisabled />
    </DeprecatedSplitButton>
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
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action isDisabled onClick={console.log}>
        {props.children}
      </DeprecatedSplitButton.Action>
      <DeprecatedMenu data-alignment="right">
        <DeprecatedMenu.Trigger>
          {({ getTriggerProps }) => <DeprecatedSplitButton.Menu {...getTriggerProps()} />}
        </DeprecatedMenu.Trigger>
        <DeprecatedMenu.Popover>
          <DeprecatedMenu.List>
            <DeprecatedMenu.Item disabled onClick={console.log} label="Save & Download" />
            <DeprecatedMenu.Item disabled label="Save & Send" />
          </DeprecatedMenu.List>
        </DeprecatedMenu.Popover>
      </DeprecatedMenu>
    </DeprecatedSplitButton>
  ),
}

export const SplitButtonSize = {
  args: {
    children: 'Button',
  },
  render: (props: any) => (
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action size="large">{props.children}</DeprecatedSplitButton.Action>
      <DeprecatedSplitButton.Menu size="large" />
    </DeprecatedSplitButton>
  ),
}
