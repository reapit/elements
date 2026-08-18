import { styled } from "@linaria/react";

export const ElAvatarGroupList = styled.ul`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    /* The overlap grows with the pinned avatar size so avatars stay proportionally overlapped instead of
     * appearing to loosen as the group gets bigger. */
    --avatar-group-overlap: var(--spacing-2);

    &[data-size="lg"] {
      --avatar-group-overlap: var(--spacing-3);
    }

    &[data-size="xl"] {
      --avatar-group-overlap: var(--spacing-4);
    }

    &[data-size="2xl"] {
      --avatar-group-overlap: var(--spacing-6);
    }
  }
`;

export const ElAvatarGroupListItem = styled.li`
  @layer elements.main {
    display: inline-flex;
    flex: 0 0 auto;

    /* Overlap each avatar over the previous one, matching the Figma stacking effect. Later siblings paint on
     * top of earlier ones by default, so no z-index is needed. */
    & + & {
      margin-left: calc(-1 * var(--avatar-group-overlap));
    }
  }
`;
