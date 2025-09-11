import { ElEmptyDataDescription, ElEmptyDataDescriptionSecondaryText, ElEmptyDataDescriptionTitle } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace EmptyDataDescription {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The empty data's title text. */
    children: ReactNode
    /** The empty data's secondary text. */
    secondaryText?: ReactNode
  }
}

/**
 * @deprecated Use `EmptyDataDescription.Props` instead.
 */
export type EmptyDataDescriptionProps = EmptyDataDescription.Props

/**
 * A simple component that displays a title and optional secondary text for the `EmptyData`.
 */
export function EmptyDataDescription({ children, secondaryText, ...rest }: EmptyDataDescription.Props) {
  return (
    <ElEmptyDataDescription {...rest}>
      <ElEmptyDataDescriptionTitle>{children}</ElEmptyDataDescriptionTitle>
      {secondaryText && <ElEmptyDataDescriptionSecondaryText>{secondaryText}</ElEmptyDataDescriptionSecondaryText>}
    </ElEmptyDataDescription>
  )
}
