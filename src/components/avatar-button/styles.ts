import { styled } from '@linaria/react'
import { ElAvatar } from '../avatar/styles'

export const ElAvatarButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  &:focus-visible {
    outline: none;
  }

  &:focus-visible ${ElAvatar} {
    background: #fff;
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--Colours-Purple-purple-300, #7e9bfa);
  }

  &:hover ${ElAvatar} {
    background: var(--fill-colour-fill-action-light, #d6e1ff);
  }
`
