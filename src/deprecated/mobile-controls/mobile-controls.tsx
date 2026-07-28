import { cx } from "@linaria/core";
import React, {
  Dispatch,
  FC,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useState,
  useId,
} from "react";

import { Button } from "#src/core/button";
import { MenuIcon } from "#src/icons/menu";

import { elIsActive } from "../../styles/deprecated-states";
import {
  ElMobileControlItem,
  ElMobileControls,
  ElMobileControlsBg,
  elMobileControlsVisible,
  elMobileControlsFloatingButton,
} from "./__styles__";

/** @deprecated */
export interface MobileControlItem extends HTMLAttributes<HTMLAnchorElement> {
  onClick?: () => void;
  label?: string;
}

/** @deprecated */
export interface MobileControlsProps extends HTMLAttributes<HTMLDivElement> {
  buttonIcon?: ReactNode;
  buttonOnClick?: () => void;
  mobileControlItems?: MobileControlItem[];
  isVisible?: boolean;
}

/** @deprecated */
export const clickEventHandler =
  (setActive: Dispatch<SetStateAction<boolean>>, onClick?: () => void) =>
  (event: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    event?.preventDefault();
    event?.stopPropagation();

    setActive((active) => !active);

    if (onClick) {
      onClick();
    }
  };

/** @deprecated */
export const MobileControls: FC<MobileControlsProps> = ({
  mobileControlItems,
  buttonOnClick,
  buttonIcon,
  isVisible,
  ...rest
}) => {
  const [active, setActive] = useState<boolean>(false);
  const id = rest.id || useId();

  return (
    <>
      <ElMobileControlsBg
        className={cx(active && elIsActive)}
        aria-hidden={!active}
        onClick={clickEventHandler(setActive, buttonOnClick)}
      />
      <ElMobileControls
        id={id}
        className={cx(isVisible && elMobileControlsVisible)}
        onClick={clickEventHandler(setActive, buttonOnClick)}
        {...rest}
      >
        {mobileControlItems?.map(({ onClick, label, ...item }, index) => (
          <ElMobileControlItem
            role="button"
            aria-hidden={!active}
            className={cx(active && elIsActive)}
            onClick={clickEventHandler(setActive, onClick)}
            {...item}
            key={index}
          >
            {label}
          </ElMobileControlItem>
        ))}
        <Button
          aria-controls={id}
          variant="primary"
          iconLeft={buttonIcon ?? <MenuIcon />}
          className={elMobileControlsFloatingButton}
        />
      </ElMobileControls>
    </>
  );
};
