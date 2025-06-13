import { ElSupplementaryInfoItem } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

export type SupplementaryInfoItemColour =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'pending'
  | 'warning'
  | 'danger'
  | 'accent-1'
  | 'accent-2'

interface SupplementaryInfoItemProps extends HTMLAttributes<HTMLLIElement> {
  /** The content of the item. */
  children: ReactNode
  /** Text colour of the item. Used to convey certain messages or to draw users' attention to certain information */
  colour?: SupplementaryInfoItemColour
}

/**
 * An item for use within a `SupplementaryInfo`. Represents a single piece of information within the supplementary
 * info list. Items will automatically be separated by a dot so long as all items are direct children of the
 * `SupplementaryInfo`.
 *
 * Item's are always an `<li>` element because `SupplementaryInfo` is always a `<ul>` element.
 */
export function SupplementaryInfoItem({ children, colour = 'primary', ...rest }: SupplementaryInfoItemProps) {
  return (
    <ElSupplementaryInfoItem {...rest} data-colour={colour}>
      {children}
    </ElSupplementaryInfoItem>
  )
}
