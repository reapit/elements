import { Meta, StoryObj } from '@storybook/react'
import { NavSearchButton } from './nav-search-button'

export default {
  title: 'Components/Nav Search Button',
  component: NavSearchButton,
  argTypes: {
    isShortcutVisible: {
      type: 'boolean',
      control: {
        type: 'radio',
        options: [true, false],
      },
      description: 'control visibility of the shortcut placeholder',
    },
  },
} as Meta<typeof NavSearchButton>

export const StylesOnlyUsage: StoryObj<typeof NavSearchButton> = {}
export const ReactUsage: StoryObj<typeof NavSearchButton> = {}
export const WithoutShortcut: StoryObj<typeof NavSearchButton> = {
  args: {
    isShortcutVisible: false,
  },
}
