import { FC, ForwardedRef, forwardRef, HTMLAttributes, LegacyRef } from 'react'
import { ElModalBg, ElModal, ElModalHeader, ElModalFooter, ElModalBody } from './styles'
import { ModalBaseProps, ModalContainerProps } from './types'

export const ModalBg: FC<ModalBaseProps> = ({ children, ...rest }: ModalBaseProps) => (
  <ElModalBg {...rest}>{children}</ElModalBg>
)

export const ModalContainer: ModalContainerProps = forwardRef(
  ({ children, ...rest }, ref: ForwardedRef<HTMLAttributes<HTMLElement>>) => (
    <ElModal {...rest} ref={ref as unknown as LegacyRef<HTMLInputElement>}>
      {children}
    </ElModal>
  ),
)

export const ModalHeader: FC<ModalBaseProps> = ({ children, ...rest }: ModalBaseProps) => (
  <ElModalHeader {...rest}>{children}</ElModalHeader>
)

export const ModalBody: FC<ModalBaseProps> = ({ children, ...rest }: ModalBaseProps) => (
  <ElModalBody {...rest}>{children}</ElModalBody>
)

export const ModalFooter: FC<ModalBaseProps> = ({ children, ...rest }: ModalBaseProps) => (
  <ElModalFooter {...rest}>{children}</ElModalFooter>
)
