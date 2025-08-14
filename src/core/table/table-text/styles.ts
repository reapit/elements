import { ElDeprecatedIcon } from '../../../deprecated/icon'
import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElTableTextIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ElTableTextContent = styled.span`
  display: flex;
  align-items: center;
  color: var(--colour-text-primary);
  ${font('sm', 'regular')}
`

export const ElTableText = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  ${ElTableTextIcon} {
    color: var(--colour-icon-primary);
    ${ElDeprecatedIcon} {
      width: var(--icon_size-s);
      height: var(--icon_size-s);
      color: inherit;
    }
  }

  &[data-size='extra-small'] {
    ${ElTableTextContent} {
      font-size: var(--font-xs-regular-size);
      line-height: var(--font-xs-regular-line_height);
      letter-spacing: var(--font-xs-regular-letter_spacing);
      color: var(--colour-text-secondary);
    }
  }

  &[data-variant='primary'],
  &[data-variant='secondary'],
  &[data-variant='info'],
  &[data-variant='success'],
  &[data-variant='pending'],
  &[data-variant='warning'],
  &[data-variant='error'],
  &[data-variant='accent_1'],
  &[data-variant='accent_2'],
  &[data-variant='action'] {
    ${ElTableTextContent} {
      ${font('sm', 'medium')}
    }
  }

  &[data-variant='secondary'] {
    ${ElTableTextIcon} {
      color: var(--icon-secondary);
    }
    ${ElTableTextContent} {
      color: var(--colour-text-secondary);
    }
  }

  &[data-variant='info'] {
    ${ElTableTextContent} {
      color: var(--colour-text-info);
    }
    ${ElTableTextIcon} {
      color: var(--icon-info);
    }
  }

  &[data-variant='success'] {
    ${ElTableTextContent} {
      color: var(--colour-text-success);
    }
    ${ElTableTextIcon} {
      color: var(--icon-success);
    }
  }

  &[data-variant='pending'] {
    ${ElTableTextContent} {
      color: var(--colour-text-pending);
    }
    ${ElTableTextIcon} {
      color: var(--icon-pending);
    }
  }

  &[data-variant='warning'] {
    ${ElTableTextContent} {
      color: var(--colour-text-warning);
    }
    ${ElTableTextIcon} {
      color: var(--icon-warning);
    }
  }

  &[data-variant='error'] {
    ${ElTableTextContent} {
      color: var(--colour-text-error);
    }
    ${ElTableTextIcon} {
      color: var(--icon-error);
    }
  }

  &[data-variant='accent_1'] {
    ${ElTableTextContent} {
      color: var(--colour-text-accent_1);
    }
    ${ElTableTextIcon} {
      color: var(--icon-accent_1);
    }
  }

  &[data-variant='accent_2'] {
    ${ElTableTextContent} {
      color: var(--colour-text-accent_2);
    }
    ${ElTableTextIcon} {
      color: var(--icon-accent_2);
    }
  }

  &[data-variant='action'] {
    ${ElTableTextContent} {
      color: var(--colour-text-action);
    }
    ${ElTableTextIcon} {
      color: var(--icon-action);
    }
  }
`
