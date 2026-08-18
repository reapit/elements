import { cx } from "@linaria/core";
import { FC, HTMLAttributes, InputHTMLAttributes } from "react";

import { useId } from "../../storybook/random-id";
import {
  ElDeprecatedChipCheckbox as ElChipCheckbox,
  ElDeprecatedChipLabel as ElChipLabel,
  ElDeprecatedChipGroup as ElChipGroup,
  ElDeprecatedChipGroupInner as ElChipGroupInner,
} from "./__styles__";

/** @deprecated */
export interface ChipProps extends InputHTMLAttributes<HTMLInputElement> {}

/** @deprecated */
export const DeprecatedChip: FC<ChipProps> = ({ children, className, id, ...rest }) => {
  const chipId = useId(id);
  return (
    <>
      <ElChipCheckbox id={id ?? chipId} type="checkbox" {...rest} />
      <ElChipLabel htmlFor={id ?? chipId} className={cx(className)}>
        {children}
      </ElChipLabel>
    </>
  );
};

/** @deprecated */
export const DeprecatedChipGroup: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => (
  <ElChipGroup className={cx(className)} {...rest}>
    <ElChipGroupInner>{children}</ElChipGroupInner>
  </ElChipGroup>
);
