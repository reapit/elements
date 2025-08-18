import { ElFolderTab, ElFolderTabContentContainer, elFolderTabWave } from './styles'
import LeftWave from './left-wave.svg?react'
import RightWave from './right-wave.svg?react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface FolderTabProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Whether this tab represents the current page or not. */
  'aria-current': 'page' | false
  /**
   * The tab's label text. Typically plain text or a
   * [FolderTabs.Count](?/docs/core-foldertabcount--example) element.
   */
  children: ReactNode
  /** The page this tab should navigate to. */
  href: string
}

/**
 * Folder tabs let users switch between related sections of content within the same screen.
 * Typically used via `FolderTabs.Item`.
 */
export function FolderTab({ children, ...rest }: FolderTabProps) {
  return (
    <ElFolderTab {...rest}>
      <LeftWave aria-hidden className={elFolderTabWave} />
      <RightWave aria-hidden className={elFolderTabWave} />
      {/* NOTE: The content container comes last in the DOM because we want its content to appear above
       * the left and right waves. This is because the waves are absolutely positioned in such a way
       * that they may overlap the content. */}
      <ElFolderTabContentContainer>{children}</ElFolderTabContentContainer>
    </ElFolderTab>
  )
}
