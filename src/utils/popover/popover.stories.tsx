import { useId, useLayoutEffect, useState } from "react";

import preview from "#.storybook/preview";
import { placements } from "#src/utils/anchor-positioning";
import type { Placement } from "#src/utils/anchor-positioning";

import { MyPopoverContent } from "./__story__/styles";
import { getPopoverTriggerProps } from "./get-popover-trigger-props";
import { Popover } from "./popover";

const meta = preview.meta({
  title: "Utils/Popover",
  component: Popover,
  argTypes: {
    children: {
      control: false,
    },
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
      anchorId: `${args.anchorId}-${suffix}`,
      id: `${args.id}-${suffix}`,
    };
    return (
      <>
        <button
          {...getPopoverTriggerProps({
            id: props.anchorId,
            popoverTarget: props.id,
            popoverTargetAction: "toggle",
          })}
        >
          Anchor
        </button>
        <Popover {...props} />
      </>
    );
  },
});

/**
 * Popovers come with no styling: no background, no padding, no border. They are intended to be a blank
 * canvas on which to build a more visually attractive UI element, such as a tooltip or a menu.
 *
 * In the examples here, we're using a simple styled element as the content of the popover in order to
 * help communicate the behaviour and capabilities of the popover.
 */
export const Example = meta.story({
  args: {
    anchorId: "anchor",
    children: <MyPopoverContent>Popover content</MyPopoverContent>,
    elevation: "none",
    gap: "var(--spacing-1)",
    id: "popover",
    placement: "top-start",
    positionTryFallbacks: "flip-block, flip-inline",
  },
});

/**
 * The distance, or gap, between the popover and its anchor can be customised. By default, there will be
 * no gap, but many use cases will call for a non-zero gap. While the `gap` prop accepts any valid CSS
 * length, it should typically be a `--spacing-*` CSS variable.
 */
export const Gap = Example.extend({
  args: {
    gap: "var(--spacing-6)",
  },
});

/**
 * A number of common positions for popovers relative to their anchor are available as simple string-based
 * placements. These are shown below.
 */
export const Placements = Example.extend({
  parameters: {
    controls: {
      disable: true,
    },
    layout: "padded",
  },

  render: () => {
    const [currentPlacement, setCurrentPlacement] = useState<Placement>("top");

    useLayoutEffect(() => {
      // We want the popover immediately visible.
      document.getElementById("popover")?.showPopover();
    }, []);

    return (
      <div
        style={{
          display: "grid",
          grid: '"demo options" auto / 1fr max-content',
          placeItems: "center",
        }}
      >
        <div
          id="anchor"
          style={{
            gridArea: "demo",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--colour-fill-neutral-light",
            borderRadius: "var(--border-radius-xl)",
            width: "200px",
            height: "100px",
          }}
        >
          Anchor
        </div>
        <Popover
          id="popover"
          anchorId="anchor"
          gap="var(--spacing-2)"
          placement={currentPlacement}
          // Manual popovers won't dismiss other popovers
          popover="manual"
          positionTryFallbacks="none"
        >
          <MyPopoverContent>Popover</MyPopoverContent>
        </Popover>
        <div
          style={{
            display: "grid",
            grid: "auto-flow / repeat(3, auto)",
            gridArea: "options",
            gap: "var(--spacing-2)",
          }}
        >
          {placements.map((placement) => (
            <label key={placement}>
              <input
                type="radio"
                name="placement"
                checked={placement === currentPlacement}
                value={placement}
                onChange={() => setCurrentPlacement(placement)}
              />
              {placement}
            </label>
          ))}
        </div>
      </div>
    );
  },
});

/**
 * When the predefined placements are insufficient, the `placement` prop can also accept an object with
 * inset properties, `top`, `right`, `bottom`, and `left`, and self-alignment properties, `alignSelf` and
 * `justifySelf`, defined.
 *
 * See [Using inset properties with anchor() function values](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using#using_inset_properties_with_anchor_function_values)
 * for details on how to position the popover element using this approach.
 */
export const CustomPositioning = meta.story({
  args: {
    anchorId: "anchor",
    children: <MyPopoverContent style={{ textAlign: "center" }}>🚀</MyPopoverContent>,
    elevation: "none",
    id: "popover",
    justifySelf: "anchor-center",
    minWidth: "calc(anchor-size(width) + var(--spacing-4))",
    positionTryFallbacks: "flip-block, flip-inline",
    top: "anchor(top)",
  },
});

/**
 * The border radius of the popover element can be adjusted with the `borderRadius` prop. While
 * this prop accepts any valid CSS length, it should typically be a border-radius-related CSS
 * variable such as `--border-radius-xl` or `--comp-menu-border-radius`.
 */
export const BorderRadius = Example.extend({
  args: {
    borderRadius: "var(--border-radius-xl)",
  },
});

/**
 * By default, popovers will grow to the width of their content. To constrain this behaviour, a maximum
 * width can be specified. Content should generally adapt to the constrained width by wrapping rather
 * than overflowing.
 *
 * While the maximum width can be defined using any valid CSS length, the value should typically be a
 * `--size-*` CSS variable, though the special `anchor-size()` value is also supported, allowing the popover
 * to ensure it doesn't become wider than its anchor.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    children: (
      <MyPopoverContent>
        This popover has a lot of words, which increases the element&apos;s width to the point that
        it overflows the popover&apos;s maximum width constraint. In this case, the text flows to
        additional lines, increasing the intrinic height of the popover.
      </MyPopoverContent>
    ),

    maxWidth: "var(--size-36)",
  },
});

/**
 * A minimum width can also be specified. While the minimum width can be defined using any valid CSS
 * length, the value should typically be a `--size-*` CSS variable, though the special `anchor-size()`
 * value is also supported, allowing the popover to ensure it doesn't become narrower than its anchor.
 */
export const MinWidth = Example.extend({
  name: "Min-width",
  args: {
    children: <MyPopoverContent>👋</MyPopoverContent>,
    minWidth: "anchor-size()",
  },
});

/**
 * Similarly, popovers will grow, by default, to the height of their content. To constrain this behaviour,
 * a maximum height can also be specified, at which point the popover will scroll the content.
 *
 * As with the maximum width, the maximum height can be defined using any valid CSS length, but the value
 * should typically be a `--size-*` CSS variable.
 */
export const MaxHeight = MaxWidth.extend({
  name: "Max-height",
  args: {
    maxHeight: "var(--size-36)",
  },
});

/**
 * Since popovers are an elevated, non-modal material, it's common for them to cast a shadow on the
 * UI beneath them. This can be achieved using the `elevation` prop. There's currently two supported
 * elevations: `none` and `xl`.
 */
export const Elevation = Example.extend({
  args: {
    elevation: "xl",
  },
});
