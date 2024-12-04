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
      <ToolTipChild active={active}>{tip}</ToolTipChild>
    </ElDeprecatedToolTipContainer>
  )
}

export const ToolTipChild: FC<DeprecatedToolTipChildProps> = ({ children, active }) => {
  return (
    <ElDeprecatedToolTipChild role="tooltip" className={cx(active && elToolTipActive)}>
      {children}
    </ElDeprecatedToolTipChild>
  )
}
