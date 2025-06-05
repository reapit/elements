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
        "supplementaryInfo": "Real Estate CRM",
      },
      "autoResponder": {
        "appName": "Auto Responder",
        "supplementaryInfo": "Automated Email Marketing",
      },
      "consoleCloud": {
        "appName": "Reapit PM",
        "supplementaryInfo": "Property Management",
      },
      "ireWeb": {
        "appName": "Reapit Lettings",
        "supplementaryInfo": "Lettings Management",
      },
      "keywhere": {
        "appName": "KeyWhere",
        "supplementaryInfo": "Real-time Key Management",
      },
      "reapitForms": {
        "appName": "Reapit Forms",
        "supplementaryInfo": "Documents & Digital Signing",
      },
      "reapitProposals": {
        "appName": "Reapit Proposals",
        "supplementaryInfo": "Interactive Digital Proposals",
      },
      "reapitWebsites": {
        "appName": "Reapit Websites",
        "supplementaryInfo": "Bespoke Website Design",
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
      "keywhere",
    ]
  `)
})
