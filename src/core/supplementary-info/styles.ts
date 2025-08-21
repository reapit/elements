import { font } from '../text'
import { styled } from '@linaria/react'
import separatorDotUrl from './separator-dot.svg?inline'

export const ElSupplementaryInfoList = styled.ul`
  display: inline-block;
  list-style: none;
  margin-block: 0;
  padding-inline: 0;
  width: fit-content;

  &,
  &[data-size='base'] {
    ${font('base', 'regular')}
  }
  &[data-size='sm'] {
    ${font('sm', 'regular')}
  }
  &[data-size='xs'] {
    ${font('xs', 'regular')}
  }

  &,
  &[data-colour='inherit'] {
    color: inherit;
  }
  &[data-colour='primary'] {
    color: var(--colour-text-primary);
  }
  &[data-colour='secondary'] {
    color: var(--colour-text-secondary);
  }
  &[data-colour='neutral'] {
    color: var(--colour-text-info);
  }
  &[data-colour='success'] {
    color: var(--colour-text-success);
  }
  &[data-colour='pending'] {
    color: var(--colour-text-pending);
  }
  &[data-colour='warning'] {
    color: var(--colour-text-warning);
  }
  &[data-colour='danger'] {
    color: var(--colour-text-error);
  }
  &[data-colour='accent-1'] {
    color: var(--colour-text-accent_1);
  }
  &[data-colour='accent-2'] {
    color: var(--colour-text-accent_2);
  }
`

export const ElSupplementaryInfoItem = styled.li`
  display: inline;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;

  &:not(:last-of-type)::after {
    content: '';
    display: inline-block;
    vertical-align: middle;

    /* NOTE: We don't use the #src/icons/svgs/separator-dot.svg because we need one that
     * has a hardcoded fill colour as a data URL encoded SVG is not impacted by CSS. */
    background: url(${separatorDotUrl}) center/cover no-repeat;

    &,
    [data-size='base'] & {
      width: var(--icon_size-l);
      height: var(--icon_size-l);
    }
    [data-size='sm'] & {
      width: var(--icon_size-m);
      height: var(--icon_size-m);
    }
    [data-size='xs'] & {
      width: var(--icon_size-s);
      height: var(--icon_size-s);
    }
  }

  &,
  &[data-colour='inherit'] {
    color: inherit;
  }
  &[data-colour='primary'] {
    color: var(--colour-text-primary);
  }
  &[data-colour='secondary'] {
    color: var(--colour-text-secondary);
  }
  &[data-colour='neutral'] {
    color: var(--colour-text-info);
  }
  &[data-colour='success'] {
    color: var(--colour-text-success);
  }
  &[data-colour='pending'] {
    color: var(--colour-text-pending);
  }
  &[data-colour='warning'] {
    color: var(--colour-text-warning);
  }
  &[data-colour='danger'] {
    color: var(--colour-text-error);
  }
  &[data-colour='accent-1'] {
    color: var(--colour-text-accent_1);
  }
  &[data-colour='accent-2'] {
    color: var(--colour-text-accent_2);
  }

  /* NOTE: Primary and Secondary colours are always regular weight, but the actual weight we apply is based on size */
  [data-size='base'] &[data-colour='primary'],
  [data-size='base'] &[data-colour='secondary'] {
    ${font('base', 'regular')}
  }
  [data-size='sm'] &[data-colour='primary'],
  [data-size='sm'] &[data-colour='secondary'] {
    ${font('sm', 'regular')}
  }
  [data-size='xs'] &[data-colour='primary'],
  [data-size='xs'] &[data-colour='secondary'] {
    ${font('xs', 'regular')}
  }

  /* NOTE: All other colours are always medium weight, but the actual weight we apply is still based on size */
  [data-size='base'] &[data-colour='neutral'],
  [data-size='base'] &[data-colour='success'],
  [data-size='base'] &[data-colour='pending'],
  [data-size='base'] &[data-colour='warning'],
  [data-size='base'] &[data-colour='danger'],
  [data-size='base'] &[data-colour='accent-1'],
  [data-size='base'] &[data-colour='accent-2'] {
    ${font('base', 'medium')}
  }
  [data-size='sm'] &[data-colour='neutral'],
  [data-size='sm'] &[data-colour='success'],
  [data-size='sm'] &[data-colour='pending'],
  [data-size='sm'] &[data-colour='warning'],
  [data-size='sm'] &[data-colour='danger'],
  [data-size='sm'] &[data-colour='accent-1'],
  [data-size='sm'] &[data-colour='accent-2'] {
    ${font('sm', 'medium')}
  }
  [data-size='xs'] &[data-colour='neutral'],
  [data-size='xs'] &[data-colour='success'],
  [data-size='xs'] &[data-colour='pending'],
  [data-size='xs'] &[data-colour='warning'],
  [data-size='xs'] &[data-colour='danger'],
  [data-size='xs'] &[data-colour='accent-1'],
  [data-size='xs'] &[data-colour='accent-2'] {
    ${font('xs', 'medium')}
  }
`
