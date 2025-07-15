import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  RefAttributes,
} from 'react'

/** @deprecated */
export interface TabsBaseProps extends HTMLAttributes<HTMLDivElement | HTMLLabelElement | HTMLSpanElement> {}

/** @deprecated */
export type TabsInputProps = ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

/** @deprecated */
export interface TabsLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

/** @deprecated */
export interface TabsOption {
  id: string
  value: string
  text: string
  isChecked: boolean
}

/** @deprecated */
export interface TabsProps extends HTMLAttributes<HTMLInputElement> {
  options: TabsOption[]
  name: string
  isControlled?: boolean
  isFullWidth?: boolean
  hasNoBorder?: boolean
}
