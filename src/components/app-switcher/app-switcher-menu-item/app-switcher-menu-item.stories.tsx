import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppMenuGroupContext } from '../app-switcher-menu-group-context'
import { AppSwitcherMenuItem } from './app-switcher-menu-item'

interface ExtendedAppSwitcherMenuItemProps extends React.ComponentProps<typeof AppSwitcherMenuItem> {
  hasAccess?: boolean
}

const meta: Meta<ExtendedAppSwitcherMenuItemProps> = {
  title: 'Components/AppSwitcher/AppSwitcherMenuItem',
  component: AppSwitcherMenuItem,
  argTypes: {
    url: {
      control: { type: 'select' },
      defaultValue: '#',
    },
    isFocused: {
      control: { type: 'boolean' },
      description: 'Visual style of the avatars',
      options: [true, false],
    },
    hasAccess: {
      control: { type: 'boolean' },
      description: 'Whether the user has access to the app',
      defaultValue: true,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const useParentDecorator: Decorator = (Story, context) => {
  const hasAccess = context.args.hasAccess as boolean
  return (
    <div style={{ width: 'fit-content' }}>
      <AppMenuGroupContext.Provider value={hasAccess}>
        <Story />
      </AppMenuGroupContext.Provider>
    </div>
  )
}

// (AA)TODO: Write comments for these stories
// /**
//  * By default, a a group will grow to whatever width it's parent allows.
//  */
export const ReapitPMMenuItem: Story = {
  decorators: [useParentDecorator],
  render: ({}) => {
    return <AppSwitcher.ReapitPMMenuItem url={'#'} />
  },
}

export const KeyWhereMenuItem: Story = {
  decorators: [useParentDecorator],
  render: ({}) => {
    return <AppSwitcher.KeyWhereMenuItem url={'#'} />
  },
}

export const AutoResponderMenuItem: Story = {
  decorators: [useParentDecorator],
  render: ({}) => {
    return <AppSwitcher.AutoResponderMenuItem url={'#'} />
  },
}
