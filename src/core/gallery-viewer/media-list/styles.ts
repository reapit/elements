import { styled } from "@linaria/react";

export const ElGalleryViewerMediaList = styled.ul`
  @layer elements.main {
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: var(--spacing-5);

    width: 100%;

    margin-block: 0;
    padding-inline: 0;
  }
`;

export const ElGalleryViewerMediaListItem = styled.li`
  @layer elements.main {
    display: block;
    border-radius: var(--border-radius-l);
    overflow: hidden;
  }
`;
