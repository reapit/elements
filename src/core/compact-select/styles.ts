import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElCompactSelectButton = styled.button`
  @layer elements.main {
    position: relative;
    max-width: 100%;

    display: inline-flex;
    align-items: center;

    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0;

    cursor: pointer;
    color: var(--comp-input-colour-text-default-input);

    @supports (field-sizing: content) {
      field-sizing: content;
    }

    /* NOTE: We need to create space for the absolutely positioned icon. */
    padding-inline-end: calc(var(--spacing-2) + var(--icon_size-s));

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
  }
`

export const ElCompactSelectButtonLabelText = styled.span`
  @layer elements.main {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const ElCompactSelectIconContainer = styled.span`
  @layer elements.main {
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
  }
`
