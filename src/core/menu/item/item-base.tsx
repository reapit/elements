import { cx } from '@linaria/core'
import {
  elMenuItem,
  ElMenuItemBadgeContainer,
  ElMenuItemContentContainer,
  ElMenuItemIconContainer,
  ElMenuItemLabel,
  ElMenuItemLabelText,
  ElMenuItemSupplementaryInfo,
} from './styles'
import { useCallback, useId } from 'react'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace MenuItemBase {
  export interface CommonProps {
    /**
     * Whether the menu item is disabled. This can be used to make the menu item appear disabled to users, but still be
     * focusable. ARIA disabled menu items, whether they are button or anchor DOM elements, will ignore click events.
     * Using `aria-disabled` is preferred when the menu item should still be focusable while it's disabled; for example,
     * to allow a tooltip to be displayed that explains why the menu item is disabled.
     */
    'aria-disabled'?: boolean | 'true' | 'false'
    /** Badge to display next to the primary text */
    badge?: ReactNode
    /** The menu item's primary label */
    children?: ReactNode
    /** Icon to display on the left side */
    iconLeft?: ReactNode
    /** Icon to display on the right side */
    iconRight?: ReactNode
    /** Secondary description text */
    supplementaryInfo?: ReactNode
  }

  export interface AsButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    'aria-checked'?: boolean
    as: 'button'
  }

  export interface AsAnchorProps extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    'aria-current'?: 'page' | false
    as: 'a'
    href: string
  }

  export type Props = AsButtonProps | AsAnchorProps
}

/**
 * A polymorphic menu item foundation that can render as either a button or anchor element.
 * This component is used internally by the `Menu.Item` and `Menu.AnchorItem` components and
 * should not be used directly by consumers.
 */
export function MenuItemBase({
  'aria-disabled': ariaDisabled,
  as: Element,
  badge,
  className,
  children,
  iconLeft,
  iconRight,
  onClick,
  role = 'menuitem',
  supplementaryInfo,
  ...rest
}: MenuItemBase.Props) {
  const labelId = useId()
  const badgeId = useId()
  const supplementaryInfoId = useId()

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const element = event.currentTarget
      // NOTE: Anchor elements CANNOT be disabled using the native `disabled` attribute, so we allow the
      // `aria-disabled` attribute to disable them instead. Since click events will still be fired when
      // `aria-disabled='true'`, we need to prevent any default action for the menu item from occurring, stop it
      // propagating to ancestors and avoid calling the consumer-supplied `onClick` callback.
      if (element.getAttribute('aria-disabled') === 'true') {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      // NOTE: We use a type assertion here to avoid having to narrow the type of `event` based on the specific
      // `Element` type.
      onClick?.(event as any)
    },
    [onClick],
  )

  return (
    <Element
      // NOTE: We use a type assertion here to avoid having to narrow the type of `rest` to the
      // specific `Element` type.
      {...(rest as HTMLAttributes<HTMLElement>)}
      // NOTE: We use `aria-details` because our supplementary info may contain structured information
      // and `aria-describedby` expects the referenced content to be plain text.
      aria-details={`${badgeId} ${supplementaryInfoId}`}
      aria-disabled={!!rest['disabled'] || !!ariaDisabled}
      aria-labelledby={labelId}
      className={cx(elMenuItem, className)}
      onClick={handleClick}
      role={role}
    >
      {iconLeft && <ElMenuItemIconContainer aria-hidden>{iconLeft}</ElMenuItemIconContainer>}
      <ElMenuItemContentContainer>
        <ElMenuItemLabel>
          {children && <ElMenuItemLabelText id={labelId}>{children}</ElMenuItemLabelText>}
          {badge && <ElMenuItemBadgeContainer id={badgeId}>{badge}</ElMenuItemBadgeContainer>}
        </ElMenuItemLabel>
        {supplementaryInfo && (
          <ElMenuItemSupplementaryInfo id={supplementaryInfoId}>{supplementaryInfo}</ElMenuItemSupplementaryInfo>
        )}
      </ElMenuItemContentContainer>
      {iconRight && <ElMenuItemIconContainer aria-hidden>{iconRight}</ElMenuItemIconContainer>}
    </Element>
  )
}

/** @deprecated Use MenuItemBase.CommonProps instead */
export type CommonMenuItemBaseProps = MenuItemBase.CommonProps

/** @deprecated Use MenuItemBase.AsButtonProps instead */
export type MenuItemAsButtonProps = MenuItemBase.AsButtonProps

/** @deprecated Use MenuItemBase.AsAnchorProps instead */
export type MenuItemAsAnchorProps = MenuItemBase.AsAnchorProps

/** @deprecated Use MenuItemBase.Props instead */
export type MenuItemBaseProps = MenuItemBase.Props
