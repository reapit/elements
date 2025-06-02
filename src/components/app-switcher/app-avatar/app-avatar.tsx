import AutoResponderDisabled from './icons/autoresponder-disabled.svg?react'
import AutoResponder from './icons/autoresponder.svg?react'
import KeyWhereDisabled from './icons/keyWhere-disabled.svg?react'
import KeyWhere from './icons/keyWhere.svg?react'
import ReapitFormsDisabled from './icons/reapit-forms-disabled.svg?react'
import ReapitForms from './icons/reapit-forms.svg?react'
import ReapitLettingsDisabled from './icons/reapit-lettings-disabled.svg?react'
import ReapitLettings from './icons/reapit-lettings.svg?react'
import ReapitPMDisabled from './icons/reapit-pm-disabled.svg?react'
import ReapitPM from './icons/reapit-pm.svg?react'
import ReapitProposalsDisabled from './icons/reapit-proposals-disabled.svg?react'
import ReapitProposals from './icons/reapit-proposals.svg?react'
import ReapitSalesDisabled from './icons/reapit-sales-disabled.svg?react'
import ReapitSales from './icons/reapit-sales.svg?react'
import ReapitWebsitesDisabled from './icons/reapit-websites-disabled.svg?react'
import ReapitWebsites from './icons/reapit-websites.svg?react'

import type { AppName } from '../appNames'

type AppAvatarProps = {
  appName: AppName
  hasAccess: boolean
}

export default function AppAvatar({ appName, hasAccess }: AppAvatarProps) {
  const fontSize = '40'
  switch (appName) {
    case 'reapitPM':
      return hasAccess ? <ReapitPM fontSize={fontSize} /> : <ReapitPMDisabled fontSize={fontSize} />
    case 'reapitSales':
      return hasAccess ? <ReapitSales fontSize={fontSize} /> : <ReapitSalesDisabled fontSize={fontSize} />
    case 'reapitLetting':
      return hasAccess ? <ReapitLettings fontSize={fontSize} /> : <ReapitLettingsDisabled fontSize={fontSize} />
    case 'reapitForms':
      return hasAccess ? <ReapitForms fontSize={fontSize} /> : <ReapitFormsDisabled fontSize={fontSize} />
    case 'reapitWebsites':
      return hasAccess ? <ReapitWebsites fontSize={fontSize} /> : <ReapitWebsitesDisabled fontSize={fontSize} />
    case 'reapitProposals':
      return hasAccess ? <ReapitProposals fontSize={fontSize} /> : <ReapitProposalsDisabled fontSize={fontSize} />
    case 'keyWhere':
      return hasAccess ? <KeyWhere fontSize={fontSize} /> : <KeyWhereDisabled fontSize={fontSize} />
    case 'autoResponder':
      return hasAccess ? <AutoResponder fontSize={fontSize} /> : <AutoResponderDisabled fontSize={fontSize} />
  }
}
