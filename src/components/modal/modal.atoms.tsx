import { FC, ForwardedRef, forwardRef, HTMLAttributes, LegacyRef } from 'react'
import { cx } from '@linaria/core'
import { ElModalBg, ElModal, ElModalHeader } from './styles'
import { ModalBaseProps, ModalContainerProps } from './types'

export const ModalBg: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalBg className={cx(className)} {...rest}>
    {children}
  </ElModalBg>
)

export const ModalContainer: ModalContainerProps = forwardRef(
  ({ className, children, ...rest }, ref: ForwardedRef<HTMLAttributes<HTMLElement>>) => (
    <ElModal className={cx(className)} {...rest} ref={ref as unknown as LegacyRef<HTMLInputElement>}>
      {children}
    </ElModal>
  ),
)

export const ModalHeader: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalHeader className={cx(className)} {...rest}>
    {children}
  </ElModalHeader>
)

export const ModalBody: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalBg className={cx(className)} {...rest}>
    {children}
  </ElModalBg>
)
