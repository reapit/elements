import type { FC, HTMLAttributes } from 'react'
import { Avatar } from '../avatar/avatar'
import { ElAvatarButton } from './styles'

export interface AvatarButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string
}

export const AvatarButton: FC<AvatarButtonProps> = ({ label, ...props }) => {
  return (
    <ElAvatarButton aria-label="User Avatar" {...props}>
      <Avatar size="small" shape="circle" colour="purple">
        {label}
      </Avatar>
    </ElAvatarButton>
  )
}
