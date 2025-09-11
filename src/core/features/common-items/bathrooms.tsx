import { BathIcon } from '#src/icons/bath'
import { FeaturesItem } from '../item'

export namespace FeaturesBathroomsItem {
  export interface Props {
    /** The number of bathrooms in the property. Can be a decimal. */
    value: number
  }
}

/**
 * A feature item that represents the number of bathrooms in a property.
 */
export function FeaturesBathroomsItem({ value }: FeaturesBathroomsItem.Props) {
  return <FeaturesItem icon={<BathIcon />} label="Bathrooms" value={value} />
}

/** @deprecated Use FeaturesBathroomsItem.Props instead */
export type FeaturesBathroomsItemProps = FeaturesBathroomsItem.Props
