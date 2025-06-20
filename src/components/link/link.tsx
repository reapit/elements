import { ElLink } from './styles'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { LinkVariant, LinkSize } from './styles'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The text content to be hyperlinked to the specified URL.
   */
  children: ReactNode
  /**
   * The URL to navigate to when the link is clicked.
   */
  href: string
  /**
   * Whether the link should be displayed without an underline
   */
  isQuiet?: boolean
  /**
   * The size of the link text
   */
  size?: LinkSize
  /**
   * The visual style variant of the link
   */
  variant?: LinkVariant
}

/**
 * A simple, inline link component that can be used to navigate users to some other page.
 */
export function Link({ children, isQuiet = false, size = 'base', variant = 'primary', ...rest }: LinkProps) {
  return (
    <ElLink data-variant={variant} data-size={size} data-is-quiet={isQuiet} {...rest}>
      {children}
    </ElLink>
  )
}
