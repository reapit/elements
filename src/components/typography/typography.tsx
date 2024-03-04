import React, { FC, HTMLAttributes, useMemo } from 'react'
import { cx } from '@linaria/core'
import {
  ElTitle,
  ElSubtitle,
  ElBodyText,
  ElSmallText,
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
  ElText2XL,
  ElText3XL,
  ElTextXL,
  ElTextL,
  ElTextSM,
  ElTextXS,
  ElText2XS,
  ElTextBase,
  elHasMargin,
  elHasUpperCasedText,
} from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

type TypographyTag = 'p' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'small'
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
  tag?: TypographyTag
  semantic?: boolean
}

const propsToClass =
  ({
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
  }: TypographyProps) =>
  () => {
    const intentClass = intent ? getIntentClassName(intent) : null

    return {
      className: cx(
        className,
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
      ),
      children,
      rest,
    }
  }

const TaggedElement: FC<{ tag: TypographyTag; children: any }> = ({ tag, children, ...props }) => {
  switch (tag) {
    case 'p':
      return <p {...props}>{children}</p>
    case 'a':
      return <a {...props}>{children}</a>
    case 'h1':
      return <h1 {...props}>{children}</h1>
    case 'h2':
      return <h2 {...props}>{children}</h2>
    case 'h3':
      return <h3 {...props}>{children}</h3>
    case 'h4':
      return <h4 {...props}>{children}</h4>
    case 'h5':
      return <h5 {...props}>{children}</h5>
    case 'h6':
      return <h6 {...props}>{children}</h6>
    case 'small':
      return <small {...props}>{children}</small>
  }
}

export const Text3XL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'h1'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElText3XL className={className} {...rest}>
      {children}
    </ElText3XL>
  )
}

export const Text2XL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'h2'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElText2XL className={className} {...rest}>
      {children}
    </ElText2XL>
  )
}

export const TextXL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'h3'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElTextXL className={className} {...rest}>
      {children}
    </ElTextXL>
  )
}

export const TextL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'h4'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElTextL className={className} {...rest}>
      {children}
    </ElTextL>
  )
}

export const TextBase: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'p'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElTextBase className={className} {...rest}>
      {children}
    </ElTextBase>
  )
}

export const TextSM: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'small'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElTextSM className={className} {...rest}>
      {children}
    </ElTextSM>
  )
}

export const TextXS: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'small'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElTextXS className={className} {...rest}>
      {children}
    </ElTextXS>
  )
}

export const Text2XS: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'small'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElText2XS className={className} {...rest}>
      {children}
    </ElText2XS>
  )
}

export const Title: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'h2'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElTitle className={className} {...rest}>
      {children}
    </ElTitle>
  )
}

export const Subtitle: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'h4'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElSubtitle className={className} {...rest}>
      {children}
    </ElSubtitle>
  )
}

export const BodyText: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'p'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElBodyText className={className} {...rest}>
      {children}
    </ElBodyText>
  )
}

export const SmallText: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  if (props.tag !== undefined) {
    return (
      <TaggedElement tag={props.tag} {...rest}>
        {children}
      </TaggedElement>
    )
  } else if (props.semantic) {
    return (
      <TaggedElement tag={'small'} {...rest}>
        {children}
      </TaggedElement>
    )
  }
  return (
    <ElSmallText className={className} {...rest}>
      {children}
    </ElSmallText>
  )
}
