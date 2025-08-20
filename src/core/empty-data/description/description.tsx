import { ElEmptyDataDescription, ElEmptyDataDescriptionSecondaryText, ElEmptyDataDescriptionTitle } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface EmptyDataDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  /** The empty data's title text. */
  children: ReactNode
  /** The empty data's secondary text. */
  secondaryText?: ReactNode
}

/**
 * A simple component that displays a title and optional secondary text for the `EmptyData`.
 */
export function EmptyDataDescription({ children, secondaryText, ...rest }: EmptyDataDescriptionProps) {
  return (
    <ElEmptyDataDescription {...rest}>
      <ElEmptyDataDescriptionTitle>{children}</ElEmptyDataDescriptionTitle>
      {secondaryText && <ElEmptyDataDescriptionSecondaryText>{secondaryText}</ElEmptyDataDescriptionSecondaryText>}
    </ElEmptyDataDescription>
  )
}
