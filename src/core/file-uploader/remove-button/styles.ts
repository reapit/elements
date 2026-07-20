import { styled } from '@linaria/react'

export const ElFileUploaderRemoveButton = styled.button`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2);
    border-radius: var(--border-radius-m);
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`

export const ElFileUploaderRemoveButtonBackground = styled.span`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-1);
    border-radius: var(--border-radius-m);
    background: var(--colour-fill-white);

    button:not(:disabled):hover & {
      background: var(--colour-fill-neutral-light);
    }

    button:focus-visible & {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`
