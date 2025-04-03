import { useCallback, type FC, type MouseEventHandler, type ReactNode } from 'react'

import { useId } from '../../storybook/random-id'

import { Icon } from '../icon'

import { useIsMobileNavItemExpanded } from './use-is-mobile-nav-item-expanded'
import {
  ElMobileNavItemAnchor,
  ElMobileNavItemBadge,
  ElMobileNavItemButton,
  ElMobileNavItemContent,
  ElMobileNavItemExpanderButton,
  ElMobileNavItemListItem,
  ElMobileNavSubItemUnorderedList,
} from './styles'

type CommonMobileNavItemProps = {
  label: string
  isActive?: boolean
  hasBadge?: boolean
}

interface MobileNavItemSimpleAsButtonElementProps extends CommonMobileNavItemProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  href?: never
  children?: never
}

interface MobileNavItemSimpleAsAnchorElementProps extends CommonMobileNavItemProps {
  href: string
  onClick?: never
  children?: never
}

export type MobileNavItemSimpleProps = MobileNavItemSimpleAsButtonElementProps | MobileNavItemSimpleAsAnchorElementProps

const isMobileNavItemSimpleAsButtonElement = (
  props: MobileNavItemSimpleProps,
): props is MobileNavItemSimpleAsButtonElementProps => {
  return 'onClick' in props
}

export const MobileNavItemSimple: FC<MobileNavItemSimpleProps> = (props) => {
  if (isMobileNavItemSimpleAsButtonElement(props)) {
    const { onClick, isActive, label, hasBadge, ...rest } = props ?? {}

    return (
      <ElMobileNavItemListItem {...rest} aria-label={label}>
        <ElMobileNavItemButton onClick={onClick} aria-current={isActive ? 'true' : undefined}>
          <ElMobileNavItemContent>
            {label}
            {hasBadge && <ElMobileNavItemBadge />}
          </ElMobileNavItemContent>
        </ElMobileNavItemButton>
      </ElMobileNavItemListItem>
    )
  } else {
    const { href, isActive, label, hasBadge, ...rest } = props ?? {}

    return (
      <ElMobileNavItemListItem {...rest} aria-label={label}>
        <ElMobileNavItemAnchor href={href} aria-current={isActive ? 'page' : undefined}>
          <ElMobileNavItemContent>
            {label}
            {hasBadge && <ElMobileNavItemBadge />}
          </ElMobileNavItemContent>
        </ElMobileNavItemAnchor>
      </ElMobileNavItemListItem>
    )
  }
}

export interface MobileNavItemExpandableProps extends CommonMobileNavItemProps {
  children: ReactNode
  isActive?: boolean
  href?: never
  onClick?: never
}

export const MobileNavItemExpandable: FC<MobileNavItemExpandableProps> = (props) => {
  const { isActive, label, hasBadge, children, ...rest } = props ?? {}

  const [isExpanded, setIsExpanded] = useIsMobileNavItemExpanded(Boolean(isActive))
  const panelId = useId()

  const handleOnExpandButtonClick = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return (
    <ElMobileNavItemListItem {...rest} data-is-expanded={isExpanded} aria-label={label}>
      <ElMobileNavItemExpanderButton
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={handleOnExpandButtonClick}
      >
        <ElMobileNavItemContent>
          {label}
          {hasBadge && <ElMobileNavItemBadge />}
        </ElMobileNavItemContent>

        <Icon icon={isExpanded ? 'chevronUp' : 'chevronDown'} fontSize="16px" />
      </ElMobileNavItemExpanderButton>

      <ElMobileNavSubItemUnorderedList id={panelId} aria-hidden={!isExpanded}>
        {children}
      </ElMobileNavSubItemUnorderedList>
    </ElMobileNavItemListItem>
  )
}
