import { HTMLAttributes } from 'react'

type LayoutTags = 'main' | 'aside' | 'section' | 'div'
/** @deprecated */
export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  hasGreyBackground?: boolean
  hasMaxWidth?: boolean
  tag?: LayoutTags
}

/** @deprecated */
export interface ContainerFlexProps extends ContainerProps {
  isFlexRow?: boolean
  isFlexRowReverse?: boolean
  isFlexColumn?: boolean
  isFlexColumnReverse?: boolean
  isFlexWrap?: boolean
  isFlexNoWrap?: boolean
  isFlexWrapReverse?: boolean
  isFlexAuto?: boolean
  isFlexInitial?: boolean
  isFlexGrow0?: boolean
  isFlexGrow1?: boolean
  isFlexShrink0?: boolean
  isFlexShrink?: boolean
  isFlexJustifyCenter?: boolean
  isFlexJustifyStart?: boolean
  isFlexJustifyEnd?: boolean
  isFlexJustifyBetween?: boolean
  isFlexJustifyAround?: boolean
  isFlexJustifyEvenly?: boolean
  isFlexAlignCenter?: boolean
  isFlexAlignStart?: boolean
  isFlexAlignEnd?: boolean
  hasGreyBackground?: boolean
}

/** @deprecated */
export interface TaggedElementProps extends ContainerProps {
  baseClass: string
}
