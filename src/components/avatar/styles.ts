import { styled } from '@linaria/react'

export const ElAvatar = styled.span`
  display: flex;
  width: var(--size-size-8, 40px);
  height: var(--size-size-8, 40px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: var(--corner-radius-corner-3xl, 24px);
  background: var(--fill-colour-fill-default-medium, #9faebc);

  color: var(--text-colour-text-white, #fff);
  svg {
    color: var(--text-colour-text-white, #fff);
  }
  text-align: center;
  font-family: var(--font-family, Inter);
  font-size: var(--font-size-base, 15px);
  font-style: normal;
  font-weight: 600;
  line-height: var(--line-height-base, 24px); /* 160% */
  letter-spacing: var(--letter-spacing-base, -0.15px);

  &[data-shape='square'] {
    border-radius: var(--corner-radius-corner-lg, 8px);
  }

  &[data-intent='primary'] {
    background: var(--fill-colour-fill-action-lightest, #ecf3ff);
    color: var(--text-colour-text-action, #4e56ea);
    svg {
      color: var(--text-colour-text-action, #4e56ea);
    }
  }

  &[data-size='small'] {
    width: var(--size-size-7, 32px);
    height: var(--size-size-7, 32px);
    font-size: var(--font-size-2xs, 12px);
    line-height: var(--line-height-2xs, 16px); /* 133.333% */
    letter-spacing: var(--letter-spacing-2xs, -0.12px);
  }
`
