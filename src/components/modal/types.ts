import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'

export type ModalVariant = 'small' | 'medium'
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onModalClose: () => void
  title?: string
  variant?: ModalVariant
  footer?: React.ReactNode
}

export interface ModalBaseProps extends HTMLAttributes<HTMLElement> {}

export type ModalContainerProps = ForwardRefExoticComponent<ModalBaseProps & RefAttributes<HTMLAttributes<HTMLElement>>>
