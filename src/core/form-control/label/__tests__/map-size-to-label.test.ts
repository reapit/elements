import { mapSizeToLabelTextSize } from "../map-size-to-label-text-size";

test("returns xs for small and medium sizes", () => {
  expect(mapSizeToLabelTextSize("small")).toBe("xs");
  expect(mapSizeToLabelTextSize("medium")).toBe("xs");
});

test("returns sm for large size", () => {
  expect(mapSizeToLabelTextSize("large")).toBe("sm");
});

test("returns nothing for undefined size", () => {
  expect(mapSizeToLabelTextSize(undefined)).toBeUndefined();
});
