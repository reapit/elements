import { styled } from '@linaria/react'

const baseCircleStyle = `
  border-radius: var(--border-radius-3xl);
`

const baseMediumSizeStyle = `
  width: var(--size-10);
  height: var(--size-10);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);
`

const baseColourDefaultStyle = `
  background: var(--colour-fill-neutral-medium);
  color: var(--colour-text-white);

  /* override Icon element colour  */
  svg {
    color: var(--colour-text-white);
  }
`

export const ElAvatar = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-weight-semibold);

  ${baseColourDefaultStyle}
  ${baseCircleStyle}
  ${baseMediumSizeStyle}

  &[data-shape='square'] {
    border-radius: var(--border-radius-l);
  }

  &[data-colour='purple'] {
    background: var(--colour-fill-action-lightest);
    color: var(--colour-text-action);
    /* override Icon element colour  */
    svg {
      color: var(--colour-text-action);
    }
  }

  &[data-size='small'] {
    width: var(--size-8);
    height: var(--size-8);
    font-size: var(--font-size-2xs);
    line-height: var(--line-height-2xs);
    letter-spacing: var(--letter-spacing-2xs);
  }
`
