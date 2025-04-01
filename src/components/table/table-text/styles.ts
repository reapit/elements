import { styled } from '@linaria/react'

export const ElTabelTextIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ElTableTextContent = styled.span`
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

  ${ElTabelTextIcon} {
    color: var(--colour-icon-primary);
    .icon {
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
    }
  }

  &[data-variant='primary'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
    }
  }

  &[data-variant='secondary'] {
    ${ElTabelTextIcon} {
      color: var(--icon-secondary);
    }
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-secondary);
    }
  }

  &[data-variant='info'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-info);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-info);
    }
  }

  &[data-variant='success'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-success);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-success);
    }
  }

  &[data-variant='pending'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-pending);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-pending);
    }
  }

  &[data-variant='warning'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-warning);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-warning);
    }
  }

  &[data-variant='error'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-error);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-error);
    }
  }

  &[data-variant='accent_1'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-accent_1);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-accent_1);
    }
  }

  &[data-variant='accent_2'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-accent_2);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-accent_2);
    }
  }

  &[data-variant='action'] {
    ${ElTableTextContent} {
      font-weight: var(--font-sm-medium-weight);
      color: var(--colour-text-action);
    }
    ${ElTabelTextIcon} {
      color: var(--icon-action);
    }
  }
`

export const ElTableTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
