import { css } from '@linaria/core'

export const elIcon = css`
  fill: currentColor;

  /* NOTE: necessary when used in an inline or inline-block layout */
  vertical-align: middle;

  /* NOTE: we place these styles inside a layer to allow them to be easily overridden
   * by a consumer-supplied class that would otherwise have a lower specificity and
   * therefore have no effect, or require the use of !important */
  @layer {
    &,
    &[color='primary'] {
      color: var(--colour-icon-primary);
    }
    &[color='secondary'] {
      color: var(--colour-icon-secondary);
    }
    &[color='disabled'] {
      color: var(--colour-icon-disabled);
    }
    &[color='white'] {
      color: var(--colour-icon-white);
    }
    &[color='action'] {
      color: var(--colour-icon-action);
    }
    &[color='pending'] {
      color: var(--colour-icon-pending);
    }
    &[color='warning'] {
      color: var(--colour-icon-warning);
    }
    &[color='error'] {
      color: var(--colour-icon-error);
    }
    &[color='success'] {
      color: var(--colour-icon-success);
    }
    &[color='info'] {
      color: var(--colour-icon-info);
    }
    &[color='accent_1'] {
      color: var(--colour-icon-accent_1);
    }
    &[color='accent_2'] {
      color: var(--colour-icon-accent_2);
    }
    &[color='inherit'] {
      color: inherit;
    }

    &,
    &[data-size='100%'] {
      width: 100%;
      height: 100%;
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
    &[data-size='lg'] {
      width: var(--icon_size-l);
      height: var(--icon_size-l);
    }
  }
`
