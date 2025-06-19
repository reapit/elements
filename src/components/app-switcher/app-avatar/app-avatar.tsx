import AutoResponderDisabled from './icons/autoresponder-disabled.svg?react'
import AutoResponder from './icons/autoresponder.svg?react'
import KeyWhereDisabled from './icons/keywhere-disabled.svg?react'
import KeyWhere from './icons/keywhere.svg?react'
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
import LettingsBDM from './icons/lettings-bdm.svg?react'
import LettingsBDMDisabled from './icons/lettings-bdm-disabled.svg?react'

import type { SupportedProductId } from '../config'

interface AppAvatarProps {
  /** Whether the currently logged in user has access to the specified product or not */
  hasAccess: boolean
  /** The specific product whose avatar should be displayed. */
  productId: SupportedProductId
}

/**
 * An avatar/logo for Reapit products. The visual appearance of the avatar changes based on the current user's
 * access to the product. When user's do not have access, the avatar will be greyed out.
 */
export function AppAvatar({ hasAccess, productId }: AppAvatarProps) {
  const fontSize = '40'
  switch (productId) {
    case 'consoleCloud':
      return hasAccess ? <ReapitPM fontSize={fontSize} /> : <ReapitPMDisabled fontSize={fontSize} />
    case 'agentBox':
      return hasAccess ? <ReapitSales fontSize={fontSize} /> : <ReapitSalesDisabled fontSize={fontSize} />
    case 'ireWeb':
      return hasAccess ? <ReapitLettings fontSize={fontSize} /> : <ReapitLettingsDisabled fontSize={fontSize} />
    case 'reapitForms':
      return hasAccess ? <ReapitForms fontSize={fontSize} /> : <ReapitFormsDisabled fontSize={fontSize} />
    case 'reapitWebsites':
      return hasAccess ? <ReapitWebsites fontSize={fontSize} /> : <ReapitWebsitesDisabled fontSize={fontSize} />
    case 'reapitProposals':
      return hasAccess ? <ReapitProposals fontSize={fontSize} /> : <ReapitProposalsDisabled fontSize={fontSize} />
    case 'keywhere':
      return hasAccess ? <KeyWhere fontSize={fontSize} /> : <KeyWhereDisabled fontSize={fontSize} />
    case 'autoResponder':
      return hasAccess ? <AutoResponder fontSize={fontSize} /> : <AutoResponderDisabled fontSize={fontSize} />
    case 'lettingsBDM':
      return hasAccess ? <LettingsBDM fontSize={fontSize} /> : <LettingsBDMDisabled fontSize={fontSize} />
  }
}
