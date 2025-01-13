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
      box-shadow:
        0px 0px 0px 1px #fff,
        0px 0px 0px 4px var(--purple-300);
    }
  }

  &:hover ${ElAvatar} {
    background: var(--fill-action-light);
  }
`
