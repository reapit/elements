import type { AnchorHTMLAttributes, ReactNode } from "react";

import { TopBarAvatarBase } from "./avatar-base";

export namespace TopBarAvatarAnchor {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The accessible name of the avatar. Defaults to "View profile" */
    "aria-label"?: string;
    /** The avatar's text. Typically the initials of the current user. */
    children: ReactNode;
    /** The URL to navigate to when the avatar is clicked. */
    href: string;
  }
}

/** @deprecated Use TopBarAvatarAnchor.Props instead */
export type TopBarAvatarAnchorProps = TopBarAvatarAnchor.Props;

/**
 * A simple avatar link that can be used to navigate to a user profile page or similar destination.
 * For avatar buttons that open menus, use `TopBar.AvatarButton` or `TopBar.AvatarMenu` instead.
 */
export function TopBarAvatarAnchor({
  "aria-label": ariaLabel = "View profile",
  ...rest
}: TopBarAvatarAnchor.Props) {
  return <TopBarAvatarBase {...rest} aria-label={ariaLabel} as="a" />;
}
