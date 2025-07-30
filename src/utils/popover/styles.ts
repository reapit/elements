import { css } from '@linaria/core'

export const elPopover = css`
  /* NOTE: we place these styled inside an anonymous layer so they can border
   * overriden by the Popover's consumers even if the consumer's styles have the
   * same specificity. */
  @layer {
    position: absolute;
    inset: auto;
    background: none;
    border: none;
    padding: 0;
    margin: 0;

    border-radius: var(--popover-border-radius, 0);
    max-height: var(--popover-max-height, max-content);
    max-width: var(--popover-max-width, max-content);

    &,
    &[data-elevation='none'] {
      box-shadow: none;
    }

    &[data-elevation='xl'] {
      box-shadow: 0 var(--size-1) var(--size-4) 0 rgb(0 0 0 / 0.2);
    }
  }
`
