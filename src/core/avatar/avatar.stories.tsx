import preview from "#.storybook/preview";
import { ContactIcon } from "#src/icons/contact";
import { Flex } from "#src/utils/flex";

import { Avatar } from ".";
import { AvatarAnchor } from "./avatar-anchor";
import { AvatarButton } from "./avatar-button";

const meta = preview.meta({
  title: "Content display/Avatar",
  component: Avatar,
  subcomponents: { AvatarButton, AvatarAnchor },
  args: {
    "aria-label": "Alex Doe",
    children: "AD",
  },
});

/**
 * The simplest avatar is one that displays some letters, typically the initials of the user or
 * other entity represented by the avatar.
 *
 * Providing `aria-label` is strongly encouraged: it renders as a tooltip (shown on hover or focus) and makes the
 * avatar focusable, so keyboard users can reveal it too. Typically, the label should be the full name of the
 * entity represented by the avatar.
 */
export const Example = meta.story({
  args: {
    "aria-label": "Alex Beckett",
    children: "AB",
    colour: "default",
    shape: "circle",
    size: "md",
  },
});

/**
 * The avatar can also be used to display an icon, which is useful when representing an entity whose
 * details accompany the avatar.
 */
export const Icons = Example.extend({
  args: {
    children: <ContactIcon />,
  },
});

/**
 * The avatar can display an image instead of initials or an icon by providing `src` and `alt`. If the image fails to
 * load, the avatar falls back to its `children`.
 */
export const Images = Example.extend({
  args: {
    alt: "A person smiling",
    src: "https://picsum.photos/id/64/200/200",
  },
});

/**
 * If the image fails to load, the avatar falls back to rendering its `children`.
 */
export const BrokenImages = Example.extend({
  name: "Broken images",
  args: {
    alt: "A person smiling",
    src: "https://broken.example/not-a-real-image.jpg",
  },
});

/**
 * There are two colours supported by the avatar: `default` and `primary`, which is shown here.
 */
export const Colour = Example.extend({
  args: {
    colour: "primary",
  },
});

/**
 * When using an icon in a coloured avatar, the icon should inherit the colour of the avatar.
 */
export const ColouredIcons = Example.extend({
  args: {
    children: <ContactIcon />,
    colour: "primary",
  },
});

/**
 * There are two shapes supported by the avatar: `circle` (the default) and `square`. The square shape is
 * conventionally used to represent a business or other non-human entity, and should display a single initial
 * rather than two.
 */
export const Shape = Example.extend({
  args: {
    "aria-label": "Acme Corp",
    children: "A",
    shape: "square",
  },
});

/**
 * The avatar supports six sizes: `xs`, `sm`, `md` (the default), `lg`, `xl`, and `2xl`.
 *
 * The previous `small` and `medium` sizes are deprecated aliases for `sm` and `md` respectively, kept for backwards
 * compatibility. Use `sm`/`md` instead.
 */
export const Sizes = Example.extend({
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <Flex alignItems="center" columnGap="--spacing-6">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => (
    <>
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
      <Avatar {...args} size="2xl" />
    </>
  ),
});

/**
 * The `borderColour` prop adds a ring border around the avatar, accepting any `--colour-border-*` design token,
 * such as `--colour-border-white` or `--colour-border-action-default`. This is useful when avatars are stacked or
 * displayed over coloured or patterned backgrounds, so the avatar remains visually distinct.
 */
export const Border = Example.extend({
  argTypes: {
    borderColour: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <Flex columnGap="--spacing-6">
        <Story />
      </Flex>
    ),
  ],
  globals: {
    backgrounds: {
      value: "light",
    },
  },
  render: (args) => (
    <>
      <Avatar {...args} borderColour="--colour-border-white" />
      <Avatar {...args} borderColour="--colour-border-action-default" />
      <Avatar {...args} borderColour="--colour-border-success-default" />
      <Avatar {...args} borderColour="--colour-border-warning-default" />
      <Avatar {...args} borderColour="--colour-border-error-default" />
    </>
  ),
});

/**
 * Use `AvatarButton` instead of `Avatar` when clicking the avatar should trigger an action, such as opening a menu.
 * `AvatarButton` requires an `aria-label` since it typically has no visible text label of its own describing its
 * purpose. This label is also rendered as a tooltip, shown on hover or focus.
 */
export const Buttons = meta.story({
  args: {
    "aria-label": "Open profile menu",
    children: "AB",
    colour: "primary",
    shape: "circle",
    size: "md",
  },
  render: (args) => <AvatarButton {...(args as unknown as AvatarButton.Props)} />,
});

/**
 * A disabled `AvatarButton` fades towards white to indicate that it cannot be interacted with.
 */
export const DisabledButton = meta.story({
  args: {
    "aria-label": "Open profile menu",
    children: "AB",
    colour: "primary",
    disabled: true,
    shape: "circle",
    size: "md",
  },
  render: (args) => <AvatarButton {...(args as unknown as AvatarButton.Props)} />,
});

/**
 * Use `AvatarAnchor` instead of `Avatar` when clicking the avatar should navigate to another page, such as a user's
 * profile page. `AvatarAnchor` requires `href` and an `aria-label`. This label is also rendered as a tooltip,
 * shown on hover or focus.
 */
export const Anchors = meta.story({
  args: {
    "aria-label": "View profile",
    children: "AB",
    colour: "primary",
    href: "#",
    shape: "circle",
    size: "md",
  },
  render: (args) => <AvatarAnchor {...(args as unknown as AvatarAnchor.Props)} />,
});

/**
 * A disabled `AvatarAnchor` fades towards white to indicate that it cannot be interacted with. Since anchor elements
 * have no native `disabled` attribute, use `aria-disabled` instead.
 */
export const DisabledAnchor = meta.story({
  args: {
    "aria-disabled": true,
    "aria-label": "View profile",
    children: "AB",
    colour: "primary",
    href: "#",
    shape: "circle",
    size: "md",
  },
  render: (args) => <AvatarAnchor {...(args as unknown as AvatarAnchor.Props)} />,
});
