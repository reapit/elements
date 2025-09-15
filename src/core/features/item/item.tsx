import { ElFeatureItem, ElFeatureItemValue, ElFeatureItemIcon } from './styles'
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
    <ElFeatureItem {...rest} id={triggerId}>
      <ElFeatureItemIcon aria-labelledby={tooltipId}>{icon}</ElFeatureItemIcon>
      <ElFeatureItemValue>{value}</ElFeatureItemValue>
      <Tooltip id={tooltipId} placement="top" triggerId={triggerId}>
        {label}
      </Tooltip>
    </ElFeatureItem>
  )
}

FeatureItem.displayName = 'Features.Item'

/** @deprecated Use FeaturesItem.Props instead */
export type FeaturesItemProps = FeatureItem.Props
