import { render } from "@testing-library/react";

import { ProductDevice, supportedProductLogos } from "../product-device";

test.each(supportedProductLogos)("returns an svg element for %s", (product) => {
  const { container } = render(<ProductDevice product={product} />);
  const svg = container.querySelector("svg");
  expect(svg).toBeInTheDocument();
});
