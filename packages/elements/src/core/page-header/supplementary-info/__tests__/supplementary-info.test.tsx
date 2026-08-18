import { render, screen } from "@testing-library/react";

import { PageHeaderSupplementaryInfo } from "../supplementary-info";

test("renders a generic element with the expected title", () => {
  render(<PageHeaderSupplementaryInfo>Supplementary Info</PageHeaderSupplementaryInfo>);
  expect(screen.getByText("Supplementary Info")).toBeVisible();
});

test("forwards additional props to the supplementary info container", () => {
  render(
    <PageHeaderSupplementaryInfo data-testid="test-id">
      Supplementary Info
    </PageHeaderSupplementaryInfo>,
  );
  expect(screen.getByTestId("test-id")).toBeVisible();
});
