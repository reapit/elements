import { ReactNode, HTMLAttributes } from 'react'

/** @deprecated */
export interface DeprecatedAccordionBaseProps extends HTMLAttributes<HTMLDivElement> {}
/** @deprecated */
export interface DeprecatedAccordionBaseItemProps extends HTMLAttributes<HTMLAnchorElement> {}

/** @deprecated */
export interface DeprecatedAccordionTitleItemProps {}

/** @deprecated */
export interface DeprecatedAccordionItemProps {
  title: string
  titleItems?: ReactNode[]
  content: ReactNode
  onClick?: () => void
}

/** @deprecated */
export interface DeprecatedAccordionProps extends DeprecatedAccordionBaseProps {
  items: DeprecatedAccordionItemProps[]
}
