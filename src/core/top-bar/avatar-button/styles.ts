import { css } from '@linaria/core'
import { ElAvatar } from '../../avatar/styles'

export const elTopBarAvatarButton = css`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  border-radius: var(--comp-navigation-border-radius-avatar_button);

  &:focus-visible {
    background: #ffffff;
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: 1px;
  }

  &:hover ${ElAvatar} {
    background: var(--comp-navigation-colour-fill-avatar_button-hover);
  }
`
