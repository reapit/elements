import preview from '#.storybook/preview'
import { OfficeSwitcherOfficeGroup } from './office-group'
import { OfficeItem } from '../office-item'

const meta = preview.meta({
  title: 'Core/OfficeSwitcher/OfficeGroup',
  component: OfficeSwitcherOfficeGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    children: (
      <>
        <OfficeItem value="office-1">Office 1</OfficeItem>
        <OfficeItem value="office-2">Office 2</OfficeItem>
        <OfficeItem value="office-3">Office 3</OfficeItem>
      </>
    ),
    label: 'Office group',
  },
})

/**
 * A group can be initially open by passing the `open` prop. Generally, there should be no need to control
 * this prop.
 */
export const Open = meta.story({
  args: {
    open: true,
    label: 'Office group',
    children: (
      <>
        <OfficeItem value="office-1">Office 1</OfficeItem>
        <OfficeItem value="office-2">Office 2</OfficeItem>
        <OfficeItem value="office-3">Office 3</OfficeItem>
      </>
    ),
  },
})
