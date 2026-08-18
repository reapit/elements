import { render } from "@testing-library/react";

import { productConfigs } from "../../config";
import type { SupportedProductId } from "../../config";
import { AppAvatar } from "../app-avatar";

const testCases = Object.keys(productConfigs) as SupportedProductId[];

test.each(testCases)("renders %s icon when `hasAccess` is true", (productId) => {
  const { asFragment } = render(<AppAvatar productId={productId} hasAccess={true} />);
  expect(asFragment()).toMatchSnapshot();
});

test.each(testCases)("renders %s icon when `hasAccess` is false", (productId) => {
  const { asFragment } = render(<AppAvatar productId={productId} hasAccess={false} />);
  expect(asFragment()).toMatchSnapshot();
});
