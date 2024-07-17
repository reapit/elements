import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onModalClose: () => void
  title?: string
  className?: string
}

export interface ModalBaseProps extends HTMLAttributes<HTMLElement> {}

export type ModalContainerProps = ForwardRefExoticComponent<ModalBaseProps & RefAttributes<HTMLAttributes<HTMLElement>>>
