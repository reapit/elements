import { render } from "@testing-library/react";

import { AppSwitcherMenuGroupHasAccessContext } from "../../menu-group-has-access-context";
import { AppSwitcherYourAppsMenuGroup } from "../your-apps-menu-group";

test("renders AppSwitcherYourAppsMenuGroup properly", () => {
  const { asFragment } = render(
    <AppSwitcherYourAppsMenuGroup>Fake child</AppSwitcherYourAppsMenuGroup>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test("provides an `AppSwitcherMenuGroupHasAccessContext` value of `true`", () => {
  let hasAccess: boolean | undefined;

  render(
    <AppSwitcherYourAppsMenuGroup>
      <AppSwitcherMenuGroupHasAccessContext.Consumer>
        {(value) => {
          hasAccess = value;
          return null;
        }}
      </AppSwitcherMenuGroupHasAccessContext.Consumer>
    </AppSwitcherYourAppsMenuGroup>,
  );

  expect(hasAccess).toBe(true);
});
