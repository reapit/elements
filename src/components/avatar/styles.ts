import { styled } from '@linaria/react'

interface ElAvatarProps {
  'data-colour': 'default' | 'purple'
  'data-shape': 'circle' | 'square'
  'data-size': 'small' | 'medium'
}

export const ElAvatar = styled.span<ElAvatarProps>`
  display: flex;
  width: var(--size-10, 40px);
  height: var(--size-10, 40px);
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* text-base/Bold */
  font-family: var(--font-base-bold-family);
  font-size: var(--font-base-bold-size);
  font-style: normal;
  font-weight: var(--font-base-bold-weight);
  line-height: var(--font-base-bold-line_height);
  letter-spacing: var(--font-base-bold-letter_spacing);

  /** Colour styles */
  &[data-colour='default'] {
    background: var(--colour-fill-neutral-medium);
    color: var(--colour-text-white);
  }

  &[data-colour='purple'] {
    background: var(--colour-fill-action-lightest);
    color: var(--colour-text-action);
  }

  /** Shape styles */
  &[data-shape='circle'] {
    border-radius: var(--border-radius-3xl);
  }

  &[data-shape='square'] {
    border-radius: var(--border-radius-l);
  }

  /** Size styles */
  &[data-size='small'] {
    width: var(--size-8);
    height: var(--size-8);
    font-size: var(--font-size-2xs);
    line-height: var(--line-height-2xs);
    letter-spacing: var(--letter-spacing-2xs);
  }

  &[data-size='medium'] {
    width: var(--size-10);
    height: var(--size-10);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    letter-spacing: var(--letter-spacing-base);
  }
`
