import { ElEmptyStateDescription, ElEmptyStateDescriptionSecondaryText, ElEmptyStateDescriptionTitle } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace EmptyStateDescription {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The empty state's title text. */
    children: ReactNode
    /** The empty state's secondary text. */
    secondaryText?: ReactNode
  }
}

/**
 * @deprecated Use `EmptyStateDescription.Props` instead.
 */
export type EmptyStateDescriptionProps = EmptyStateDescription.Props

/**
 * A simple component that displays a title and optional secondary text for the `EmptyState`.
 */
export function EmptyStateDescription({ children, secondaryText, ...rest }: EmptyStateDescription.Props) {
  return (
    <ElEmptyStateDescription {...rest}>
      <ElEmptyStateDescriptionTitle>{children}</ElEmptyStateDescriptionTitle>
      {secondaryText && <ElEmptyStateDescriptionSecondaryText>{secondaryText}</ElEmptyStateDescriptionSecondaryText>}
    </ElEmptyStateDescription>
  )
}

EmptyStateDescription.displayName = 'EmptyState.Description'
