import { useId } from "react";
import type { ReactNode } from "react";

import preview from "#.storybook/preview";

import { AnchorPositioning } from "./anchor-positioning";
import { placements } from "./map-placement-to-css";

const meta = preview.meta({
  title: "Utils/AnchorPositioning",
  component: AnchorPositioning,
  argTypes: {
    alignSelf: { control: "text" },
    bottom: { control: "text" },
    justifySelf: { control: "text" },
    placement: {
      control: {
        type: "select",
      },
      options: [undefined, ...placements],
    },
    left: { control: "text" },
    right: { control: "text" },
    top: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => {
    // NOTE: because we have multiple stories on the one docs page, we append a "suffix" to
    // the IDs so they are unique per story. Then ensures our positioning of the popover will
    // be anchored to the correct element.
    const suffix = useId();
    const props = {
      ...args,
      anchorElementId: `${args.anchorElementId}-${suffix}`,
      positionedElementId: `${args.positionedElementId}-${suffix}`,
    };
    return (
      <>
        <Anchor id={props.anchorElementId} />
        <PositionedElement id={props.positionedElementId} />
        <AnchorPositioning {...props} />
      </>
    );
  },
});

export const Example = meta.story({
  args: {
    anchorElementId: "anchor",
    bottom: "",
    left: "",
    positionedElementId: "target",
    placement: "right",
    position: "absolute",
    right: "",
    top: "",
  },
});

/**
 * A number of common positions for popovers relative to their anchor are available as simple string-based
 * placements. These are shown below.
 */
export const Placement = Example.extend({
  parameters: {
    controls: {
      disable: true,
    },
  },

  render: () => {
    return (
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}
      >
        <Anchor id="anchor" width="400px" height="200px" />
        {placements.map((placement) => (
          <div
            key={placement}
            id={placement}
            style={{ background: "var(--colour-fill-action-light)", padding: "var(--spacing-2)" }}
          >
            <AnchorPositioning
              anchorElementId="anchor"
              placement={placement}
              positionedElementId={placement}
              positionTryFallbacks="none"
            />
            {placement}
          </div>
        ))}
      </div>
    );
  },
});

/**
 * A gap can be specified to add space between the anchor element and the positioned elements.
 * Only applies when positioning with `placement`.
 */
export const Gap = Example.extend({
  args: {
    gap: "var(--spacing-2)",
    placement: "right",
  },
});

/**
 * When the predefined placements are insufficient, inset properties, `top`, `right`, `bottom`, and
 * `left`, and self-alignment properties, `alignSelf` and `justifySelf`, can be used.
 *
 * See [Using inset properties with anchor() function values](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using#using_inset_properties_with_anchor_function_values)
 * for details on how to position the popover element using this approach.
 */
export const InsetProperties = Example.extend({
  name: "Inset properties",
  args: {
    placement: undefined,
    justifySelf: "anchor-center",
    minWidth: "calc(anchor-size(width) + var(--spacing-4))",
    bottom: "anchor(inside)",
  },
});

function Anchor({
  id,
  width = "200px",
  height = "100px",
}: {
  id: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      id={id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--colour-fill-neutral-light)",
        borderRadius: "var(--border-radius-xl)",
        width,
        height,
      }}
    >
      Anchor
    </div>
  );
}

function PositionedElement({ children = "Target", id }: { children?: ReactNode; id: string }) {
  return (
    <div
      id={id}
      style={{
        background: "var(--colour-fill-action-light)",
        borderRadius: "var(--border-radius-m)",
        padding: "var(--spacing-2)",
      }}
    >
      {children}
    </div>
  );
}
