import { DeprecatedToolTip } from './index'

export default {
  title: 'Deprecated/DeprecatedToolTip',
  component: DeprecatedToolTip,
}

export const BasicUsage = {
  render: ({}) => <DeprecatedToolTip tip="Some Data">Hover here</DeprecatedToolTip>,
}

export const DefaultActive = {
  render: ({}) => (
    <DeprecatedToolTip tip="Some Data" defaultActive>
      Hover here
    </DeprecatedToolTip>
  ),
}
