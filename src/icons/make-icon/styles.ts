import { css } from '@linaria/core'

export const elIcon = css`
  fill: currentColor;

  &,
  &[data-colour='primary'] {
    color: var(--colour-icon-primary);
  }
  &[data-colour='secondary'] {
    color: var(--colour-icon-secondary);
  }
  &[data-colour='disabled'] {
    color: var(--colour-icon-disabled);
  }
  &[data-colour='white'] {
    color: var(--colour-icon-white);
  }
  &[data-colour='action'] {
    color: var(--colour-icon-action);
  }
  &[data-colour='pending'] {
    color: var(--colour-icon-pending);
  }
  &[data-colour='warning'] {
    color: var(--colour-icon-warning);
  }
  &[data-colour='error'] {
    color: var(--colour-icon-error);
  }
  &[data-colour='success'] {
    color: var(--colour-icon-success);
  }
  &[data-colour='info'] {
    color: var(--colour-icon-info);
  }
  &[data-colour='accent_1'] {
    color: var(--colour-icon-accent_1);
  }
  &[data-colour='accent_2'] {
    color: var(--colour-icon-accent_2);
  }
  &[data-colour='inherit'] {
    color: inherit;
  }

  &,
  &[data-size='lg'] {
    width: var(--icon_size-l);
    height: var(--icon_size-l);
  }
  &[data-size='xs'] {
    width: var(--icon_size-xs);
    height: var(--icon_size-xs);
  }
  &[data-size='sm'] {
    width: var(--icon_size-s);
    height: var(--icon_size-s);
  }
  &[data-size='md'] {
    width: var(--icon_size-m);
    height: var(--icon_size-m);
  }
`
