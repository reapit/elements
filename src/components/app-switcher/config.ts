/**
 * React Connect product IDs that are supported by the App Switcher. A supported product has a logo available
 * through `AppAvatar` and a related config in the `productConfigs` object.
 */
export type SupportedProductId =
  | 'agentBox' // Reapit Sales
  | 'autoResponder'
  | 'consoleCloud' // Reapit PM
  | 'ireWeb' // Reapit Lettings
  | 'keywhere'
  | 'lettingsBDM'
  | 'reapitForms'
  | 'reapitProposals'
  | 'reapitWebsites'

export interface ProductConfig {
  appName: string
  supplementaryInfo: string
}

/**
 * The configuration for each product that is supported by the App Switcher.
 *
 * **IMPORTANT:** Products should only be added here if they are intended to be available in the App Switcher
 * in the future. Similarly, product config content for existing products should only be changed if explicitly
 * approved by the Product and Design teams.
 */
export const productConfigs = {
  autoResponder: {
    appName: 'Auto Responder',
    supplementaryInfo: 'Automated Email Marketing',
  },
  agentBox: { appName: 'Reapit Sales', supplementaryInfo: 'Real Estate CRM' },
  consoleCloud: { appName: 'Reapit PM', supplementaryInfo: 'Property Management' },
  ireWeb: {
    appName: 'Reapit Lettings',
    supplementaryInfo: 'Lettings Management',
  },
  keywhere: {
    appName: 'KeyWhere',
    supplementaryInfo: 'Real-time Key Management',
  },
  lettingsBDM: {
    appName: 'Lettings BDM',
    supplementaryInfo: 'New Business',
  },
  reapitForms: {
    appName: 'Reapit Forms',
    supplementaryInfo: 'Documents & Digital Signing',
  },
  reapitWebsites: {
    appName: 'Reapit Websites',
    supplementaryInfo: 'Bespoke Website Design',
  },
  reapitProposals: {
    appName: 'Reapit Proposals',
    supplementaryInfo: 'Interactive Digital Proposals',
  },
} as const satisfies Record<SupportedProductId, ProductConfig>

/**
 * The order of products in this array determines the order they will be displayed in the App Switcher.
 * This array also implicitly defines the subset of supported products that are also "displayable". That is,
 * the products that are permitted to be displayed in the App Switcher across all consumers of the App Switcher
 * component.
 *
 * **IMPORTANT:** DO NOT add products to this array unless they are Reapit Connect SSO capable and the
 * product is approved for use via the App Switcher. Further, the order of the products in this array is defined
 * by the Product and Design teams and should not be changed without their explicit approval.
 */
export const productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE = [
  // Primary apps here (should be alphatically ordered by configured app name)
  'ireWeb', // Reapit Lettings
  'consoleCloud', // Reapit PM
  // Secondary apps here (should be alphatically ordered by configured app name)
  'keywhere',
  'lettingsBDM',
] as const satisfies SupportedProductId[]
