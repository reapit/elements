import React, { FC, HTMLAttributes, ReactNode, createRef, useEffect } from 'react'
import { cx } from '@linaria/core'
import {
  ElDeprecatedDrawerBg as ElDrawerBg,
  ElDeprecatedDrawer as ElDrawer,
  ElDeprecatedDrawerHeader as ElDrawerHeader,
  ElDeprecatedDrawerBody as ElDrawerBody,
  ElDeprecatedDrawerTitle as ElDrawerTitle,
  ElDeprecatedDrawerFooter as ElDrawerFooter,
  ElDeprecatedDrawerSubtitle as ElDrawerSubtitle,
} from './__styles__'
import { elIsActive } from '../../styles/deprecated-states'
import { DeprecatedIcon } from '../icon'

/** @deprecated */
export interface DeprecatedDrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onDrawerClose: () => void
  title?: string
  subtitle?: string
  className?: string
  footerItems?: ReactNode
  canDismiss?: boolean
}

/** @deprecated */
export interface DeprecatedDrawerBaseProps extends HTMLAttributes<HTMLElement> {}

/** @deprecated */
export const DeprecatedDrawerBg: FC<DeprecatedDrawerBaseProps> = ({
  className,
  children,
  ...rest
}: DeprecatedDrawerBaseProps) => (
  <ElDrawerBg className={cx(className)} {...rest}>
    {children}
  </ElDrawerBg>
)

/** @deprecated */
export const DeprecatedDrawerContainer: FC<DeprecatedDrawerBaseProps> = ({
  className,
  children,
  ...rest
}: DeprecatedDrawerBaseProps) => (
  <ElDrawer className={cx(className)} {...rest}>
    {children}
  </ElDrawer>
)

/** @deprecated */
export const DeprecatedDrawerHeader: FC<DeprecatedDrawerBaseProps> = ({
  className,
  children,
  ...rest
}: DeprecatedDrawerBaseProps) => (
  <ElDrawerHeader className={cx(className)} {...rest}>
    {children}
  </ElDrawerHeader>
)

/** @deprecated */
export const DeprecatedDrawerTitle: FC<DeprecatedDrawerBaseProps> = ({
  className,
  children,
  ...rest
}: DeprecatedDrawerBaseProps) => (
  <ElDrawerTitle className={cx(className)} {...rest}>
    {children}
  </ElDrawerTitle>
)

/** @deprecated */
export const DeprecatedDrawerSubtitle: FC<DeprecatedDrawerBaseProps> = ({
  className,
  children,
  ...rest
}: DeprecatedDrawerBaseProps) => (
  <ElDrawerSubtitle className={cx(className)} {...rest}>
    {children}
  </ElDrawerSubtitle>
)

/** @deprecated */
export const DeprecatedDrawerBody: FC<DeprecatedDrawerBaseProps> = ({
  className,
  children,
  ...rest
}: DeprecatedDrawerBaseProps) => (
  <ElDrawerBody className={cx(className)} {...rest}>
    {children}
  </ElDrawerBody>
)

/** @deprecated */
export const DeprecatedDrawerFooter: FC<DeprecatedDrawerBaseProps> = ({
  className,
  children,
  ...rest
}: DeprecatedDrawerBaseProps) => (
  <ElDrawerFooter className={cx(className)} {...rest}>
    {children}
  </ElDrawerFooter>
)

/** @deprecated */
export const handleDrawerFocus = (drawerRef: React.RefObject<HTMLDivElement>, isOpen: boolean) => () => {
  if (isOpen && drawerRef.current) {
    drawerRef.current.focus()
  }
}

/** @deprecated */
export const DeprecatedDrawer: FC<DeprecatedDrawerProps> = ({
  isOpen,
  onDrawerClose,
  title,
  subtitle,
  footerItems,
  className,
  children,
  canDismiss,
  ...rest
}) => {
  const drawerCombinedClassname = cx(className, elIsActive)
  const drawerRef = createRef<HTMLDivElement>()

  useEffect(handleDrawerFocus(drawerRef, isOpen), [drawerRef, isOpen])

  if (!isOpen) return null

  return (
    <>
      <ElDrawerBg className={elIsActive} onClick={canDismiss ? onDrawerClose : undefined} />
      <ElDrawer className={drawerCombinedClassname} ref={drawerRef} autoFocus {...rest}>
        <ElDrawerHeader>
          <div>
            {title && <ElDrawerTitle>{title}</ElDrawerTitle>}
            {subtitle && <ElDrawerSubtitle>{subtitle}</ElDrawerSubtitle>}
          </div>
          {canDismiss && <DeprecatedIcon icon="close" intent="default" onClick={onDrawerClose} />}
        </ElDrawerHeader>
        <ElDrawerBody>{children}</ElDrawerBody>
        {footerItems && <ElDrawerFooter>{footerItems}</ElDrawerFooter>}
      </ElDrawer>
    </>
  )
}
