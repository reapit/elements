import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes, useState } from 'react'
import { ElDeprecatedToolTipChild, elToolTipActive, ElDeprecatedToolTipContainer } from './__styles__'

/** @deprecated */
export interface DeprecatedToolTipProps extends HTMLAttributes<HTMLDivElement> {
  defaultActive?: boolean
  tip?: string
}

/** @deprecated */
export interface DeprecatedToolTipChildProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean
  tip?: string
}

/** @deprecated */
export const DeprecatedToolTip: FC<DeprecatedToolTipProps> = ({ children, defaultActive = false, tip }) => {
  const [active, setActive] = useState<boolean>(defaultActive)

  return (
    <ElDeprecatedToolTipContainer onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
      {children}
      <DeprecatedToolTipChild active={active}>{tip}</DeprecatedToolTipChild>
    </ElDeprecatedToolTipContainer>
  )
}

/** @deprecated */
export const DeprecatedToolTipChild: FC<DeprecatedToolTipChildProps> = ({ children, active }) => {
  return (
    <ElDeprecatedToolTipChild role="tooltip" className={cx(active && elToolTipActive)}>
      {children}
    </ElDeprecatedToolTipChild>
  )
}
