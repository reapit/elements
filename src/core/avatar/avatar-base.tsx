import { cx } from "@linaria/core";
import { useCallback } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

import { useImage } from "#src/utils/image/use-image";

import { elAvatar } from "./styles";

export namespace AvatarBase {
  /** @deprecated Use `"sm"` or `"md"` instead. */
  export type LegacyAvatarSize = "small" | "medium";

  export interface CommonProps {
    /** The alternative text for the avatar's image. Required when `src` is set. */
    alt?: string;
    /**
     * Whether the avatar is disabled. This can be used to make the avatar appear disabled to users, but still be
     * focusable. ARIA disabled avatars, whether they are button or anchor DOM elements, will ignore click events.
     */
    "aria-disabled"?: boolean | "true" | "false";
    /** The avatar's content, typically initials or an icon. Rendered when `src` is unset or fails to load. */
    children?: ReactNode;
    /** The colour of the avatar. */
    colour?: "default" | "primary";
    /**
     * The colour of the ring border rendered around the avatar, for use over coloured or patterned backgrounds.
     * Accepts any `--colour-border-*` design token, e.g. `"--colour-border-white"` or `"--colour-border-action-default"`.
     */
    borderColour?: `--colour-border-${string}`;
    /** The shape of the avatar. */
    shape?: "circle" | "square";
    /** The size of the avatar. */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | LegacyAvatarSize;
    /** The URL of the avatar's image. When set and loads successfully, the image is rendered instead of `children`. */
    src?: string;
  }

  export interface AsSpanProps extends CommonProps, HTMLAttributes<HTMLSpanElement> {
    as: "span";
  }

  export interface AsAnchorProps extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The accessible name of the avatar anchor. */
    "aria-label": string;
    as: "a";
    href: string;
  }

  export interface AsButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /** The accessible name of the avatar button. */
    "aria-label": string;
    as: "button";
  }

  export type Props = AsSpanProps | AsAnchorProps | AsButtonProps;
}

/**
 * A polymorphic avatar foundation that can render as a `span`, `a`, or `button`. This component is used internally
 * by the `Avatar`, `AvatarButton`, and `AvatarAnchor` components and should not be used directly by consumers.
 */
export function AvatarBase({
  "aria-disabled": ariaDisabled,
  alt,
  as: Element,
  borderColour,
  children,
  className,
  colour = "default",
  onClick,
  shape = "circle",
  size = "md",
  src,
  style,
  ...rest
}: AvatarBase.Props) {
  const { handleError, handleLoad, hasError } = useImage();

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const element = event.currentTarget;
      // NOTE: Anchor elements CANNOT be disabled using the native `disabled` attribute, so we allow the
      // `aria-disabled` attribute to disable them instead. Since click events will still be fired when
      // `aria-disabled='true'`, we need to prevent any default action from occuring, stop it propagating to
      // ancestors and avoid calling the consumer-supplied `onClick` callback.
      if (element.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // NOTE: We use a type assertion here to avoid having to narrow the type of `event` based on the specific
      // `Element` type.
      onClick?.(event as any);
    },
    [onClick],
  );

  return (
    <Element
      {...(rest as HTMLAttributes<HTMLElement>)}
      className={cx(elAvatar, className)}
      role={Element === "span" ? "presentation" : undefined}
      data-shape={shape}
      data-size={size}
      data-colour={colour}
      onClick={Element === "span" ? onClick : handleClick}
      {...(Element !== "span" && {
        "aria-disabled": !!rest["disabled"] || ariaDisabled === true || ariaDisabled === "true",
      })}
      // content-box sizing means the border adds to the avatar's box size rather than being drawn inside it,
      // matching the Figma "outer ring" look used when avatars overlap other content.
      style={{
        ...style,
        ...(borderColour && {
          boxSizing: "content-box",
          borderWidth: "var(--border-width-double)",
          borderStyle: "solid",
          borderColor: `var(${borderColour})`,
        }),
      }}
    >
      {src && !hasError ? (
        <img src={src} alt={alt} onError={handleError} onLoad={handleLoad} />
      ) : (
        children
      )}
    </Element>
  );
}
