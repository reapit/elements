import { styled } from '@linaria/react'

export const ElGalleryViewerThumbnailList = styled.ul`
  list-style: none;

  display: flex;
  flex-flow: row wrap;
  gap: var(--spacing-4);

  width: 100%;

  margin-block: 0;
  padding-inline: 0;
`

export const ElGalleryViewerThumbnailListItem = styled.li`
  display: block;
  width: min-content;
`
