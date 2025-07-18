import { LandSizeIcon } from '#src/icons/land-size'
import { FeaturesItem } from '../item'

import type { ReactNode } from 'react'

interface FeaturesLandSizeItemProps {
  /** The land size of the property. */
  value: ReactNode
}

/**
 * A feature item that represents the land size of a property. Care should be taken to ensure any abbreviated
 * area units are accessible (e.g. by using an `<abbr>` element with a `title` attribute).
 */
export function FeaturesLandSizeItem({ value }: FeaturesLandSizeItemProps) {
  return <FeaturesItem icon={<LandSizeIcon />} label="Land size" value={value} />
}
