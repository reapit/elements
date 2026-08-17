import { cx } from "@linaria/core";
import { useCallback, useId } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

import { Tooltip } from "#src/core/tooltip";
import { BuildingIcon } from "#src/icons/building";
import { UserOutlineIcon } from "#src/icons/user-outline";
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
    /**
     * The accessible name of the avatar. When provided, a tooltip displaying this text is rendered, and the
     * avatar renders as a focusable `button` so keyboard users can reveal the tooltip. Although optional,
     * providing this prop is strongly encouraged. Typically, the label should contain the full name of the
     * entity represented by the avatar.
     */
    "aria-label"?: string;
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

/** Renders the icon shown when an avatar has no image and no `children`. */
function FallbackIcon({ shape }: { shape: NonNullable<AvatarBase.CommonProps["shape"]> }) {
  return shape === "square" ? <BuildingIcon /> : <UserOutlineIcon />;
}

/**
 * A polymorphic avatar foundation that can render as a `span`, `a`, or `button`. This component is used internally
 * by the `Avatar`, `AvatarButton`, and `AvatarAnchor` components and should not be used directly by consumers.
 */
export function AvatarBase({
  "aria-disabled": ariaDisabled,
  "aria-label": ariaLabel,
  alt,
  as: as_,
  borderColour,
  children,
  className,
  colour = "default",
  id,
  onClick,
  shape = "circle",
  size = "md",
  src,
  style,
  ...rest
}: AvatarBase.Props) {
  const { handleError, handleLoad, hasError } = useImage({ src });

  // NOTE: `AvatarButton` and `AvatarAnchor` are always interactive (they render as `a`/`button` regardless of
  // `aria-label`), whereas a plain `Avatar` (rendered as `span`) only becomes a focusable `button` to support the
  // tooltip below, and should not adopt the hover/disabled/pointer-cursor styles of a "real" interactive avatar.
  const isInteractiveElement = as_ !== "span";
  const Element = ariaLabel && as_ === "span" ? "button" : as_;

  const triggerId = id ?? useId();
  const tooltipId = useId();
  const a11yProps = ariaLabel
    ? Tooltip.getTriggerProps({ id: triggerId, tooltipId, tooltipPurpose: "label" })
    : { id };

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
      {...a11yProps}
      className={cx(elAvatar, className)}
      role={Element === "span" ? "presentation" : undefined}
      data-shape={shape}
      data-size={size}
      data-colour={colour}
      data-interactive={isInteractiveElement || undefined}
      onClick={isInteractiveElement ? handleClick : onClick}
      {...(isInteractiveElement && {
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
      ) : ariaLabel ? (
        // NOTE: when `aria-label` is set, the accessible name comes from the tooltip via `aria-labelledby`, so
        // the initials/icon `children` are purely visual and would otherwise be redundant (or, for icons,
        // potentially exposed as an unnamed nested graphic) to assistive technology.
        <span aria-hidden style={{ display: "contents" }}>
          {children ?? <FallbackIcon shape={shape} />}
        </span>
      ) : (
        (children ?? <FallbackIcon shape={shape} />)
      )}
      {ariaLabel && (
        <Tooltip id={tooltipId} triggerId={triggerId}>
          {ariaLabel}
        </Tooltip>
      )}
    </Element>
  );
}
