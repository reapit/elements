import preview from '#.storybook/preview'
import { DeprecatedToolTip } from './index'

const meta = preview.meta({
  title: 'Deprecated/DeprecatedToolTip',
  component: DeprecatedToolTip,
})

export const BasicUsage = meta.story({
  render: () => <DeprecatedToolTip tip="Some Data">Hover here</DeprecatedToolTip>,
})

export const DefaultActive = meta.story({
  render: () => (
    <DeprecatedToolTip tip="Some Data" defaultActive>
      Hover here
    </DeprecatedToolTip>
  ),
})
