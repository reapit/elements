import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useCallback } from "react";

import { ElPrimaryTab, ElPrimaryTabIcon, ElPrimaryTabLabel } from "./styles";

export namespace PrimaryTab {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Whether the tab item represents the current page/section.
     */
    "aria-current": "page" | false;
    /**
     * Whether the tab is disabled. This can be used to make the tab appear disabled to users, but still
     * be focusable. ARIA disabled tabs will ignore click events.
     */
    "aria-disabled"?: boolean;
    /**
     * A badge rendered at the end of the tab, after the label. Typically a `Badge` component.
     */
    badge?: ReactNode;
    /**
     * The URL to navigate to when this tab is activated.
     */
    href: string;
    /**
     * An icon rendered at the start of the tab, before the label.
     */
    icon?: ReactNode;
  }
}

/**
 * A primary navigation tab. It always renders as a link because changing tabs is best modelled as navigation between
 * pages in the product. Will typically be used via `PrimaryTabs.Item`.
 *
 * The selected state is determined by the `aria-current` prop, which should be set to 'page' when this
 * tab represents the current page.
 */
export function PrimaryTab({
  "aria-current": ariaCurrent,
  "aria-disabled": ariaDisabled,
  badge,
  children,
  icon,
  onClick,
  ...rest
}: PrimaryTab.Props) {
  // NOTE: Anchor elements CANNOT be disabled using the native `disabled` attribute, so we allow the `aria-disabled`
  // attribute to disable them instead. Since click events will still be fired when `aria-disabled="true"`, we need
  // to prevent any default action from occurring, stop it propagating to ancestors and avoid calling the
  // consumer-supplied `onClick` callback.
  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      if (event.currentTarget.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <ElPrimaryTab
      {...rest}
      aria-current={ariaCurrent}
      aria-disabled={!!ariaDisabled}
      onClick={handleClick}
    >
      {icon && <ElPrimaryTabIcon aria-hidden>{icon}</ElPrimaryTabIcon>}
      <ElPrimaryTabLabel>{children}</ElPrimaryTabLabel>
      {badge}
    </ElPrimaryTab>
  );
}
