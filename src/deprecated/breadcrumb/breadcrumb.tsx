import React, { Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState } from "react";

import { ChevronRightIcon } from "#src/icons/chevron-right";

import { handleKeyboardEvent } from "../../storybook/handle-keyboard-event";
import { elMr2 } from "../../styles/deprecated-spacing";
import { FlexContainer } from "../layout";
import { ElDeprecatedBreadCrumbItem, ElDeprecatedBreadCrumbContainer } from "./__styles__";

/** @deprecated */
export interface DeprecatedBreadCrumbItem extends HTMLAttributes<HTMLAnchorElement> {
  text: string;
  onClick: () => void;
}

/** @deprecated will be replaced by new v5 BreadcrumbProps */
export interface DeprecatedBreadCrumbProps extends HTMLAttributes<HTMLElement> {
  items: DeprecatedBreadCrumbItem[];
  defaultActiveIndex?: number;
}

/** @deprecated */
export const handleNext =
  (setActive: Dispatch<SetStateAction<number>>, onClick: () => void, index: number) =>
  (e?: MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    setActive(index);
    onClick();
  };

/** @deprecated will be replaced by new v5 Breadcrumb */
export const DeprecatedBreadCrumb: FC<DeprecatedBreadCrumbProps> = ({
  items,
  defaultActiveIndex = 0,
  ...rest
}) => {
  const [active, setActive] = useState<number>(defaultActiveIndex);

  return (
    <ElDeprecatedBreadCrumbContainer {...rest}>
      {items.map(({ onClick, text }, index) => {
        if (index > active) return null;

        return (
          <FlexContainer isFlexAlignCenter key={index}>
            {Boolean(index) && <ChevronRightIcon className={elMr2} size="xs" color="secondary" />}
            <ElDeprecatedBreadCrumbItem
              aria-current={active === index ? "page" : "false"}
              role="button"
              aria-label={`Breadcrumb item hit return to navigate to ${text}`}
              tabIndex={0}
              onClick={handleNext(setActive, onClick, index)}
              onKeyDown={handleKeyboardEvent("Enter", handleNext(setActive, onClick, index))}
            >
              {text}
            </ElDeprecatedBreadCrumbItem>
          </FlexContainer>
        );
      })}
    </ElDeprecatedBreadCrumbContainer>
  );
};
