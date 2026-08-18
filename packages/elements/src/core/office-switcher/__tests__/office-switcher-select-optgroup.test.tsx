import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ListboxRenderContext } from "#src/utils/listbox/render-context";

import { OfficeSwitcherSelectOptgroup } from "../office-switcher-select-optgroup";

describe("OfficeSwitcherSelectOptgroup", () => {
  it("should render as OfficeSwitcherOfficeGroup in custom context", () => {
    render(
      <ListboxRenderContext.Provider value="custom">
        <OfficeSwitcherSelectOptgroup label="Test Group">
          <div>Child content</div>
        </OfficeSwitcherSelectOptgroup>
      </ListboxRenderContext.Provider>,
    );
    const details = screen.getByRole("group");
    expect(details.tagName).toBe("DETAILS");
    expect(screen.getByText("Test Group")).toBeInTheDocument();
  });

  it("should render as native optgroup in native context", () => {
    render(
      <ListboxRenderContext.Provider value="native">
        <select>
          <OfficeSwitcherSelectOptgroup label="Test Group">
            <option value="office-1">Office 1</option>
          </OfficeSwitcherSelectOptgroup>
        </select>
      </ListboxRenderContext.Provider>,
    );
    const optgroup = screen.getByRole("group");
    expect(optgroup.tagName).toBe("OPTGROUP");
    expect(optgroup).toHaveAttribute("label", "Test Group");
  });

  it("should pass through the open prop", () => {
    render(
      <ListboxRenderContext.Provider value="custom">
        <OfficeSwitcherSelectOptgroup label="Test Group" open>
          <div>Child content</div>
        </OfficeSwitcherSelectOptgroup>
      </ListboxRenderContext.Provider>,
    );
    const details = screen.getByRole("group");
    expect(details).toHaveAttribute("open");
  });
});
