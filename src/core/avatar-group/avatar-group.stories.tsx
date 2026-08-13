import { useState } from "react";

import preview from "#.storybook/preview";
import { CSSContainerQuery } from "#src/utils/css-container-query";
import { Text } from "#src/utils/text";

import { AvatarGroup } from "./avatar-group";

const meta = preview.meta({
  title: "Content display/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
});

/**
 * An avatar group overlaps its avatars, all pinned to the same size. It does not limit how many avatars are
 * shown; use `AvatarGroup.OverflowItem` to represent any avatars a consumer chooses not to display.
 */
export const Example = meta.story({
  args: {
    children: [
      <AvatarGroup.Item key="1">AB</AvatarGroup.Item>,
      <AvatarGroup.Item key="2">CD</AvatarGroup.Item>,
      <AvatarGroup.Item key="3">EF</AvatarGroup.Item>,
      <AvatarGroup.Item key="4">GH</AvatarGroup.Item>,
      <AvatarGroup.OverflowItem key="overflow" count={3} />,
    ],
    size: "md",
  },
});

/**
 * `size` pins every avatar in the group to the same size; individual items cannot override it.
 */
export const Sizes = Example.extend({
  argTypes: {
    size: {
      control: false,
    },
  },
  render: (args) => (
    <>
      <AvatarGroup {...args} size="xs" />
      <br />
      <AvatarGroup {...args} size="sm" />
      <br />
      <AvatarGroup {...args} size="md" />
      <br />
      <AvatarGroup {...args} size="lg" />
      <br />
      <AvatarGroup {...args} size="xl" />
      <br />
      <AvatarGroup {...args} size="2xl" />
    </>
  ),
});

/**
 * `AvatarGroup.OverflowItem` represents any avatars a consumer chooses not to display, as a "+N" avatar. It
 * renders nothing when `count` is `0` or less, so it is safe to always render alongside a conditional count.
 */
export const OverflowItem = Example.extend({
  args: {
    children: [
      <AvatarGroup.Item key="1">AB</AvatarGroup.Item>,
      <AvatarGroup.Item key="2">CD</AvatarGroup.Item>,
      <AvatarGroup.OverflowItem key="overflow" count={0} />,
    ],
  },
});

/**
 * `AvatarGroup` does not manage responsive behaviour itself; use `CSSContainerQuery` to switch which
 * avatars a consumer renders as the surrounding container shrinks. Here, all six avatars render above
 * 300px; between 201px and 300px, four render alongside an overflow item representing the rest; at or
 * below 200px, only two render alongside an overflow item representing the rest. Drag the slider to
 * resize the container.
 */
export const ResponsiveOverflow = meta.story({
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => {
      const [width, setWidth] = useState(340);
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              marginBlockEnd: "var(--spacing-2)",
            }}
          >
            <input
              aria-label="Container width"
              id="width"
              min={140}
              max={380}
              onChange={(event) => setWidth(Number(event.currentTarget.value))}
              step={10}
              type="range"
              value={width}
            />
            <output htmlFor="width">
              <Text colour="secondary" font="text-sm/regular">
                {width}px
              </Text>
            </output>
          </div>
          <div
            style={{
              containerType: "inline-size",
              boxSizing: "content-box",
              border: "1px solid #FA00FF",
              width: `${width}px`,
            }}
          >
            <Story />
          </div>
        </>
      );
    },
  ],
  render: () => (
    <>
      <CSSContainerQuery condition="(max-width: 300px)">
        <AvatarGroup>
          <AvatarGroup.Item key="1">AB</AvatarGroup.Item>
          <AvatarGroup.Item key="2">CD</AvatarGroup.Item>
          <AvatarGroup.Item key="3">EF</AvatarGroup.Item>
          <AvatarGroup.Item key="4">GH</AvatarGroup.Item>
          <AvatarGroup.Item key="5">IJ</AvatarGroup.Item>
          <AvatarGroup.Item key="6">KL</AvatarGroup.Item>
        </AvatarGroup>
      </CSSContainerQuery>
      <CSSContainerQuery condition="(max-width: 200px) or (min-width: 301px)">
        <AvatarGroup>
          <AvatarGroup.Item key="1">AB</AvatarGroup.Item>
          <AvatarGroup.Item key="2">CD</AvatarGroup.Item>
          <AvatarGroup.Item key="3">EF</AvatarGroup.Item>
          <AvatarGroup.Item key="4">GH</AvatarGroup.Item>
          <AvatarGroup.OverflowItem key="overflow" count={2} />
        </AvatarGroup>
      </CSSContainerQuery>
      <CSSContainerQuery condition="(min-width: 201px)">
        <AvatarGroup>
          <AvatarGroup.Item key="1">AB</AvatarGroup.Item>
          <AvatarGroup.Item key="2">CD</AvatarGroup.Item>
          <AvatarGroup.OverflowItem key="overflow" count={4} />
        </AvatarGroup>
      </CSSContainerQuery>
    </>
  ),
});

/**
 * `colour` and `shape` set defaults for every avatar in the group, but individual items can override them.
 */
export const ColourAndShape = Example.extend({
  args: {
    children: [
      <AvatarGroup.Item key="1">AB</AvatarGroup.Item>,
      <AvatarGroup.Item key="2">CD</AvatarGroup.Item>,
      <AvatarGroup.Item key="3" colour="default" shape="square">
        EF
      </AvatarGroup.Item>,
      <AvatarGroup.Item key="4">GH</AvatarGroup.Item>,
    ],
    colour: "primary",
    shape: "circle",
  },
});
