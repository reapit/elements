import { styled } from '@linaria/react'

const baseCircleStyle = `
  border-radius: var(--border-radius-3xl);
`

const baseMediumSizeStyle = `
  width: var(--size-10);
  height: var(--size-10);
  font-size: var(--font-base-bold-size);
  font-weight: var(--font-base-bold-weight);
  line-height: var(--font-base-bold-line_height);
  letter-spacing: var(--font-base-bold-letter_spacing);

  /* override Icon element size  */
  svg {
    font-size: var(--icon_size-m);
  }

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
    font-size: var(--font-2xs-bold-size);
    font-weight: var(--font-2xs-bold-weight);
    line-height: var(--font-2xs-bold-line_height);
    letter-spacing: var(--font-2xs-bold-letter_spacing);

    /* override Icon element size  */
    svg {
      font-size: var(--icon_size-s);
    }
  }
`
