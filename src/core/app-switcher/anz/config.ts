export interface ProductConfig {
  appName: string
  supplementaryInfo: string
}

/**
 * React Connect product IDs that are supported by the ANZ App Switcher. A supported product has a logo
 * available through `AppAvatar` and a related config in the `productConfigs` object.
 */
export type SupportedProductId =
  | 'agentBox' // Reapit Sales
  | 'autoResponder'
  | 'consoleCloud' // Reapit PM
  | 'ireBdm' // Lettings BDM
  | 'ireWeb' // Reapit Lettings
  | 'keyWhere'
  | 'mmiWeb'
  | 'reapitforms'
  | 'reapitProposals'
  | 'reapitWebsites'
  | 'verifyweb'

/**
 * The configuration for each product that is supported by the ANZ App Switcher.
 *
 * **IMPORTANT:** Products should only be added here if they are intended to be available in the App Switcher
 * in the future. Similarly, product config content for existing products should only be changed if explicitly
 * approved by the Product and Design teams.
 *
 * @deprecated Will be removed in a future release.
 */
export const productConfigs = {
  autoResponder: {
    appName: 'Auto Responder',
    supplementaryInfo: 'Auto-enquiry follow up',
  },
  agentBox: { appName: 'Reapit Sales', supplementaryInfo: 'Real estate CRM' },
  consoleCloud: { appName: 'Reapit PM', supplementaryInfo: 'Property management' },
  ireBdm: {
    appName: 'Lettings BDM',
    supplementaryInfo: 'Business development',
  },
  ireWeb: {
    appName: 'Reapit Lettings',
    supplementaryInfo: 'Leasing management',
  },
  keyWhere: {
    appName: 'KeyWhere',
    supplementaryInfo: 'Key management',
  },
  mmiWeb: {
    appName: 'Move Me In',
    supplementaryInfo: 'Utility connections service',
  },
  reapitforms: {
    appName: 'Reapit Forms',
    supplementaryInfo: 'Documents & digital signing',
  },
  reapitProposals: {
    appName: 'Reapit Proposals',
    supplementaryInfo: 'Interactive digital proposals',
  },
  reapitWebsites: {
    appName: 'Reapit Websites',
    supplementaryInfo: 'Website builder',
  },
  verifyweb: {
    appName: 'Reapit Verify',
    supplementaryInfo: 'AML/CTF compliance',
  },
} as const satisfies Record<SupportedProductId, ProductConfig>

/**
 * The order of products in this array determines the order they will be displayed in the ANZ App Switcher.
 * This array also implicitly defines the subset of supported products that are also "displayable". That is,
 * the products that are permitted to be displayed in the App Switcher across all ANZ consumers.
 *
 * **IMPORTANT:** DO NOT add products to this array unless they are Reapit Connect SSO capable and the
 * product is approved for use via the App Switcher. Further, the order of the products in this array is defined
 * by the Product and Design teams and should not be changed without their explicit approval.
 *
 * @deprecated Will be removed in a future release.
 */
export const productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE = [
  // Primary apps here (should be alphabetically ordered by configured app name)
  'ireWeb', // => Reapit Lettings
  'consoleCloud', // => Reapit PM
  'agentBox', // => Reapit Sales
  // Secondary apps here (should be alphabetically ordered by configured app name)
  'keyWhere',
  'ireBdm', // => Lettings BDM
  'mmiWeb',
  'reapitforms',
  'reapitProposals',
  'verifyweb',
] as const satisfies SupportedProductId[]
