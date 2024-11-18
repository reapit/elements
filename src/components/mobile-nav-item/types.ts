import { ReactNode } from 'react'

type CommonMobileNavItemProps = {
  label: string
  isActive?: boolean
  hasBadge?: boolean
}

export interface MobileNavItemSimpleProps extends CommonMobileNavItemProps {
  children?: never
  isDefaultExpanded?: never
  href: string
}

export interface MobileNavItemExpandableProps extends CommonMobileNavItemProps {
  children: ReactNode
  isDefaultExpanded?: boolean
  href?: never
}

export type MobileNavSubItemProps = MobileNavItemSimpleProps
