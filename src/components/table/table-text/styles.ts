import { styled } from '@linaria/react'
import { ElIcon } from '../../icon'

export const ElTableTextIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ElTableTextContent = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--colour-text-primary);
  font-family: var(--font-sm-regular-family);
  font-style: normal;
  font-weight: var(--font-sm-regular-weight);
  font-size: var(--font-sm-regular-size);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);
`

export const ElTableText = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  ${ElTableTextIcon} {
    color: var(--colour-icon-primary);
    ${ElIcon} {
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

  &[data-variant='primary'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
    }
  }

  &[data-variant='secondary'] {
    ${ElTableTextIcon} {
      color: var(--icon-secondary);
    }
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-secondary);
    }
  }

  &[data-variant='info'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-info);
    }
    ${ElTableTextIcon} {
      color: var(--icon-info);
    }
  }

  &[data-variant='success'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-success);
    }
    ${ElTableTextIcon} {
      color: var(--icon-success);
    }
  }

  &[data-variant='pending'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-pending);
    }
    ${ElTableTextIcon} {
      color: var(--icon-pending);
    }
  }

  &[data-variant='warning'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-warning);
    }
    ${ElTableTextIcon} {
      color: var(--icon-warning);
    }
  }

  &[data-variant='error'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-error);
    }
    ${ElTableTextIcon} {
      color: var(--icon-error);
    }
  }

  &[data-variant='accent_1'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-accent_1);
    }
    ${ElTableTextIcon} {
      color: var(--icon-accent_1);
    }
  }

  &[data-variant='accent_2'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-accent_2);
    }
    ${ElTableTextIcon} {
      color: var(--icon-accent_2);
    }
  }

  &[data-variant='action'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      line-height: var(--font-sm-medium-line_height);
      letter-spacing: var(--font-sm-medium-letter_spacing);
      color: var(--colour-text-action);
    }
    ${ElTableTextIcon} {
      color: var(--icon-action);
    }
  }
`
