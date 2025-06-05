import { styled } from '@linaria/react'
import { ElAvatar } from '../avatar/styles'

export const ElAvatarButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  &:focus-visible {
    background: #fff;
    outline: none;

    ${ElAvatar} {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: 1px;
    }
  }

  &:hover ${ElAvatar} {
    background: var(--comp-navigation-colour-fill-avatar_button-hover);
  }
`
