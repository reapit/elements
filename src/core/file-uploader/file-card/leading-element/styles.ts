import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElFileUploaderFileCardLeadingElement = styled.div`
  @layer elements.main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--size-10);
    height: var(--size-10);
    border-radius: var(--border-radius-m);
    overflow: hidden;

    &[data-type="image"] {
      border: var(--border-width-default) solid var(--colour-border-neutral-light_default);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &:is([data-type="file-type"], [data-type="icon"]) {
      background: var(--colour-fill-neutral-lightest);
    }
  }
`;

export const ElFileUploaderFileCardLeadingElementLabel = styled.span`
  @layer elements.main {
    ${font("3xs", "bold")}
    color: var(--colour-text-secondary);
    text-align: center;
  }
`;
