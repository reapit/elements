import { useId } from 'react'
import type {
  FC,
  ReactNode,
  MouseEventHandler,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react'

import { Icon } from '../icon'

import {
  ElTopNavMenuItemAnchor,
  ElTopNavMenuItemBadge,
  ElTopNavMenuItemButton,
  ElTopNavMenuItemExpanderButton,
  ElTopNavMenuItemListItem,
  ElTopNavSubItemUnorderedList,
} from './styles'
import { useTopNavMenuExpandableState } from './use-top-nav-menu-expandable-state'

type CommonTopNavMenuItemProps = {
  label: string
  isActive?: boolean
  hasBadge?: boolean
}

interface TopNavMenuItemSimpleAsButtonElementProps
  extends CommonTopNavMenuItemProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>
  href?: never
  children?: never
}

interface TopNavMenuItemSimpleAsAnchorElementProps
  extends CommonTopNavMenuItemProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  onClick?: never
  children?: never
}

export type TopNavMenuItemSimpleProps =
  | TopNavMenuItemSimpleAsButtonElementProps
  | TopNavMenuItemSimpleAsAnchorElementProps

const isTopNavMenuItemSimpleAsButtonElement = (
  props: TopNavMenuItemSimpleProps,
): props is TopNavMenuItemSimpleAsButtonElementProps => {
  return 'onClick' in props
}

export const TopNavMenuItemSimple: FC<TopNavMenuItemSimpleProps> = (props) => {
  if (isTopNavMenuItemSimpleAsButtonElement(props)) {
    const { isActive, label, hasBadge, 'aria-label': ariaLabel, ...rest } = props ?? {}

    return (
      <ElTopNavMenuItemListItem>
        <ElTopNavMenuItemButton {...rest} aria-label={ariaLabel ?? label} aria-current={isActive ? 'true' : undefined}>
          {label}
          {hasBadge && <ElTopNavMenuItemBadge />}
        </ElTopNavMenuItemButton>
      </ElTopNavMenuItemListItem>
    )
  } else {
    const { isActive, label, hasBadge, 'aria-label': ariaLabel, ...rest } = props ?? {}

    return (
      <ElTopNavMenuItemListItem>
        <ElTopNavMenuItemAnchor {...rest} aria-label={ariaLabel ?? label} aria-current={isActive ? 'page' : undefined}>
          {label}
          {hasBadge && <ElTopNavMenuItemBadge />}
        </ElTopNavMenuItemAnchor>
      </ElTopNavMenuItemListItem>
    )
  }
}

export interface TopNavMenuItemExpandableProps extends CommonTopNavMenuItemProps, HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: never
  onClick?: never
}

export const TopNavMenuItemExpandable: FC<TopNavMenuItemExpandableProps> = (props) => {
  const [isExpanded, setIsExpanded] = useTopNavMenuExpandableState(Boolean(props?.isActive))
  const panelId = useId()

  const { isActive, label, hasBadge, children, 'aria-label': ariaLabel, ...rest } = props ?? {}

  return (
    <ElTopNavMenuItemListItem data-is-expanded={isExpanded}>
      <ElTopNavMenuItemExpanderButton
        {...rest}
        type="button"
        aria-expanded={isExpanded ?? isActive}
        aria-label={ariaLabel ?? label}
        aria-controls={panelId}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {label}
        {hasBadge && <ElTopNavMenuItemBadge />}

        <Icon icon={isExpanded ? 'chevronUp' : 'chevronDown'} fontSize="16px" />
      </ElTopNavMenuItemExpanderButton>

      <ElTopNavSubItemUnorderedList id={panelId} aria-hidden={!isExpanded}>
        {children}
      </ElTopNavSubItemUnorderedList>
    </ElTopNavMenuItemListItem>
  )
}
