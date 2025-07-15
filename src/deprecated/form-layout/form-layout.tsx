import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes, forwardRef, LegacyRef } from 'react'
import {
  ElFormLayout,
  ElInputWrap,
  ElInputWrapMed,
  ElInputWrapFull,
  elFormLayoutHasMargin,
  ElInputWrapSmall,
  ElFormSectionDivider,
  ElInputWrapHalf,
} from './__styles__'

/** @deprecated */
export type FormLayoutProps = HTMLAttributes<HTMLDivElement> & {
  hasMargin?: boolean
}

/** @deprecated */
export const FormLayout: FC<FormLayoutProps> = ({ children, hasMargin, className, ...rest }) => {
  return (
    <ElFormLayout className={cx(hasMargin && elFormLayoutHasMargin, className)} {...rest}>
      {children}
    </ElFormLayout>
  )
}

/** @deprecated */
export const FormSectionDivider: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElFormSectionDivider {...rest}>{children}</ElFormSectionDivider>
}

/** @deprecated */
export const InputWrap: React.ForwardRefExoticComponent<FormLayoutProps & React.RefAttributes<HTMLDivElement>> =
  forwardRef(({ children, ...rest }, ref) => {
    return (
      <ElInputWrap {...rest} ref={ref as LegacyRef<HTMLDivElement>}>
        {children}
      </ElInputWrap>
    )
  })

/** @deprecated */
export const InputWrapSmall: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapSmall {...rest}>{children}</ElInputWrapSmall>
}

/** @deprecated */
export const InputWrapMed: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapMed {...rest}>{children}</ElInputWrapMed>
}

/** @deprecated */
export const InputWrapFull: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapFull {...rest}>{children}</ElInputWrapFull>
}

/** @deprecated */
export const InputWrapHalf: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapHalf {...rest}>{children}</ElInputWrapHalf>
}
