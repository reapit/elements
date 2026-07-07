import { font } from '#src/utils/font'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { styled } from '@linaria/react'

export const ElOfficeSwitcher = styled.div`
  @layer elements.main {
    display: none;

    grid-template-columns: 1fr;
    align-items: center;

    background: var(--comp-office_switcher-colour-fill-default);
    color: var(--comp-office_switcher-colour-text-default);
    border-bottom: var(--comp-office_switcher-border-width) solid var(--comp-office_switcher-colour-border);

    height: var(--size-10);
    width: 100%;
    padding-inline: var(--spacing-5);

    ${font('sm', 'regular')}

    @media screen and (${isWidthAtOrAbove('SM')}) {
      display: grid;
    }
  }
`
