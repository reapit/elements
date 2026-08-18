import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElFileUploaderMediaCard = styled.div`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--spacing-2);
  }
`;

export const ElFileUploaderMediaCardContent = styled.div`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
`;

export const ElFileUploaderMediaCardFileName = styled.p`
  @layer elements.main {
    ${font("sm", "regular")}
    overflow: hidden;
    margin: 0;
    width: 100%;
    color: var(--colour-text-primary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ElFileUploaderMediaCardSecondaryInfo = styled.div`
  @layer elements.main {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-half);
    width: 100%;

    /* The error message is allowed to wrap onto a second line rather than truncate, matching FileCard. */
    &[data-wrap] {
      flex-wrap: wrap;
    }
  }
`;

export const ElFileUploaderMediaCardStatusText = styled.span`
  @layer elements.main {
    ${font("2xs", "regular")}
    overflow: hidden;
    min-width: 0;
    color: var(--colour-text-secondary);
    text-overflow: ellipsis;
    white-space: nowrap;

    &[data-error] {
      ${font("2xs", "medium")}
      overflow: visible;
      color: var(--colour-text-error);
      text-overflow: unset;
      white-space: normal;
    }
  }
`;
