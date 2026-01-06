import { OfficeSwitcher } from './office-switcher'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/OfficeSwitcher/Select',
  component: OfficeSwitcher.Select,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof OfficeSwitcher.Select>

export default meta

type Story = StoryObj<typeof meta>

/**
 * For simple use-cases, the select can display a simple list of options.
 */
export const Example: Story = {
  args: {
    children: (
      <OfficeSwitcher.Select>
        <OfficeSwitcher.Button />
        <OfficeSwitcher.Popup>
          <OfficeSwitcher.Listbox defaultValue="1">
            <OfficeSwitcher.Option value="1">Brisbane South</OfficeSwitcher.Option>
            <OfficeSwitcher.Option value="2">Gold Coast Central</OfficeSwitcher.Option>
            <OfficeSwitcher.Option value="3">Sunshine Valley</OfficeSwitcher.Option>
          </OfficeSwitcher.Listbox>
        </OfficeSwitcher.Popup>
      </OfficeSwitcher.Select>
    ),
  },
}
