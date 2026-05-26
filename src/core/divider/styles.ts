import { css } from '@linaria/core'

export const elDivider = css`
  @layer elements.main {
    --divider-border-style: solid;

    border: none;

    &,
    &[aria-orientation='horizontal'] {
      height: 0;
      width: 100%;
      border-bottom: var(--comp-divider-border-width) var(--divider-border-style)
        var(--comp-divider-colour-border-solid);
      margin: var(--spacing-2) 0;
    }

    &[aria-orientation='vertical'] {
      height: 100%;
      width: 0;
      border-left: var(--comp-divider-border-width) var(--divider-border-style) var(--comp-divider-colour-border-solid);
      margin: 0 var(--spacing-2);
    }

    &,
    &[data-variant='solid'] {
      --divider-border-style: solid;
    }

    &[data-variant='dashed'] {
      --divider-border-style: dashed;
    }
  }
`
