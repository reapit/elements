import { css } from '@linaria/core'
import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

interface ElSectionMessageProps {
  'data-variant': 'error' | 'warning' | 'info' | 'success' | 'neutral-light' | 'neutral-dark'
}

export const ElSectionMessage = styled.div<ElSectionMessageProps>`
  @layer elements.main {
    --section-message-background: var(--colour-fill-white);
    --section-message-border-colour: var(--colour-border-neutral-light_darker);
    --section-message-icon-colour: var(--colour-icon-primary);

    display: grid;
    grid:
      'icon title dismiss' minmax(0, auto)
      'icon description dismiss' auto
      '. show-less .' minmax(0, auto)
      '. actions .' minmax(0, auto) / auto 1fr auto;

    background-color: var(--section-message-background);
    border: var(--border-width-default) solid var(--section-message-border-colour);
    border-radius: var(--border-radius-l);
    padding: var(--spacing-4);

    &[data-variant='error'] {
      --section-message-background: var(--colour-fill-error-lightest);
      --section-message-border-colour: var(--colour-border-error-light);
      --section-message-icon-colour: var(--colour-icon-error);
    }

    &[data-variant='warning'] {
      --section-message-background: var(--colour-fill-warning-lightest);
      --section-message-border-colour: var(--colour-border-warning-light);
      --section-message-icon-colour: var(--colour-icon-warning);
    }

    &[data-variant='info'] {
      --section-message-background: var(--colour-fill-info-lightest);
      --section-message-border-colour: var(--colour-border-info-light);
      --section-message-icon-colour: var(--colour-icon-info);
    }

    &[data-variant='success'] {
      --section-message-background: var(--colour-fill-success-lightest);
      --section-message-border-colour: var(--colour-border-success-light);
      --section-message-icon-colour: var(--colour-icon-success);
    }

    &[data-variant='neutral-light'] {
      --section-message-background: var(--colour-fill-white);
      --section-message-border-colour: var(--colour-border-neutral-light_darker);
      --section-message-icon-colour: var(--colour-icon-primary);
    }

    &[data-variant='neutral-dark'] {
      --section-message-background: var(--colour-fill-neutral-lightest);
      --section-message-border-colour: var(--colour-border-neutral-light_darker);
      --section-message-icon-colour: var(--colour-icon-primary);
    }
  }
`

export const elSectionMessageDismissButton = css`
  @layer elements.main {
    grid-area: dismiss;
  }
`

export const ElSectionMessageIconContainer = styled.div`
  @layer elements.main {
    grid-area: icon;
    box-sizing: content-box;
    padding-inline-end: var(--spacing-3);
    color: var(--section-message-icon-colour);
    height: var(--icon_size-m);
    width: var(--icon_size-m);
  }
`

export const ElSectionMessageTitle = styled.div`
  @layer elements.main {
    ${font('sm', 'bold')}
    grid-area: title;
    color: var(--colour-text-primary);
    margin: 0;
    min-width: 0;
    padding-bottom: var(--spacing-1);
  }
`

export const ElSectionMessageDescription = styled.div`
  @layer elements.main {
    ${font('sm', 'regular')}
    grid-area: description;
    color: var(--colour-text-primary);
  }
`

export const ElSectionMessageActions = styled.div`
  @layer elements.main {
    grid-area: actions;
    display: flex;
    min-width: 0;
    padding-top: var(--spacing-3);
  }
`
