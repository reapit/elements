import { useCallback } from "react";
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";

import { ElSecondaryTab, ElSecondaryTabLabel } from "./styles";

export namespace SecondaryTab {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Whether the tab item represents the current page/section.
     */
    "aria-current": "page" | false;
    /**
     * Whether the tab is disabled. This can be used to make the tab appear disabled to users, but still be
     * focusable; for example, to allow a tooltip to be displayed that explains why the tab is disabled.
     * Since tabs are always rendered as links, which cannot use the native `disabled` attribute, this is
     * the only way to disable a tab. Click events are suppressed while disabled.
     */
    "aria-disabled"?: boolean | "true" | "false";
    /**
     * An optional badge to display at the end of the tab, after its label.
     */
    badge?: ReactNode;
    /**
     * The URL to navigate to when this tab is activated.
     */
    href: string;
  }
}

/**
 * A secondary navigation tab. It always renders as a link because changing tabs is best modelled as navigation between
 * pages in the product. Will typically be used via `SecondaryTabs.Item`.
 *
 * The selected state is determined by the `aria-current` prop, which should be set to 'page' when this
 * tab represents the current page.
 */
export function SecondaryTab({
  "aria-current": ariaCurrent,
  "aria-disabled": ariaDisabled,
  badge,
  children,
  onClick,
  ...rest
}: SecondaryTab.Props) {
  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      // NOTE: Anchor elements CANNOT be disabled using the native `disabled` attribute, so we allow the
      // `aria-disabled` attribute to disable them instead. Since click events will still be fired when
      // `aria-disabled='true'`, we need to prevent any default action for the tab from occurring, stop it
      // propagating to ancestors and avoid calling the consumer-supplied `onClick` callback.
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
    <ElSecondaryTab
      {...rest}
      aria-current={ariaCurrent}
      aria-disabled={ariaDisabled}
      onClick={handleClick}
    >
      <ElSecondaryTabLabel>{children}</ElSecondaryTabLabel>
      {badge}
    </ElSecondaryTab>
  );
}
