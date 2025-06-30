import { Select } from './index'

export default {
  title: 'Deprecated/Select',
  component: Select,
}

export const BasicUsage = {
  render: ({}) => (
    <Select>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
}

export const SelectDisabled = {
  render: ({}) => (
    <Select disabled>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
}
