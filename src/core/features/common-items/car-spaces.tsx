import { CarIcon } from '#src/icons/car'
import { FeatureItem } from '../item'

export namespace FeaturesCarSpacesItem {
  export interface Props {
    /** The number of car spaces in the property. */
    value: number
  }
}

/**
 * A feature item that represents the number of car spaces in a property.
 */
export function FeaturesCarSpacesItem({ value }: FeaturesCarSpacesItem.Props) {
  return <FeatureItem icon={<CarIcon />} label="Car spaces" value={value} />
}

/** @deprecated Use FeaturesCarSpacesItem.Props instead */
export type FeaturesCarSpacesItemProps = FeaturesCarSpacesItem.Props
