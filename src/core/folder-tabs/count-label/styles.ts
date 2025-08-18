import { FOLDER_TABS_LARGE_CONTAINER_QUERY } from '../constants'
import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElFolderTabCountContainer = styled.span`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);

  ${FOLDER_TABS_LARGE_CONTAINER_QUERY} {
    gap: var(--spacing-3);
  }
`

export const ElFolderTabCountText = styled.span`
  ${font('base', 'bold')}

  ${FOLDER_TABS_LARGE_CONTAINER_QUERY} {
    ${font('3xl', 'bold')}
  }
`

export const ElFolderTabCountLabel = styled.span`
  ${font('sm', 'medium')}
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${FOLDER_TABS_LARGE_CONTAINER_QUERY} {
    /* NOTE: See https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp for more details.
     * Specifically, all major browsers suppor the property, but explicitly with the -webkit-*
     * prefix. Same deal with the -webkit-box display property and -webkit-box-orient.
     *
     * We could use -webkit-line-clamp: 1 for the small tab styles above, but it using standard
     * inline text overflow is more reliable cross-browser. */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    ${font('base', 'medium')}
    white-space: normal;
    text-align: start;
  }
`
