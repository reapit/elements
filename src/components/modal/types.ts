import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'

/**
 * @deprecated The `ModalProps` interface is deprecated and will be removed in a future major version
 */
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onModalClose: () => void
  title?: string
  className?: string
}

/**
 * @deprecated
 */
export interface ModalBaseProps extends HTMLAttributes<HTMLElement> {}

/**
 * @deprecated
 */
export type ModalContainerProps = ForwardRefExoticComponent<ModalBaseProps & RefAttributes<HTMLAttributes<HTMLElement>>>
