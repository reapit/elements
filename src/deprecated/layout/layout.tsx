import { FC } from 'react'
import { cx } from '@linaria/core'
import {
  elHasGreyBackground,
  elHasMaxWidth,
  elMainContainer,
  elPageContainer,
  elSecondaryNavContainer,
  elFlexContainer,
} from './styles'
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
} from '../../styles/deprecated-flexbox'
import { ContainerFlexProps, ContainerProps, TaggedElementProps } from './types'

/** @deprecated */
export const TaggedElement: FC<TaggedElementProps> = ({
  tag,
  children,
  className,
  baseClass,
  hasGreyBackground,
  hasMaxWidth,
  ...rest
}) => {
  const classes = cx(baseClass, hasGreyBackground && elHasGreyBackground, hasMaxWidth && elHasMaxWidth, className)
  switch (tag) {
    case 'main':
      return (
        <main className={classes} {...rest}>
          {children}
        </main>
      )
    case 'aside':
      return (
        <aside className={classes} {...rest}>
          {children}
        </aside>
      )
    case 'section':
      return (
        <section className={classes} {...rest}>
          {children}
        </section>
      )
    default:
    case 'div':
      return (
        <div className={classes} {...rest}>
          {children}
        </div>
      )
  }
}

/** @deprecated */
export const MainContainer: FC<ContainerProps> = ({ tag = 'main', children, ...rest }) => (
  <TaggedElement tag={tag} baseClass={elMainContainer} {...rest}>
    {children}
  </TaggedElement>
)

/** @deprecated */
export const PageContainer: FC<ContainerProps> = ({ tag = 'section', children, ...rest }) => (
  <TaggedElement tag={tag} baseClass={elPageContainer} {...rest}>
    {children}
  </TaggedElement>
)

/** @deprecated */
export const SecondaryNavContainer: FC<ContainerProps> = ({ children, tag = 'aside', ...rest }) => (
  <TaggedElement tag={tag} baseClass={elSecondaryNavContainer} {...rest}>
    {children}
  </TaggedElement>
)

/** @deprecated */
export const FlexContainer: FC<ContainerFlexProps> = ({
  tag = 'div',
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
    <TaggedElement tag={tag} baseClass={elFlexContainer} className={combinedClasses} {...rest}>
      {children}
    </TaggedElement>
  )
}
