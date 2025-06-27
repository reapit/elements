import { font } from '#src/components/text'
import { styled } from '@linaria/react'

// If we don't have the transparent border, the component will move a slight bit, which is not what we want
export const ElAppSwitcherMenuItemAnchor = styled.a`
  cursor: pointer;

  display: grid;
  grid-template:
    'logo name' min-content
    'logo supplementary-info' min-content / min-content auto;
  gap: var(--spacing-1) var(--spacing-3);
  padding-block: var(--spacing-3);
  padding-inline: var(--spacing-3) var(--spacing-4);
  border-radius: var(--comp-menu-border-radius);

  text-decoration: none;
  width: 100%;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    background-color: var(--comp-menu-colour-fill-hover);
  }
`

export const ElAppSwitcherMenuItemAvatar = styled.div`
  grid-area: logo;

  width: var(--size-10);
  height: var(--size-10);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const ElAppSwitcherMenuItemLabel = styled.span`
  /* Allows long words to be broken and wrapped onto the next line. */
  overflow-wrap: anywhere;

  color: var(--comp-menu-colour-text-default-primary);
  ${font('sm', 'medium')}
`

export const ElAppSwitcherMenuItemSupplementaryInfo = styled.span`
  /* Allows long words to be broken and wrapped onto the next line. */
  overflow-wrap: anywhere;

  color: var(--comp-menu-colour-text-default-secondary);
  ${font('xs', 'regular')}
`
