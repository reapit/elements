import { ChevronDownIcon } from '#src/icons/chevron-down'
import { cx } from '@linaria/core'
import {
  elOfficeSwitcherOfficeGroupSummary,
  ElOfficeSwitcherOfficeGroupChevron,
  ElOfficeSwitcherOfficeGroupLabel,
} from './styles'
import { useId } from 'react'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace OfficeSwitcherOfficeGroupSummary {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The label text for the office group summary
     */
    children: ReactNode
  }
}

/**
 * The summary element for the `OfficeSwitcherOfficeGroup`. Displays the group label with a
 * chevron icon that rotates when the group is expanded.
 *
 * The summary creates a separate label ID internally and uses `aria-labelledby` to associate
 * the summary element with its label text, allowing the parent `<details>` element to reference
 * the summary via its `id`.
 *
 * ⚠️ **Important**: `<summary>` elements are only interactive within a parent `<details>` element.
 * This component should only be used as part of an `OfficeSwitcherOfficeGroup` component.
 */
export function OfficeSwitcherOfficeGroupSummary({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  id,
  ...props
}: OfficeSwitcherOfficeGroupSummary.Props) {
  const labelId = ariaLabelledBy ?? useId()

  return (
    <summary {...props} aria-labelledby={labelId} className={cx(elOfficeSwitcherOfficeGroupSummary, className)} id={id}>
      <ElOfficeSwitcherOfficeGroupLabel id={labelId}>{children}</ElOfficeSwitcherOfficeGroupLabel>
      <ElOfficeSwitcherOfficeGroupChevron aria-hidden>
        <ChevronDownIcon />
      </ElOfficeSwitcherOfficeGroupChevron>
    </summary>
  )
}
