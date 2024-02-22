import { InputAddOn } from './index'
import { Icon } from '../icon'

export default {
  title: 'InputAddOn',
  component: InputAddOn,
}

export const BasicUsage = {
  render: ({}) => <InputAddOn>Short text message</InputAddOn>,
}

export const WithIcon = {
  render: ({}) => (
    <InputAddOn>
      <Icon icon="asterisk" />
    </InputAddOn>
  ),
}

export const WithIntent = {
  render: ({}) => <InputAddOn intent="danger">Warning Message</InputAddOn>,
}
