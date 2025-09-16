import {
  ElPageHeader,
  ElPageHeaderBreadcrumbsContainer,
  ElPageHeaderLeadingElementContainer,
  ElPageHeaderSubtitleContainer,
  ElPageHeaderSupplementaryInfoContainer,
  ElPageHeaderTitleContainer,
} from './styles'
import { PageHeaderLeadingElement } from './leading-element'
import { PageHeaderSubtitle } from './subtitle'
import { PageHeaderSupplementaryInfo } from './supplementary-info'
import { PageHeaderTitle } from './title'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace PageHeader {
  // NOTE: We omit...
  // - `children`, because the page title's "children" are spread across multiple props.
  // - `title`, because we want to use that prop name for the page header title.
  type AttributesToOmit = 'children' | 'title'

  export interface Props extends Omit<HTMLAttributes<HTMLElement>, AttributesToOmit> {
    /**
     * The background colour of the page header. When no value is provided (the default), the background will be
     * transparent.
     */
    backgroundColour?: 'white' | 'neutral-lightest'
    /** The leading element, like an image or product icon. */
    leadingElement?: ReactNode
    /** The breadcrumbs for the current page. */
    navigation?: ReactNode
    /** The page subtitle. */
    subtitle?: ReactNode
    /** The supplementary info. */
    supplementaryInfo?: ReactNode
    /** The page title. */
    title: ReactNode
  }
}

/**
 * A page header defines the top section of a page. It includes a title and can optionally include a subtitle,
 * breadcrumbs, buttons, and other additional information, as needed.
 */
export function PageHeader({
  backgroundColour,
  navigation: breadcrumbs,
  title,
  subtitle,
  leadingElement,
  supplementaryInfo,
}: PageHeader.Props) {
  return (
    <ElPageHeader
      style={{
        // NOTE: If a background colour is provided, we set the CSS variable to the corresponding colour. Otherwise
        // we leave the CSS variable undefined so that our styled element will default to a transparent background.
        '--page-header-background_colour': backgroundColour ? `var(--colour-fill-${backgroundColour})` : undefined,
      }}
    >
      {breadcrumbs && <ElPageHeaderBreadcrumbsContainer>{breadcrumbs}</ElPageHeaderBreadcrumbsContainer>}
      {leadingElement && <ElPageHeaderLeadingElementContainer>{leadingElement}</ElPageHeaderLeadingElementContainer>}
      <ElPageHeaderTitleContainer>{title}</ElPageHeaderTitleContainer>
      {subtitle && <ElPageHeaderSubtitleContainer>{subtitle}</ElPageHeaderSubtitleContainer>}
      {supplementaryInfo && (
        <ElPageHeaderSupplementaryInfoContainer>{supplementaryInfo}</ElPageHeaderSupplementaryInfoContainer>
      )}
    </ElPageHeader>
  )
}

PageHeader.LeadingElement = PageHeaderLeadingElement
PageHeader.Subtitle = PageHeaderSubtitle
PageHeader.SupplementaryInfo = PageHeaderSupplementaryInfo
PageHeader.Title = PageHeaderTitle
