import AutoResponderDisabled from './icons/autoresponder-disabled.svg'
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
  hasAccess: boolean
}

// Apps
// type AppName = {
//   name: string
//   description: string
// }

export const appNames = {
  reapitPM: { name: 'Reapit PM', description: 'Property Management' },
  reapitSales: { name: 'Reapit Sales', description: 'Real Estate CRM' },
  reapitLetting: { name: 'Reapit Lettings', description: 'Lettings Management' },
  reapitForms: { name: 'Reapit Forms', description: 'Documents & Digital Signing' },
  reapitWebsites: { name: 'Reapit Websites', description: 'Bespoke Website Design|' },
  reapitProposals: { name: 'Reapit Proposals', description: 'Interactive Digital Proposals' },
  keyWhere: { name: 'KeyWhere', description: 'Real-time Key Management' },
  autoResponder: { name: 'Auto Responder', description: 'Automated Email Marketing' },
}

export default function AppAvatar({ appName, hasAccess }: AppAvatarProps) {
  switch (appName) {
    case appNames.reapitPM.name:
      return hasAccess ? <ReapitPM /> : <ReapitPMDisabled />
    case appNames.reapitSales.name:
      return hasAccess ? <ReapitSales /> : <ReapitSalesDisabled />
    case appNames.reapitLetting.name:
      return hasAccess ? <ReapitLettings /> : <ReapitLettingsDisabled />
    case appNames.reapitForms.name:
      return hasAccess ? <ReapitForms /> : <ReapitFormsDisabled />
    case appNames.reapitWebsites.name:
      return hasAccess ? <ReapitWebsites /> : <ReapitWebsitesDisabled />
    case appNames.reapitProposals.name:
      return hasAccess ? <ReapitProposals /> : <ReapitProposalsDisabled />
    case appNames.keyWhere.name:
      return hasAccess ? <KeyWhere /> : <KeyWhereDisabled />
    case appNames.autoResponder.name:
      return hasAccess ? <AutoResponder /> : <AutoResponderDisabled />
    default:
      return null
  }
}
