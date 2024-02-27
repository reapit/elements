import { Icon } from './index'
import { elMb5 } from '../../styles/spacing'

export default {
  title: 'Icon',
  component: Icon,
}

export const BasicUsage = {
  render: ({}) => (<Icon icon="add" />),
}

export const IconFontSize = {
  render: ({}) => (<Icon className={elMb5} fontSize="3rem" icon="add" />),
}

export const IconCustomSizes = {
  render: ({}) => (<Icon height="20px" width="100px" icon="reapitLogoMenu" />),
}

export const IconIntent = {
  render: ({}) => (<Icon className={elMb5} intent="primary" icon="cloud" />),
}

export const OtherIcons = {
  render: ({}) => (<Icon height="20px" width="100px" icon="reapitLogo" />),
}

export const LegacyIcons = {
  render: ({}) => (<Icon className={elMb5} iconSize="large" icon="agencyCloudInfographic" />),
}
