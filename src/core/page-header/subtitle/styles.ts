import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElPageHeaderSubtitle = styled.div`
  @layer elements.main {
    display: flex;
    flex-flow: row wrap;
    gap: var(--spacing-2);

    padding-block: var(--spacing-1);
  }
`;

export const ElPageHeaderSubtitleText = styled.p`
  @layer elements.main {
    display: inline;
    margin: 0;

    color: var(--colour-text-primary);

    ${font("base", "bold")}
  }
`;

export const ElPageHeaderSubtitleAdditionalInfo = styled.p`
  @layer elements.main {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: var(--spacing-2);
    margin: 0;
  }
`;
