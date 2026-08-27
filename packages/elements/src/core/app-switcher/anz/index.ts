// Generic primitives: re-exported for convenience so ANZ consumers only need one import path
export { AppSwitcher } from "../app-switcher";
export { isProductAccessible } from "../is-product-accessible";
export type { ProductConfig } from "./config";

// ANZ-specific types: canonical location
export type { SupportedProductId } from "./config";

// ANZ-specific components: canonical location
export { AppAvatar } from "./app-avatar";
export { AppSwitcherProductMenuItem } from "./product-menu-item";

// ANZ-specific helpers: canonical location
export { getDisplayableProductsForYourAppsGroup } from "./get-displayable-products-for-your-apps-group";
export { getDisplayableProductsForExploreGroup } from "./get-displayable-products-for-explore-group";

// ANZ-specific data: canonical location.
// Deprecated because this data should not live in Elements long-term.
export { productConfigs } from "./config";
export { productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE } from "./config";
