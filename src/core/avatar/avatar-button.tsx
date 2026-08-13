import type { ButtonHTMLAttributes } from "react";

import { AvatarBase } from "./avatar-base";

export namespace AvatarButton {
  export interface Props extends AvatarBase.CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /** The accessible name of the avatar button. */
    "aria-label": string;
    /**
     * Whether the avatar button is disabled or not. Unlike `aria-disabled`, avatars disabled with this prop will
     * not be focusable or interactive.
     */
    disabled?: boolean;
  }
}

/**
 * An avatar that renders as a `button` element, for use when clicking the avatar triggers an action such as
 * opening a menu.
 */
export function AvatarButton(props: AvatarButton.Props) {
  return <AvatarBase as="button" {...props} />;
}
