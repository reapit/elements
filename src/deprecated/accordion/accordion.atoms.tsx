import { FC, HTMLAttributes } from 'react'
import {
  ElDeprecatedAccordionContainer,
  ElDeprecatedAccordionContent,
  ElDeprecatedAccordionItem,
  ElDeprecatedAccordionTitle,
  ElDeprecatedAccordionTitleContent,
  ElDeprecatedAccordionTitleContentWrapper,
} from './styles'
import { DeprecatedAccordionBaseItemProps, DeprecatedAccordionBaseProps } from './types'

/** @deprecated */
export const DeprecatedAccordionContainer: FC<DeprecatedAccordionBaseProps> = ({ children, ...rest }) => {
  return <ElDeprecatedAccordionContainer {...rest}>{children}</ElDeprecatedAccordionContainer>
}

/** @deprecated */
export const DeprecatedAccordionItem: FC<DeprecatedAccordionBaseItemProps> = ({ children, ...rest }) => {
  return <ElDeprecatedAccordionItem {...rest}>{children}</ElDeprecatedAccordionItem>
}

/** @deprecated */
export const DeprecatedAccordionTitle: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElDeprecatedAccordionTitle {...rest}>{children}</ElDeprecatedAccordionTitle>
}

/** @deprecated */
export const DeprecatedAccordionTitleContentWrapper: FC<DeprecatedAccordionBaseProps> = ({ children, ...rest }) => {
  return <ElDeprecatedAccordionTitleContentWrapper {...rest}>{children}</ElDeprecatedAccordionTitleContentWrapper>
}

/** @deprecated */
export const DeprecatedAccordionTitleContent: FC<DeprecatedAccordionBaseProps> = ({ children, ...rest }) => {
  return <ElDeprecatedAccordionTitleContent {...rest}>{children}</ElDeprecatedAccordionTitleContent>
}

/** @deprecated */
export const DeprecatedAccordionContent: FC<DeprecatedAccordionBaseProps> = ({ children, ...rest }) => {
  return <ElDeprecatedAccordionContent {...rest}>{children}</ElDeprecatedAccordionContent>
}
