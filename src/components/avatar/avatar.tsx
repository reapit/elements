import { FC, HTMLAttributes } from 'react'
import { ElAvatar } from './styles'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: 'circle' | 'square'
  size?: 'medium' | 'small'
  colour?: 'default' | 'purple'
}

export const Avatar: FC<AvatarProps> = ({
  shape = 'circle',
  size = 'medium',
  colour = 'default',
  children,
  ...props
}) => {
  return (
    <ElAvatar role="presentation" data-shape={shape} data-size={size} data-colour={colour} {...props}>
      {children}
    </ElAvatar>
  )
}
