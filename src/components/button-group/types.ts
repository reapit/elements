import { HTMLAttributes, ReactNode } from 'react'

export interface ButtonVariant {
  type: 'primary' | 'secondary' | 'tertiary'
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
