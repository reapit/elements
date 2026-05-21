import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElOfficeItem = styled.button`
  @layer elements.main {
    --office-item-check-icon-display: none;
    --office-item-check-icon-colour: var(--comp-office_switcher-colour-icon-action);
    --office-item-label-colour: var(--comp-office_switcher-colour-text-default);

    display: flex;
    gap: var(--spacing-2);
    align-items: center;

    appearance: none;
    background-color: var(--office-item-background-colour, transparent);
    color: var(--office-item-label-colour);
    cursor: pointer;
    user-select: none;

    width: 100%;
    border: none;
    border-radius: var(--comp-office_switcher-border-radius);
    padding: var(--spacing-2) var(--spacing-3);

    text-align: left;

    ${font('sm', 'regular')}

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &:hover {
      --office-item-background-colour: var(--comp-menu-colour-fill-hover);
      --office-item-label-colour: var(--comp-office_switcher-colour-text-hover);
    }

    &[aria-checked='true'],
    &[aria-selected='true'] {
      --office-item-check-icon-display: inline-flex;
      --office-item-label-colour: var(--comp-office_switcher-colour-text-action);

      ${font('sm', 'medium')}
    }
  }
`

export const ElOfficeItemLeftContent = styled.span`
  @layer elements.main {
    display: flex;
    gap: var(--spacing-2);
    align-items: center;
    flex: 1 0 0;
    min-width: 0;
  }
`

export const ElOfficeItemTextContainer = styled.span`
  @layer elements.main {
    font: inherit;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 1;
  }
`

export const ElOfficeItemBadgeContainer = styled.span`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
`

export const ElOfficeItemCheckIconContainer = styled.span`
  @layer elements.main {
    box-sizing: content-box;
    display: var(--office-item-check-icon-display);
    align-items: center;
    justify-content: center;

    color: var(--office-item-check-icon-colour);

    height: var(--icon_size-m);
    width: var(--icon_size-m);
  }
`
