import { styled } from '@linaria/react'

export const ElCircularProgressTrack = styled.circle`
  @layer elements.main {
    fill: var(--comp-uploader-colour-fill-progress_bar-background);
    stroke: none;
  }
`

export const ElCircularProgressIndicator = styled.path`
  @layer elements.main {
    fill: var(--comp-uploader-colour-fill-progress_bar-indicator);
    stroke: none;
  }
`

export const ElCircularProgressIndicatorComplete = styled.circle`
  @layer elements.main {
    fill: var(--comp-uploader-colour-fill-progress_bar-indicator);
    stroke: none;
  }
`
