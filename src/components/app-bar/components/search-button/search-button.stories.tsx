import { Meta, StoryObj } from '@storybook/react'
import { NavSearchButton } from './search-button'

export default {
  title: 'Components/App bar/Search button',
  component: NavSearchButton,
} as Meta<typeof NavSearchButton>

export const StylesOnlyUsage: StoryObj<typeof NavSearchButton> = {}
export const ReactUsage: StoryObj<typeof NavSearchButton> = {}
