import AutoResponderDisabled from './icons/autoresponder-disabled.svg?url'
import AutoResponder from './icons/autoresponder.svg?url'
import KeyWhereDisabled from './icons/keywhere-disabled.svg?url'
import KeyWhere from './icons/keywhere.svg?url'
import MoveMeInDisabled from './icons/movemein-disabled.svg?url'
import MoveMeIn from './icons/movemein.svg?url'
import ReapitFormsDisabled from './icons/reapit-forms-disabled.svg?url'
import ReapitForms from './icons/reapit-forms.svg?url'
import ReapitLettingsDisabled from './icons/reapit-lettings-disabled.svg?url'
import ReapitLettings from './icons/reapit-lettings.svg?url'
import ReapitPMDisabled from './icons/reapit-pm-disabled.svg?url'
import ReapitPM from './icons/reapit-pm.svg?url'
import ReapitProposalsDisabled from './icons/reapit-proposals-disabled.svg?url'
import ReapitProposals from './icons/reapit-proposals.svg?url'
import ReapitSalesDisabled from './icons/reapit-sales-disabled.svg?url'
import ReapitSales from './icons/reapit-sales.svg?url'
import ReapitWebsitesDisabled from './icons/reapit-websites-disabled.svg?url'
import ReapitWebsites from './icons/reapit-websites.svg?url'
import LettingsBDM from './icons/lettings-bdm.svg?url'
import LettingsBDMDisabled from './icons/lettings-bdm-disabled.svg?url'

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
  switch (productId) {
    case 'agentBox':
      return hasAccess ? <img src={ReapitSales} /> : <img src={ReapitSalesDisabled} />
    case 'autoResponder':
      return hasAccess ? <img src={AutoResponder} /> : <img src={AutoResponderDisabled} />
    case 'bdm':
      return hasAccess ? <img src={LettingsBDM} /> : <img src={LettingsBDMDisabled} />
    case 'consoleCloud':
      return hasAccess ? <img src={ReapitPM} /> : <img src={ReapitPMDisabled} />
    case 'ireWeb':
      return hasAccess ? <img src={ReapitLettings} /> : <img src={ReapitLettingsDisabled} />
    case 'mmiWeb':
      return hasAccess ? <img src={MoveMeIn} /> : <img src={MoveMeInDisabled} />
    case 'reapitForms':
      return hasAccess ? <img src={ReapitForms} /> : <img src={ReapitFormsDisabled} />
    case 'reapitWebsites':
      return hasAccess ? <img src={ReapitWebsites} /> : <img src={ReapitWebsitesDisabled} />
    case 'reapitProposals':
      return hasAccess ? <img src={ReapitProposals} /> : <img src={ReapitProposalsDisabled} />
    case 'keywhere':
      return hasAccess ? <img src={KeyWhere} /> : <img src={KeyWhereDisabled} />
  }
}
