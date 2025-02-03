import { FC, HTMLAttributes, ReactNode } from 'react'
import { ElFeaturesItem, ElFeaturesItemIcon } from './styles'
import { useTooltip } from '../tooltip/use-tooltip'
import { Tooltip } from '../tooltip'

export interface FeaturesItemProps extends HTMLAttributes<HTMLLIElement> {
  icon: ReactNode
  children: ReactNode
  'aria-label': string
}

export const FeaturesItem: FC<FeaturesItemProps> = ({ icon, children, 'aria-label': ariaLabel, ...props }) => {
  const { getTooltipProps, getTriggerProps } = useTooltip()

  return (
    <ElFeaturesItem aria-label={ariaLabel} {...props} {...getTriggerProps()}>
      <ElFeaturesItemIcon>{icon}</ElFeaturesItemIcon>
      {children}
      <Tooltip {...getTooltipProps()} description={ariaLabel} position="top" />
    </ElFeaturesItem>
  )
}
