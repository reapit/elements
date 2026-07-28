import { mapInsetPositionToCSS } from "../map-inset-position-to-css";

test("produces correct CSS for a custom placement", () => {
  expect(
    mapInsetPositionToCSS({
      alignSelf: "anchor-center",
      bottom: "anchor(bottom)",
      justifySelf: "anchor-center",
      left: "anchor(left)",
      right: "anchor(right)",
      top: "anchor(top)",
    }),
  ).toMatchSnapshot();
});

test("produces correct CSS for a custom placement that has some properties", () => {
  expect(
    mapInsetPositionToCSS({
      justifySelf: "anchor-center",
      top: "anchor(top)",
    }),
  ).toMatchSnapshot();
});

test("produces correct CSS for a custom placement that has no properties", () => {
  expect(mapInsetPositionToCSS({})).toMatchSnapshot();
});
