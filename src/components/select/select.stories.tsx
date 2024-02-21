import { Select } from './index'
import { Label } from '../label'

export default {
  title: 'Select',
  component: Select,
}

export const BasicUsage = {
  render: () => (
    <Select>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
}

export const UseWithALabel = {
  render: () => <Label>Select an option</Label>,
  name: 'Use with a label',
}
