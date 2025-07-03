import { CarIcon } from '#src/icons/car'
import { FeaturesItem } from '../item'

interface FeaturesCarSpacesItemProps {
  /** The number of car spaces in the property. */
  value: number
}

/**
 * A feature item that represents the number of car spaces in a property.
 */
export function FeaturesCarSpacesItem({ value }: FeaturesCarSpacesItemProps) {
  return <FeaturesItem icon={<CarIcon />} label="Car spaces" value={value} />
}
