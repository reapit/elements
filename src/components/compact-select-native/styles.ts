import { styled } from '@linaria/react'
import { font } from '../text'

export const ElCompactSelectNativeContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const ElCompactSelectNative = styled.select`
  all: unset;
  box-sizing: border-box;

  cursor: pointer;
  color: var(--comp-input-colour-text-default-input);

  appearance: none;

  /* NOTE: We need to create space for the absolutely positioned icon. */
  padding-inline-end: calc(var(--spacing-1) + var(--icon_size-s));

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  /* Sizes */
  &[data-size='small'] {
    ${font('xs', 'medium')}
  }

  &[data-size='medium'] {
    ${font('sm', 'medium')}
  }

  &[data-size='large'] {
    ${font('base', 'medium')}
  }
`

export const ElCompactSelectNativeIconContainer = styled.span`
  position: absolute;
  right: 0;

  /* NOTE: We don't want this element or its children to capture pointer events. Instead, we want those
   * events to be captured by the select element, which this icon container is above. */
  pointer-events: none;

  display: inline-flex;
  align-items: center;

  color: var(--comp-input-colour-icon-default);

  width: var(--icon_size-s);
  height: var(--icon_size-s);
`
