import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElExperimentalTableTextIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ElExperimentalTableTextContent = styled.span`
  display: flex;
  align-items: center;
  color: var(--colour-text-primary);
  ${font('sm', 'regular')}
`

export const ElExperimentalTableText = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  ${ElExperimentalTableTextIcon} {
    color: var(--colour-icon-primary);
  }

  &[data-size='extra-small'] {
    ${ElExperimentalTableTextContent} {
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
    ${ElExperimentalTableTextContent} {
      ${font('sm', 'medium')}
    }
  }

  &[data-variant='secondary'] {
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-secondary);
    }
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-secondary);
    }
  }

  &[data-variant='info'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-info);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-info);
    }
  }

  &[data-variant='success'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-success);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-success);
    }
  }

  &[data-variant='pending'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-pending);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-pending);
    }
  }

  &[data-variant='warning'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-warning);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-warning);
    }
  }

  &[data-variant='error'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-error);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-error);
    }
  }

  &[data-variant='accent_1'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-accent_1);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-accent_1);
    }
  }

  &[data-variant='accent_2'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-accent_2);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-accent_2);
    }
  }

  &[data-variant='action'] {
    ${ElExperimentalTableTextContent} {
      color: var(--colour-text-action);
    }
    ${ElExperimentalTableTextIcon} {
      color: var(--colour-icon-action);
    }
  }
`
