import { BathIcon } from '#src/icons/bath'
import { FeaturesItem } from '../item'

interface FeaturesBathroomsItemProps {
  /** The number of bathrooms in the property. Can be a decimal. */
  value: number
}

/**
 * A feature item that represents the number of bathrooms in a property.
 */
export function FeaturesBathroomsItem({ value }: FeaturesBathroomsItemProps) {
  return <FeaturesItem icon={<BathIcon />} label="Bathrooms" value={value} />
}
