import { OfficeSwitcher } from './office-switcher'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/OfficeSwitcher',
  component: OfficeSwitcher,
  argTypes: {
    children: {
      control: false,
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof OfficeSwitcher>

export default meta

type Story = StoryObj<typeof meta>

/**
 * At its simplest, the office switcher can display a static office name. Typically, this will be used
 * for single-office users.
 */
export const Example: Story = {
  args: {
    children: 'Brisbane South',
  },
}

/**
 * For multi-office users, the office switcher can display a dropdown menu with a list of offices.
 */
export const Selector: Story = {
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

/**
 * For multi-office users with many offices, the dropdown can be searchable.
 */
export const Searchable: Story = {
  args: {
    children: (
      <OfficeSwitcher.Select>
        <OfficeSwitcher.Button />
        <OfficeSwitcher.Popup search={<OfficeSwitcher.SearchInput aria-label="Search offices" />}>
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

/**
 * In some cases, offices may need to be grouped.
 */
export const Groups: Story = {
  args: {
    children: (
      <OfficeSwitcher.Select>
        <OfficeSwitcher.Button />
        <OfficeSwitcher.Popup search={<OfficeSwitcher.SearchInput aria-label="Search offices" />}>
          <OfficeSwitcher.Listbox defaultValue="1">
            <OfficeSwitcher.Optgroup label="Australia" open>
              <OfficeSwitcher.Option value="1">Brisbane South</OfficeSwitcher.Option>
              <OfficeSwitcher.Option value="2">Gold Coast Central</OfficeSwitcher.Option>
              <OfficeSwitcher.Option value="3">Sunshine Valley</OfficeSwitcher.Option>
            </OfficeSwitcher.Optgroup>
            <OfficeSwitcher.Optgroup label="United States">
              <OfficeSwitcher.Option value="4">New York</OfficeSwitcher.Option>
              <OfficeSwitcher.Option value="5">Los Angeles</OfficeSwitcher.Option>
              <OfficeSwitcher.Option value="6">Chicago</OfficeSwitcher.Option>
            </OfficeSwitcher.Optgroup>
          </OfficeSwitcher.Listbox>
        </OfficeSwitcher.Popup>
      </OfficeSwitcher.Select>
    ),
  },
}
