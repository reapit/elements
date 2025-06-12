import { styled } from '@linaria/react'
import separatorDotBaseUrl from './separator-dot-base.svg?inline'
import separatorDotSmUrl from './separator-dot-sm.svg?inline'
import separatorDotXsUrl from './separator-dot-xs.svg?inline'

export const ElSupplementaryInfoList = styled.ul`
  display: inline-block;
  list-style: none;
  margin-block: 0;
  padding-inline: 0;
  width: fit-content;

  font-family: var(--font-base-regular-family);

  &,
  &[data-size='base'] {
    /* text-base */
    font-size: var(--font-base-regular-size);
    line-height: var(--font-base-regular-line_height);
    letter-spacing: var(--font-base-regular-letter_spacing);
  }
  &[data-size='sm'] {
    /* text-sm */
    font-size: var(--font-sm-regular-size);
    line-height: var(--font-sm-regular-line_height);
    letter-spacing: var(--font-sm-regular-letter_spacing);
  }
  &[data-size='xs'] {
    /* text-xs */
    font-size: var(--font-xs-regular-size);
    line-height: var(--font-xs-regular-line_height);
    letter-spacing: var(--font-xs-regular-letter_spacing);
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

    /* NOTE: The separator dot changes size based on the size of parent */
    &,
    [data-size='base'] & {
      background: url(${separatorDotBaseUrl}) center/cover no-repeat;
      width: var(--font-base-regular-line_height);
      height: var(--font-base-regular-line_height);
    }
    [data-size='sm'] & {
      background: url(${separatorDotSmUrl}) center/cover no-repeat;
      width: var(--font-sm-regular-line_height);
      height: var(--font-sm-regular-line_height);
    }
    [data-size='xs'] & {
      background: url(${separatorDotXsUrl}) center/cover no-repeat;
      width: var(--font-xs-regular-line_height);
      height: var(--font-xs-regular-line_height);
    }
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
    font-weight: var(--font-base-regular-weight);
  }
  [data-size='sm'] &[data-colour='primary'],
  [data-size='sm'] &[data-colour='secondary'] {
    font-weight: var(--font-sm-regular-weight);
  }
  [data-size='xs'] &[data-colour='primary'],
  [data-size='xs'] &[data-colour='secondary'] {
    font-weight: var(--font-xs-regular-weight);
  }

  /* NOTE: All other colours are always medium weight, but the actual weight we apply is still based on size */
  [data-size='base'] &[data-colour='neutral'],
  [data-size='base'] &[data-colour='success'],
  [data-size='base'] &[data-colour='pending'],
  [data-size='base'] &[data-colour='warning'],
  [data-size='base'] &[data-colour='danger'],
  [data-size='base'] &[data-colour='accent-1'],
  [data-size='base'] &[data-colour='accent-2'] {
    font-weight: var(--font-base-medium-weight);
  }
  [data-size='sm'] &[data-colour='neutral'],
  [data-size='sm'] &[data-colour='success'],
  [data-size='sm'] &[data-colour='pending'],
  [data-size='sm'] &[data-colour='warning'],
  [data-size='sm'] &[data-colour='danger'],
  [data-size='sm'] &[data-colour='accent-1'],
  [data-size='sm'] &[data-colour='accent-2'] {
    font-weight: var(--font-sm-medium-weight);
  }
  [data-size='xs'] &[data-colour='neutral'],
  [data-size='xs'] &[data-colour='success'],
  [data-size='xs'] &[data-colour='pending'],
  [data-size='xs'] &[data-colour='warning'],
  [data-size='xs'] &[data-colour='danger'],
  [data-size='xs'] &[data-colour='accent-1'],
  [data-size='xs'] &[data-colour='accent-2'] {
    font-weight: var(--font-xs-medium-weight);
  }
`
