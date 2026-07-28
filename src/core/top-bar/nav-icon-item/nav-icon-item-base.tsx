import { cx } from "@linaria/core";
import {
  HTMLAttributes,
  useId,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

import { Tooltip } from "#src/core/tooltip";

import { ElTopBarNavIconItemBadge, ElTopBarNavIconItemIcon, elTopBarNavIconItem } from "./styles";

export namespace TopBarNavIconItemBase {
  interface CommonProps {
    hasBadge?: boolean;
    icon: ReactNode;
  }

  export interface AsAnchorProps
    extends CommonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
    "aria-label": string;
    as: "a";
  }

  export interface AsButtonProps
    extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    "aria-label": string;
    as: "button";
  }

  export type Props = AsAnchorProps | AsButtonProps;
}

/** @deprecated Use TopBarNavIconItemBase.AsAnchorProps instead */
export type TopBarNavIconItemAsAnchorProps = TopBarNavIconItemBase.AsAnchorProps;

/** @deprecated Use TopBarNavIconItemBase.AsButtonProps instead */
export type TopBarNavIconItemAsButtonProps = TopBarNavIconItemBase.AsButtonProps;

/** @deprecated Use TopBarNavIconItemBase.Props instead */
export type TopBarNavIconItemBaseProps = TopBarNavIconItemBase.Props;

/**
 * A simple polymorphic icon-only nav item that can render as a button or link. It is used internally by the
 * `TopBar.NavIconItemAnchor` and `TopBar.NavIconItemButton` components and should not be used directly by consumers.
 */
export function TopBarNavIconItemBase({
  "aria-label": ariaLabel,
  as: Element,
  className,
  icon,
  id,
  hasBadge,
  ...rest
}: TopBarNavIconItemBase.Props) {
  const triggerId = id ?? useId();
  const tooltipId = useId();

  // NOTE: Yes, it's a bit weird to be using `aria-label` for a visual label (via the tooltip).
  // There's also some awkwardness here with `aria-labelledby`. If the consumer provides it,
  // it'll be nuked by the `aria-labelledby` value we get from `Tooltip.getTooltipTriggerProps`. 🤷‍♂️
  const a11yProps = Tooltip.getTriggerProps({ id: triggerId, tooltipId, tooltipPurpose: "label" });

  return (
    <Element
      // NOTE: We use a type assertion here to avoid having to narrow the type of `rest`
      // to the specific `Element` type.
      {...(rest as HTMLAttributes<HTMLElement>)}
      {...a11yProps}
      className={cx(elTopBarNavIconItem, className)}
    >
      <ElTopBarNavIconItemIcon aria-hidden="true">{icon}</ElTopBarNavIconItemIcon>
      {/* Keep the badge in the DOM but hide it. Having it mount/unmount can cause race condition
        with the tooltip's anchor positioning in some consumers that leads to DOMException errors.
        See https://consolegroup.atlassian.net/wiki/spaces/~5bf25118bef4d137b63bce08/pages/3813376086/Incident+explainer+Subset+of+users+unable+to+login. */}
      <ElTopBarNavIconItemBadge hidden={!hasBadge} />
      <Tooltip id={tooltipId} placement="bottom" triggerId={triggerId}>
        {ariaLabel}
      </Tooltip>
    </Element>
  );
}
