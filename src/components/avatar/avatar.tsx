import { FC, HTMLAttributes } from 'react'
import { ElAvatar } from './styles'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: 'circle' | 'square'
  size?: 'medium' | 'small'
  intent?: 'default' | 'primary'
}

export const Avatar: FC<AvatarProps> = ({ shape, size, intent, children, ...props }) => {
  return (
    <ElAvatar role="presentation" data-shape={shape} data-size={size} data-intent={intent} {...props}>
      {children}
    </ElAvatar>
  )
}
