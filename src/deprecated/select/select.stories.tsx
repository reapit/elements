import preview from '#.storybook/preview'
import { DeprecatedSelect } from './index'

const meta = preview.meta({
  title: 'Deprecated/DeprecatedSelect',
  component: DeprecatedSelect,
})

export default meta

export const BasicUsage = meta.story({
  render: () => (
    <DeprecatedSelect>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DeprecatedSelect>
  ),
})

export const SelectDisabled = meta.story({
  render: () => (
    <DeprecatedSelect disabled>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DeprecatedSelect>
  ),
})
