import React, { FC, Fragment, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import {
  ElPageHeaderContainer,
  ElPageHeaderSeparator,
  ElPageHeaderTitleContainer,
  ElPageHeaderWrap,
  ElPageHeaderWrapInner,
  elPageHeaderMaxWidth,
} from './__styles__'
import { Text2XL, TextL, TextBase, TypographyProps } from '../typography'
import { FlexContainer } from '../layout'
import { DeprecatedAvatar, DeprecatedAvatarProps } from '../deprecated-avatar'
import { DeprecatedTag, DeprecatedTagGroup, DeprecatedTagProps } from '../deprecated-tag'
import { DeprecatedButton, DeprecatedButtonGroup, DeprecatedButtonProps } from '../deprecated-button'
import { DeprecatedBreadCrumb, DeprecatedBreadCrumbProps } from '../deprecated-breadcrumb'
import { elMb3, elMb6, elMr3 } from '../../styles/spacing'
import { Tabs, TabsProps } from '../tabs'

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
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

export const PageHeaderWrap: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElPageHeaderWrap className={cx(className)} {...rest}>
    {children}
  </ElPageHeaderWrap>
)

export const PageHeaderWrapInner: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElPageHeaderWrapInner className={cx(className)} {...rest}>
    {children}
  </ElPageHeaderWrapInner>
)

export const PageHeaderContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElPageHeaderContainer className={cx(className)} {...rest}>
    {children}
  </ElPageHeaderContainer>
)

export const PageHeaderTitleContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElPageHeaderTitleContainer className={cx(className)} {...rest}>
    {children}
  </ElPageHeaderTitleContainer>
)

export const PageHeader: FC<PageHeaderProps> = ({
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
    <PageHeaderWrap {...rest}>
      <PageHeaderWrapInner className={cx(hasMaxWidth && elPageHeaderMaxWidth)}>
        {breadcrumb && <DeprecatedBreadCrumb className={elMb6} {...breadcrumb} />}
        <PageHeaderContainer>
          <PageHeaderContainer>
            {avatar && <DeprecatedAvatar {...avatar} />}
            <FlexContainer isFlexColumn>
              <PageHeaderTitleContainer>
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
              </PageHeaderTitleContainer>
              {pageSubtitle && <TextL tag="h2" hasBoldText {...pageSubtitle} />}
              {pageInfo && (
                <FlexContainer>
                  {pageInfo.map(({ ...rest }, index) => (
                    <Fragment key={index}>
                      <TextBase {...rest} />
                      {index !== pageInfo.length - 1 && <ElPageHeaderSeparator />}
                    </Fragment>
                  ))}
                </FlexContainer>
              )}
            </FlexContainer>
          </PageHeaderContainer>
          {buttons && (
            <DeprecatedButtonGroup className={cx(!tabs && elMb3)}>
              {buttons.map(({ children, ...rest }, index) => (
                <DeprecatedButton size="small" key={index} {...rest}>
                  {children}
                </DeprecatedButton>
              ))}
            </DeprecatedButtonGroup>
          )}
        </PageHeaderContainer>
        {tabs && <Tabs {...tabs} />}
      </PageHeaderWrapInner>
    </PageHeaderWrap>
  )
}
