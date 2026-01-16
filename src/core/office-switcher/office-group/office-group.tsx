import { cx } from '@linaria/core'
import { elOfficeSwitcherOfficeGroup } from './styles'
import { OfficeSwitcherOfficeGroupSummary } from './office-group-summary'
import { useId } from 'react'

import type { DetailsHTMLAttributes, ReactNode } from 'react'

export namespace OfficeSwitcherOfficeGroup {
  export interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
    /**
     * The office items to display within the group. Typically a collection of
     * `OfficeSwitcher.Option` components.
     */
    children?: ReactNode
    /**
     * The label text for the office group
     */
    label?: string
  }
}

/**
 * A collapsible group component for the OfficeSwitcher. Uses a `<details>` element to provide
 * a native disclosure widget for showing and hiding grouped office items.
 */
export function OfficeSwitcherOfficeGroup({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  label,
  ...rest
}: OfficeSwitcherOfficeGroup.Props) {
  const summaryId = ariaLabelledBy ?? useId()
  return (
    <details {...rest} aria-labelledby={summaryId} className={cx(elOfficeSwitcherOfficeGroup, className)}>
      <OfficeSwitcherOfficeGroupSummary id={summaryId}>{label}</OfficeSwitcherOfficeGroupSummary>
      {children}
    </details>
  )
}
