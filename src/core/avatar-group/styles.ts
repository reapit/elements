import { styled } from "@linaria/react";

export const ElAvatarGroupList = styled.ul`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const ElAvatarGroupListItem = styled.li`
  @layer elements.main {
    display: inline-flex;
    flex: 0 0 auto;

    /* Overlap each avatar over the previous one, matching the Figma stacking effect. Later siblings paint on
     * top of earlier ones by default, so no z-index is needed. */
    & + & {
      margin-left: calc(-1 * var(--spacing-2));
    }
  }
`;
