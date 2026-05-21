import { css } from '@linaria/core'

export const elLineClampText = css`
  @layer elements.main {
    position: relative;
    display: block;
    font: inherit;
    line-height: inherit;
    color: inherit;
    max-height: calc(1lh * var(--line-clamp));
    overflow: hidden;

    &[data-is-clamped='true'] {
      /* mask-image hides overflowed text and works with any background colour applied by ancestors.
       * We stack two linear gradients to achieve a smooth transition from transparent to black for
       * the last line of text. */
      mask-image:
        /* Fully transparent on right edge until 10ch, the smooth transition to full black at 15ch.
         * These values depend on the disclosure button's label text. Adjust these values if the label
         * text changes. */
        linear-gradient(to left, transparent 10ch, black 15ch),
        /* Fully transparent on bottom edge until 1lh, then hard transition to full black at 1lh. */
          linear-gradient(to top, transparent 1lh, black 1lh);
    }

    &[data-white-space='normal'] {
      white-space: normal;
    }

    &[data-white-space='pre-line'] {
      white-space: pre-line;
    }

    &[data-white-space='pre-wrap'] {
      white-space: pre-wrap;
    }
  }
`

export const elLineClampDisclosureButton = css`
  @layer elements.main {
    font: inherit;
    line-height: inherit;
    height: 1lh;
    text-transform: lowercase;

    &[hidden] {
      /* TODO: Workaround because Button display property has higher specificity than
       * hidden attribute */
      display: none;
    }
  }
`
