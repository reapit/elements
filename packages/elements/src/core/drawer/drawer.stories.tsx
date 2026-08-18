import { useState } from "react";
import { useArgs } from "storybook/preview-api";

import preview from "#.storybook/preview";
import { Button } from "#src/core/button";
import { PrimaryTabs } from "#src/core/primary-tabs/index";

import { SupplementaryInfo } from "../supplementary-info";
import { Pattern } from "./__story__/Pattern";
import { Breakpoint, useDrawerBreakpointDecorator } from "./__story__/useDrawerBreakpointDecorator";
import { useDrawerContextDecorator } from "./__story__/useDrawerContextDecorator";
import { Drawer } from "./drawer";

const meta = preview.meta({
  title: "Containers and layout/Drawer",
  component: Drawer,
  argTypes: {
    children: {
      control: "radio",
      options: ["Simple", "Tabbed", "With Footer", "Empty"],
      mapping: {
        Simple: <ExampleSimpleLayout />,
        Tabbed: <ExampleSimpleLayout withTabs />,
        "With Footer": <ExampleFooterLayout />,
        Empty: null,
      },
    },
  },
});

/**
 * At its simplest, you can open and close a drawer by controlling it's `isOpen` state. However, a drawer's open
 * state should typically be help in the URL to ensure the user is returned to the same UI state when refreshing
 * the page.
 */
export const Example = meta.story({
  args: {
    children: "Simple",
    closedBy: "closerequest",
    isOpen: false,
  },
  render: function Example(args) {
    const [, setArgs] = useArgs();
    return (
      <>
        <button onClick={() => setArgs({ isOpen: true })}>Open Drawer</button>
        <Drawer onClose={() => setArgs({ isOpen: false })} {...args} />
      </>
    );
  },
});

/**
 * The `closedBy` prop specifies the types of user actions that can be used to close the drawer. It
 * distinguishes three methods:
 *
 * - A _light dismiss user action_, in which the drawer is closed when the user clicks or taps
 * outside it. This is equivalent to the "light dismiss" behavior of "auto" state popovers.
 * - A _platform-specific user action_, such as pressing the `Esc` key on desktop platforms, or a "back"
 * or "dismiss" gesture on mobile platforms.
 * - A developer-specified mechanism such as a `<button>` with a `click` handler that invokes
 * `HTMLDialogElement.close()` or a `<form>` submission.
 *
 * Possible values are:
 *
 * - `any`, the drawer can be dismissed using any of the three methods.
 * - `closerequest`, the drawer can be dismissed with a platform-specific user action or a
 * developer-specified mechanism.
 * - `none`, the drawer can only be dismissed with a developer-specified mechanism.
 *
 * **note:** Safari does not currently support `closedBy`. `Drawer` attempts to polyfill its behaviour,
 * but it's not perfect. Namely, "back" or "dismiss" gestures on mobile platforms are not supported.
 *
 * In this example, the drawer is using `closedBy="any"`, meaning any of the three methods can be used
 * to dismiss it.
 */
export const ClosedBy = Example.extend({
  args: {
    closedBy: "any",
  },
  render: function ClosedBy(args) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Drawer</button>
        <Drawer onClose={() => setIsOpen(false)} {...args} isOpen={isOpen} />
      </>
    );
  },
});

/**
 * In future, we expect to enable the opening and closing of drawers using the new
 * [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API).
 *
 * React 18 does not have types for these attributes (though they are still forwarded to the DOM element) and they
 * do not yet have full browser support. As such, this example is demonstrative of our forward compatibility, not
 * indicative of how drawer's should be opened/closed right now.
 */
export const InvokerCommands = meta.story({
  args: {
    children: "Simple",
    closedBy: "closerequest",
  },
  render: function Example(args) {
    return (
      <>
        {/* oxlint-disable-next-line react/no-unknown-property -- NOTE: React 18 does not have types for these
         * attributes (though they are still forwarded to the DOM element) and they do not yet have full browser
         * support. As such, this example is demonstrative of our forward compatibility, not indicative of how
         * drawer's should be opened/closed right now.
         *
         * @ts-expect-error */}
        <button command="show-modal" commandfor="my-drawer">
          Open Drawer
        </button>
        <Drawer id="my-drawer" {...args} />
      </>
    );
  },
});

/**
 * There's two main layout variations for drawer's and two sizes. The first layout has no footer and is typically
 * used to display content that is not part of a form. The second layout has a footer, which will typically house
 * form actions like submit and cancel.
 *
 * The drawer also sizes itself based on the viewport size. This is faked in the story below by sizing the container
 * of the example drawer content to match the width the drawer will within the specified breakpoint ranges.
 */
export const Breakpoints = meta.story({
  decorators: [useDrawerBreakpointDecorator(), useDrawerContextDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <ExampleSimpleLayout />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <ExampleSimpleLayout withTabs />
      </Breakpoint>

      <Breakpoint breakpoint="XS-SM">
        <ExampleFooterLayout />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <ExampleFooterLayout />
      </Breakpoint>
    </>
  ),
  globals: {
    backgrounds: {
      value: "light",
    },
  },
});

function ExampleSimpleLayout({ withTabs }: { withTabs?: boolean }) {
  const href = "#";

  return (
    <>
      <Drawer.Header
        action={<Drawer.HeaderCloseButton />}
        overline="Optional text"
        supplementaryInfo={
          <SupplementaryInfo>
            <SupplementaryInfo.Item colour="secondary">Optional info 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item colour="secondary">Optional info 2</SupplementaryInfo.Item>
          </SupplementaryInfo>
        }
        tabs={
          withTabs ? (
            <PrimaryTabs overflow="scroll">
              <PrimaryTabs.Item aria-current="page" href={href}>
                Tab item
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href={href}>
                Tab item
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href={href}>
                Tab item
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href={href}>
                Tab item
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href={href}>
                Tab item
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href={href}>
                Tab item
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href={href}>
                Tab item
              </PrimaryTabs.Item>
            </PrimaryTabs>
          ) : null
        }
      >
        Drawer title
      </Drawer.Header>
      <Drawer.Body>
        <Pattern height="120cqh" />
      </Drawer.Body>
    </>
  );
}

function ExampleFooterLayout() {
  return (
    <>
      <Drawer.Header
        overline="Optional text"
        supplementaryInfo={
          <SupplementaryInfo>
            <SupplementaryInfo.Item>Optional info 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Optional info 2</SupplementaryInfo.Item>
          </SupplementaryInfo>
        }
      >
        Drawer title
      </Drawer.Header>
      <Drawer.Body>
        <Pattern />
      </Drawer.Body>
      <Drawer.Footer>
        <form style={{ display: "contents" }}>
          <Button autoFocus formMethod="dialog" size="medium" variant="secondary">
            Cancel
          </Button>
        </form>
        <Button size="medium" variant="primary">
          Submit
        </Button>
      </Drawer.Footer>
    </>
  );
}
