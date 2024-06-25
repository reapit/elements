import { FC, HTMLAttributes } from 'react'
import {
  ElAccordionContainer,
  ElAccordionContent,
  ElAccordionItem,
  ElAccordionTitle,
  ElAccordionTitleContent,
  ElAccordionTitleContentWrapper,
} from '../__styles__'
import { AccordionBaseItemProps, AccordionBaseProps } from '../types'

export const AccordionContainer: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionContainer {...rest}>{children}</ElAccordionContainer>
}

export const AccordionItem: FC<AccordionBaseItemProps> = ({ children, ...rest }) => {
  return <ElAccordionItem {...rest}>{children}</ElAccordionItem>
}

export const AccordionTitle: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElAccordionTitle {...rest}>{children}</ElAccordionTitle>
}

export const AccordionTitleContentWrapper: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionTitleContentWrapper {...rest}>{children}</ElAccordionTitleContentWrapper>
}

export const AccordionTitleContent: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionTitleContent {...rest}>{children}</ElAccordionTitleContent>
}

export const AccordionContent: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionContent {...rest}>{children}</ElAccordionContent>
}
