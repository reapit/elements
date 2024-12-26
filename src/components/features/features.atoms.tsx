import { FC, HTMLAttributes, ReactNode } from 'react'
import { ElFeaturesItem, ElFeaturesItemIcon } from './styles'

export interface FeaturesItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode
  children: ReactNode
  'aria-label'?: string
}

export const FeaturesItem: FC<FeaturesItemProps> = ({ icon, children, 'aria-label': ariaLabel, ...props }) => {
  return (
    <ElFeaturesItem aria-label={ariaLabel} {...props}>
      <ElFeaturesItemIcon>{icon}</ElFeaturesItemIcon>
      {children}
    </ElFeaturesItem>
  )
}
