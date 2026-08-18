import { getPopoverTriggerProps } from "../get-popover-trigger-props";

vi.mock("#src/utils/react-version");

import { getReactMajor } from "#src/utils/react-version";

test("returns lowercase attributes for React 18", () => {
  vi.mocked(getReactMajor).mockReturnValue(18);

  expect(
    getPopoverTriggerProps({
      id: "trigger",
      popoverTarget: "target",
      popoverTargetAction: "toggle",
    }),
  ).toEqual({
    id: "trigger",
    popovertarget: "target",
    popovertargetaction: "toggle",
  });
});

test("returns camelCase attributes for React 19", () => {
  vi.mocked(getReactMajor).mockReturnValue(19);

  expect(
    getPopoverTriggerProps({
      id: "trigger",
      popoverTarget: "target",
      popoverTargetAction: "toggle",
    }),
  ).toEqual({
    id: "trigger",
    popoverTarget: "target",
    popoverTargetAction: "toggle",
  });
});
