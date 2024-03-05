import React, { HTMLAttributes, FC } from 'react'
import { cx } from '@linaria/core'
import {
  ElMainContainer,
  ElPageContainer,
  ElSecondaryNavContainer,
  ElFlexContainer,
  elHasGreyBackground,
  elHasMaxWidth,
} from './__styles__'
import {
  elFlexRow,
  elFlexColumn,
  elFlexColumnReverse,
  elFlexRowReverse,
  elFlexWrap,
  elFlexNoWrap,
  elFlexWrapReverse,
  elFlexAuto,
  elFlexGrow0,
  elFlexInitial,
  elFlexGrow,
  elFlexShrink0,
  elFlexShrink,
  elFlexJustifyCenter,
  elFlexJustifyStart,
  elFlexJustifyEnd,
  elFlexJustifyBetween,
  elFlexJustifyAround,
  elFlexJustifyEvenly,
  elFlexAlignCenter,
  elFlexAlignStart,
  elFlexAlignEnd,
} from '../../styles/flexbox'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  hasGreyBackground?: boolean
  hasMaxWidth?: boolean
}

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

export const MainContainer: FC<ContainerProps> = ({ children, className, hasGreyBackground, hasMaxWidth, ...rest }) => (
  <ElMainContainer
    className={cx(hasGreyBackground && elHasGreyBackground, hasMaxWidth && elHasMaxWidth, className)}
    {...rest}
  >
    {children}
  </ElMainContainer>
)

export const PageContainer: FC<ContainerProps> = ({ children, className, hasGreyBackground, hasMaxWidth, ...rest }) => (
  <ElPageContainer
    className={cx(hasGreyBackground && elHasGreyBackground, hasMaxWidth && elHasMaxWidth, className)}
    {...rest}
  >
    {children}
  </ElPageContainer>
)

export const SecondaryNavContainer: FC<ContainerProps> = ({
  children,
  className,
  hasGreyBackground,
  hasMaxWidth,
  ...rest
}) => (
  <ElSecondaryNavContainer
    className={cx(hasGreyBackground && elHasGreyBackground, hasMaxWidth && elHasMaxWidth, className)}
    {...rest}
  >
    {children}
  </ElSecondaryNavContainer>
)

export const FlexContainer: FC<ContainerFlexProps> = ({
  children,
  isFlexRow,
  isFlexRowReverse,
  isFlexColumn,
  isFlexColumnReverse,
  isFlexWrap,
  isFlexNoWrap,
  isFlexWrapReverse,
  isFlexAuto,
  isFlexInitial,
  isFlexGrow0,
  isFlexGrow1,
  isFlexShrink0,
  isFlexShrink,
  isFlexJustifyCenter,
  isFlexJustifyStart,
  isFlexJustifyEnd,
  isFlexJustifyBetween,
  isFlexJustifyAround,
  isFlexJustifyEvenly,
  isFlexAlignCenter,
  isFlexAlignStart,
  isFlexAlignEnd,
  hasGreyBackground,
  hasMaxWidth,
  className,
  ...rest
}) => {
  const combinedClasses = cx(
    isFlexRow && elFlexRow,
    isFlexRowReverse && elFlexRowReverse,
    isFlexColumn && elFlexColumn,
    isFlexColumnReverse && elFlexColumnReverse,
    isFlexWrap && elFlexWrap,
    isFlexNoWrap && elFlexNoWrap,
    isFlexWrapReverse && elFlexWrapReverse,
    isFlexAuto && elFlexAuto,
    isFlexInitial && elFlexInitial,
    isFlexGrow0 && elFlexGrow0,
    isFlexGrow1 && elFlexGrow,
    isFlexShrink0 && elFlexShrink0,
    isFlexShrink && elFlexShrink,
    isFlexJustifyCenter && elFlexJustifyCenter,
    isFlexJustifyStart && elFlexJustifyStart,
    isFlexJustifyEnd && elFlexJustifyEnd,
    isFlexJustifyBetween && elFlexJustifyBetween,
    isFlexJustifyAround && elFlexJustifyAround,
    isFlexJustifyEvenly && elFlexJustifyEvenly,
    isFlexAlignCenter && elFlexAlignCenter,
    isFlexAlignStart && elFlexAlignStart,
    isFlexAlignEnd && elFlexAlignEnd,
    hasGreyBackground && elHasGreyBackground,
    hasMaxWidth && elHasMaxWidth,
    className,
  )

  return (
    <ElFlexContainer className={combinedClasses} {...rest}>
      {children}
    </ElFlexContainer>
  )
}
