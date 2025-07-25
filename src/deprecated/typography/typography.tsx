import React, { FC, HTMLAttributes, useMemo } from 'react'
import { cx } from '@linaria/core'
import {
  elTitle,
  elSubtitle,
  elBodyText,
  elSmallText,
  elHasGreyText,
  elHasBoldText,
  elHasItalicText,
  elHasRegularText,
  elHasNoMargin,
  elHasCenteredText,
  elHasSectionMargin,
  elHasDisabledText,
  elHasCapitalisedText,
  elHasMediumText,
  elText2XL,
  elText3XL,
  elTextXL,
  elTextL,
  elTextSM,
  elTextXS,
  elText2XS,
  elTextBase,
  elHasMargin,
  elHasUpperCasedText,
} from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

/** @deprecated */
export type TypeographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'div' | 'span'

/** @deprecated */
export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  hasGreyText?: boolean
  hasNoMargin?: boolean
  hasMargin?: boolean
  hasSectionMargin?: boolean
  hasBoldText?: boolean
  hasMediumText?: boolean
  hasItalicText?: boolean
  hasCenteredText?: boolean
  hasRegularText?: boolean
  hasDisabledText?: boolean
  hasCapitalisedText?: boolean
  hasUpperCasedText?: boolean
  intent?: Intent
  tag?: TypeographyTag
}

/** @deprecated */
export interface TaggedTypographyProps extends TypographyProps {
  baseClass?: string
}

const propsToClass =
  ({
    baseClass,
    className,
    hasGreyText,
    hasItalicText,
    hasBoldText,
    hasRegularText,
    hasMediumText,
    hasNoMargin,
    hasMargin,
    hasSectionMargin,
    hasCenteredText,
    hasDisabledText,
    hasCapitalisedText,
    hasUpperCasedText,
    intent,
    children,
    ...rest
  }: TaggedTypographyProps) =>
  () => {
    const intentClass = intent ? getIntentClassName(intent) : null

    return {
      className: cx(
        elTextBase,
        baseClass,
        hasGreyText && elHasGreyText,
        hasRegularText && elHasRegularText,
        hasBoldText && elHasBoldText,
        hasItalicText && elHasItalicText,
        hasMediumText && elHasMediumText,
        hasMargin && elHasMargin,
        hasNoMargin && elHasNoMargin,
        hasSectionMargin && elHasSectionMargin,
        hasCenteredText && elHasCenteredText,
        hasDisabledText && elHasDisabledText,
        hasCapitalisedText && elHasCapitalisedText,
        hasUpperCasedText && elHasUpperCasedText,
        intentClass,
        className,
      ),
      children,
      ...rest,
    }
  }

/** @deprecated */
export const TaggedTypography: FC<TaggedTypographyProps> = (props) => {
  const { className, children, tag, ...rest } = useMemo(propsToClass(props), [props])
  switch (tag) {
    case 'h1':
      return (
        <h1 className={className} {...rest}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={className} {...rest}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={className} {...rest}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 className={className} {...rest}>
          {children}
        </h4>
      )
    case 'h5':
      return (
        <h5 className={className} {...rest}>
          {children}
        </h5>
      )
    case 'h6':
      return (
        <h6 className={className} {...rest}>
          {children}
        </h6>
      )
    case 'p':
      return (
        <p className={className} {...rest}>
          {children}
        </p>
      )
    case 'small':
      return (
        <small className={className} {...rest}>
          {children}
        </small>
      )
    case 'span':
      return (
        <span className={className} {...rest}>
          {children}
        </span>
      )
    case 'div':
    default:
      return (
        <div className={className} {...rest}>
          {children}
        </div>
      )
  }
}

/** @deprecated */
export const Text3XL: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elText3XL} {...props} />

/** @deprecated */
export const Text2XL: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elText2XL} {...props} />

/** @deprecated */
export const TextXL: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elTextXL} {...props} />

/** @deprecated */
export const TextL: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elTextL} {...props} />

/** @deprecated */
export const TextBase: FC<TypographyProps> = (props) => <TaggedTypography {...props} />

/** @deprecated */
export const TextSM: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elTextSM} {...props} />

/** @deprecated */
export const TextXS: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elTextXS} {...props} />

/** @deprecated */
export const Text2XS: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elText2XS} {...props} />

/** @deprecated */
export const Title: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elTitle} tag="h1" {...props} />

/** @deprecated */
export const Subtitle: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elSubtitle} tag="h2" {...props} />

/** @deprecated */
export const BodyText: FC<TypographyProps> = (props) => <TaggedTypography baseClass={elBodyText} tag="p" {...props} />

/** @deprecated */
export const SmallText: FC<TypographyProps> = (props) => (
  <TaggedTypography baseClass={elSmallText} tag="small" {...props} />
)
