import { ElFolderTabCountContainer, ElFolderTabCountLabel, ElFolderTabCountText } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

export namespace FolderTabCountLabel {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** The label text. */
    children: ReactNode
    /** The featured numerical count. */
    count: ReactNode
  }
}

/**
 * Displays a numerical count alongside a label for a folder tab. Typically used via `FolderTabs.Count`.
 * This is used to label tabs that need to indicate the number of associated items it contains, such as
 * the number of transactions ready for processing.
 */
export function FolderTabCountLabel({ children, count, ...rest }: FolderTabCountLabel.Props) {
  return (
    <ElFolderTabCountContainer {...rest}>
      <ElFolderTabCountText>{count}</ElFolderTabCountText>
      <ElFolderTabCountLabel>{children}</ElFolderTabCountLabel>
    </ElFolderTabCountContainer>
  )
}
