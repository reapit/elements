import { styled } from '@linaria/react'

export const ElDrawer = styled.dialog`
  /* Closed state of the drawer */
  background: var(--fill-white);
  border: none;
  box-shadow: 0 0 24px rgb(0 0 0 / 75%);
  height: 100%;
  inset-inline-start: auto;
  inset-inline-end: 0;
  max-height: 100%;
  padding: 0;

  /* The drawer is positioned off-screen on the right (100% of its block size) */
  transform: translateX(100%);

  /* See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#transitioning_dialog_elements
   * for details on why we transition the display and overlay properties, and what the allow-discrete
   * transition behaviour is all about */
  transition:
    display 0.15s ease-out allow-discrete,
    overlay 0.15s ease-out allow-discrete,
    transform 0.15s ease-in-out;

  @media (prefers-reduced-motion) {
    transition: none;
  }

  /* NOTE: currently only one size of drawer. If we add more in future, they
   * should be handled via a data-size attribute. */
  width: 480px;

  &::backdrop {
    /* Fully transparent when the drawer is closed */
    background-color: rgb(0 0 0 / 0%);

    /* See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#transitioning_dialog_elements
     * for details on why we transition the display and overlay properties, and what the allow-discrete
     * transition behaviour is all about */
    transition:
      background-color 0.15s,
      display 0.15s allow-discrete,
      overlay 0.15s allow-discrete;

    @media (prefers-reduced-motion) {
      transition: none;
    }
  }

  /* Open state of the dialog */
  &[open] {
    transform: translateX(0);
  }

  &[open]::backdrop {
    background-color: rgb(0 0 0 / 25%);
  }

  /* _Before_ open state of the dialog. These need to be _after_ the previous rules so they take effect as the specificity is the same */
  @starting-style {
    &[open] {
      transform: translateX(100%);
    }

    &[open]::backdrop {
      background-color: rgb(0 0 0 / 0%);
    }
  }
`

export const ElDrawerContent = styled.div`
  background: var(--fill-white);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`
