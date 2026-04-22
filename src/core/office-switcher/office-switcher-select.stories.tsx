import preview from '#.storybook/preview'
import { OfficeSwitcher } from './office-switcher'

const meta = preview.meta({
  title: 'Core/OfficeSwitcher/Select',
  component: OfficeSwitcher.Select,
  argTypes: {
    children: {
      control: false,
    },
  },
})

/**
 * For simple use-cases, the select can display a simple list of options.
 */
export const Example = meta.story({
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
})
