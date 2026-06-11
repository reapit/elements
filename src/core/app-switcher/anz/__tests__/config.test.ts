import {
  productConfigs,
  productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE,
} from '../config'

// IMPORTANT: This test is to ensure that the product display order does not change accidentally/unintentionally.
//
// Products should only be added to the `productConfigs` object if they are intended to be available in the App
// Switcher in the future. Similarly, product config content for existing products should only be changed if
// explicitly approved by the Product and Design teams.
test('product configs should not change without updating this test', () => {
  expect(productConfigs).toMatchInlineSnapshot(`
    {
      "agentBox": {
        "appName": "Reapit Sales",
        "supplementaryInfo": "Real estate CRM",
      },
      "autoResponder": {
        "appName": "Auto Responder",
        "supplementaryInfo": "Auto-enquiry follow up",
      },
      "consoleCloud": {
        "appName": "Reapit PM",
        "supplementaryInfo": "Property management",
      },
      "ireBdm": {
        "appName": "Lettings BDM",
        "supplementaryInfo": "Business development",
      },
      "ireWeb": {
        "appName": "Reapit Lettings",
        "supplementaryInfo": "Leasing management",
      },
      "keyWhere": {
        "appName": "KeyWhere",
        "supplementaryInfo": "Key management",
      },
      "mmiWeb": {
        "appName": "Move Me In",
        "supplementaryInfo": "Utility connections service",
      },
      "reapitProposals": {
        "appName": "Reapit Proposals",
        "supplementaryInfo": "Interactive digital proposals",
      },
      "reapitWebsites": {
        "appName": "Reapit Websites",
        "supplementaryInfo": "Website builder",
      },
      "reapitforms": {
        "appName": "Reapit Forms",
        "supplementaryInfo": "Documents & digital signing",
      },
      "verifyweb": {
        "appName": "Reapit Verify",
        "supplementaryInfo": "AML/CTF compliance",
      },
    }
  `)
})

// IMPORTANT: This test is to ensure that the product display order does not change accidentally/unintentionally.
//
// Products should only be added to the `productDisplayOrder_...` array if they are Reapit Connect SSO capable and
// have been approved for inclusion in the App Switcher.
//
// Further, the order of the products in this array is defined by the Product and Design teams and should not be
// changed without their explicit approval.
test('product display order should not change without updating this test', () => {
  expect(productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE)
    .toMatchInlineSnapshot(`
      [
        "ireWeb",
        "consoleCloud",
        "agentBox",
        "keyWhere",
        "ireBdm",
        "mmiWeb",
        "reapitforms",
        "reapitProposals",
        "verifyweb",
      ]
    `)
})
