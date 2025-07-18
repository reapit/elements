import Reapit from './logos/reapit.svg?react'
import ConsoleOwner from './logos/console-owner.svg?react'
import ConsolePay from './logos/console-pay.svg?react'
import ConsoleTenant from './logos/console-tenant.svg?react'
import ReapitConnect from './logos/reapit-connect.svg?react'
import ReapitProjector from './logos/reapit-projector.svg?react'
import ReapitSales from './logos/reapit-sales.svg?react'
import ReapitLettings from './logos/reapit-lettings.svg?react'
import ReapitPM from './logos/reapit-pm.svg?react'
import PMDemo from './logos/pm-demo.svg?react'
import PMSales from './logos/pm-sales.svg?react'
import PMInspect from './logos/pm-inspect.svg?react'
import ReapitForms from './logos/reapit-forms.svg?react'
import ReapitWebsites from './logos/reapit-websites.svg?react'
import ReapitProposals from './logos/reapit-proposals.svg?react'
import KeyWhere from './logos/key-where.svg?react'
import AutoResponder from './logos/auto-responder.svg?react'

export const supportedAppNames = [
  'Reapit',
  'Console Owner',
  'Console Pay',
  'Console Tenant',
  'Reapit Connect',
  'Reapit Projector',
  'Reapit Sales',
  'Reapit Lettings',
  'Reapit PM',
  'PM Demo',
  'PM Sales',
  'PM Inspect',
  'Reapit Forms',
  'Reapit Websites',
  'Reapit Proposals',
  'KeyWhere',
  'Auto Responder',
] as const

export type SupportedAppName = (typeof supportedAppNames)[number]

interface AppLogoProps {
  appName: SupportedAppName
}

/**
 * A simple component for displaying product's logo. Each logo will have an accessible name that matches the app name.
 */
export function AppLogo({ appName }: AppLogoProps) {
  switch (appName) {
    case 'Reapit':
      return <Reapit aria-label={appName} />
    case 'Console Owner':
      return <ConsoleOwner aria-label={appName} />
    case 'Console Pay':
      return <ConsolePay aria-label={appName} />
    case 'Console Tenant':
      return <ConsoleTenant aria-label={appName} />
    case 'Reapit Connect':
      return <ReapitConnect aria-label={appName} />
    case 'Reapit Projector':
      return <ReapitProjector aria-label={appName} />
    case 'Reapit Sales':
      return <ReapitSales aria-label={appName} />
    case 'Reapit Lettings':
      return <ReapitLettings aria-label={appName} />
    case 'Reapit PM':
      return <ReapitPM aria-label={appName} />
    case 'PM Demo':
      return <PMDemo aria-label={appName} />
    case 'PM Sales':
      return <PMSales aria-label={appName} />
    case 'PM Inspect':
      return <PMInspect aria-label={appName} />
    case 'Reapit Forms':
      return <ReapitForms aria-label={appName} />
    case 'Reapit Proposals':
      return <ReapitProposals aria-label={appName} />
    case 'Reapit Websites':
      return <ReapitWebsites aria-label={appName} />
    case 'KeyWhere':
      return <KeyWhere aria-label={appName} />
    case 'Auto Responder':
      return <AutoResponder aria-label={appName} />
  }
}
