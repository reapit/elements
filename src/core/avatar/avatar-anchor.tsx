import type { AnchorHTMLAttributes } from "react";

import { AvatarBase } from "./avatar-base";

export namespace AvatarAnchor {
  export interface Props extends AvatarBase.CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The accessible name of the avatar anchor. */
    "aria-label": string;
    /** The URL to which this avatar navigates. */
    href: string;
  }
}

/**
 * An avatar that renders as an `a` element, for use when clicking the avatar navigates to a URL, such as a user
 * profile page.
 */
export function AvatarAnchor(props: AvatarAnchor.Props) {
  return <AvatarBase as="a" {...props} />;
}
