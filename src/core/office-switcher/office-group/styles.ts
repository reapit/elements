import { font } from '#src/utils/font'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const elOfficeSwitcherOfficeGroup = css`
  @layer elements.main {
    width: 100%;
  }
`

export const elOfficeSwitcherOfficeGroupSummary = css`
  @layer elements.main {
    display: flex;
    gap: var(--spacing-2);
    align-items: center;
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--comp-office_switcher-border-radius);

    cursor: pointer;
    list-style: none;

    ${font('sm', 'regular')}
    color: var(--comp-office_switcher-colour-text-default);

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      background-color: var(--comp-office_switcher-colour-fill-hover);
      color: var(--comp-office_switcher-colour-text-hover);
    }

    &[data-is-active='true'] {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`

export const ElOfficeSwitcherOfficeGroupLabel = styled.span`
  @layer elements.main {
    flex: 1 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
`

export const ElOfficeSwitcherOfficeGroupChevron = styled.span`
  @layer elements.main {
    display: inline-flex;
    align-items: center;

    color: var(--comp-office_switcher-colour-icon-default);
    width: var(--icon_size-md);
    height: var(--icon_size-md);

    details:open & {
      transform: rotate(180deg);
    }
  }
`
