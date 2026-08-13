import type { FC, HTMLAttributes } from "react";

import { AvatarBase } from "./avatar-base";

export namespace Avatar {
  export interface Props extends AvatarBase.CommonProps, HTMLAttributes<HTMLSpanElement> {}
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
