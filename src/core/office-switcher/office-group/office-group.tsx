import { cx } from '@linaria/core'
import { elOfficeSwitcherOfficeGroup } from './styles'
import { OfficeSwitcherOfficeGroupSummary } from './office-group-summary'
import { useId, useState } from 'react'

import type { DetailsHTMLAttributes, ReactNode, SyntheticEvent } from 'react'

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
  onToggle,
  open,
  ...rest
}: OfficeSwitcherOfficeGroup.Props) {
  const summaryId = ariaLabelledBy ?? useId()

  // Track open state so we can supply aria-expanded on the summary.
  // Native <summary> would provide this mapping automatically, but role="treeitem"
  // overrides the implicit ARIA semantics per HTML-AAM §5.1.
  const [isOpen, setIsOpen] = useState(open ?? false)

  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(event.currentTarget.open)
    onToggle?.(event)
  }

  return (
    <details
      {...rest}
      aria-labelledby={summaryId}
      className={cx(elOfficeSwitcherOfficeGroup, className)}
      open={open}
      onToggle={handleToggle}
    >
      <OfficeSwitcherOfficeGroupSummary aria-expanded={open ?? isOpen} id={summaryId} role="treeitem">
        {label}
      </OfficeSwitcherOfficeGroupSummary>
      {children}
    </details>
  )
}
