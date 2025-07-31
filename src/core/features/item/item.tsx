import { ElFeaturesItem, ElFeaturesItemValue, ElFeaturesItemIcon } from './styles'
import { DeprecatedTooltip, useDeprecatedTooltip } from '#src/deprecated/tooltip'

import type { HTMLAttributes, ReactNode } from 'react'

interface FeaturesItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode
  label: string
  value: ReactNode
}

/**
 * A single feature item. This is a low-level building block for Features items. Typically, consumers will prefer
 * using pre-configured items like `Features.Bedrooms`, `Features.Bathrooms`, `Features.CarSpaces`, and
 * `Features.LandSize`.
 */
export function FeaturesItem({ icon, label, value, ...rest }: FeaturesItemProps) {
  // TODO: Tooltip always wires up `aria-describedby` between the trigger and the tooltip, but we don't actually
  // want to do that here. In this case, we really just want the tooltip for visual users as `aria-describedby`
  // interferes with the a11y.
  const { getTooltipProps, getTriggerProps } = useDeprecatedTooltip()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we don't want aria-describedby on the trigger
  const { 'aria-describedby': _, ...triggerProps } = getTriggerProps(rest)

  return (
    <ElFeaturesItem {...triggerProps}>
      <ElFeaturesItemIcon aria-label={label}>{icon}</ElFeaturesItemIcon>
      <ElFeaturesItemValue>{value}</ElFeaturesItemValue>
      <DeprecatedTooltip {...getTooltipProps()} description={label} position="top" />
    </ElFeaturesItem>
  )
}
