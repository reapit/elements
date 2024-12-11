import { styled } from '@linaria/react'

const baseCircleStyle = `
  border-radius: var(--corner-3xl, 24px);
`

const baseMediumSizeStyle = `
  width: var(--size-10);
  height: var(--size-10);
  font-size: var(--font-size-base, 15px);
  line-height: var(--line-height-base, 24px);
  letter-spacing: var(--letter-spacing-base, -0.15px);
`

const baseColourDefaultStyle = `
  background: var(--fill-default-medium, #9faebc);
  color: var(--text-white, #fff);

  /* override Icon element colour  */
  svg {
    color: var(--text-white, #fff);
  }
`

export const ElAvatar = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: var(--font-family, Inter);
  font-style: normal;
  font-weight: 600;

  ${baseColourDefaultStyle}
  ${baseCircleStyle}
  ${baseMediumSizeStyle}

  &[data-shape='square'] {
    border-radius: var(--corner-lg, 8px);
  }

  &[data-colour='purple'] {
    background: var(--fill-action-lightest, #ecf3ff);
    color: var(--text-action, #4e56ea);
    /* override Icon element colour  */
    svg {
      color: var(--text-action, #4e56ea);
    }
  }

  &[data-size='small'] {
    width: var(--size-8);
    height: var(--size-8);
    font-size: var(--font-size-2xs, 12px);
    line-height: var(--line-height-2xs, 16px);
    letter-spacing: var(--letter-spacing-2xs, -0.12px);
  }
`
