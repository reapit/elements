import { styled } from "@linaria/react";

import { ProgressIndicator } from "#src/core/progress-indicator/progress-indicator";
import { font } from "#src/utils/font";

export const ElFileUploaderFileCard = styled.div`
  @layer elements.main {
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    overflow: hidden;
    padding: var(--spacing-3);
    gap: var(--spacing-3);
    border: var(--border-width-default) solid var(--colour-border-neutral-light_darker);
    border-radius: var(--border-radius-l);
    background: var(--colour-fill-white);

    &[data-status="error"] {
      border-color: var(--colour-border-error-default);
    }

    &:has(button) {
      padding-inline-end: var(--spacing-1);
    }
  }
`;

export const ElFileUploaderFileCardContent = styled.div`
  @layer elements.main {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }
`;

export const ElFileUploaderFileCardName = styled.p`
  @layer elements.main {
    ${font("base", "regular")}
    overflow: hidden;
    margin: 0;
    width: 100%;
    color: var(--colour-text-primary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ElFileUploaderFileCardSecondaryInfo = styled.div`
  @layer elements.main {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-half);
    width: 100%;

    /* The error message is allowed to wrap onto a second line rather than truncate, since error messages can
     * run longer than a status word like "Uploading" — matching Figma's error-state variant. */
    &[data-wrap] {
      flex-wrap: wrap;
    }
  }
`;

export const ElFileUploaderFileCardStatusText = styled.span`
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

export const ElFileUploaderFileCardProgressBar = styled(ProgressIndicator)`
  @layer elements.main {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--size-1);
  }
`;
