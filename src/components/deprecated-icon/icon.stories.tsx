import { DeprecatedIcon } from './index'
import { elMb5 } from '../../styles/spacing'

export default {
  title: 'Deprecated/DeprecatedIcon',
  component: DeprecatedIcon,
}

export const BasicUsage = {
  render: ({}) => <DeprecatedIcon icon="add" />,
}

export const IconFontSize = {
  render: ({}) => <DeprecatedIcon className={elMb5} fontSize="3rem" icon="add" />,
}

export const IconCustomSizes = {
  render: ({}) => <DeprecatedIcon height="20px" width="100px" icon="reapitLogo" />,
}

export const IconIntent = {
  render: ({}) => <DeprecatedIcon className={elMb5} intent="primary" icon="cloud" />,
}

export const OtherIcons = {
  render: ({}) => <DeprecatedIcon height="20px" width="100px" icon="reapitLogo" />,
}
