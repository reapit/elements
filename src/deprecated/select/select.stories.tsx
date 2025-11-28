import { DeprecatedSelect } from './index'

export default {
  title: 'Deprecated/Select',
  component: DeprecatedSelect,
}

export const BasicUsage = {
  render: ({}) => (
    <DeprecatedSelect>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DeprecatedSelect>
  ),
}

export const SelectDisabled = {
  render: ({}) => (
    <DeprecatedSelect disabled>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DeprecatedSelect>
  ),
}
