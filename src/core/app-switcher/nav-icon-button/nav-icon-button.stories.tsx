import preview from '#.storybook/preview'
import { AppSwitcherNavIconButton } from './nav-icon-button'

const meta = preview.meta({
  title: 'Navigation/AppSwitcher/NavIconButton',
  component: AppSwitcherNavIconButton,
  argTypes: {
    onClick: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    onClick: () => void 0,
  },
  render: (args) => {
    return <AppSwitcherNavIconButton {...args} />
  },
})

export const Expanded = meta.story({
  args: {
    onClick: () => void 0,
  },
  render: (args) => {
    return <AppSwitcherNavIconButton aria-expanded={true} {...args} />
  },
})
