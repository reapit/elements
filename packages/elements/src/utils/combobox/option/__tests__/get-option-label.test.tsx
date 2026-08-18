import { render, screen } from "@testing-library/react";

import { getOptionLabel } from "../get-option-label";
import { ComboboxOption } from "../option";

test("returns the label text when aria-labelledby is present", () => {
  render(
    <ComboboxOption badge="Badge" additionalInfo="Supplementary info" value="1">
      Option 1
    </ComboboxOption>,
  );
  expect(getOptionLabel(screen.getByRole("option"))).toBe("Option 1");
});

test("returns the option text when aria-labelledby is not present", () => {
  render(<option value="1">Option 1</option>);
  expect(getOptionLabel(screen.getByRole("option"))).toBe("Option 1");
});
