import { BedIcon } from '#src/icons/bed'
import { FeaturesItem } from '../item'

interface FeaturesBedroomsItemProps {
  value: number
}

/**
 * A feature item that represents the number of bedrooms in a property.
 */
export function FeaturesBedroomsItem({ value }: FeaturesBedroomsItemProps) {
  return <FeaturesItem icon={<BedIcon />} label="Bedrooms" value={value} />
}
