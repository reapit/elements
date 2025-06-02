export type AppName =
  | 'reapitPM'
  | 'reapitSales'
  | 'reapitLetting'
  | 'reapitForms'
  | 'reapitWebsites'
  | 'reapitProposals'
  | 'keyWhere'
  | 'autoResponder'

type AppInfo = {
  name: string
  description: string
}

export const apps: Record<AppName, AppInfo> = {
  reapitPM: { name: 'Reapit PM', description: 'Property Management' },
  reapitSales: { name: 'Reapit Sales', description: 'Real Estate CRM' },
  reapitLetting: { name: 'Reapit Lettings', description: 'Lettings Management' },
  reapitForms: { name: 'Reapit Forms', description: 'Documents & Digital Signing' },
  reapitWebsites: { name: 'Reapit Websites', description: 'Bespoke Website Design' },
  reapitProposals: { name: 'Reapit Proposals', description: 'Interactive Digital Proposals' },
  keyWhere: { name: 'KeyWhere', description: 'Real-time Key Management' },
  autoResponder: { name: 'Auto Responder', description: 'Automated Email Marketing' },
}
