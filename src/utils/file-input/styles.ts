import { styled } from '@linaria/react'

export const ElFileInputWrapper = styled.div`
  @layer elements.main {
    display: inline-flex;

    &[data-disabled='true'] {
      cursor: not-allowed;
    }
  }
`

export const ElFileInput = styled.input`
  @layer elements.main {
    /* NOTE: applied when a consumer supplies \`children\`, replacing the default rendered
     * content. The input stays in the document and part of the accessibility tree (unlike
     * \`display: none\`), but is removed from the tab order (see \`tabIndex\` in file-input.tsx) —
     * the trigger \`children\` renders is the only tab stop; the input is just not visually shown
     * alongside the custom content. */
    &[data-visually-hidden='true'] {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  }
`
