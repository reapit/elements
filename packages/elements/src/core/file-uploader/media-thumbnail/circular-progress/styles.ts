import { styled } from "@linaria/react";

export const ElCircularProgressTrack = styled.circle`
  @layer elements.main {
    fill: var(--comp-uploader-colour-fill-progress_bar-background);
    stroke: none;
  }
`;

export const ElCircularProgressIndicator = styled.circle`
  @layer elements.main {
    fill: none;
    stroke: var(--comp-uploader-colour-fill-progress_bar-indicator);

    @media (prefers-reduced-motion: no-preference) {
      transition: stroke-dashoffset 200ms ease-out;
    }
  }
`;

export const ElCircularProgressIndicatorComplete = styled.circle`
  @layer elements.main {
    fill: var(--comp-uploader-colour-fill-progress_bar-indicator);
    stroke: none;
  }
`;
