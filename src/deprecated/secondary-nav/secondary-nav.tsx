import { cx } from "@linaria/core";
import React, { FC, HTMLAttributes } from "react";

import { handleKeyboardEvent } from "../../storybook/handle-keyboard-event";
import { elIsActive } from "../../styles/deprecated-states";
import { ElSecondaryNav, ElSecondaryNavItem } from "./__styles__";

/** @deprecated */
export interface SecondaryNavProps extends HTMLAttributes<HTMLDivElement> {}

/** @deprecated */
export const SecondaryNav: FC<SecondaryNavProps> = ({ children, ...rest }) => {
  return <ElSecondaryNav {...rest}>{children}</ElSecondaryNav>;
};

/** @deprecated */
export interface SecondaryNavItemProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  className?: string;
}

/** @deprecated */
export const SecondaryNavItem: FC<SecondaryNavItemProps> = ({
  active,
  className,
  onClick,
  children,
  ...rest
}) => {
  const combinedClassName = cx(className, active && elIsActive);

  return (
    <ElSecondaryNavItem
      className={combinedClassName}
      tabIndex={0}
      role="button"
      onKeyDown={onClick ? handleKeyboardEvent("Enter", onClick as () => void) : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ElSecondaryNavItem>
  );
};
