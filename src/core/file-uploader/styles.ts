import { styled } from "@linaria/react";

export const ElFileUploader = styled.div`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
  }
`;

/**
 * Visually-hidden container for `aria-live="polite"` announcements. Rendered as the first child
 * of `ElFileUploader` so it does not affect surrounding grid or form layouts.
 */
export const ElFileUploaderAnnouncer = styled.div`
  @layer elements.main {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
