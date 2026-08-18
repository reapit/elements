import { cx } from "@linaria/core";
import React, { FC, HTMLAttributes, forwardRef, LegacyRef } from "react";

import {
  ElDeprecatedFormLayout,
  ElDeprecatedInputWrap,
  ElDeprecatedInputWrapMed,
  ElDeprecatedInputWrapFull,
  elDeprecatedFormLayoutHasMargin,
  ElDeprecatedInputWrapSmall,
  ElDeprecatedFormSectionDivider,
  ElDeprecatedInputWrapHalf,
} from "./__styles__";

/** @deprecated */
export type FormLayoutProps = HTMLAttributes<HTMLDivElement> & {
  hasMargin?: boolean;
};

/** @deprecated */
export const FormLayout: FC<FormLayoutProps> = ({ children, hasMargin, className, ...rest }) => {
  return (
    <ElDeprecatedFormLayout
      className={cx(hasMargin && elDeprecatedFormLayoutHasMargin, className)}
      {...rest}
    >
      {children}
    </ElDeprecatedFormLayout>
  );
};

/** @deprecated */
export const FormSectionDivider: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElDeprecatedFormSectionDivider {...rest}>{children}</ElDeprecatedFormSectionDivider>;
};

/** @deprecated */
export const InputWrap: React.ForwardRefExoticComponent<
  FormLayoutProps & React.RefAttributes<HTMLDivElement>
> = forwardRef(({ children, ...rest }, ref) => {
  return (
    <ElDeprecatedInputWrap {...rest} ref={ref as LegacyRef<HTMLDivElement>}>
      {children}
    </ElDeprecatedInputWrap>
  );
});

/** @deprecated */
export const InputWrapSmall: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElDeprecatedInputWrapSmall {...rest}>{children}</ElDeprecatedInputWrapSmall>;
};

/** @deprecated */
export const InputWrapMed: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElDeprecatedInputWrapMed {...rest}>{children}</ElDeprecatedInputWrapMed>;
};

/** @deprecated */
export const InputWrapFull: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElDeprecatedInputWrapFull {...rest}>{children}</ElDeprecatedInputWrapFull>;
};

/** @deprecated */
export const InputWrapHalf: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElDeprecatedInputWrapHalf {...rest}>{children}</ElDeprecatedInputWrapHalf>;
};
