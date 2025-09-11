import { useState } from 'react'
import type { FC, ReactNode, MouseEventHandler } from 'react'

import { useId } from '../../storybook/random-id'

import { DeprecatedIcon } from '../../deprecated/icon'

import {
  ElExperimentalMobileNavItemAnchor,
  ElExperimentalMobileNavItemBadge,
  ElExperimentalMobileNavItemButton,
  ElExperimentalMobileNavItemContent,
  ElExperimentalMobileNavItemExpanderButton,
  ElExperimentalMobileNavItemListItem,
  ElExperimentalMobileNavSubItemUnorderedList,
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
      <ElExperimentalMobileNavItemListItem {...rest} aria-label={label}>
        <ElExperimentalMobileNavItemButton onClick={onClick} aria-current={isActive ? 'true' : undefined}>
          <ElExperimentalMobileNavItemContent>
            {label}
            {hasBadge && <ElExperimentalMobileNavItemBadge />}
          </ElExperimentalMobileNavItemContent>
        </ElExperimentalMobileNavItemButton>
      </ElExperimentalMobileNavItemListItem>
    )
  } else {
    const { href, isActive, label, hasBadge, ...rest } = props ?? {}

    return (
      <ElExperimentalMobileNavItemListItem {...rest} aria-label={label}>
        <ElExperimentalMobileNavItemAnchor href={href} aria-current={isActive ? 'page' : undefined}>
          <ElExperimentalMobileNavItemContent>
            {label}
            {hasBadge && <ElExperimentalMobileNavItemBadge />}
          </ElExperimentalMobileNavItemContent>
        </ElExperimentalMobileNavItemAnchor>
      </ElExperimentalMobileNavItemListItem>
    )
  }
}

export interface MobileNavItemExpandableProps extends CommonMobileNavItemProps {
  children: ReactNode
  href?: never
  onClick?: never
}

export const MobileNavItemExpandable: FC<MobileNavItemExpandableProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(props?.isActive))
  const panelId = useId()

  const { isActive, label, hasBadge, children, ...rest } = props ?? {}

  return (
    <ElExperimentalMobileNavItemListItem {...rest} data-is-expanded={isExpanded} aria-label={label}>
      <ElExperimentalMobileNavItemExpanderButton
        type="button"
        aria-expanded={isExpanded ?? isActive}
        aria-current={isActive ? 'true' : undefined}
        aria-controls={panelId}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <ElExperimentalMobileNavItemContent>
          {label}
          {hasBadge && <ElExperimentalMobileNavItemBadge />}
        </ElExperimentalMobileNavItemContent>

        <DeprecatedIcon icon={isExpanded ? 'chevronUp' : 'chevronDown'} fontSize="16px" />
      </ElExperimentalMobileNavItemExpanderButton>

      <ElExperimentalMobileNavSubItemUnorderedList id={panelId} aria-hidden={!isExpanded}>
        {children}
      </ElExperimentalMobileNavSubItemUnorderedList>
    </ElExperimentalMobileNavItemListItem>
  )
}
