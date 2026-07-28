import type { ReactNode } from "react";

import { BathIcon } from "#src/icons/bath";

import { FeatureItem } from "../item";

export namespace FeaturesBathroomsItem {
  export interface Props {
    /** The number of bathrooms in the property. Can be a decimal. */
    value: ReactNode;
  }
}

/**
 * A feature item that represents the number of bathrooms in a property.
 */
export function FeaturesBathroomsItem({ value }: FeaturesBathroomsItem.Props) {
  return <FeatureItem icon={<BathIcon />} label="Bathrooms" value={value} />;
}

/** @deprecated Use FeaturesBathroomsItem.Props instead */
export type FeaturesBathroomsItemProps = FeaturesBathroomsItem.Props;
