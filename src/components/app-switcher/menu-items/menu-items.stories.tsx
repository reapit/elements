import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'

const useParentDecorator: Decorator = (Story, context) => {
  const hasAccess = context.args.hasAccess as boolean
  return (
    <div style={{ width: 'fit-content' }}>
      <AppMenuGroupHasAccessContext.Provider value={hasAccess}>
        <Story />
      </AppMenuGroupHasAccessContext.Provider>
    </div>
  )
}
interface ExtendedAppSwitcherMenuItemProps {
  url: string
  hasAccess: boolean
}

const meta: Meta<ExtendedAppSwitcherMenuItemProps> = {
  title: 'Components/AppSwitcher/AppSwitcherMenuItems',
  decorators: [useParentDecorator],
  parameters: {
    docs: {
      description: {
        component: 'Menu items for the App Switcher, which can be used to navigate to different apps.',
      },
    },
  },
  argTypes: {
    url: {
      control: { type: 'text' },
      defaultValue: '#',
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

export const ReapitPMMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.ReapitPMMenuItem url={context.url} />
  },
}

export const ReapitSalesMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.ReapitSalesMenuItem url={context.url} />
  },
}

export const KeyWhereMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.KeyWhereMenuItem url={context.url} />
  },
}

export const AutoResponderMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.AutoResponderMenuItem url={context.url} />
  },
}

export const ReapitFormsMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.ReapitFormsMenuItem url={context.url} />
  },
}

export const ReapitLettingMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.ReapitLettingMenuItem url={context.url} />
  },
}

export const ReapitWebsitesMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.ReapitWebsitesMenuItem url={context.url} />
  },
}

export const ReapitProposalsMenuItem: Story = {
  render: (context) => {
    return <AppSwitcher.ReapitProposalsMenuItem url={context.url} />
  },
}
