import { ElFeaturesItem, ElFeaturesItemValue, ElFeaturesItemIcon } from './styles'
import { Tooltip } from '#src/core/tooltip'
import { useId } from 'react'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FeatureItem {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    icon: ReactNode
    label: string
    value: ReactNode
  }
}

/**
 * A single feature item. This is a low-level building block for Features items. Typically, consumers will prefer
 * using pre-configured items like `Features.Bedrooms`, `Features.Bathrooms`, `Features.CarSpaces`, and
 * `Features.LandSize`.
 */
export function FeatureItem({ icon, id, label, value, ...rest }: FeatureItem.Props) {
  const tooltipId = useId()
  const triggerId = id ?? useId()

  return (
    <ElFeaturesItem {...rest} id={triggerId}>
      <ElFeaturesItemIcon aria-labelledby={tooltipId}>{icon}</ElFeaturesItemIcon>
      <ElFeaturesItemValue>{value}</ElFeaturesItemValue>
      <Tooltip id={tooltipId} placement="top" triggerId={triggerId}>
        {label}
      </Tooltip>
    </ElFeaturesItem>
  )
}

FeatureItem.displayName = 'Features.Item'

/** @deprecated Use FeaturesItem.Props instead */
export type FeaturesItemProps = FeatureItem.Props
