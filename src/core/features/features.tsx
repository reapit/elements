import { ElFeatures } from './styles'
import { FeaturesItem } from './item'
import {
  FeaturesBathroomsItem,
  FeaturesBedroomsItem,
  FeaturesCarSpacesItem,
  FeaturesLandSizeItem,
} from './common-items'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace Features {
  export interface Props extends HTMLAttributes<HTMLDListElement> {
    /** One or more feature items. Typically, bedrooms, bathrooms, car spaces, and land size. */
    children: ReactNode
    /** The size of the features text. */
    size: '2xs' | 'xs' | 'sm' | 'base'
    /** Whether to prevent wrapping of feature items. */
    wrap?: 'wrap' | 'nowrap'
  }
}

/**
 * The features component allows users to provide quick details about a property. It should always have at least one
 * feature item. Each feature item has a representative icon and an alphanumeric value.
 *
 * Typically, each item will be one of the following: `Features.Bedrooms`, `Features.Bathrooms`, `Features.CarSpaces`,
 * and `Features.LandSize`, though custom items can be facilitated by using `Features.Item` directly.
 */
export function Features({ size, wrap, ...rest }: Features.Props) {
  return <ElFeatures {...rest} data-size={size} data-wrap={wrap} />
}

Features.Bathrooms = FeaturesBathroomsItem
Features.Bedrooms = FeaturesBedroomsItem
Features.CarSpaces = FeaturesCarSpacesItem
Features.LandSize = FeaturesLandSizeItem

Features.Item = FeaturesItem

/** @deprecated Use Features.Props instead */
export type FeaturesProps = Features.Props
