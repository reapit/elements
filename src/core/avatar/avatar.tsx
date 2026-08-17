import type { FC, HTMLAttributes } from "react";

import { AvatarBase } from "./avatar-base";

export namespace Avatar {
  export interface Props extends AvatarBase.CommonProps, HTMLAttributes<HTMLSpanElement> {
    /**
     * The accessible name of the avatar. When provided, a tooltip displaying this text is rendered, and the
     * avatar renders as a focusable `button` so keyboard users can reveal the tooltip. Although optional,
     * providing this prop is strongly encouraged. Typically, the label should contain the full name of the
     * entity represented by the avatar.
     */
    "aria-label"?: string;
  }
}

/** @deprecated Use Avatar.Props instead */
export type AvatarProps = Avatar.Props;

/**
 * A simple avatar component that can be used to represent a user or other entity. Use `AvatarButton` or `AvatarAnchor`
 * instead when the avatar should be interactive.
 */
export const Avatar: FC<Avatar.Props> = (props) => {
  return <AvatarBase as="span" {...props} />;
};
