import type { FC, HTMLAttributes } from 'react'
import { ElSideBar } from './styles'

const SideBar: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
  <ElSideBar aria-label="Sidebar Navigation" {...props}>
    {children}
  </ElSideBar>
)

export { SideBar }
