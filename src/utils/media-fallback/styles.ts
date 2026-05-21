import { css } from '@linaria/core'
import { font } from '#src/utils/font'

export const elMediaFallback = css`
  @layer elements.main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-4);

    width: 100%;
    height: 100%;
    overflow: clip;

    background: var(--colour-fill-neutral-light);
    padding: var(--spacing-4);
  }
`

export const elMediaFallbackOverlay = css`
  @layer elements.main {
    position: absolute;
    inset: 0;
  }
`

export const elMediaFallbackIcon = css`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--colour-icon-primary);
  }
`

export const elMediaFallbackMessage = css`
  @layer elements.main {
    margin: 0;
    color: var(--colour-text-placeholder);
    text-align: center;

    ${font('sm', 'regular')}
  }
`
