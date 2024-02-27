import { ToolTip } from './index'

export default {
  title: 'ToolTip',
  component: ToolTip,
}

export const BasicUsage = {
  render: ({}) => <ToolTip tip="Some Data">Hover here</ToolTip>,
}

export const DefaultActive = {
  render: ({}) => (
    <ToolTip tip="Some Data" defaultActive>
      Hover here
    </ToolTip>
  ),
}
