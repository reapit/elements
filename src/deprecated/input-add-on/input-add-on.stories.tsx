import { InputAddOn } from './index'
import { AsteriskIcon } from '#src/icons/asterisk'

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
      <AsteriskIcon />
    </InputAddOn>
  ),
}

export const WithIntent = {
  render: ({}) => <InputAddOn intent="danger">Warning Message</InputAddOn>,
}
