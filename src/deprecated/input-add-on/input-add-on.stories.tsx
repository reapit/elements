import { InputAddOn } from './index'
import { DeprecatedIcon } from '../icon'

export default {
  title: 'Deprecated/InputAddOn',
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
