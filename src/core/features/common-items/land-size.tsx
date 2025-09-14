import { LandSizeIcon } from '#src/icons/land-size'
import { FeatureItem } from '../item'

import type { ReactNode } from 'react'

export namespace FeaturesLandSizeItem {
  export interface Props {
    /** The land size of the property. */
    value: ReactNode
  }
}

/**
 * A feature item that represents the land size of a property. Care should be taken to ensure any abbreviated
 * area units are accessible (e.g. by using an `<abbr>` element with a `title` attribute).
 */
export function FeaturesLandSizeItem({ value }: FeaturesLandSizeItem.Props) {
  return <FeatureItem icon={<LandSizeIcon />} label="Land size" value={value} />
}

/** @deprecated Use FeaturesLandSizeItem.Props instead */
export type FeaturesLandSizeItemProps = FeaturesLandSizeItem.Props
