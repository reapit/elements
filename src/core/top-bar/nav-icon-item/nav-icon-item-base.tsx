import { cx } from '@linaria/core'
import { ElTopBarNavIconItemBadge, ElTopBarNavIconItemIcon, elTopBarNavIconItem } from './styles'
import { Tooltip } from '#src/core/tooltip'

import { HTMLAttributes, useId, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'

export namespace TopBarNavIconItemBase {
  interface CommonProps {
    hasBadge?: boolean
    icon: ReactNode
  }

  export interface AsAnchorProps extends CommonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
    'aria-label': string
    as: 'a'
  }

  export interface AsButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    'aria-label': string
    as: 'button'
  }

  export type Props = AsAnchorProps | AsButtonProps
}

/** @deprecated Use TopBarNavIconItemBase.AsAnchorProps instead */
export type TopBarNavIconItemAsAnchorProps = TopBarNavIconItemBase.AsAnchorProps

/** @deprecated Use TopBarNavIconItemBase.AsButtonProps instead */
export type TopBarNavIconItemAsButtonProps = TopBarNavIconItemBase.AsButtonProps

/** @deprecated Use TopBarNavIconItemBase.Props instead */
export type TopBarNavIconItemBaseProps = TopBarNavIconItemBase.Props

/**
 * A simple polymorphic icon-only nav item that can render as a button or link. It is used internally by the
 * `TopBar.NavIconItemAnchor` and `TopBar.NavIconItemButton` components and should not be used directly by consumers.
 */
export function TopBarNavIconItemBase({
  'aria-label': ariaLabel,
  as: Element,
  className,
  icon,
  id,
  hasBadge,
  ...rest
}: TopBarNavIconItemBase.Props) {
  const triggerId = id ?? useId()
  const tooltipId = useId()

  // NOTE: Yes, it's a bit weird to be using `aria-label` for a visual label (via the tooltip).
  // There's also some awkwardness here with `aria-labelledby`. If the consumer provides it,
  // it'll be nuked by the `aria-labelledby` value we get from `Tooltip.getTooltipTriggerProps`. 🤷‍♂️
  const a11yProps = Tooltip.getTriggerProps({ id: triggerId, tooltipId, tooltipPurpose: 'label' })

  return (
    <Element
      // NOTE: We use a type assertion here to avoid having to narrow the type of `rest`
      // to the specific `Element` type.
      {...(rest as HTMLAttributes<HTMLElement>)}
      {...a11yProps}
      className={cx(elTopBarNavIconItem, className)}
    >
      <ElTopBarNavIconItemIcon aria-hidden="true">{icon}</ElTopBarNavIconItemIcon>
      {hasBadge && <ElTopBarNavIconItemBadge />}
      <Tooltip id={tooltipId} placement="bottom" triggerId={triggerId}>
        {ariaLabel}
      </Tooltip>
    </Element>
  )
}
