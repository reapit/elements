import { cx } from "@linaria/core";
import type { HTMLAttributes } from "react";

import { ProductDevice } from "./product-device";
import { elProductDevice } from "./styles";

export { supportedProductLogos } from "./product-device";
export type { SupportedProductLogo } from "./product-device";

export namespace FocusedLayoutProductLogo {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** The product logo to display */
    product: ProductDevice.Props["product"];
  }
}

/**
 * A product logo icon for use in the FocusedLayout top bar. Displays a 24x24 icon
 * representing the specified Reapit product.
 */
export function FocusedLayoutProductLogo({
  className,
  product,
  ...rest
}: FocusedLayoutProductLogo.Props) {
  return (
    <div {...rest} className={cx(elProductDevice, className)} role="img" aria-label={product}>
      <ProductDevice product={product} />
    </div>
  );
}

FocusedLayoutProductLogo.displayName = "FocusedLayout.ProductLogo";
