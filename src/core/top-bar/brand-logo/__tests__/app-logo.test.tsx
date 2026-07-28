import { render } from "@testing-library/react";

import { AppLogo, supportedAppNames } from "../app-logo";

test.each(supportedAppNames)("returns an svg with an accessible name of %s", (appName) => {
  const { container } = render(<AppLogo appName={appName} />);
  const svg = container.querySelector("svg");
  expect(svg).toHaveAttribute("aria-label", appName);
});
