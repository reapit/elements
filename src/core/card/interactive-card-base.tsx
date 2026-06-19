import { cx } from '@linaria/core'
import { useCallback } from 'react'
import { elCard, elInteractiveCard } from './styles'

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'

export namespace InteractiveCardBase {
  export interface CommonProps {
    /**
     * Communicates a disabled state to assistive technologies without removing the element
     * from the focus order. Unlike the native `disabled` attribute, `aria-disabled` keeps
     * the card focusable so tooltips and other focus-dependent interactions remain available.
     */
    'aria-disabled'?: boolean | 'true' | 'false'
    /** Card content. */
    children?: ReactNode
    /**
     * Overrides the card's border-radius. Accepts a border-radius design token reference.
     * Defaults to `--border-radius-xl`.
     */
    borderRadius?: `--border-radius-${string}`
    /**
     * Overrides the card's padding. Accepts a spacing design token reference.
     * Defaults to `--spacing-4`.
     */
    padding?: `--spacing-${string}`
  }

  export interface AsButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /** Render as a button element. */
    as: 'button'
  }

  export interface AsAnchorProps extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Render as an anchor element. */
    as: 'a'
    /** The URL the card navigates to. */
    href: string
  }

  export type Props = AsButtonProps | AsAnchorProps
}

/**
 * A polymorphic interactive card foundation that can render as either a button or anchor element.
 * This component is used internally by `ButtonCard` and `AnchorCard` and should not be used
 * directly by consumers.
 */
export function InteractiveCardBase({
  'aria-disabled': ariaDisabled,
  as: Element,
  borderRadius,
  children,
  className,
  onClick,
  padding,
  style,
  ...rest
}: InteractiveCardBase.Props) {
  const disabled = rest['disabled' as keyof typeof rest] as boolean | undefined
  const isDisabled = !!disabled || ariaDisabled === true || ariaDisabled === 'true'
  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const element = event.currentTarget
      // NOTE: Anchor elements CANNOT be disabled using the native `disabled` attribute, so we allow the
      // `aria-disabled` attribute to disable them instead. Since click events will still be fired when
      // `aria-disabled='true'`, we need to prevent any default action from occurring, stop it propagating
      // to ancestors and avoid calling the consumer-supplied `onClick` callback.
      if (element.getAttribute('aria-disabled') === 'true') {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      // NOTE: We use a type assertion here to avoid having to narrow the type of `event` based on the
      // specific `Element` type.
      onClick?.(event as any)
    },
    [onClick],
  )

  const overrides = {
    ...(borderRadius !== undefined && { borderRadius: `var(${borderRadius})` }),
    ...(padding !== undefined && { '--card-padding': `var(${padding})` }),
  } as const satisfies CSSProperties & { '--card-padding'?: string }

  return (
    // NOTE: We use a type assertion on `rest` to avoid narrowing the type based on the specific
    // `Element` type — the same pattern used by ButtonBase.
    <Element
      {...(rest as HTMLAttributes<HTMLElement>)}
      aria-disabled={isDisabled}
      className={cx(elCard, elInteractiveCard, className)}
      style={{ ...style, ...overrides }}
      onClick={handleClick}
    >
      {children}
    </Element>
  )
}
