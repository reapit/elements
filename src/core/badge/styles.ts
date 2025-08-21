import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../../deprecated/icon'
import { font } from '../text'

export const badgeColours = [
  'neutral',
  'success',
  'pending',
  'warning',
  'danger',
  'inactive',
  'accent_1',
  'accent_2',
] as const

export type BadgeColour = (typeof badgeColours)[number]

interface ElBadgeProps {
  'data-colour': BadgeColour
  'data-variant': 'default' | 'reversed'
}

export const ElBadge = styled.span<ElBadgeProps>`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  gap: var(--spacing-half);

  height: var(--size-5);
  padding-block: var(--spacing-half);
  padding-inline: var(--spacing-1);
  border-radius: var(--comp-badge-border-radius);

  /* NOTE: necessary when used in an inline or inline-block layout */
  vertical-align: middle;

  ${badgeColours.map((colour) => generateElBadgeColourStyles(colour)).join('\n')};
`

function generateElBadgeColourStyles(colour: BadgeColour) {
  return `
    &[data-colour='${colour}'][data-variant='default'] {
      background: var(--comp-badge-colour-fill-default-${colour});
    }

    &[data-colour='${colour}'][data-variant='reversed'] {
      background: var(--comp-badge-colour-fill-reversed-${colour});
    }
  `
}

export const ElBadgeLabelContainer = styled.span`
  ${font('xs', 'medium')}

  white-space: nowrap;
  padding-inline: var(--spacing-half);

  ${badgeColours.map((colour) => generateElBadgeLabelColourStyles(colour)).join('\n')};
`

function generateElBadgeLabelColourStyles(colour: BadgeColour) {
  return `
    [data-colour='${colour}'][data-variant='default'] & {
      color: var(--comp-badge-colour-text-default-${colour});
    }

    [data-colour='${colour}'][data-variant='reversed'] & {
      color: var(--comp-badge-colour-text-reversed-${colour});
    }
  `
}

export const ElBadgeIconContainer = styled.span`
  display: flex;
  place-items: center;
  place-content: center;

  width: var(--icon_size-xs);
  height: var(--icon_size-xs);

  ${ElDeprecatedIcon} {
    color: inherit;
    font-size: var(--icon_size-xs);
    width: inherit;
    height: inherit;
  }

  ${badgeColours.map((colour) => generateElBadgeIconContainerColourStyles(colour)).join('\n')}
`

function generateElBadgeIconContainerColourStyles(colour: BadgeColour) {
  return `
    [data-colour='${colour}'][data-variant='default'] & {
      color: var(--comp-badge-colour-icon-default-${colour});
    }

    [data-colour='${colour}'][data-variant='reversed'] & {
      color: var(--comp-badge-colour-icon-reversed-${colour});
    }
  `
}
