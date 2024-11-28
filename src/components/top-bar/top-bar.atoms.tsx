import type { FC, HTMLAttributes } from 'react'
import { ElTopBarMainNav } from './styles'

export const TopBarMainNav: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <ElTopBarMainNav
      style={{
        containerType: 'inline-size',
      }}
      {...props}
    >
      {children}
    </ElTopBarMainNav>
  )
}
