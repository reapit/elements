import { useContext } from 'react'
import { AppMenuGroupContext } from '../app-switcher-menu-group-context'
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

type AppAvatarProps = {
  appName: string
}

// const exampleURL = 'https://www.reapit.com'
const exampleURL = '#'
export const appNames = {
  reapitPM: { name: 'Reapit PM', description: 'Property Management', url: exampleURL },
  reapitSales: { name: 'Reapit Sales', description: 'Real Estate CRM', url: exampleURL },
  reapitLetting: { name: 'Reapit Lettings', description: 'Lettings Management', url: exampleURL },
  reapitForms: { name: 'Reapit Forms', description: 'Documents & Digital Signing', url: exampleURL },
  reapitWebsites: { name: 'Reapit Websites', description: 'Bespoke Website Design|', url: exampleURL },
  reapitProposals: {
    name: 'Reapit Proposals',
    description: 'Interactive Digital Proposals',
    url: exampleURL,
  },
  keyWhere: { name: 'KeyWhere', description: 'Real-time Key Management', url: exampleURL },
  autoResponder: { name: 'Auto Responder', description: 'Automated Email Marketing', url: exampleURL },
}

// (AA)TODO: How can you make this size 24x24?
export default function AppAvatar({ appName }: AppAvatarProps) {
  const hasAccess = useContext(AppMenuGroupContext)
  const fontSize = '40'

  switch (appName) {
    case appNames.reapitPM.name:
      return hasAccess ? <ReapitPM fontSize={fontSize} /> : <ReapitPMDisabled fontSize={fontSize} />
    case appNames.reapitSales.name:
      return hasAccess ? <ReapitSales fontSize={fontSize} /> : <ReapitSalesDisabled fontSize={fontSize} />
    case appNames.reapitLetting.name:
      return hasAccess ? <ReapitLettings fontSize={fontSize} /> : <ReapitLettingsDisabled fontSize={fontSize} />
    case appNames.reapitForms.name:
      return hasAccess ? <ReapitForms fontSize={fontSize} /> : <ReapitFormsDisabled fontSize={fontSize} />
    case appNames.reapitWebsites.name:
      return hasAccess ? <ReapitWebsites fontSize={fontSize} /> : <ReapitWebsitesDisabled fontSize={fontSize} />
    case appNames.reapitProposals.name:
      return hasAccess ? <ReapitProposals fontSize={fontSize} /> : <ReapitProposalsDisabled fontSize={fontSize} />
    case appNames.keyWhere.name:
      return hasAccess ? <KeyWhere fontSize={fontSize} /> : <KeyWhereDisabled fontSize={fontSize} />
    case appNames.autoResponder.name:
      return hasAccess ? <AutoResponder fontSize={fontSize} /> : <AutoResponderDisabled fontSize={fontSize} />
    default:
      return null
  }
}
