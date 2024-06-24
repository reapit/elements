import { ReactNode, HTMLAttributes } from 'react'

export interface AccordionBaseProps extends HTMLAttributes<HTMLDivElement> {}
export interface AccordionBaseItemProps extends HTMLAttributes<HTMLAnchorElement> {}

export interface AccordionTitleItemProps {}

export interface AccordionItemProps {
  title: string
  titleItems?: ReactNode[]
  content: ReactNode
  onClick?: () => void
}

export interface AccordionProps extends AccordionBaseProps {
  items: AccordionItemProps[]
}
