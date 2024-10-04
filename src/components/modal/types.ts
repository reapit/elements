import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'

// Define an enum-like type for the possible variants of the modal
export type ModalVariant = 'small' | 'medium'
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Indicates whether the modal is open or closed
   */
  isOpen: boolean
  /**
   * Callback function to be called when the `ModalBg` has been clicked
   * or when the user presses the `Escape` key
   */
  onModalClose: () => void

  /**
   * The title of the modal
   */
  title?: string

  /**
   * The variant of the modal (small or medium)
   * @defaultValue 'medium'
   */
  variant?: ModalVariant

  /**
   * Optional content that will placed under `ModalFooter`
   */
  footer?: React.ReactNode
}

export interface ModalBaseProps extends HTMLAttributes<HTMLElement> {}

export type ModalContainerProps = ForwardRefExoticComponent<ModalBaseProps & RefAttributes<HTMLAttributes<HTMLElement>>>
