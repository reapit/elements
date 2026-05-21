import { styled } from '@linaria/react'

export const ElSwitchInput = styled.input`
  @layer elements.main {
    --switch-handle-background_colour: var(--comp-switch-colour-fill-default-handle);
    --switch-handle-position: 0%;
    --switch-handle-size: var(--size-3);
    --switch-handle-transition_duration: 150ms;
    --switch-track-background_colour: var(--comp-switch-colour-fill-default-unchecked);
    --switch-track-inline_size: var(--size-9);
    --switch-track-block_size: var(--size-5);

    /** This allows us to position the handle based on the inline size of the container, which
     * helps us avoid accounting for the container's padding. */
    container-type: inline-size;

    display: grid;
    align-items: center;
    grid-template: [track] 1fr / [track] 1fr;
    margin: var(--spacing-half) var(--spacing-none);
    padding: var(--spacing-1);

    appearance: none;
    cursor: pointer;

    inline-size: var(--switch-track-inline_size);
    block-size: var(--switch-track-block_size);

    border: none;
    border-radius: var(--comp-switch-border-radius);
    background-color: var(--switch-track-background_colour);
    outline: none;

    /* This is the switch's handle */
    &::before {
      content: '';
      pointer-events: none;
      grid-area: track;
      inline-size: var(--switch-handle-size);
      block-size: var(--switch-handle-size);
      background-color: var(--switch-handle-background_colour);
      border-radius: 50%;
      transform: translateX(var(--switch-handle-position));
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: background-color var(--switch-handle-transition_duration) ease-out;

      &::before {
        transition: transform var(--switch-handle-transition_duration) ease-in-out;
      }
    }

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &:hover {
      --switch-track-background_colour: var(--comp-switch-colour-fill-hover-unchecked);
    }

    &:checked {
      /* When checked, we want the handle to move to the other side of the track. We use 100cqw
       * (100% of the container's inline size) less the size of the of the handle (100%) to achieve this. */
      --switch-handle-position: calc(100cqw - 100%);
      --switch-track-background_colour: var(--comp-switch-colour-fill-default-checked);
    }

    &:disabled,
    &:disabled:hover {
      --switch-track-background_colour: var(--comp-switch-colour-fill-disabled-unchecked);
      cursor: not-allowed;
    }

    &:checked:hover {
      --switch-track-background_colour: var(--comp-switch-colour-fill-hover-checked);
    }

    &:disabled:checked,
    &:disabled:checked:hover {
      --switch-track-background_colour: var(--comp-switch-colour-fill-disabled-checked);
    }
  }
`
