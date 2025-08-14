import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElLabelText = styled.span`
  ${font('sm', 'regular')}
  display: inline-flex;
  gap: var(--spacing-1);
  &[data-size='small'] {
    ${font('xs', 'regular')}
  }
  &[data-size='medium'] {
    ${font('sm', 'regular')}
  }
  &[data-variant='soft'] {
    color: var(--neutral-500);
  }
  &[data-variant='strong'] {
    color: var(--text-primary);
  }
`
export const ElLabelRequiredMark = styled.span`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
