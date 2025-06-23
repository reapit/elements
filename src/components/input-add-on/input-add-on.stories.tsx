import { InputAddOn } from './index'
import { DeprecatedIcon } from '../deprecated-icon'

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
      <DeprecatedIcon icon="asterisk" />
    </InputAddOn>
  ),
}

export const WithIntent = {
  render: ({}) => <InputAddOn intent="danger">Warning Message</InputAddOn>,
}
