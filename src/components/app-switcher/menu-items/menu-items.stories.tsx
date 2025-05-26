import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppMenuGroupContext } from '../menu-group-context'

interface ExtendedAppSwitcherMenuItemProps {
  url: string
  isFocused?: boolean
  hasAccess?: boolean
}

const meta: Meta<ExtendedAppSwitcherMenuItemProps> = {
  title: 'Components/AppSwitcher/AppSwitcherMenuItems',
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

// (AA)TODO: Should you delete these vvv

export const ReapitPMMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.ReapitPMMenuItem url={context.url} isFocused={context.isFocused} />
  },
}

// export const MenuItems: Story = {
//   decorators: [useParentDecorator],
//   render: () => {
//     return (
//       <>
//         <AppSwitcher.ReapitPMMenuItem url={context.url} />

//         <AppSwitcher.ReapitSalesMenuItem url={context.url} />

//         <AppSwitcher.KeyWhereMenuItem url={context.url} />

//         <AppSwitcher.AutoResponderMenuItem url={context.url} />

//         <AppSwitcher.ReapitFormsMenuItem url={context.url} />

//         <AppSwitcher.ReapitLettingMenuItem url={context.url} />

//         <AppSwitcher.ReapitWebsitesMenuItem url={context.url} />

//         <AppSwitcher.ReapitProposalsMenuItem url={context.url} />
//       </>
//     )
//   },
// }

export const ReapitSalesMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.ReapitSalesMenuItem url={context.url} isFocused={context.isFocused} />
  },
}

export const KeyWhereMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.KeyWhereMenuItem url={context.url} isFocused={context.isFocused} />
  },
}

export const AutoResponderMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.AutoResponderMenuItem url={context.url} isFocused={context.isFocused} />
  },
}

export const ReapitFormsMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.ReapitFormsMenuItem url={context.url} isFocused={context.isFocused} />
  },
}

export const ReapitLettingMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.ReapitLettingMenuItem url={context.url} isFocused={context.isFocused} />
  },
}

export const ReapitWebsitesMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.ReapitWebsitesMenuItem url={context.url} isFocused={context.isFocused} />
  },
}

export const ReapitProposalsMenuItem: Story = {
  decorators: [useParentDecorator],
  render: (context) => {
    return <AppSwitcher.ReapitProposalsMenuItem url={context.url} isFocused={context.isFocused} />
  },
}
