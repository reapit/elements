import { BedIcon } from '#src/icons/bed'
import { FeaturesItem } from '../item'

export namespace FeaturesBedroomsItem {
  export interface Props {
    value: number
  }
}

/**
 * A feature item that represents the number of bedrooms in a property.
 */
export function FeaturesBedroomsItem({ value }: FeaturesBedroomsItem.Props) {
  return <FeaturesItem icon={<BedIcon />} label="Bedrooms" value={value} />
}

/** @deprecated Use FeaturesBedroomsItem.Props instead */
export type FeaturesBedroomsItemProps = FeaturesBedroomsItem.Props
