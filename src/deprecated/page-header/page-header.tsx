import React, { FC, Fragment, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import {
  ElDeprecatedPageHeaderContainer,
  ElDeprecatedPageHeaderSeparator,
  ElDeprecatedPageHeaderTitleContainer,
  ElDeprecatedPageHeaderWrap,
  ElDeprecatedPageHeaderWrapInner,
  elDeprecatedPageHeaderMaxWidth,
} from './__styles__'
import { Text2XL, TextL, TextBase, TypographyProps } from '../typography'
import { FlexContainer } from '../layout'
import { DeprecatedAvatar, DeprecatedAvatarProps } from '../avatar'
import { DeprecatedTag, DeprecatedTagGroup, DeprecatedTagProps } from '../tag'
import { DeprecatedButton, DeprecatedButtonGroup, DeprecatedButtonProps } from '../button'
import { DeprecatedBreadCrumb, DeprecatedBreadCrumbProps } from '../breadcrumb'
import { elMb3, elMb6, elMr3 } from '../../styles/spacing'
import { Tabs, TabsProps } from '../tabs'

/** @deprecated */
export interface DeprecatedPageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  avatar?: DeprecatedAvatarProps
  pageTitle: TypographyProps
  pageSubtitle?: TypographyProps
  pageInfo?: TypographyProps[]
  breadcrumb?: DeprecatedBreadCrumbProps
  tags?: DeprecatedTagProps[]
  buttons?: DeprecatedButtonProps[]
  tabs?: TabsProps
  hasMaxWidth?: boolean
}

/** @deprecated */
export const DeprecatedPageHeaderWrap: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElDeprecatedPageHeaderWrap className={cx(className)} {...rest}>
    {children}
  </ElDeprecatedPageHeaderWrap>
)

/** @deprecated */
export const DeprecatedPageHeaderWrapInner: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElDeprecatedPageHeaderWrapInner className={cx(className)} {...rest}>
    {children}
  </ElDeprecatedPageHeaderWrapInner>
)

/** @deprecated */
export const DeprecatedPageHeaderContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElDeprecatedPageHeaderContainer className={cx(className)} {...rest}>
    {children}
  </ElDeprecatedPageHeaderContainer>
)

/** @deprecated */
export const DeprecatedPageHeaderTitleContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => (
  <ElDeprecatedPageHeaderTitleContainer className={cx(className)} {...rest}>
    {children}
  </ElDeprecatedPageHeaderTitleContainer>
)

/** @deprecated */
export const DeprecatedPageHeader: FC<DeprecatedPageHeaderProps> = ({
  avatar,
  pageTitle,
  pageSubtitle,
  pageInfo,
  breadcrumb,
  tags,
  buttons,
  tabs,
  hasMaxWidth,
  ...rest
}) => {
  return (
    <DeprecatedPageHeaderWrap {...rest}>
      <DeprecatedPageHeaderWrapInner className={cx(hasMaxWidth && elDeprecatedPageHeaderMaxWidth)}>
        {breadcrumb && <DeprecatedBreadCrumb className={elMb6} {...breadcrumb} />}
        <DeprecatedPageHeaderContainer>
          <DeprecatedPageHeaderContainer>
            {avatar && <DeprecatedAvatar {...avatar} />}
            <FlexContainer isFlexColumn>
              <DeprecatedPageHeaderTitleContainer>
                {pageTitle && <Text2XL className={elMr3} tag="h1" hasBoldText {...pageTitle} />}
                {tags && (
                  <DeprecatedTagGroup>
                    {tags.map(({ children, ...rest }, index) => (
                      <DeprecatedTag key={index} {...rest}>
                        {children}
                      </DeprecatedTag>
                    ))}
                  </DeprecatedTagGroup>
                )}
              </DeprecatedPageHeaderTitleContainer>
              {pageSubtitle && <TextL tag="h2" hasBoldText {...pageSubtitle} />}
              {pageInfo && (
                <FlexContainer>
                  {pageInfo.map(({ ...rest }, index) => (
                    <Fragment key={index}>
                      <TextBase {...rest} />
                      {index !== pageInfo.length - 1 && <ElDeprecatedPageHeaderSeparator />}
                    </Fragment>
                  ))}
                </FlexContainer>
              )}
            </FlexContainer>
          </DeprecatedPageHeaderContainer>
          {buttons && (
            <DeprecatedButtonGroup className={cx(!tabs && elMb3)}>
              {buttons.map(({ children, ...rest }, index) => (
                <DeprecatedButton size="small" key={index} {...rest}>
                  {children}
                </DeprecatedButton>
              ))}
            </DeprecatedButtonGroup>
          )}
        </DeprecatedPageHeaderContainer>
        {tabs && <Tabs {...tabs} />}
      </DeprecatedPageHeaderWrapInner>
    </DeprecatedPageHeaderWrap>
  )
}
