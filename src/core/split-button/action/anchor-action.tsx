import { SplitButtonActionBase } from './action-base'

import type { AnchorHTMLAttributes } from 'react'
import type { CommonSplitButtonActionBaseProps } from './action-base'

interface SplitButtonAnchorActionProps
  extends CommonSplitButtonActionBaseProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The URL to which this anchor button navigates */
  href: string
}

/**
 * The `SplitButton.AnchorAction` component is used to represent the primary action in a `SplitButton`. A button-based
 * version is available via `SplitButton.Action`.
 */
export function SplitButtonAnchorAction(props: SplitButtonAnchorActionProps) {
  return <SplitButtonActionBase as="a" {...props} />
}
