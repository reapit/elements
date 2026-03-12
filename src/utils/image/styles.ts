import { css } from '@linaria/core'

export const elImageContainer = css`
  position: relative;

  width: 100%;
  height: 100%;
`

export const elImage = css`
  &[aria-hidden='true'] {
    opacity: 0;
  }
`

export const elImageFallback = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: var(--border-radius-l);
  background: var(--colour-fill-neutral-light);
`

export const elImageFallbackOverlay = css`
  position: absolute;
  inset: 0;
`

export const elImageFallbackContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);

  width: min(202px, 100%);
`

export const elImageFallbackMessage = css`
  margin: 0;
  color: var(--colour-text-placeholder);
  text-align: center;

  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);
`

export const elResponsiveImage = css`
  display: block;

  width: 100%;
  height: 100%;

  &[data-object-fit='contain'] {
    object-fit: contain;
  }

  &[data-object-fit='cover'] {
    object-fit: cover;
  }

  &[data-object-fit='fill'] {
    object-fit: fill;
  }

  &[data-object-fit='none'] {
    object-fit: none;
  }

  &[data-object-fit='scale-down'] {
    object-fit: scale-down;
  }
`
