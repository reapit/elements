import { styled } from "@linaria/react";

export const ElGalleryViewerThumbnailList = styled.ul`
  @layer elements.main {
    list-style: none;

    display: flex;
    flex-flow: row wrap;
    gap: var(--spacing-4);

    width: 100%;

    margin-block: 0;
    padding-inline: 0;
  }
`;

export const ElGalleryViewerThumbnailListItem = styled.li`
  @layer elements.main {
    display: block;
    width: min-content;
  }
`;
