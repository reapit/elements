import { HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'react'

export interface TabsBaseProps extends HTMLAttributes<HTMLDivElement | HTMLLabelElement | HTMLSpanElement> {}

export interface TabsInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface TabsLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export interface TabsOption {
  id: string
  value: string
  text: string
  isChecked: boolean
}

export interface TabsProps extends HTMLAttributes<HTMLInputElement> {
  options: TabsOption[]
  name: string
  isControlled?: boolean
  isFullWidth?: boolean
  hasNoBorder?: boolean
}
