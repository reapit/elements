import { forwardRef } from 'react'

import { DialogBodyProps, DialogFooterProps, DialogContainerProps, DialogTitleProps } from './types'
import { ElDialogBody, ElDialogContainer, ElDialogFooter, ElDialogTitle } from './style'

const Container = forwardRef<HTMLDialogElement, DialogContainerProps>(({ children, ...rest }, ref) => {
  return (
    <ElDialogContainer {...rest} ref={ref}>
      {children}
    </ElDialogContainer>
  )
})

const Title = ({ title, ...rest }: DialogTitleProps) => (
  <ElDialogTitle {...rest} title={title}>
    {title}
  </ElDialogTitle>
)

const Body = ({ children, ...rest }: DialogBodyProps) => <ElDialogBody {...rest}>{children}</ElDialogBody>

const Footer = ({ children, ...rest }: DialogFooterProps) => <ElDialogFooter {...rest}>{children}</ElDialogFooter>

// NOTE: We extend the `Container` component with the `Title`, `Body`, and `Footer` components
// to provide a more convenient way to render the dialog content.
const Dialog = Container as typeof Container & {
  Title: typeof Title
  Body: typeof Body
  Footer: typeof Footer
}

Dialog.Title = Title
Dialog.Body = Body
Dialog.Footer = Footer

export { Dialog }
