import { FC } from 'react'
import { cx } from '@linaria/core'
import { ElModalBg, ElModal, ElModalHeader } from '../__styles__'
import { ModalBaseProps } from '../types'

export const ModalBg: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalBg className={cx(className)} {...rest}>
    {children}
  </ElModalBg>
)

export const ModalContainer: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModal className={cx(className)} {...rest}>
    {children}
  </ElModal>
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
